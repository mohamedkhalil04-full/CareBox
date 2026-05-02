
import React, { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import { Badge } from "react-bootstrap";
import LoadingStyle from "../../../utils/loadingStyle";
const AllRequests = () => {
  const [view, setView] = useState("list"); // "list" or "details"
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ["Pending", "Accepted", "On the way", "Arrived", "Completed"];

  const statusMap = {
    1: { label: "Pending", variant: "warning" },
    2: { label: "Accepted", variant: "info" },
    3: { label: "On the way", variant: "primary" },
    4: { label: "Arrived", variant: "success" },
    5: { label: "Completed", variant: "success" },
    6: { label: "Cancelled", variant: "danger" },
  };

  // جلب كل الطلبات
  const fetchAllRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get("/EmergencyRequests/Provider/MyRequests");
      const data = res.data?.data || res.data || [];
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  // الفلترة
  useEffect(() => {
    let result = [...requests];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(req =>
        req.requestId?.toString().toLowerCase().includes(term) ||
        req.clientName?.toLowerCase().includes(term) ||
        (req.requestType || "").toLowerCase().includes(term)
      );
    }
    if (statusFilter !== "All") {
      result = result.filter(req => req.status === parseInt(statusFilter));
    }
    setFilteredRequests(result);
  }, [searchTerm, statusFilter, requests]);

  const openRequestDetails = (req) => {
    setSelectedRequest(req);
    const stepIndex = [1, 2, 3, 4, 5].indexOf(req.status || 1);
    setCurrentStep(stepIndex >= 0 ? stepIndex : 0);
    setView("details");
  };

  const handleUpdateStatus = async () => {
    if (!selectedRequest || currentStep >= steps.length - 1) return;

    const nextStatus = currentStep + 2;

    try {
      await api.patch("/EmergencyRequests/UpdateEmergencyStatus", {
        requestId: selectedRequest.requestId,
        newStatus: nextStatus,
      });

      alert(`Status updated to: ${steps[currentStep + 1]}`);
      setCurrentStep(currentStep + 1);
      fetchAllRequests(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const getStatusBadge = (status) => {
    const s = statusMap[status] || { label: status , variant: "primary" };
    return <Badge bg={s.variant} className="px-3 py-2">{s.label}</Badge>;
  };

  // ==================== List View ====================
  const renderList = () => (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">All Emergency Requests</h1>
          <p className="text-muted mb-0 fs-6">Manage and track all past and present service requests.</p>
        </div>
        <button className="btn btn-outline-dark d-flex align-items-center gap-2">
          <i className="fa-solid fa-download"></i> Export
        </button>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-lg-5">
              <input
                type="text"
                className="form-control"
                placeholder="Search by ID, customer, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-lg-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">Status: All</option>
                <option value="1">Pending</option>
                <option value="2">Accepted</option>
                <option value="3">On the way</option>
                <option value="4">Arrived</option>
                <option value="5">Completed</option>
                <option value="6">Cancelled</option>
              </select>
            </div>
            <div className="col-lg-4 text-lg-end">
              <button className="btn btn-outline-secondary">Last 30 Days</button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Request ID</th>
                <th>Customer & Car</th>
                <th>Emergency Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Assigned Tech</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <div>
                  <LoadingStyle />
                  <tr><td colSpan="8" className="text-center py-5">Loading requests...</td></tr>
                </div>

              ) : filteredRequests.length === 0 ? (
                <tr><td colSpan="8" className="text-center py-5 text-muted">No requests found</td></tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.requestId}>
                    <td><strong className="text-primary">REQ-{req.requestId}</strong></td>
                    <td>
                      <strong>{req.clientName}</strong>
                      <div className="text-muted small">{req.vehicleDetails}</div>
                    </td>
                    <td>{req.requestType}</td>
                    <td className="text-muted">{req.manualAddress}</td>
                    <td>{getStatusBadge(req.status)}</td>
                    <td className="text-muted">{req.technicianName || "Unassigned"}</td>
                    <td className="text-muted">
                      {req.createdAt ? new Date(req.createdAt).toLocaleString() : "—"}
                    </td>
                    <td>
                      <button
                        className="btn btn-link text-primary p-0 fw-medium"
                        onClick={() => openRequestDetails(req)}
                      >
                        View
                      </button>
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

  // ==================== Details View (نفس تصميم emergencyRequests) ====================
  const renderDetails = () => (
    <div className="container py-5">
      <button
        className="btn btn-light bg-info fs-5 mb-4 fst-italic fw-bold"
        onClick={() => setView("list")}
      >
        <i className="fa-solid fa-left-long me-2" />
        Back to All Requests
      </button>

      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
        <h4 className="fw-bold mb-4">Request Progress</h4>

        {/* Timeline */}
        <div className="d-flex justify-content-between position-relative mb-5">
          <div className="position-absolute top-50 start-0 end-0 translate-middle-y" style={{ height: "2px", background: "#e0e0e0", zIndex: 0 }}></div>
          <div className="position-absolute top-50 start-0 translate-middle-y"
            style={{ height: "2px", background: "#0d6efd", zIndex: 0, width: `${(currentStep / (steps.length - 1)) * 100}%`, transition: "0.3s" }}>
          </div>

          {steps.map((s, index) => (
            <div key={index} className="text-center position-relative" style={{ zIndex: 1 }}>
              <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2`}
                style={{
                  width: "30px", height: "30px",
                  background: index <= currentStep ? "#0d6efd" : "#fff",
                  border: `2px solid ${index <= currentStep ? "#0d6efd" : "#e0e0e0"}`,
                  color: index <= currentStep ? "#fff" : "#000",
                  fontSize: "12px",
                }}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>
              <small className={`fw-bold ${index <= currentStep ? "text-primary" : "text-muted"}`}>{s}</small>
            </div>
          ))}
        </div>

        {currentStep < steps.length - 1 && (
          <button className="btn btn-primary d-block mx-auto px-5" onClick={handleUpdateStatus}>
            Update Status to: <strong>{steps[currentStep + 1]}</strong>
          </button>
        )}
      </div>

      <div className="row g-4 mt-2">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="map-placeholder bg-light position-relative" style={{ height: "350px" }}>
              <div className="d-flex align-items-center justify-content-center h-100">
                <i className="fa-solid fa-map-location-dot fa-3x text-muted opacity-25"></i>
                <p className="position-absolute bottom-0 start-0 m-3 fw-bold">
                  <i className="fa-solid fa-location-dot text-primary me-2"></i>
                  {selectedRequest?.manualAddress || "New Cairo, Cairo"}
                </p>
                <button className="btn btn-white shadow-sm position-absolute bottom-0 end-0 m-3 border rounded-pill px-3">
                  <i className="fa-solid fa-location-arrow me-2 text-primary"></i> Start Navigation
                </button>
              </div>
            </div>

            <div className="card-body bg-white border-top">
              <div className="row text-center">
                <div className="col-6 border-end text-start">
                  <small className="text-muted d-block">Vehicle</small>
                  <span className="fw-bold">{selectedRequest?.vehicleDetails}</span>
                </div>
                <div className="col-6 text-start ps-4">
                  <small className="text-muted d-block">Customer</small>
                  <span className="fw-bold">{selectedRequest?.clientName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
            <h6 className="fw-bold mb-3">
              <i className="fa-solid fa-user-gear me-2 text-primary"></i> Assigned Technician
            </h6>
            <select className="form-select mb-3 border-light bg-light">
              <option>Select a technician...</option>
            </select>
            <button className="btn btn-primary w-100 rounded-3 py-2">Assign</button>
          </div>

          <div className="card border-0 shadow-sm rounded-4 p-3">
            <h6 className="fw-bold mb-3">Service Handling</h6>
            <label className="small text-muted mb-2">Internal Notes</label>
            <textarea
              className="form-control border-light bg-light rounded-3"
              rows="4"
              placeholder="Add internal notes about the service..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );

  return view === "list" ? renderList() : renderDetails();
};

export default AllRequests;