// import "./Dashboard.css";

// const EmergencyHome = () => {
//   return (
//     <div className="container-fluid p-4 bg-light min-vh-100">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1 className=" fw-bold font-monospace fst-italic">
//           Dashboard Overview:
//         </h1>
//         <small className="text-muted">Last updated: Just now</small>
//       </div>

//       <div className="row g-3 mb-4">
//         <div className="col-md-3">
//           <div className="card border-0 shadow-sm h-100 hover-card">
//             <div className="card-body">
//               <div className="d-flex align-items-center mb-2">
//                 <div className="bg-info bg-opacity-10 fs-4 text-info p-2 rounded">
//                   <i className="fa-solid fa-triangle-exclamation mx-2 "></i>
//                 </div>
//                 <span className="ms-auto text-success fw-bold">
//                   <i className="fa-solid fa-arrow-trend-up"></i>
//                   +3 vs yesterday
//                 </span>
//               </div>
//               <h6 className="text-muted small">Today's Requests</h6>
//               <h2 className="fw-bold">18</h2>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card border-0 shadow-sm h-100 hover-card">
//             <div className="card-body">
//               <div className="d-flex align-items-center mb-2">
//                 <div className="bg-danger bg-opacity-10 text-danger p-2 rounded">
//                   <i class="fa-solid fa-heart"></i>
//                 </div>
//                 <span className="ms-auto text-success fw-bold">
//                   <i class="fa-solid fa-circle"></i>
//                   Live tracking
//                 </span>
//               </div>
//               <h6 className="text-muted small">Active Now</h6>
//               <h2 className="fw-bold">5</h2>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card border-0 shadow-sm h-100 hover-card">
//             <div className="card-body">
//               <div className="d-flex align-items-center mb-2">
//                 <div className="bg-success bg-opacity-10 text-success p-2 rounded">
//                   <i className="fa-regular fa-circle-check"></i>
//                 </div>
//                 <span className="ms-auto text-success fw-bold">
//                   <i className="fa-solid fa-arrow-trend-up"></i>
//                   +2 vs yesterday
//                 </span>
//               </div>
//               <h6 className="text-muted small">Completed Today</h6>
//               <h2 className="fw-bold">13</h2>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card border-0 shadow-sm h-100 hover-card">
//             <div className="card-body">
//               <div className="d-flex align-items-center mb-2">
//                 <div className="bg-primary bg-opacity-10 text-primary p-2 rounded">
//                   <i className="fa-regular fa-clock"></i>
//                 </div>
//                 <span className="ms-auto text-success fw-bold">
//                   <i className="fa-solid fa-arrow-trend-up"></i>
//                   -0.8 min improvement
//                 </span>
//               </div>
//               <h6 className="text-muted small">Avg Response Time</h6>
//               <h2 className="fw-bold">4.2 min</h2>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row g-3">
//         {/* Recent Requests */}
//         <div className="col-lg-8">
//           <div className="card border-0 shadow-sm">
//             <div className="card-header bg-white d-flex justify-content-between align-items-center p-4">
//               <h5 className="fw-bold ">Recent Requests:</h5>
//               <a href="#" className="text-primary text-decoration-none small">
//                 View all
//               </a>
//             </div>
//             <div className="table-responsive">
//               <table className="table table-hover mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Request ID</th>
//                     <th>Customer</th>
//                     <th>Emergency Type</th>
//                     <th>Status</th>
//                     <th>Time</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>
//                       <strong>REQ-8921</strong>
//                     </td>
//                     <td>Ahmed</td>
//                     <td>Battery Dead</td>
//                     <td>
//                       <span className="badge bg-warning text-dark">
//                         Pending
//                       </span>
//                     </td>
//                     <td className="text-muted">10 mins ago</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <strong>REQ-8920</strong>
//                     </td>
//                     <td>Ziyad</td>
//                     <td>Flat Tire</td>
//                     <td>
//                       <span className="badge bg-success">Completed</span>
//                     </td>
//                     <td className="text-muted">1 hour ago</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <strong>REQ-8919</strong>
//                     </td>
//                     <td>Faisal</td>
//                     <td>Accident</td>
//                     <td>
//                       <span className="badge bg-success">Completed</span>
//                     </td>
//                     <td className="text-muted">3 hours ago</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <strong>REQ-8918</strong>
//                     </td>
//                     <td>Basel</td>
//                     <td>Flat Tire</td>
//                     <td>
//                       <span className="badge bg-warning text-dark">
//                         On the way
//                       </span>
//                     </td>
//                     <td className="text-muted">15 mins ago</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Active Emergencies */}
//         <div className="col-lg-4">
//           <div className="card border-0 shadow-sm h-100">
//             <div className="card-header bg-white d-flex justify-content-between align-items-center">
//               <h5 className="mb-0 d-flex align-items-center fst-italic fs-4 text-danger">
//                 <span className="text-danger me-2">
//                   <i className="fa-solid fa-triangle-exclamation mx-2"></i>
//                 </span>{" "}
//                 Active Emergencies :-
//               </h5>
//               <a href="#" className="text-primary text-decoration-none small">
//                 View all
//               </a>
//             </div>
//             <div className="card-body">
//               {/* Flat Tire */}
//               <div className="border rounded p-3 mb-3">
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <span className="badge text-dark flat-tire fs-6">
//                     Flat Tire
//                   </span>
//                   <small className="text-muted">Just now</small>
//                 </div>
//                 <h6 className="mb-1">Toyota Camry 2018</h6>
//                 <p className="text-muted small mb-2">Obour City, Cairo</p>
//                 <div className="d-flex align-items-center text-primary">
//                   <span className="me-2">
//                     <i className="fa-solid fa-circle"></i>
//                   </span>
//                   <strong>On the way</strong>
//                 </div>
//               </div>

//               {/* Dead Battery */}
//               <div className="border rounded p-3">
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <span className="badge text-dark flat-tire fs-6">
//                     Dead Battery
//                   </span>
//                   <small className="text-muted">2 hours ago</small>
//                 </div>
//                 <h6 className="mb-1">Honda Civic 2015</h6>
//                 <p className="text-muted small mb-2">New Cairo, Cairo</p>
//                 <div className="d-flex align-items-center text-success">
//                   <span className="me-2">
//                     <i className="fa-solid fa-square-check" />
//                   </span>
//                   <strong>Completed</strong>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmergencyHome;





import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";
import "./Dashboard.css";

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const STATUS_MAP = {
  1: { label: "Pending",    variant: "warning",  textDark: true  },
  2: { label: "Accepted",   variant: "info",     textDark: false },
  3: { label: "On the way", variant: "primary",  textDark: false },
  4: { label: "Arrived",    variant: "success",  textDark: false },
  5: { label: "Completed",  variant: "success",  textDark: false },
  6: { label: "Cancelled",  variant: "danger",   textDark: false },
};

// The API returns status as a string ("Arrived", "Pending", etc.).
// This map converts those strings to the numeric keys used by STATUS_MAP.
const STATUS_LABEL_TO_NUM = {
  pending:      1,
  accepted:     2,
  "on the way": 3,
  ontheway:     3,
  arrived:      4,
  completed:    5,
  cancelled:    6,
};

/**
 * Accepts a string ("Arrived") OR a number (4) and always returns
 * the numeric key for STATUS_MAP. Returns null if unrecognised.
 */
const normaliseStatus = (raw) => {
  if (raw == null) return null;
  const n = Number(raw);
  if (!isNaN(n) && n > 0) return n;
  return STATUS_LABEL_TO_NUM[String(raw).toLowerCase().replace(/\s+/g, " ").trim()] ?? null;
};

const EMERGENCY_TYPE_COLORS = {
  "Flat Tire":     { bg: "#fff7ed", color: "#c2410c" },
  "Dead Battery":  { bg: "#fef9c3", color: "#a16207" },
  "Accident":      { bg: "#fee2e2", color: "#b91c1c" },
  "Out of Fuel":   { bg: "#f0fdf4", color: "#15803d" },
  "Engine Issue":  { bg: "#eff6ff", color: "#1d4ed8" },
};

const DEFAULT_TYPE_STYLE = { bg: "#f1f5f9", color: "#475569" };

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

/** Stat Card */
const StatCard = ({ icon, iconBg, iconColor, label, value, badge, badgeIcon, badgeClass, loading }) => (
  <div className="col-md-3 col-sm-6">
    <div className="card border-0 shadow-sm h-100 hover-card" style={{ borderRadius: 16 }}>
      <div className="card-body p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{ width: 44, height: 44, background: iconBg }}
          >
            <i className={`${icon} fs-5`} style={{ color: iconColor }} />
          </div>
          {badge && (
            <span className={`small fw-semibold d-flex align-items-center gap-1 ${badgeClass}`}>
              <i className={badgeIcon} />
              {badge}
            </span>
          )}
        </div>
        <p className="text-muted small mb-1 fw-medium">{label}</p>
        {loading ? (
          <div className="placeholder-glow">
            <span className="placeholder col-5 rounded" style={{ height: 32 }} />
          </div>
        ) : (
          <h2 className="fw-bold mb-0" style={{ fontSize: "1.9rem", letterSpacing: "-1px" }}>
            {value ?? "—"}
          </h2>
        )}
      </div>
    </div>
  </div>
);

/** Status Badge — normalises string or numeric status to the correct colour */
const StatusBadge = ({ status }) => {
  const key = normaliseStatus(status);
  const s   = STATUS_MAP[key] ?? { label: String(status ?? "Unknown"), variant: "secondary", textDark: false };
  return (
    <span className={`badge bg-${s.variant}${s.textDark ? " text-dark" : ""} px-3 py-2`}
      style={{ borderRadius: 20, fontSize: "0.75rem" }}>
      {s.label}
    </span>
  );
};

/** Emergency Type Pill */
const TypePill = ({ type }) => {
  const style = EMERGENCY_TYPE_COLORS[type] || DEFAULT_TYPE_STYLE;
  return (
    <span className="badge fw-medium px-3 py-2"
      style={{ background: style.bg, color: style.color, borderRadius: 20, fontSize: "0.78rem" }}>
      {type || "Unknown"}
    </span>
  );
};

/** Active Emergency Card (right panel) */
const ActiveEmergencyCard = ({ req }) => {
  const numStatus   = normaliseStatus(req.status);
  const isCompleted = numStatus === 5;
  const isOnTheWay  = numStatus === 3;
  // const typeStyle   = EMERGENCY_TYPE_COLORS[req.requestType] || DEFAULT_TYPE_STYLE;

  return (
    <div className="border rounded-3 p-3 mb-3" style={{ background: "#fff", transition: "box-shadow .2s" }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = ""}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <TypePill type={req.requestType} />
        <small className="text-muted d-flex align-items-center gap-1">
          <i className="fa-regular fa-clock" style={{ fontSize: "0.7rem" }} />
          {req.createdAt ? new Date(req.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Just now"}
        </small>
      </div>
      <h6 className="fw-bold mb-1">{req.vehicleDetails || "Vehicle"}</h6>
      {isOnTheWay && (
        <div className="d-flex align-items-center gap-2 text-primary small fw-semibold">
          <span className="rounded-circle"
            style={{ width: 8, height: 8, background: "#3b82f6", display: "inline-block" }} />
          On the way
        </div>
      )}
      {isCompleted && (
        <div className="d-flex align-items-center gap-2 text-success small fw-semibold">
          <i className="fa-solid fa-circle-check" />
          Completed
        </div>
      )}
      {!isOnTheWay && !isCompleted && (
        <div className="d-flex align-items-center gap-2 small fw-semibold"
          style={{ color: STATUS_MAP[numStatus]?.variant === "warning" ? "#d97706" : "#6366f1" }}>
          <i className="fa-solid fa-circle-dot" />
          {STATUS_MAP[numStatus]?.label || "Active"}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const EmergencyDashboard = () => {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────
  const [statsLoading, setStatsLoading] = useState(true);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [statsError, setStatsError] = useState(null);

  const [stats, setStats] = useState({
    todayRequestsCount: null,
    activeRequestsCount: null,
    completedRequestsCount: null,
    totalRequestsCount: null,
  });

  const [requests, setRequests] = useState([]);

  // Derived: active emergencies for right panel (statuses 1–4: Pending/Accepted/On the way/Arrived).
  // normaliseStatus handles the API returning strings like "Arrived" instead of numbers.
  const activeEmergencies = requests.filter(r => {
    const n = normaliseStatus(r.status);
    return n !== null && n >= 1 && n <= 4;
  });
  // Recent: last 5 for table
  const recentRequests = requests.slice(0, 5);

  // ── Fetchers ────────────────────────────────

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    setStatsError(null);
    try {
      const res = await api.get("/Dashboard/Provider/EmergencyStats");
      const d = res.data?.data || res.data || {};
      setStats({
        todayRequestsCount:     d.todayRequestsCount     ?? d.TodayRequestsCount     ?? 0,
        activeRequestsCount:    d.activeRequestsCount    ?? d.ActiveRequestsCount    ?? 0,
        completedRequestsCount: d.completedRequestsCount ?? d.CompletedRequestsCount ?? 0,
        totalRequestsCount:     d.totalRequestsCount     ?? d.TotalRequestsCount     ?? 0,
      });
    } catch (err) {
      console.error("EmergencyStats error:", err);
      setStatsError("Failed to load stats");
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchRequests = useCallback(async () => {
    setRequestsLoading(true);
    try {
      const res = await api.get("/EmergencyRequests/Provider/MyRequests");
      const data = res.data?.data || res.data || [];
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Requests error:", err);
      setRequests([]);
    } finally {
      setRequestsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    fetchRequests();
  }, [fetchStats, fetchRequests]);

  // ── Render ──────────────────────────────────
  return (
    <div className="container-fluid bg-light min-vh-100">

      {/* ── Header ── */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h1 className="fw-bold font-monospace fst-italic mb-0">
          Dashboard Overview:
        </h1>
        <div className="d-flex align-items-center gap-2">
          {statsError && (
            <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill small">
              <i className="fa-solid fa-circle-exclamation me-1" />
              {statsError}
            </span>
          )}
          <small className="text-muted">
            <i className="fa-regular fa-clock me-1 opacity-50" />
            Last updated: Just now
          </small>
          <button
            className="btn btn-sm btn-light rounded-pill border px-3"
            onClick={() => { fetchStats(); fetchRequests(); }}
            title="Refresh"
          >
            <i className="fa-solid fa-rotate-right" />
          </button>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="row g-3 mb-4">
        <StatCard
          icon="fa-solid fa-triangle-exclamation"
          iconBg="rgba(14,165,233,.1)"
          iconColor="#0ea5e9"
          label="Today's Requests"
          value={stats.todayRequestsCount}
          badge="+3 vs yesterday"
          badgeIcon="fa-solid fa-arrow-trend-up"
          badgeClass="text-success"
          loading={statsLoading}
        />
        <StatCard
          icon="fa-solid fa-heart-pulse"
          iconBg="rgba(239,68,68,.1)"
          iconColor="#ef4444"
          label="Active Now"
          value={stats.activeRequestsCount}
          badge="Live tracking"
          badgeIcon="fa-solid fa-circle"
          badgeClass="text-success"
          loading={statsLoading}
        />
        <StatCard
          icon="fa-regular fa-circle-check"
          iconBg="rgba(34,197,94,.1)"
          iconColor="#22c55e"
          label="Completed Today"
          value={stats.completedRequestsCount}
          badge="+2 vs yesterday"
          badgeIcon="fa-solid fa-arrow-trend-up"
          badgeClass="text-success"
          loading={statsLoading}
        />
        <StatCard
          icon="fa-solid fa-layer-group"
          iconBg="rgba(99,102,241,.1)"
          iconColor="#6366f1"
          label="Total Requests"
          value={stats.totalRequestsCount}
          badge="All time"
          badgeIcon="fa-solid fa-chart-simple"
          badgeClass="text-muted"
          loading={statsLoading}
        />
      </div>

      {/* ── Bottom Row ── */}
      <div className="row g-3">

        {/* Left — Recent Requests Table */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 16 }}>
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center px-4 pt-4 pb-3"
              style={{ borderRadius: "16px 16px 0 0" }}>
              <h5 className="fw-bold mb-0">Recent Requests:</h5>
              <button
                className="btn btn-link text-primary text-decoration-none small fw-medium p-0"
                onClick={() => navigate("/allRequests")}
              >
                View all <i className="fa-solid fa-arrow-right ms-1" style={{ fontSize: "0.75rem" }} />
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-hover mb-0" style={{ borderCollapse: "separate", borderSpacing: "0 4px" }}>
                <thead className="table-light">
                  <tr>
                    {["Request ID", "Customer", "Emergency Type", "Status", "Time"].map(h => (
                      <th key={h} className="small fw-semibold text-muted px-4 py-3"
                        style={{ border: "none", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {requestsLoading ? (
                    [...Array(4)].map((_, i) => (
                      <tr key={i} style={{ background: "#fff" }}>
                        {[...Array(5)].map((__, j) => (
                          <td key={j} className="px-4 py-3">
                            <span className="placeholder col-8 rounded" />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : recentRequests.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-5 text-muted">
                        <i className="fa-solid fa-inbox fa-2x d-block mb-2 opacity-25" />
                        No requests found
                      </td>
                    </tr>
                  ) : (
                    recentRequests.map(req => (
                      <tr
                        key={req.requestId}
                        style={{ background: "#fff", cursor: "pointer", transition: "background .15s" }}
                        onClick={() => navigate("/allRequests")}
                        onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                        onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                      >
                        <td className="px-4 py-3">
                          <strong className="text-primary" style={{ fontSize: "0.9rem" }}>
                            REQ-{req.requestId}
                          </strong>
                        </td>
                        <td className="px-4 py-3">{req.clientName || "—"}</td>
                        <td className="px-4 py-3">{req.requestType || "—"}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={req.status} />
                        </td>
                        <td className="px-4 py-3 text-muted small">
                          {req.createdAt
                            ? new Date(req.createdAt).toLocaleString("en-EG", {
                                hour: "2-digit", minute: "2-digit",
                                month: "short", day: "numeric"
                              })
                            : "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right — Active Emergencies Cards */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 16 }}>
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center px-4 pt-4 pb-3"
              style={{ borderRadius: "16px 16px 0 0" }}>
              <h5 className="mb-0 d-flex align-items-center gap-2 text-danger fw-bold fst-italic">
                <i className="fa-solid fa-triangle-exclamation" />
                Active Emergencies:
              </h5>
              <button
                className="btn btn-link text-primary text-decoration-none small fw-medium p-0"
                onClick={() => navigate("/allRequests")}
              >
                View all <i className="fa-solid fa-arrow-right ms-1" style={{ fontSize: "0.75rem" }} />
              </button>
            </div>

            <div className="card-body px-4 pb-4 pt-2" style={{ overflowY: "auto", maxHeight: 480 }}>
              {requestsLoading ? (
                [...Array(2)].map((_, i) => (
                  <div key={i} className="border rounded-3 p-3 mb-3 placeholder-glow">
                    <span className="placeholder col-4 rounded mb-2 d-block" />
                    <span className="placeholder col-7 rounded mb-1 d-block" />
                    <span className="placeholder col-5 rounded d-block" />
                  </div>
                ))
              ) : activeEmergencies.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <i className="fa-solid fa-shield-check fa-2x d-block mb-2 opacity-25 text-success" />
                  <p className="small mb-0">No active emergencies right now</p>
                </div>
              ) : (
                activeEmergencies.map(req => (
                  <ActiveEmergencyCard key={req.requestId} req={req} />
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmergencyDashboard;
