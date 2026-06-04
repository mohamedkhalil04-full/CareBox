import { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import api from "../../../api/axiosInstance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const SERVICE_META = {
  maintenance:  { label: "Maintenance",     color: "#2563eb" },
  deadBattery:  { label: "Dead Battery",    color: "#7c3aed" },
  flatTire:     { label: "Flat Tire",       color: "#0891b2" },
  accident:     { label: "Accident",        color: "#dc2626" },
  outOfGas:     { label: "Out of Gas",      color: "#d97706" },
};

// All three period tabs use the 12-month labels.
// Week/Year tabs fall back to the same monthly data per user decision.
const CHART_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
const StatCard = ({ icon, iconBg, iconColor, label, value, loading }) => (
  <div className="col-md-3 col-sm-6">
    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 16 }}>
      <div className="card-body p-4">
        <div
          className="d-flex align-items-center justify-content-center rounded-3 mb-3"
          style={{ width: 44, height: 44, background: iconBg }}
        >
          <i className={`${icon} fs-5`} style={{ color: iconColor }} />
        </div>
        <p className="text-muted small fw-medium mb-1">{label}</p>
        {loading ? (
          <div className="placeholder-glow">
            <span className="placeholder col-6 rounded" style={{ height: 32 }} />
          </div>
        ) : (
          <h2 className="fw-bold mb-0" style={{ fontSize: "1.7rem", letterSpacing: "-0.5px" }}>
            {value}
          </h2>
        )}
      </div>
    </div>
  </div>
);

const ServiceRow = ({ label, count, percentage, color }) => (
  <div className="mb-4">
    <div className="d-flex justify-content-between align-items-center mb-1">
      <span className="text-secondary fw-medium" style={{ fontSize: "0.92rem" }}>{label}</span>
      <span className="fw-bold">{count.toLocaleString()}</span>
    </div>
    <div className="progress mb-1" style={{ height: 8, backgroundColor: "#f0f2f5", borderRadius: 99 }}>
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${percentage}%`, backgroundColor: color, borderRadius: 99, transition: "width .6s ease" }}
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
    <div className="d-flex justify-content-between">
      <small className="text-muted">{count} requests</small>
      <small className="text-muted">{percentage}%</small>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const Reports = () => {
  // ── State ──────────────────────────────────
  const [earningsLoading, setEarningsLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [breakdownLoading, setBreakdownLoading] = useState(true);
  const [earnings, setEarnings] = useState({
    dailyEarnings:   null,
    weeklyEarnings:  null,
    monthlyEarnings: null,
    totalEarnings:   null,
  });

  // 12-element array of numbers, Jan→Dec, from the dedicated endpoint.
  // Week & Year tabs reuse the same data as a fallback.
  const [monthlyChartData, setMonthlyChartData] = useState(null);

  const [breakdown, setBreakdown] = useState(null);

  // ── Derived: services list ─────────────────
  const serviceRows = (() => {
    if (!breakdown) return [];
    const keys = ["maintenance", "deadBattery", "flatTire", "accident", "outOfGas"];
    const total = keys.reduce((sum, k) => sum + (breakdown[k] ?? 0), 0);
    if (total === 0) return keys.map(k => ({ ...SERVICE_META[k], count: 0, percentage: 0 }));
    return keys.map(k => ({
      ...SERVICE_META[k],
      count: breakdown[k] ?? 0,
      percentage: Math.round(((breakdown[k] ?? 0) / total) * 100),
    }));
  })();

  // ── Derived: chart values ──────────────────
  // All three period tabs use the monthly data (12 points).
  // Values are explicitly cast to Number() to prevent Chart.js
  // from silently defaulting string values to 0.
  const chartValues = Array.isArray(monthlyChartData)
    ? monthlyChartData.map(Number)
    : CHART_LABELS.map(() => 0);

  const revenueChartData = {
    labels: CHART_LABELS,
    datasets: [
      {
        label: "Revenue",
        data: chartValues,
        borderColor: "#2563eb",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "rgba(37,99,235,0.05)";
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.4)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0.05)");
          return gradient;
        },
        tension: 0.45,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        fill: true,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#1e293b",
        titleColor: "#fff",
        bodyColor: "#cbd5e1",
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (ctx) => `Earnings: ${Number(ctx.raw).toLocaleString()} EGP`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: "#f1f5f9", lineWidth: 1 },
        ticks: { color: "#94a3b8", font: { size: 12 } },
        border: { display: false },
      },
      y: {
        min: 0,
        grid: { color: "#f1f5f9", dash: [4, 4] },
        border: { display: false, dash: [4, 4] },
        ticks: {
          color: "#94a3b8",
          font: { size: 12 },
          callback: (v) => `${Number(v).toLocaleString()} EGP`,
        },
      },
    },
    interaction: { mode: "nearest", axis: "x", intersect: false },
  };

  // ── Fetchers ────────────────────────────────
  const fetchEarnings = useCallback(async () => {
    setEarningsLoading(true);
    try {
      const res = await api.get("/Dashboard/Provider/Earnings");
      const d = res.data?.data || res.data || {};
      setEarnings({
        dailyEarnings:   d.dailyEarnings   ?? d.DailyEarnings   ?? 0,
        weeklyEarnings:  d.weeklyEarnings  ?? d.WeeklyEarnings  ?? 0,
        monthlyEarnings: d.monthlyEarnings ?? d.MonthlyEarnings ?? 0,
        totalEarnings:   d.totalEarnings   ?? d.TotalEarnings   ?? 0,
      });
    } catch (err) {
      console.error("Earnings error:", err);
    } finally {
      setEarningsLoading(false);
    }
  }, []);

  const fetchMonthlyChart = useCallback(async () => {
    setChartLoading(true);
    try {
      const year = new Date().getFullYear();
      const res = await api.get("/Dashboard/ProviderDashboard/MonthlyEarnings", {
        params: { year },
      });

      // Response shape: { success, data: [{ monthNumber, monthName, totalEarnings }] }
      const raw = res.data?.data || res.data || [];
      const arr = Array.isArray(raw) ? raw : [];

      // Sort by monthNumber (1–12) and extract totalEarnings as numbers.
      // This produces a clean 12-element array regardless of API sort order.
      const sorted = [...arr].sort((a, b) => (a.monthNumber ?? 0) - (b.monthNumber ?? 0));
      const values = sorted.map((item) => Number(item.totalEarnings ?? 0));

      setMonthlyChartData(values);
    } catch (err) {
      console.error("Monthly chart error:", err);
      setMonthlyChartData(Array(12).fill(0));
    } finally {
      setChartLoading(false);
    }
  }, []);

  const fetchBreakdown = useCallback(async () => {
    setBreakdownLoading(true);
    try {
      const res = await api.get("/Dashboard/Provider/EmergencyTypes-Breakdown");
      const d = res.data?.data || res.data || {};
      setBreakdown(d);
    } catch (err) {
      console.error("Breakdown error:", err);
    } finally {
      setBreakdownLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEarnings();
    fetchMonthlyChart();
    fetchBreakdown();
  }, [fetchEarnings, fetchMonthlyChart, fetchBreakdown]);

  // ── Format helper ───────────────────────────
  const fmt = (v) =>
    v === null || v === undefined
      ? "—"
      : Number(v).toLocaleString("en-EG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // The chart is loading if either the stat cards or the chart series are still fetching
  const isChartLoading = earningsLoading || chartLoading;

  // ── Render ──────────────────────────────────
  return (
    <div className="container-fluid bg-light min-vh-100">

      {/* ── Header ── */}
        <div className="mb-2">
          <h1 className="fw-bold font-monospace fst-italic mb-1">Operations Reports :-</h1>
          <p className="text-muted mb-0">Monitor your team performance and service metrics.</p>
        </div>
        
      {/* ── Stats Cards ── */}
      <div className="row g-3 mb-3">
        <StatCard
          icon="fa-solid fa-dollar-sign"
          iconBg="rgba(34,197,94,.1)"
          iconColor="#16a34a"
          label="Today's Revenue"
          value={`${fmt(earnings.dailyEarnings)} EGP`}
          loading={earningsLoading}
        />
        <StatCard
          icon="fa-regular fa-calendar-days"
          iconBg="rgba(37,99,235,.1)"
          iconColor="#2563eb"
          label="Weekly Revenue"
          value={`${fmt(earnings.weeklyEarnings)} EGP`}
          loading={earningsLoading}
        />
        <StatCard
          icon="fa-solid fa-arrow-trend-up"
          iconBg="rgba(16,185,129,.1)"
          iconColor="#059669"
          label="Monthly Revenue"
          value={`${fmt(earnings.monthlyEarnings)} EGP`}
          loading={earningsLoading}
        />
        <StatCard
          icon="fa-regular fa-credit-card"
          iconBg="rgba(139,92,246,.1)"
          iconColor="#7c3aed"
          label="Total Earnings"
          value={`${fmt(earnings.totalEarnings)} EGP`}
          loading={earningsLoading}
        />
      </div>

      {/* ── Charts Row ── */}
      <div className="row g-4">
        {/* Revenue Chart */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
            <div className="card-header bg-white border-0 pt-4 pb-0 px-4" style={{ borderRadius: "16px 16px 0 0" }}>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">Revenue Overview</h5>
                <span
                  className="badge fw-medium"
                  style={{ background: "#f1f5f9", color: "#64748b", fontSize: "0.82rem", borderRadius: 8, padding: "6px 14px" }}
                >
                  This Year
                </span>
              </div>
            </div>
            <div className="card-body px-4 pb-4">
              {isChartLoading ? (
                <div className="d-flex align-items-center justify-content-center" style={{ height: 340 }}>
                  <div className="spinner-border text-primary" />
                </div>
              ) : (
                <div style={{ height: 340 }}>
                  <Line data={revenueChartData} options={revenueOptions} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Service Breakdown */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 16 }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Top Services</h5>

              {breakdownLoading ? (
                <div className="placeholder-glow">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="mb-4">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="placeholder col-5 rounded" />
                        <span className="placeholder col-2 rounded" />
                      </div>
                      <span className="placeholder col-12 rounded d-block" style={{ height: 8 }} />
                    </div>
                  ))}
                </div>
              ) : serviceRows.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <i className="fa-solid fa-chart-pie fa-2x d-block mb-2 opacity-25" />
                  <p className="small">No breakdown data available</p>
                </div>
              ) : (
                serviceRows.map((item) => (
                  <ServiceRow
                    key={item.label}
                    label={item.label}
                    count={item.count}
                    percentage={item.percentage}
                    color={item.color}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;