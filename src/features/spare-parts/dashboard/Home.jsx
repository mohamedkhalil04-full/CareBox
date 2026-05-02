import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import api from "../../../api/axiosInstance";

/* ─────────────────────────────────────────────
   Stat Card
───────────────────────────────────────────── */
const StatCard = ({ icon, label, value, trend, trendLabel, iconColor, loading }) => (
  <div className="col-12 col-md-6 col-xl-3">
    <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: "16px", transition: "transform .2s, box-shadow .2s", cursor: "default" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
    >
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <p className="text-muted mb-1 small fw-medium">{label}</p>
            <h2 className="mb-0 fw-bold" style={{ fontSize: "1.8rem" }}>
              {loading ? <span className="placeholder col-6 rounded" /> : value}
            </h2>
          </div>
          <div className="rounded-3 d-flex align-items-center justify-content-center"
            style={{ width: 48, height: 48, background: `${iconColor}18` }}>
            <i className={`${icon} fs-4`} style={{ color: iconColor }} />
          </div>
        </div>
        {trend !== undefined && (
          <div className={`d-flex align-items-center gap-1 small fw-medium ${trend >= 0 ? "text-success" : "text-danger"}`}>
            <i className={`fas fa-arrow-${trend >= 0 ? "up" : "down"}`} />
            <span>{Math.abs(trend)}%</span>
            <span className="text-muted fw-normal ms-1">{trendLabel}</span>
          </div>
        )}
        {trend === undefined && trendLabel && (
          <p className="text-warning small fw-medium mb-0">{trendLabel}</p>
        )}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Custom Tooltip for charts
───────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label, prefix = "", suffix = " EGP" }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card border-0 shadow" style={{ borderRadius: 10, padding: "10px 16px", minWidth: 130 }}>
      <p className="mb-1 small text-muted">{label}</p>
      <p className="mb-0 fw-bold" style={{ color: "#3b82f6" }}>
        {prefix}{Number(payload[0].value).toLocaleString()}{suffix}
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Order Status colours
───────────────────────────────────────────── */
const STATUS_COLORS = {
  Completed: "#22c55e",
  Accepted: "#3b82f6",
  Pending: "#f59e0b",
  Preparing: "#6366f1",
  OutForDelivery: "#f97316",
  ReadyForPickup: "#14b8a6",
  Cancelled: "#ef4444",
};

const STATUS_LABELS = {
  Completed: "Completed",
  Accepted: "Accepted",
  Pending: "Pending",
  Preparing: "Preparing",
  OutForDelivery: "Out for Delivery",
  ReadyForPickup: "Ready for Pickup",
  Cancelled: "Cancelled",
};

const STATUS_BADGE = {
  Pending: "warning text-dark",
  Accepted: "primary",
  Preparing: "secondary",
  OutForDelivery: "danger",
  ReadyForPickup: "info text-dark",
  Completed: "success",
  Cancelled: "dark",
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const SparePartsHome = () => {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────
  const [statsLoading, setStatsLoading] = useState(true);
  const [monthlyLoading, setMonthlyLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalIncome: 0,
    cancelledOrders: 0,
    pendingOrders: 0,
  });

  const [orderStatus, setOrderStatus] = useState({
    completed: 0,
    accepted: 0,
    pending: 0,
    preparing: 0,
    outForDelivery: 0,
    readyForPickup: 0,
    cancelled: 0,
  });

  const [monthlyData, setMonthlyData] = useState([]);
  const [earningsYear, setEarningsYear] = useState(new Date().getFullYear());
  const [recentOrders, setRecentOrders] = useState([]);

  // ── Fetch Helpers ───────────────────────────

  // GET /api/Dashboard/Provider/Earnings
  const fetchEarnings = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await api.get("/Dashboard/Provider/Earnings");
      const d = res.data?.data || res.data || {};
      setStats({
        totalOrders: d.totalOrders ?? d.TotalOrders ?? 0,
        totalIncome: d.totalIncome ?? d.TotalIncome ?? d.totalEarnings ?? 0,
        cancelledOrders: d.cancelledOrders ?? d.CancelledOrders ?? 0,
        pendingOrders: d.pendingOrders ?? d.PendingOrders ?? 0,
      });
    } catch (err) {
      console.error("Earnings fetch error:", err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // GET /api/Dashboard/ProviderDashboard/MonthlyEarnings?year=YYYY
  const fetchMonthlyEarnings = useCallback(async (year) => {
    setMonthlyLoading(true);
    try {
      const res = await api.get(`/Dashboard/ProviderDashboard/MonthlyEarnings?year=${year}`);
      const raw = res.data?.data || res.data || [];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      // Normalise: accept array of {month, earnings} or {monthName, totalEarnings} etc.
      const shaped = Array.isArray(raw)
        ? raw.map((item, idx) => ({
            month: item.monthName ?? item.month ?? months[item.monthNumber - 1] ?? months[idx],
            earnings: item.earnings ?? item.totalEarnings ?? item.amount ?? 0,
          }))
        : months.map((m) => ({ month: m, earnings: 0 }));
      setMonthlyData(shaped);
    } catch (err) {
      console.error("Monthly earnings error:", err);
      // Fallback empty
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      setMonthlyData(months.map(m => ({ month: m, earnings: 0 })));
    } finally {
      setMonthlyLoading(false);
    }
  }, []);

  // GET /Orders/provider-ordersStatus  (re-used from orders.jsx pattern)
  const fetchOrderStatus = useCallback(async () => {
    try {
      const res = await api.get("/Orders/provider-ordersStatus");
      const d = res.data?.data || res.data || {};
      setOrderStatus({
        completed: d.completed ?? 0,
        accepted: d.accepted ?? 0,
        pending: d.pending ?? 0,
        preparing: d.preparing ?? 0,
        outForDelivery: d.outForDelivery ?? 0,
        readyForPickup: d.readyForPickup ?? 0,
        cancelled: d.cancelled ?? 0,
      });
    } catch (err) {
      console.error("Order status error:", err);
    }
  }, []);

  // GET /Orders/Provider/Orders (recent – take first 5)
  const fetchRecentOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const res = await api.get("/Orders/Provider/Orders");
      const data = res.data?.data || res.data || [];
      setRecentOrders(Array.isArray(data) ? data.slice(0, 5) : []);
    } catch (err) {
      console.error("Recent orders error:", err);
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEarnings();
    fetchOrderStatus();
    fetchRecentOrders();
  }, [fetchEarnings, fetchOrderStatus, fetchRecentOrders]);

  useEffect(() => {
    fetchMonthlyEarnings(earningsYear);
  }, [earningsYear, fetchMonthlyEarnings]);

  // ── Derived data for Pie ────────────────────
  const pieData = Object.entries(orderStatus)
    .filter(([, v]) => v > 0)
    .map(([key, value]) => ({
      name: STATUS_LABELS[key.charAt(0).toUpperCase() + key.slice(1)] ?? key,
      rawKey: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    }));

  const totalOrdersPie = pieData.reduce((a, c) => a + c.value, 0);

  // ── Custom Pie Label ────────────────────────
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null;
    const RADIAN = Math.PI / 180;
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // ── Render ──────────────────────────────────
  return (
    <div className="p-2 p-lg-2" style={{ background: "#f8fafc", minHeight: "100vh" }}>


      {/* ── Stat Cards ── */}
      <div className="row g-4 mb-5">
        <StatCard
          icon="fas fa-shopping-bag"
          label="Total Orders"
          value={Number(totalOrdersPie).toLocaleString()}
          trend={12.5}
          trendLabel="vs last month"
          iconColor="#3b82f6"
          loading={statsLoading}
        />
        <StatCard
          icon="fas fa-wallet"
          label="Total Income"
          value={`${Number(stats.totalIncome).toLocaleString()} EGP`}
          trend={8.2}
          trendLabel="vs last month"
          iconColor="#22c55e"
          loading={statsLoading}
        />
        <StatCard
          icon="fas fa-times-circle"
          label="Cancelled Orders"
          value={Number(stats.cancelledOrders).toLocaleString()}
          trend={-2.1}
          trendLabel="vs last month"
          iconColor="#ef4444"
          loading={statsLoading}
        />
        <StatCard
          icon="fas fa-clock"
          label="Pending Orders"
          value={Number(stats.pendingOrders).toLocaleString()}
          trendLabel="⚡ Requires action"
          iconColor="#f59e0b"
          loading={statsLoading}
        />
      </div>

      {/* ── Charts Row ── */}
      <div className="row g-4 mb-5">

        {/* Income Overview */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 16 }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5 className="fw-bold mb-0" style={{ color: "#0f172a" }}>Income Overview</h5>
                  <p className="text-muted small mb-0">{earningsYear} monthly breakdown</p>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <button className="btn btn-sm btn-light rounded-pill px-3"
                    onClick={() => setEarningsYear(y => y - 1)}>
                    <i className="fas fa-chevron-left" />
                  </button>
                  <span className="fw-semibold" style={{ minWidth: 44, textAlign: "center" }}>{earningsYear}</span>
                  <button className="btn btn-sm btn-light rounded-pill px-3"
                    onClick={() => setEarningsYear(y => Math.min(y + 1, new Date().getFullYear()))}>
                    <i className="fas fa-chevron-right" />
                  </button>
                </div>
              </div>

              {monthlyLoading ? (
                <div className="d-flex align-items-center justify-content-center" style={{ height: 280 }}>
                  <div className="spinner-border text-primary" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1e3a5f" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#1e3a5f" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke="#e8edf2" vertical={false} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#1e3a5f", strokeWidth: 1, strokeDasharray: "4 4" }} />
                    <Area
                      type="monotone"
                      dataKey="earnings"
                      stroke="#1e3a5f"
                      strokeWidth={2.5}
                      fill="url(#earningsGradient)"
                      dot={false}
                      activeDot={{ r: 5, fill: "#1e3a5f", strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Order Status Pie */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 16 }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-1" style={{ color: "#0f172a" }}>Order Status</h5>
              <p className="text-muted small mb-3">Distribution across all statuses</p>

              {pieData.length === 0 ? (
                <div className="d-flex align-items-center justify-content-center" style={{ height: 260 }}>
                  <div className="spinner-border text-primary" />
                </div>
              ) : (
                <>
                  <div className="position-relative" style={{ height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          labelLine={false}
                          label={renderCustomLabel}
                        >
                          {pieData.map((entry, i) => (
                            <Cell key={i} fill={STATUS_COLORS[entry.rawKey] ?? "#94a3b8"} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v, n) => [v + " orders", n]} />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Centre text */}
                    <div className="position-absolute top-50 start-50 translate-middle text-center" style={{ pointerEvents: "none" }}>
                      <div className="fw-bold" style={{ fontSize: "1.4rem", lineHeight: 1 }}>{totalOrdersPie}</div>
                      <div className="text-muted" style={{ fontSize: "0.7rem" }}>Total</div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="row g-2 mt-2">
                    {pieData.map((entry, i) => (
                      <div className="col-6" key={i}>
                        <div className="d-flex align-items-center gap-2">
                          <div className="rounded-circle flex-shrink-0"
                            style={{ width: 10, height: 10, background: STATUS_COLORS[entry.rawKey] ?? "#94a3b8" }} />
                          <span className="small text-muted text-truncate" style={{ fontSize: "0.78rem" }}>
                            {entry.name}
                          </span>
                          <span className="ms-auto fw-semibold small">{entry.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Orders Table ── */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
        <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center px-4 pt-4 pb-3"
          style={{ borderRadius: "16px 16px 0 0" }}>
          <div>
            <h5 className="fw-bold mb-0" style={{ color: "#0f172a" }}>Recent Orders</h5>
            <p className="text-muted small mb-0">Latest 5 incoming orders</p>
          </div>
          <button
            className="btn btn-sm btn-outline-primary rounded-pill px-4"
            onClick={() => navigate("/bookings")}
          >
            View All Orders <i className="fas fa-arrow-right ms-1" />
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ background: "#f8fafc" }}>
              <tr>
                {["Order #", "Customer", "Car & Part", "Date", "Total", "Status"].map(h => (
                  <th key={h} className="small fw-semibold text-muted py-3 px-4"
                    style={{ borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ordersLoading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(6)].map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <span className="placeholder col-8 rounded" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-muted">
                    <i className="fas fa-inbox fs-3 d-block mb-2 opacity-25" />
                    No orders found
                  </td>
                </tr>
              ) : (
                recentOrders.map(order => (
                  <tr
                    key={order.orderId}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/bookings")}
                  >
                    <td className="px-4">
                      <strong className="text-primary">{order.orderCode ?? `ORD-${order.orderId}`}</strong>
                    </td>
                    <td className="px-4">{order.clientName ?? "—"}</td>
                    <td className="px-4">
                      {order.items?.[0]?.productName ?? "—"}
                      {order.carDetails && (
                        <><br /><small className="text-muted">{order.carDetails}</small></>
                      )}
                    </td>
                    <td className="px-4">
                      <small className="text-muted">
                        {order.orderDate ? new Date(order.orderDate).toLocaleDateString("en-EG", {
                          day: "2-digit", month: "short", year: "numeric"
                        }) : "—"}
                      </small>
                    </td>
                    <td className="px-4">
                      <strong>{Number(order.totalPrice ?? 0).toLocaleString()} EGP</strong>
                    </td>
                    <td className="px-4">
                      <span className={`badge rounded-pill px-3 py-2 bg-${STATUS_BADGE[order.statusName] ?? "secondary"}`}>
                        {STATUS_LABELS[order.statusName] ?? order.statusName ?? "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SparePartsHome;