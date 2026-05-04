// // import { Line } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   Filler,
// // } from "chart.js";

// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   Filler,
// // );

// // const Reports = () => {
// //   const revenueData = {
// //     labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
// //     datasets: [
// //       {
// //         label: "Revenue",
// //         data: [300, 600, 470, 550, 700, 760, 800],
// //         borderColor: "#3b82f6",
// //         backgroundColor: (context) => {
// //           const chart = context.chart;
// //           const { ctx, chartArea } = chart;
// //           if (!chartArea) return;
// //           const gradient = ctx.createLinearGradient(
// //             0,
// //             chartArea.bottom,
// //             0,
// //             chartArea.top,
// //           );
// //           gradient.addColorStop(0, "rgba(59, 130, 246, 0.05)");
// //           gradient.addColorStop(1, "rgba(59, 130, 246, 0.4)");
// //           return gradient;
// //         },
// //         tension: 0.4,
// //         borderWidth: 3,
// //         pointRadius: 0,
// //         pointHoverRadius: 6,
// //         fill: true,
// //       },
// //     ],
// //   };

// //   const revenueOptions = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     plugins: {
// //       legend: { display: false },
// //       tooltip: {
// //         mode: "index",
// //         intersect: false,
// //         backgroundColor: "#1e2937",
// //         titleColor: "#fff",
// //         bodyColor: "#cbd5e1",
// //         padding: 12,
// //         displayColors: false,
// //       },
// //     },
// //     scales: {
// //       x: {
// //         grid: { color: "#e2e8f0", lineWidth: 1 },
// //         ticks: { color: "#64748b", font: { size: 12 } },
// //       },
// //       y: {
// //         min: 0,
// //         max: 1000,
// //         grid: { color: "#e2e8f0" },
// //         ticks: {
// //           color: "#64748b",
// //           font: { size: 12 },
// //           callback: (value) => value + " " + "EGP",
// //         },
// //       },
// //     },
// //     interaction: {
// //       mode: "nearest",
// //       axis: "x",
// //       intersect: false,
// //     },
// //   };
// //   const data = [
// //     { type: "Emergency Towing", revenue: "1,440.00", jobs: 12, percentage: 35 },
// //     {
// //       type: "Battery Jump/Replace",
// //       revenue: "1,200.00",
// //       jobs: 24,
// //       percentage: 29,
// //     },
// //     { type: "Spare Parts Sales", revenue: "950.00", jobs: 45, percentage: 23 },
// //     { type: "Tire Change", revenue: "540.00", jobs: 18, percentage: 13 },
// //   ];

// //   return (
// //     <div className="container-fluid p-4 bg-light min-vh-100">
// //       <div className="d-flex justify-content-between align-items-center mb-4">
// //         <div>
// //           <h1 className=" fw-bold font-monospace fst-italic">
// //             Operations Reports :-
// //           </h1>
// //           <p className="text-muted">
// //             Monitor your team performance and service metrics.
// //           </p>
// //         </div>

// //         <button className="btn m-4 px-3 bg-body-secondary text-success">
// //           <i className="fa-solid fa-download mx-2" />
// //           Download Report
// //         </button>
// //       </div>

// //       <div className="row g-3 mb-4">
// //         <div className="col-md-3">
// //           <div className="card border-0 shadow-sm h-100">
// //             <div className="card-body">
// //               <div className="d-flex align-items-center mb-2">
// //                 <div className="bg-success bg-opacity-10 fs-4 text-success p-2 mb-3 rounded">
// //                   <i className="fa-solid fa-dollar mx-2 "></i>
// //                 </div>
// //               </div>
// //               <h6 className="text-muted small">Today's Revenue</h6>
// //               <h2 className="fw-bold">450.00</h2>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="col-md-3">
// //           <div className="card border-0 shadow-sm h-100">
// //             <div className="card-body">
// //               <div className="d-flex align-items-center mb-2">
// //                 <div className="bg-danger bg-opacity-10 text-danger p-2 mb-3 rounded">
// //                   <i class="fa-solid fa-book"></i>
// //                 </div>
// //               </div>
// //               <h6 className="text-muted small">Weekly Revenue</h6>
// //               <h2 className="fw-bold">3000</h2>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="col-md-3">
// //           <div className="card border-0 shadow-sm h-100">
// //             <div className="card-body">
// //               <div className="d-flex align-items-center mb-2">
// //                 <div className="bg-success bg-opacity-10 text-success p-2 mb-3 rounded">
// //                   <i className="fa-solid fa-arrow-trend-up" />
// //                 </div>
// //               </div>
// //               <h6 className="text-muted small">Monthly Revenue</h6>
// //               <h2 className="fw-bold">13000</h2>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="col-md-3">
// //           <div className="card border-0 shadow-sm h-100">
// //             <div className="card-body">
// //               <div className="d-flex align-items-center mb-2">
// //                 <div className="bg-primary bg-opacity-10 text-primary p-2 mb-3 rounded">
// //                   <i className="fa-regular fa-clipboard"></i>
// //                 </div>
// //               </div>
// //               <h6 className="text-muted small">Outstanding Invoices</h6>
// //               <h2 className="fw-bold">850.00</h2>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="row g-4">
// //         <div className="col-lg-8">
// //           <div className="card border-0 shadow-sm">
// //             <div className="card-header bg-white border-0 pt-4 pb-0">
// //               <div className="d-flex justify-content-between align-items-center">
// //                 <h5 className="card-title mb-0">Revenue Overview</h5>
// //                 <div className="btn-group btn-group-sm" role="group">
// //                   <div class="form-floating">
// //                     <select
// //                       class="form-select"
// //                       id="floatingSelect"
// //                       aria-label="Floating label select example"
// //                     >
// //                       <option value="">This Week</option>
// //                       <option value="1">One</option>
// //                       <option value="2">Two</option>
// //                       <option value="3">Three</option>
// //                     </select>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="card-body">
// //               <div style={{ height: "340px" }}>
// //                 <Line data={revenueData} options={revenueOptions} />
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="col-lg-4">
// //           <div className="card border-0 shadow-sm h-100">
// //             <div className="card-body">
// //               <h5 className="card-title mb-5">Revenue by Service Type</h5>
// //               {data.map((item, index) => (
// //                 <div key={index} className="mb-4">
// //                   <div className="d-flex justify-content-between align-items-center mb-1">
// //                     <span className="text-secondary fw-medium">
// //                       {item.type}
// //                     </span>
// //                     <span className="fw-bold">{item.revenue}</span>
// //                   </div>

// //                   <div
// //                     className="progress mb-1"
// //                     style={{ height: "8px", backgroundColor: "#f0f2f5" }}
// //                   >
// //                     <div
// //                       className="progress-bar rounded-pill"
// //                       role="progressbar"
// //                       style={{
// //                         width: `${item.percentage}%`,
// //                         backgroundColor: "#2563eb",
// //                       }}
// //                       aria-valuenow={item.percentage}
// //                       aria-valuemin="0"
// //                       aria-valuemax="100"
// //                     ></div>
// //                   </div>

// //                   <div className="d-flex justify-content-between">
// //                     <small className="text-muted">{item.jobs} jobs</small>
// //                     <small className="text-muted">{item.percentage}%</small>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Reports;



// import { useState, useEffect, useCallback } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";
// import api from "../../../api/axiosInstance";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// );

// /* ─────────────────────────────────────────────
//    Constants
// ───────────────────────────────────────────── */
// const SERVICE_META = {
//   maintenance:  { label: "Maintenance",     color: "#2563eb" },
//   deadBattery:  { label: "Dead Battery",    color: "#7c3aed" },
//   flatTire:     { label: "Flat Tire",       color: "#0891b2" },
//   accident:     { label: "Accident",        color: "#dc2626" },
//   outOfGas:     { label: "Out of Gas",      color: "#d97706" },
// };

// const PERIOD_LABELS = {
//   week:  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//   month: ["W1", "W2", "W3", "W4"],
//   year:  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
// };

// /* ─────────────────────────────────────────────
//    Sub-components
// ───────────────────────────────────────────── */
// const StatCard = ({ icon, iconBg, iconColor, label, value, loading }) => (
//   <div className="col-md-3 col-sm-6">
//     <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 16 }}>
//       <div className="card-body p-4">
//         <div
//           className="d-flex align-items-center justify-content-center rounded-3 mb-3"
//           style={{ width: 44, height: 44, background: iconBg }}
//         >
//           <i className={`${icon} fs-5`} style={{ color: iconColor }} />
//         </div>
//         <p className="text-muted small fw-medium mb-1">{label}</p>
//         {loading ? (
//           <div className="placeholder-glow">
//             <span className="placeholder col-6 rounded" style={{ height: 32 }} />
//           </div>
//         ) : (
//           <h2 className="fw-bold mb-0" style={{ fontSize: "1.7rem", letterSpacing: "-0.5px" }}>
//             {value}
//           </h2>
//         )}
//       </div>
//     </div>
//   </div>
// );

// const ServiceRow = ({ label, count, percentage, color }) => (
//   <div className="mb-4">
//     <div className="d-flex justify-content-between align-items-center mb-1">
//       <span className="text-secondary fw-medium" style={{ fontSize: "0.92rem" }}>{label}</span>
//       <span className="fw-bold">{count.toLocaleString()}</span>
//     </div>
//     <div className="progress mb-1" style={{ height: 8, backgroundColor: "#f0f2f5", borderRadius: 99 }}>
//       <div
//         className="progress-bar"
//         role="progressbar"
//         style={{ width: `${percentage}%`, backgroundColor: color, borderRadius: 99, transition: "width .6s ease" }}
//         aria-valuenow={percentage}
//         aria-valuemin="0"
//         aria-valuemax="100"
//       />
//     </div>
//     <div className="d-flex justify-content-between">
//       <small className="text-muted">{count} requests</small>
//       <small className="text-muted">{percentage}%</small>
//     </div>
//   </div>
// );

// /* ─────────────────────────────────────────────
//    Main Component
// ───────────────────────────────────────────── */
// const Reports = () => {
//   // ── State ──────────────────────────────────
//   const [earningsLoading, setEarningsLoading] = useState(true);
//   const [breakdownLoading, setBreakdownLoading] = useState(true);
//   const [selectedPeriod, setSelectedPeriod] = useState("week");

//   const [earnings, setEarnings] = useState({
//     dailyEarnings:   null,
//     weeklyEarnings:  null,
//     monthlyEarnings: null,
//     totalEarnings:   null,
//     // chart arrays keyed by period
//     weeklyData:  null,
//     monthlyData: null,
//     yearlyData:  null,
//   });

//   const [breakdown, setBreakdown] = useState(null); // raw API object

//   // ── Derived: services list ─────────────────
//   const serviceRows = (() => {
//     if (!breakdown) return [];
//     const keys = ["maintenance", "deadBattery", "flatTire", "accident", "outOfGas"];
//     const total = keys.reduce((sum, k) => sum + (breakdown[k] ?? 0), 0);
//     if (total === 0) return keys.map(k => ({ ...SERVICE_META[k], count: 0, percentage: 0 }));
//     return keys.map(k => ({
//       ...SERVICE_META[k],
//       count: breakdown[k] ?? 0,
//       percentage: Math.round(((breakdown[k] ?? 0) / total) * 100),
//     }));
//   })();

//   // ── Derived: chart data for selected period ─
//   const chartLabels = PERIOD_LABELS[selectedPeriod];
//   const rawChartData = (() => {
//     if (selectedPeriod === "week")  return earnings.weeklyData;
//     if (selectedPeriod === "month") return earnings.monthlyData;
//     return earnings.yearlyData;
//   })();

//   // Fallback to placeholder zeros matching the label count
//   const chartValues = Array.isArray(rawChartData) && rawChartData.length === chartLabels.length
//     ? rawChartData
//     : chartLabels.map(() => 0);

//   const revenueChartData = {
//     labels: chartLabels,
//     datasets: [
//       {
//         label: "Revenue",
//         data: chartValues,
//         borderColor: "#2563eb",
//         backgroundColor: (context) => {
//           const chart = context.chart;
//           const { ctx, chartArea } = chart;
//           if (!chartArea) return "rgba(37,99,235,0.05)";
//           const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
//           gradient.addColorStop(0, "rgba(37,99,235,0.03)");
//           gradient.addColorStop(1, "rgba(37,99,235,0.18)");
//           return gradient;
//         },
//         tension: 0.45,
//         borderWidth: 2.5,
//         pointRadius: 0,
//         pointHoverRadius: 5,
//         fill: true,
//       },
//     ],
//   };

//   const revenueOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         mode: "index",
//         intersect: false,
//         backgroundColor: "#1e293b",
//         titleColor: "#fff",
//         bodyColor: "#cbd5e1",
//         padding: 12,
//         displayColors: false,
//         callbacks: {
//           label: (ctx) => `${Number(ctx.raw).toLocaleString()} EGP`,
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: { color: "#f1f5f9", lineWidth: 1 },
//         ticks: { color: "#94a3b8", font: { size: 12 } },
//         border: { display: false },
//       },
//       y: {
//         grid: { color: "#f1f5f9", dash: [4, 4] },
//         border: { display: false, dash: [4, 4] },
//         ticks: {
//           color: "#94a3b8",
//           font: { size: 12 },
//           callback: (v) => `$${v}`,
//         },
//       },
//     },
//     interaction: { mode: "nearest", axis: "x", intersect: false },
//   };

//   // ── Fetchers ────────────────────────────────
//   const fetchEarnings = useCallback(async () => {
//     setEarningsLoading(true);
//     try {
//       const res = await api.get("/Dashboard/Provider/Earnings");
//       const d = res.data?.data || res.data || {};
//       setEarnings({
//         dailyEarnings:   d.dailyEarnings   ?? d.DailyEarnings   ?? 0,
//         weeklyEarnings:  d.weeklyEarnings  ?? d.WeeklyEarnings  ?? 0,
//         monthlyEarnings: d.monthlyEarnings ?? d.MonthlyEarnings ?? 0,
//         totalEarnings:   d.totalEarnings   ?? d.TotalEarnings   ?? 0,
//         // chart timeseries — accept whatever the API returns, fall back gracefully
//         weeklyData:  d.weeklyData  ?? d.WeeklyData  ?? null,
//         monthlyData: d.monthlyData ?? d.MonthlyData ?? null,
//         yearlyData:  d.yearlyData  ?? d.YearlyData  ?? null,
//       });
//     } catch (err) {
//       console.error("Earnings error:", err);
//     } finally {
//       setEarningsLoading(false);
//     }
//   }, []);

//   const fetchBreakdown = useCallback(async () => {
//     setBreakdownLoading(true);
//     try {
//       const res = await api.get("/Dashboard/Provider/EmergencyTypes-Breakdown");
//       const d = res.data?.data || res.data || {};
//       setBreakdown(d);
//     } catch (err) {
//       console.error("Breakdown error:", err);
//     } finally {
//       setBreakdownLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchEarnings();
//     fetchBreakdown();
//   }, [fetchEarnings, fetchBreakdown]);

//   // ── Format helper ───────────────────────────
//   const fmt = (v) =>
//     v === null || v === undefined
//       ? "—"
//       : Number(v).toLocaleString("en-EG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

//   // ── Render ──────────────────────────────────
//   return (
//     <div className="container-fluid p-4 bg-light min-vh-100">

//       {/* ── Header ── */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h1 className="fw-bold font-monospace fst-italic mb-1">Operations Reports :-</h1>
//           <p className="text-muted mb-0">Monitor your team performance and service metrics.</p>
//         </div>
//         <button className="btn border px-4 py-2 d-flex align-items-center gap-2 bg-white shadow-sm"
//           style={{ borderRadius: 12, fontWeight: 500 }}>
//           <i className="fa-solid fa-download text-success" />
//           Download Report
//         </button>
//       </div>

//       {/* ── Stats Cards ── */}
//       <div className="row g-3 mb-4">
//         <StatCard
//           icon="fa-solid fa-dollar-sign"
//           iconBg="rgba(34,197,94,.1)"
//           iconColor="#16a34a"
//           label="Today's Revenue"
//           value={`${fmt(earnings.dailyEarnings)} EGP`}
//           loading={earningsLoading}
//         />
//         <StatCard
//           icon="fa-regular fa-calendar-days"
//           iconBg="rgba(37,99,235,.1)"
//           iconColor="#2563eb"
//           label="Weekly Revenue"
//           value={`${fmt(earnings.weeklyEarnings)} EGP`}
//           loading={earningsLoading}
//         />
//         <StatCard
//           icon="fa-solid fa-arrow-trend-up"
//           iconBg="rgba(16,185,129,.1)"
//           iconColor="#059669"
//           label="Monthly Revenue"
//           value={`${fmt(earnings.monthlyEarnings)} EGP`}
//           loading={earningsLoading}
//         />
//         <StatCard
//           icon="fa-regular fa-credit-card"
//           iconBg="rgba(139,92,246,.1)"
//           iconColor="#7c3aed"
//           label="Total Earnings"
//           value={`${fmt(earnings.totalEarnings)} EGP`}
//           loading={earningsLoading}
//         />
//       </div>

//       {/* ── Charts Row ── */}
//       <div className="row g-4">

//         {/* Revenue Chart */}
//         <div className="col-lg-8">
//           <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
//             <div className="card-header bg-white border-0 pt-4 pb-0 px-4" style={{ borderRadius: "16px 16px 0 0" }}>
//               <div className="d-flex justify-content-between align-items-center">
//                 <h5 className="fw-bold mb-0">Revenue Overview</h5>
//                 {/* Period filter */}
//                 <div className="d-flex gap-1 p-1 rounded-3" style={{ background: "#f1f5f9" }}>
//                   {[
//                     { key: "week",  label: "This Week"  },
//                     { key: "month", label: "This Month" },
//                     { key: "year",  label: "This Year"  },
//                   ].map(({ key, label }) => (
//                     <button
//                       key={key}
//                       className="btn btn-sm px-3 py-1"
//                       style={{
//                         borderRadius: 8,
//                         fontSize: "0.82rem",
//                         fontWeight: 500,
//                         border: "none",
//                         background: selectedPeriod === key ? "#fff" : "transparent",
//                         color: selectedPeriod === key ? "#0f172a" : "#64748b",
//                         boxShadow: selectedPeriod === key ? "0 1px 4px rgba(0,0,0,.08)" : "none",
//                         transition: "all .2s",
//                       }}
//                       onClick={() => setSelectedPeriod(key)}
//                     >
//                       {label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="card-body px-4 pb-4">
//               {earningsLoading ? (
//                 <div className="d-flex align-items-center justify-content-center" style={{ height: 340 }}>
//                   <div className="spinner-border text-primary" />
//                 </div>
//               ) : (
//                 <div style={{ height: 340 }}>
//                   <Line data={revenueChartData} options={revenueOptions} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Service Breakdown */}
//         <div className="col-lg-4">
//           <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 16 }}>
//             <div className="card-body p-4">
//               <h5 className="fw-bold mb-4">Revenue by Service Type</h5>

//               {breakdownLoading ? (
//                 <div className="placeholder-glow">
//                   {[...Array(5)].map((_, i) => (
//                     <div key={i} className="mb-4">
//                       <div className="d-flex justify-content-between mb-1">
//                         <span className="placeholder col-5 rounded" />
//                         <span className="placeholder col-2 rounded" />
//                       </div>
//                       <span className="placeholder col-12 rounded d-block" style={{ height: 8 }} />
//                     </div>
//                   ))}
//                 </div>
//               ) : serviceRows.length === 0 ? (
//                 <div className="text-center py-5 text-muted">
//                   <i className="fa-solid fa-chart-pie fa-2x d-block mb-2 opacity-25" />
//                   <p className="small">No breakdown data available</p>
//                 </div>
//               ) : (
//                 serviceRows.map((item) => (
//                   <ServiceRow
//                     key={item.label}
//                     label={item.label}
//                     count={item.count}
//                     percentage={item.percentage}
//                     color={item.color}
//                   />
//                 ))
//               )}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Reports;





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

const PERIOD_LABELS = {
  week:  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  month: ["W1", "W2", "W3", "W4"],
  year:  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

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
  const [breakdownLoading, setBreakdownLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const [earnings, setEarnings] = useState({
    dailyEarnings:   null,
    weeklyEarnings:  null,
    monthlyEarnings: null,
    totalEarnings:   null,
    // chart arrays keyed by period
    weeklyData:  null,
    monthlyData: null,
    yearlyData:  null,
  });

  const [breakdown, setBreakdown] = useState(null); // raw API object

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

  // ── Derived: chart data for selected period ─
  const chartLabels = PERIOD_LABELS[selectedPeriod];
  const rawChartData = (() => {
    if (selectedPeriod === "week")  return earnings.weeklyData;
    if (selectedPeriod === "month") return earnings.monthlyData;
    return earnings.yearlyData;
  })();

  // Fallback to placeholder zeros matching the label count
  const chartValues = Array.isArray(rawChartData) && rawChartData.length === chartLabels.length
    ? rawChartData
    : chartLabels.map(() => 0);

  const revenueChartData = {
    labels: chartLabels,
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
          label: (ctx) => `${Number(ctx.raw).toLocaleString()} EGP`,
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
          callback: (v) => `$${v}`,
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
        // chart timeseries — accept whatever the API returns, fall back gracefully
        weeklyData:  d.weeklyData  ?? d.WeeklyData  ?? null,
        monthlyData: d.monthlyData ?? d.MonthlyData ?? null,
        yearlyData:  d.yearlyData  ?? d.YearlyData  ?? null,
      });
    } catch (err) {
      console.error("Earnings error:", err);
    } finally {
      setEarningsLoading(false);
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
    fetchBreakdown();
  }, [fetchEarnings, fetchBreakdown]);

  // ── Format helper ───────────────────────────
  const fmt = (v) =>
    v === null || v === undefined
      ? "—"
      : Number(v).toLocaleString("en-EG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // ── Render ──────────────────────────────────
  return (
    <div className="container-fluid p-4 bg-light min-vh-100">

      {/* ── Header ── */}
        <div className="mb-4">
          <h1 className="fw-bold font-monospace fst-italic mb-1">Operations Reports :-</h1>
          <p className="text-muted mb-0">Monitor your team performance and service metrics.</p>
        </div>
        
      {/* ── Stats Cards ── */}
      <div className="row g-3 mb-4">
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
                {/* Period filter */}
                <div className="d-flex gap-1 p-1 rounded-3" style={{ background: "#f1f5f9" }}>
                  {[
                    { key: "week",  label: "This Week"  },
                    { key: "month", label: "This Month" },
                    { key: "year",  label: "This Year"  },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      className="btn btn-sm px-3 py-1"
                      style={{
                        borderRadius: 8,
                        fontSize: "0.82rem",
                        fontWeight: 500,
                        border: "none",
                        background: selectedPeriod === key ? "#fff" : "transparent",
                        color: selectedPeriod === key ? "#0f172a" : "#64748b",
                        boxShadow: selectedPeriod === key ? "0 1px 4px rgba(0,0,0,.08)" : "none",
                        transition: "all .2s",
                      }}
                      onClick={() => setSelectedPeriod(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="card-body px-4 pb-4">
              {earningsLoading ? (
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