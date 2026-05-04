
// import React, { useState, useEffect } from "react";
// import api from "../../../api/axiosInstance";
// import { Badge } from "react-bootstrap";
// import LoadingStyle from "../../../utils/loadingStyle";
// const AllRequests = () => {
//   const [view, setView] = useState("list"); // "list" or "details"
//   const [requests, setRequests] = useState([]);
//   const [filteredRequests, setFilteredRequests] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [loading, setLoading] = useState(true);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [currentStep, setCurrentStep] = useState(0);

//   const steps = ["Pending", "Accepted", "On the way", "Arrived", "Completed"];

//   const statusMap = {
//     1: { label: "Pending", variant: "warning" },
//     2: { label: "Accepted", variant: "info" },
//     3: { label: "On the way", variant: "primary" },
//     4: { label: "Arrived", variant: "success" },
//     5: { label: "Completed", variant: "success" },
//     6: { label: "Cancelled", variant: "danger" },
//   };

//   // جلب كل الطلبات
//   const fetchAllRequests = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/EmergencyRequests/Provider/MyRequests");
//       const data = res.data?.data || res.data || [];
//       setRequests(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Failed to fetch requests:", err);
//       setRequests([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllRequests();
//   }, []);

//   // الفلترة
//   useEffect(() => {
//     let result = [...requests];
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       result = result.filter(req =>
//         req.requestId?.toString().toLowerCase().includes(term) ||
//         req.clientName?.toLowerCase().includes(term) ||
//         (req.requestType || "").toLowerCase().includes(term)
//       );
//     }
//     if (statusFilter !== "All") {
//       result = result.filter(req => req.status === parseInt(statusFilter));
//     }
//     setFilteredRequests(result);
//   }, [searchTerm, statusFilter, requests]);

//   const openRequestDetails = (req) => {
//     setSelectedRequest(req);
//     const stepIndex = [1, 2, 3, 4, 5].indexOf(req.status || 1);
//     setCurrentStep(stepIndex >= 0 ? stepIndex : 0);
//     setView("details");
//   };

//   const handleUpdateStatus = async () => {
//     if (!selectedRequest || currentStep >= steps.length - 1) return;

//     const nextStatus = currentStep + 2;

//     try {
//       await api.patch("/EmergencyRequests/UpdateEmergencyStatus", {
//         requestId: selectedRequest.requestId,
//         newStatus: nextStatus,
//       });

//       alert(`Status updated to: ${steps[currentStep + 1]}`);
//       setCurrentStep(currentStep + 1);
//       fetchAllRequests(); // refresh list
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update status");
//     }
//   };

//   const getStatusBadge = (status) => {
//     const s = statusMap[status] || { label: status , variant: "primary" };
//     return <Badge bg={s.variant} className="px-3 py-2">{s.label}</Badge>;
//   };

//   // ==================== List View ====================
//   const renderList = () => (
//     <div className="container-fluid p-4 bg-light min-vh-100">
//         <div className="mb-4">
//           <h1 className="h3 fw-bold mb-1">All Emergency Requests</h1>
//           <p className="text-muted mb-0 fs-6">Manage and track all past and present service requests.</p>
//         </div>

//       {/* Filters */}
//       <div className="card border-0 shadow-sm mb-4">
//         <div className="card-body">
//           <div className="row g-3 align-items-center">
//             <div className="col-lg-5">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search by ID, customer, or type..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="col-lg-3">
//               <select
//                 className="form-select"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="All">Status: All</option>
//                 <option value="1">Pending</option>
//                 <option value="2">Accepted</option>
//                 <option value="3">On the way</option>
//                 <option value="4">Arrived</option>
//                 <option value="5">Completed</option>
//                 <option value="6">Cancelled</option>
//               </select>
//             </div>
//             <div className="col-lg-4 text-lg-end">
//               <button className="btn btn-outline-secondary">Last 30 Days</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="card border-0 shadow-sm">
//         <div className="table-responsive">
//           <table className="table table-hover align-middle mb-0">
//             <thead className="table-light">
//               <tr>
//                 <th>Request ID</th>
//                 <th>Customer & Car</th>
//                 <th>Emergency Type</th>
//                 <th>Location</th>
//                 <th>Status</th>
//                 <th>Assigned Tech</th>
//                 <th>Time</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <div>
//                   <LoadingStyle />
//                   <tr><td colSpan="8" className="text-center py-5">Loading requests...</td></tr>
//                 </div>

//               ) : filteredRequests.length === 0 ? (
//                 <tr><td colSpan="8" className="text-center py-5 text-muted">No requests found</td></tr>
//               ) : (
//                 filteredRequests.map((req) => (
//                   <tr key={req.requestId}>
//                     <td><strong className="text-primary">REQ-{req.requestId}</strong></td>
//                     <td>
//                       <strong>{req.clientName}</strong>
//                       <div className="text-muted small">{req.vehicleDetails}</div>
//                     </td>
//                     <td>{req.requestType}</td>
//                     <td className="text-muted">{req.manualAddress}</td>
//                     <td>{getStatusBadge(req.status)}</td>
//                     <td className="text-muted">{req.technicianName || "Unassigned"}</td>
//                     <td className="text-muted">
//                       {req.createdAt ? new Date(req.createdAt).toLocaleString() : "—"}
//                     </td>
//                     <td>
//                       <button
//                         className="btn btn-link text-primary p-0 fw-medium"
//                         onClick={() => openRequestDetails(req)}
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   // ==================== Details View (نفس تصميم emergencyRequests) ====================
//   const renderDetails = () => (
//     <div className="container py-5">
//       <button
//         className="btn btn-light bg-info fs-5 mb-4 fst-italic fw-bold"
//         onClick={() => setView("list")}
//       >
//         <i className="fa-solid fa-left-long me-2" />
//         Back to All Requests
//       </button>

//       <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
//         <h4 className="fw-bold mb-4">Request Progress</h4>

//         {/* Timeline */}
//         <div className="d-flex justify-content-between position-relative mb-5">
//           <div className="position-absolute top-50 start-0 end-0 translate-middle-y" style={{ height: "2px", background: "#e0e0e0", zIndex: 0 }}></div>
//           <div className="position-absolute top-50 start-0 translate-middle-y"
//             style={{ height: "2px", background: "#0d6efd", zIndex: 0, width: `${(currentStep / (steps.length - 1)) * 100}%`, transition: "0.3s" }}>
//           </div>

//           {steps.map((s, index) => (
//             <div key={index} className="text-center position-relative" style={{ zIndex: 1 }}>
//               <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2`}
//                 style={{
//                   width: "30px", height: "30px",
//                   background: index <= currentStep ? "#0d6efd" : "#fff",
//                   border: `2px solid ${index <= currentStep ? "#0d6efd" : "#e0e0e0"}`,
//                   color: index <= currentStep ? "#fff" : "#000",
//                   fontSize: "12px",
//                 }}
//               >
//                 {index < currentStep ? "✓" : index + 1}
//               </div>
//               <small className={`fw-bold ${index <= currentStep ? "text-primary" : "text-muted"}`}>{s}</small>
//             </div>
//           ))}
//         </div>

//         {currentStep < steps.length - 1 && (
//           <button className="btn btn-primary d-block mx-auto px-5" onClick={handleUpdateStatus}>
//             Update Status to: <strong>{steps[currentStep + 1]}</strong>
//           </button>
//         )}
//       </div>

//       <div className="row g-4 mt-2">
//         <div className="col-md-8">
//           <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
//             <div className="map-placeholder bg-light position-relative" style={{ height: "350px" }}>
//               <div className="d-flex align-items-center justify-content-center h-100">
//                 <i className="fa-solid fa-map-location-dot fa-3x text-muted opacity-25"></i>
//                 <p className="position-absolute bottom-0 start-0 m-3 fw-bold">
//                   <i className="fa-solid fa-location-dot text-primary me-2"></i>
//                   {selectedRequest?.manualAddress || "New Cairo, Cairo"}
//                 </p>
//                 <button className="btn btn-white shadow-sm position-absolute bottom-0 end-0 m-3 border rounded-pill px-3">
//                   <i className="fa-solid fa-location-arrow me-2 text-primary"></i> Start Navigation
//                 </button>
//               </div>
//             </div>

//             <div className="card-body bg-white border-top">
//               <div className="row text-center">
//                 <div className="col-6 border-end text-start">
//                   <small className="text-muted d-block">Vehicle</small>
//                   <span className="fw-bold">{selectedRequest?.vehicleDetails}</span>
//                 </div>
//                 <div className="col-6 text-start ps-4">
//                   <small className="text-muted d-block">Customer</small>
//                   <span className="fw-bold">{selectedRequest?.clientName}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
//             <h6 className="fw-bold mb-3">
//               <i className="fa-solid fa-user-gear me-2 text-primary"></i> Assigned Technician
//             </h6>
//             <select className="form-select mb-3 border-light bg-light">
//               <option>Select a technician...</option>
//             </select>
//             <button className="btn btn-primary w-100 rounded-3 py-2">Assign</button>
//           </div>

//           <div className="card border-0 shadow-sm rounded-4 p-3">
//             <h6 className="fw-bold mb-3">Service Handling</h6>
//             <label className="small text-muted mb-2">Internal Notes</label>
//             <textarea
//               className="form-control border-light bg-light rounded-3"
//               rows="4"
//               placeholder="Add internal notes about the service..."
//             ></textarea>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return view === "list" ? renderList() : renderDetails();
// };

// export default AllRequests;




import { useState, useEffect, useCallback, useMemo } from "react";
import api from "../../../api/axiosInstance";

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

const STATUS_TO_STEP = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 4 };
const STEPS = ["Pending", "Accepted", "On the way", "Arrived", "Completed"];

/* ─────────────────────────────────────────────
   Shared Sub-components
───────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const s = STATUS_MAP[status] || { label: String(status || "Unknown"), variant: "secondary", textDark: false };
  return (
    <span
      className={`badge bg-${s.variant}${s.textDark ? " text-dark" : ""} px-3 py-2`}
      style={{ borderRadius: 20, fontSize: "0.78rem", fontWeight: 600 }}
    >
      {s.label}
    </span>
  );
};

const fmt = (v, d = 2) =>
  v == null ? "0.00" : Number(v).toFixed(d);

/* ─────────────────────────────────────────────
   Toast system
───────────────────────────────────────────── */
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);
  return { toasts, push };
};

const Toast = ({ toasts }) => (
  <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
    {toasts.map(t => (
      <div
        key={t.id}
        className={`alert alert-${t.type} shadow-lg mb-0 py-2 px-4 d-flex align-items-center gap-2`}
        style={{ borderRadius: 12, minWidth: 260, fontSize: "0.87rem", fontWeight: 500 }}
      >
        <i className={`fas fa-${t.type === "success" ? "check-circle" : t.type === "danger" ? "exclamation-circle" : "info-circle"}`} />
        {t.msg}
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   Invoice Section
───────────────────────────────────────────── */
const InvoiceSection = ({ requestId, toast }) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [newItem, setNewItem] = useState({ itemDescription: "", price: "" });
  const [addingItem, setAddingItem] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchInvoice = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/Invoices/GetInvoiceByEmergencyRequestId/${requestId}`);
      setInvoice(res.data?.data || res.data || null);
    } catch (err) {
      console.error("Invoice error:", err);
      setInvoice(null);
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => { fetchInvoice(); }, [fetchInvoice]);

  const items = invoice?.invoiceDetails ?? invoice?.items ?? [];
  const subtotal = items.reduce((s, i) => s + Number(i.price ?? i.unitPrice ?? 0), 0);
  const tax = subtotal * 0.14;
  const total = subtotal + tax;

  const handleAddItem = async () => {
    if (!newItem.itemDescription.trim() || !newItem.price) return;
    setAddingItem(true);
    try {
      await api.put("/Invoices/AddCustomItemsToInvoice", {
        bookingId: invoice?.invoiceId ?? invoice?.bookingId ?? invoice?.id,
        items: [{ itemDescription: newItem.itemDescription, price: Number(newItem.price) }],
      });
      toast.push("Item added successfully");
      setNewItem({ itemDescription: "", price: "" });
      setShowAddForm(false);
      fetchInvoice();
    } catch {
      toast.push("Failed to add item", "danger");
    } finally {
      setAddingItem(false);
    }
  };

  const handleSaveEdit = async (detailId) => {
    if (!editPrice) return;
    try {
      await api.patch(`/Invoices/updateprice-item-FromInvoice/${detailId}`, Number(editPrice));
      toast.push("Price updated");
      setEditingId(null);
      fetchInvoice();
    } catch {
      toast.push("Failed to update price", "danger");
    }
  };

  const handleDelete = async (detailId) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await api.delete(`/Invoices/Delete-item-FromInvoice/${detailId}`);
      toast.push("Item removed");
      fetchInvoice();
    } catch {
      toast.push("Failed to delete item", "danger");
    }
  };

  if (loading) return (
    <div className="card border-0 shadow-sm rounded-4 p-4 mt-4 d-flex align-items-center gap-3 flex-row">
      <div className="spinner-border spinner-border-sm text-primary" />
      <span className="text-muted small">Loading invoice...</span>
    </div>
  );

  return (
    <div className="card border-0 shadow-sm rounded-4 mt-4" style={{ overflow: "hidden" }}>

      {/* ── Invoice Header ── */}
      <div className="p-4 d-flex justify-content-between align-items-center"
        style={{ background: "linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%)" }}>
        <div>
          <h5 className="fw-bold text-white mb-1">
            <i className="fa-solid fa-file-invoice me-2" />Service Invoice
          </h5>
          <p className="text-white-50 small mb-0">
            Invoice #{invoice?.invoiceId ?? invoice?.id ?? "—"} · REQ-{requestId}
          </p>
        </div>
        <button
          className="btn btn-sm btn-light fw-semibold px-3"
          style={{ borderRadius: 10 }}
          onClick={() => setShowAddForm(v => !v)}
        >
          <i className={`fa-solid fa-${showAddForm ? "minus" : "plus"} me-1`} />
          {showAddForm ? "Cancel" : "Add Item"}
        </button>
      </div>

      {/* ── Add Item Form ── */}
      {showAddForm && (
        <div className="px-4 py-3 border-bottom" style={{ background: "#f8faff" }}>
          <div className="row g-2 align-items-end">
            <div className="col-6">
              <label className="form-label small fw-semibold mb-1">Description</label>
              <input
                className="form-control form-control-sm"
                placeholder="e.g. Towing Fee"
                value={newItem.itemDescription}
                onChange={e => setNewItem(v => ({ ...v, itemDescription: e.target.value }))}
                style={{ borderRadius: 8 }}
              />
            </div>
            <div className="col-3">
              <label className="form-label small fw-semibold mb-1">Price (EGP)</label>
              <input
                type="number" min="0"
                className="form-control form-control-sm"
                placeholder="0.00"
                value={newItem.price}
                onChange={e => setNewItem(v => ({ ...v, price: e.target.value }))}
                style={{ borderRadius: 8 }}
              />
            </div>
            <div className="col-3">
              <button
                className="btn btn-primary btn-sm w-100 fw-semibold"
                onClick={handleAddItem}
                disabled={addingItem}
                style={{ borderRadius: 8 }}
              >
                {addingItem
                  ? <span className="spinner-border spinner-border-sm" />
                  : <><i className="fa-solid fa-plus me-1" />Add</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Items Table ── */}
      <div className="table-responsive">
        <table className="table align-middle mb-0" style={{ fontSize: "0.88rem" }}>
          <thead style={{ background: "#f8fafc" }}>
            <tr>
              <th className="px-4 py-3 fw-semibold text-muted small">#</th>
              <th className="px-4 py-3 fw-semibold text-muted small">Description</th>
              <th className="px-4 py-3 fw-semibold text-muted small text-end">Price (EGP)</th>
              <th className="px-4 py-3 fw-semibold text-muted small text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-5 text-muted">
                  <i className="fa-solid fa-receipt fa-2x d-block mb-2 opacity-25" />
                  No items on this invoice yet
                </td>
              </tr>
            ) : (
              items.map((item, idx) => {
                const detailId = item.invoiceDetailId ?? item.id ?? idx;
                const isEditing = editingId === detailId;
                return (
                  <tr key={detailId} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td className="px-4 text-muted">{idx + 1}</td>
                    <td className="px-4 fw-medium">{item.itemDescription ?? item.description ?? "—"}</td>
                    <td className="px-4 text-end">
                      {isEditing ? (
                        <input
                          type="number" min="0"
                          className="form-control form-control-sm d-inline-block text-end"
                          style={{ width: 110, borderRadius: 8 }}
                          value={editPrice}
                          onChange={e => setEditPrice(e.target.value)}
                          autoFocus
                        />
                      ) : (
                        <strong>{fmt(item.price ?? item.unitPrice)}</strong>
                      )}
                    </td>
                    <td className="px-4 text-center">
                      {isEditing ? (
                        <div className="d-flex gap-1 justify-content-center">
                          <button className="btn btn-success btn-sm px-3" style={{ borderRadius: 8 }}
                            onClick={() => handleSaveEdit(detailId)}>
                            <i className="fa-solid fa-check" />
                          </button>
                          <button className="btn btn-light btn-sm px-3" style={{ borderRadius: 8 }}
                            onClick={() => setEditingId(null)}>
                            <i className="fa-solid fa-xmark" />
                          </button>
                        </div>
                      ) : (
                        <div className="d-flex gap-1 justify-content-center">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            style={{ borderRadius: 8, width: 32, height: 32, padding: 0 }}
                            title="Edit price"
                            onClick={() => { setEditingId(detailId); setEditPrice(String(item.price ?? item.unitPrice ?? "")); }}
                          >
                            <i className="fa-solid fa-pen fa-xs" />
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            style={{ borderRadius: 8, width: 32, height: 32, padding: 0 }}
                            title="Delete item"
                            onClick={() => handleDelete(detailId)}
                          >
                            <i className="fa-solid fa-trash fa-xs" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Totals ── */}
      <div className="px-4 py-4" style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
        <div className="ms-auto" style={{ maxWidth: 300 }}>
          <div className="d-flex justify-content-between mb-2 text-muted small">
            <span>Subtotal</span><span>{fmt(subtotal)} EGP</span>
          </div>
          <div className="d-flex justify-content-between mb-3 text-muted small">
            <span>VAT (14%)</span><span>{fmt(tax)} EGP</span>
          </div>
          <div className="d-flex justify-content-between fw-bold"
            style={{ fontSize: "1.05rem", borderTop: "2px solid #cbd5e1", paddingTop: 12 }}>
            <span>Total</span>
            <span className="text-primary">{fmt(total)} EGP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Request Details View
───────────────────────────────────────────── */
const RequestDetails = ({ requestId, onBack, toast }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/EmergencyRequests/DetailsRequests/${requestId}`);
      setDetails(res.data?.data || res.data || null);
    } catch (err) {
      console.error("Details error:", err);
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => { fetchDetails(); }, [fetchDetails]);

  const currentStep = STATUS_TO_STEP[details?.status] ?? 0;
  const isTerminal = details?.status === 5 || details?.status === 6;

  const handleUpdateStatus = async () => {
    if (!details || isTerminal) return;
    const nextStatus = (details.status ?? 1) + 1;
    setUpdatingStatus(true);
    try {
      await api.patch("/EmergencyRequests/UpdateEmergencyStatus", {
        requestId: details.requestId,
        newStatus: nextStatus,
      });
      toast.push(`Status updated to: ${STEPS[STATUS_TO_STEP[nextStatus]] ?? "Done"}`);
      fetchDetails();
    } catch {
      toast.push("Failed to update status", "danger");
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" />
        <p className="text-muted">Loading request details...</p>
      </div>
    </div>
  );

  if (!details) return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="text-center">
        <i className="fa-solid fa-circle-exclamation fa-3x text-danger mb-3 d-block" />
        <p className="text-muted mb-3">Failed to load request details.</p>
        <button className="btn btn-outline-primary" onClick={onBack}>← Back</button>
      </div>
    </div>
  );

  // Build Google Maps URL from coords or fallback
  const lat = details.latitude ?? details.lat;
  const lng = details.longitude ?? details.lng;
  const locationURL = lat && lng
    ? `https://www.google.com/maps?q=${lat},${lng}`
    : (details.locationUrl ?? null);

  const infoFields = [
    { icon: "fa-user",                  label: "Customer Name",       value: details.clientName },
    { icon: "fa-car",                   label: "Vehicle Details",      value: details.vehicleDetails },
    { icon: "fa-triangle-exclamation",  label: "Emergency Type",       value: details.requestType },
    { icon: "fa-clock",                 label: "Est. Response Time",
      value: details.estimatedTimeInMinutes ? `${details.estimatedTimeInMinutes} min` : null },
    { icon: "fa-phone",                 label: "Phone Number",
      value: details.phoneNumber ?? details.clientPhone },
    { icon: "fa-user-gear",             label: "Technician",
      value: details.technicianName ?? "Unassigned" },
    { icon: "fa-note-sticky",           label: "Notes",
      value: details.notes ?? details.description },
  ];

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">

      {/* Back */}
      <button
        className="btn btn-light border fw-semibold mb-4 d-flex align-items-center gap-2"
        style={{ borderRadius: 10 }}
        onClick={onBack}
      >
        <i className="fa-solid fa-arrow-left-long" /> Back to All Requests
      </button>

      {/* Title Row */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h3 className="fw-bold mb-1">REQ-{details.requestId}</h3>
          <p className="text-muted small mb-0">
            {details.createdAt
              ? new Date(details.createdAt).toLocaleString("en-EG", { dateStyle: "medium", timeStyle: "short" })
              : "—"}
          </p>
        </div>
        <StatusBadge status={details.status} />
      </div>

      {/* ── Progress Timeline ── */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Request Progress</h5>
          {!isTerminal && (
            <button
              className="btn btn-primary fw-semibold px-4"
              style={{ borderRadius: 10 }}
              onClick={handleUpdateStatus}
              disabled={updatingStatus}
            >
              {updatingStatus
                ? <><span className="spinner-border spinner-border-sm me-2" />Updating...</>
                : <>Move to: <strong className="ms-1">{STEPS[currentStep + 1] ?? "Done"}</strong></>}
            </button>
          )}
        </div>

        <div className="d-flex justify-content-between position-relative">
          {/* Track */}
          <div className="position-absolute top-50 start-0 end-0 translate-middle-y"
            style={{ height: 3, background: "#e2e8f0", zIndex: 0, borderRadius: 99 }} />
          {/* Fill */}
          <div className="position-absolute top-50 start-0 translate-middle-y"
            style={{
              height: 3, background: "#2563eb", borderRadius: 99, zIndex: 0,
              width: `${(currentStep / (STEPS.length - 1)) * 100}%`,
              transition: "width .5s ease",
            }} />
          {STEPS.map((s, i) => (
            <div key={i} className="text-center position-relative" style={{ zIndex: 1, flex: 1 }}>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                style={{
                  width: 34, height: 34, fontSize: 12, fontWeight: 700,
                  background: i <= currentStep ? "#2563eb" : "#fff",
                  border: `3px solid ${i <= currentStep ? "#2563eb" : "#e2e8f0"}`,
                  color: i <= currentStep ? "#fff" : "#94a3b8",
                  boxShadow: i === currentStep ? "0 0 0 5px rgba(37,99,235,.15)" : "none",
                  transition: "all .3s",
                }}
              >
                {i < currentStep
                  ? <i className="fa-solid fa-check" style={{ fontSize: 11 }} />
                  : i + 1}
              </div>
              <small className={`fw-semibold ${i <= currentStep ? "text-primary" : "text-muted"}`}
                style={{ fontSize: "0.73rem" }}>
                {s}
              </small>
            </div>
          ))}
        </div>
      </div>

      {/* ── Request Info Grid ── */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-0">
        <h5 className="fw-bold mb-4">Request Information</h5>
        <div className="row g-4">
          {infoFields.map(({ icon, label, value }) => (
            <div key={label} className="col-md-4 col-sm-6">
              <div className="d-flex align-items-start gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 38, height: 38, background: "rgba(37,99,235,.08)" }}>
                  <i className={`fa-solid ${icon} text-primary`} style={{ fontSize: "0.82rem" }} />
                </div>
                <div>
                  <p className="text-muted small mb-0 fw-medium">{label}</p>
                  <p className="fw-semibold mb-0" style={{ fontSize: "0.9rem" }}>{value ?? "—"}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Location — spans full width */}
          <div className="col-12">
            <div className="d-flex align-items-start gap-3">
              <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: 38, height: 38, background: "rgba(239,68,68,.08)" }}>
                <i className="fa-solid fa-location-dot text-danger" style={{ fontSize: "0.82rem" }} />
              </div>
              <div>
                <p className="text-muted small mb-0 fw-medium">Location</p>
                <p className="fw-semibold mb-1" style={{ fontSize: "0.9rem" }}>
                  {details.manualAddress ?? "—"}
                </p>
                {locationURL ? (
                  <a
                    href={locationURL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-danger"
                    style={{ borderRadius: 8, fontSize: "0.78rem" }}
                  >
                    <i className="fa-solid fa-location-arrow me-1" />
                    Open in Google Maps
                  </a>
                ) : (
                  <span className="text-muted small">No GPS coordinates available</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Invoice ── */}
      <InvoiceSection requestId={requestId} toast={toast} />
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main — AllRequests (List)
───────────────────────────────────────────── */
const AllRequests = () => {
  const toast = useToast();
  const [view, setView] = useState("list");
  const [selectedId, setSelectedId] = useState(null);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("all");

  const fetchAllRequests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/EmergencyRequests/Provider/MyRequests");
      const data = res.data?.data || res.data || [];
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAllRequests(); }, [fetchAllRequests]);

  // ── Memoised filtering ───────────────────────
  const filteredRequests = useMemo(() => {
    const now = Date.now();
    const term = searchTerm.toLowerCase().trim();
    const DAY = 86_400_000;

    return requests.filter(req => {
      if (term && !(
        req.requestId?.toString().includes(term) ||
        req.clientName?.toLowerCase().includes(term) ||
        (req.requestType ?? "").toLowerCase().includes(term) ||
        (req.manualAddress ?? "").toLowerCase().includes(term)
      )) return false;

      if (statusFilter !== "All" && req.status !== parseInt(statusFilter)) return false;

      if (dateFilter !== "all" && req.createdAt) {
        const diff = now - new Date(req.createdAt).getTime();
        if (dateFilter === "day"   && diff > DAY)       return false;
        if (dateFilter === "week"  && diff > 7  * DAY)  return false;
        if (dateFilter === "month" && diff > 30 * DAY)  return false;
      }

      return true;
    });
  }, [requests, searchTerm, statusFilter, dateFilter]);

  // ── Details view ─────────────────────────────
  if (view === "details") {
    return (
      <>
        <Toast toasts={toast.toasts} />
        <RequestDetails
          requestId={selectedId}
          onBack={() => { setView("list"); fetchAllRequests(); }}
          toast={toast}
        />
      </>
    );
  }

  // ── List view ─────────────────────────────────
  return (
    <>
      <Toast toasts={toast.toasts} />
      <div className="container-fluid p-4 bg-light min-vh-100">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 className="fw-bold mb-1">All Emergency Requests</h2>
            <p className="text-muted small mb-0">Manage and track all past and present service requests.</p>
          </div>
          <button
            className="btn border bg-white shadow-sm d-flex align-items-center gap-2 fw-medium"
            style={{ borderRadius: 10 }}
            onClick={fetchAllRequests}
          >
            <i className="fa-solid fa-rotate-right text-primary" /> Refresh
          </button>
        </div>

        {/* ── Filters Bar ── */}
        <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: 14 }}>
          <div className="card-body py-3 px-4">
            <div className="row g-3 align-items-center">

              {/* Search */}
              <div className="col-lg-4">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted">
                    <i className="fa-solid fa-magnifying-glass fa-sm" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 ps-0"
                    placeholder="Search ID, customer, type, location..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ borderRadius: "0 10px 10px 0" }}
                  />
                </div>
              </div>

              {/* Status */}
              <div className="col-lg-3">
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  style={{ borderRadius: 10 }}
                >
                  <option value="All">All Statuses</option>
                  {Object.entries(STATUS_MAP).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>

              {/* Date Pills */}
              <div className="col-lg-3">
                <div className="d-flex gap-1 p-1 rounded-3" style={{ background: "#f1f5f9" }}>
                  {[
                    { key: "all", label: "All" },
                    { key: "day", label: "Today" },
                    { key: "week", label: "Week" },
                    { key: "month", label: "Month" },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      className="btn btn-sm flex-fill"
                      style={{
                        borderRadius: 8, fontSize: "0.78rem", fontWeight: 600, border: "none",
                        background: dateFilter === key ? "#fff" : "transparent",
                        color: dateFilter === key ? "#1e293b" : "#94a3b8",
                        boxShadow: dateFilter === key ? "0 1px 4px rgba(0,0,0,.08)" : "none",
                        transition: "all .2s",
                      }}
                      onClick={() => setDateFilter(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Count */}
              <div className="col-lg-2 text-lg-end">
                <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold">
                  {filteredRequests.length} result{filteredRequests.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="card border-0 shadow-sm" style={{ borderRadius: 14 }}>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.88rem" }}>
              <thead style={{ background: "#f8fafc" }}>
                <tr>
                  {["Request ID", "Customer & Car", "Emergency Type", "Location", "Status", "Technician", "Time", "Action"].map(h => (
                    <th key={h} className="px-4 py-3 small fw-semibold text-muted"
                      style={{ border: "none", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      {[...Array(8)].map((__, j) => (
                        <td key={j} className="px-4 py-3">
                          <span className="placeholder col-8 rounded" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-5 text-muted">
                      <i className="fa-solid fa-inbox fa-2x d-block mb-2 opacity-25" />
                      No requests match your filters
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map(req => {
                    const lat = req.latitude ?? req.lat;
                    const lng = req.longitude ?? req.lng;
                    const mapUrl = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : null;

                    return (
                      <tr key={req.requestId}>
                        <td className="px-4 py-3">
                          <strong className="text-primary">REQ-{req.requestId}</strong>
                        </td>
                        <td className="px-4 py-3">
                          <span className="fw-semibold d-block">{req.clientName}</span>
                          <span className="text-muted small">{req.vehicleDetails}</span>
                        </td>
                        <td className="px-4 py-3">{req.requestType ?? "—"}</td>
                        <td className="px-4 py-3">
                          {mapUrl ? (
                            <a
                              href={mapUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary small fw-medium text-decoration-none d-flex align-items-center gap-1"
                            >
                              <i className="fa-solid fa-location-dot" /> Open Location
                            </a>
                          ) : (
                            <span className="text-muted small">{req.manualAddress ?? "—"}</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={req.status} />
                        </td>
                        <td className="px-4 py-3 text-muted small">
                          {req.technicianName ?? "Unassigned"}
                        </td>
                        <td className="px-4 py-3 text-muted small" style={{ whiteSpace: "nowrap" }}>
                          {req.createdAt
                            ? new Date(req.createdAt).toLocaleString("en-EG", {
                                month: "short", day: "numeric",
                                hour: "2-digit", minute: "2-digit",
                              })
                            : "—"}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            className="btn btn-sm btn-outline-primary fw-semibold"
                            style={{ borderRadius: 8, fontSize: "0.78rem" }}
                            onClick={() => { setSelectedId(req.requestId); setView("details"); }}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllRequests;