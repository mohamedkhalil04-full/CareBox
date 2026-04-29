import React, { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import { Modal, Button, Badge } from "react-bootstrap";
import LoadingStyle from "../../../utils/loadingStyle";
const EmergencyRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [activeTechnicians, setActiveTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch Pending Requests
  const fetchPendingRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get("/EmergencyRequests/pending-requests");
      const data = res.data?.data || res.data || [];
      setPendingRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch pending requests:", err);
      setPendingRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Active Technicians
  const fetchActiveTechnicians = async () => {
    try {
      const res = await api.get("/Technician/my-Active-technicians");
      const data = res.data?.data || res.data || [];
      setActiveTechnicians(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch active technicians:", err);
      setActiveTechnicians([]);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleReject = async (requestId) => {
    if (!window.confirm("Are you sure you want to reject this request?")) return;

    try {
      await api.post(`/EmergencyRequests/Reject/${requestId}`);
      alert("Request rejected successfully");
      fetchPendingRequests(); // Refresh list
    } catch (err) {
      alert("Failed to reject request");
      console.error(err);
    }
  };

  const openAcceptModal = (request) => {
    setSelectedRequest(request);
    setShowAcceptModal(true);
    fetchActiveTechnicians(); // Load technicians when opening modal
  };

  const handleAccept = async (technicianId) => {
    if (!selectedRequest) return;

    try {
      await api.post("/EmergencyRequests/Accept-AcceptRequest", {
        requestId: selectedRequest.requestId,
        technicianId: technicianId,
      });

      alert("Request accepted and assigned successfully!");
      setShowAcceptModal(false);
      fetchPendingRequests(); // Refresh the pending list
    } catch (err) {
      alert("Failed to accept request");
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Incoming Emergency Requests</h2>
        <div className="text-danger small">
          <i className="fa-solid fa-bell me-1"></i> Respond quickly!
        </div>
      </div>

      {loading ? (
        <div>
          <LoadingStyle />
          <div className="text-center py-5">Loading requests...</div>
        </div>
      ) : pendingRequests.length === 0 ? (
        <div className="alert alert-info text-center">No pending requests at the moment.</div>
      ) : (
        pendingRequests.map((req) => (
          <div key={req.requestId} className="card shadow-sm mb-4 border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <Badge bg="warning" className="px-3 py-2">{req.requestTypeName || "Emergency"}</Badge>
                <small className="text-muted">
                  {new Date(req.createdAt).toLocaleString()}
                </small>
              </div>

              <h5 className="fw-bold">{req.clientName}</h5>
              <p className="text-muted mb-1">{req.vehicleDetails}</p>
              <p className="text-muted">
                <i className="fa-solid fa-location-dot me-2"></i>
                {req.manualAddress || req.locationURL}
              </p>

              <div className="mt-4 d-flex gap-3">
                <Button
                  variant="success"
                  className="flex-fill"
                  onClick={() => openAcceptModal(req)}
                >
                  Accept Request
                </Button>
                <Button
                  variant="danger"
                  className="flex-fill"
                  onClick={() => handleReject(req.requestId)}
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Accept Modal - Choose Technician */}
      <Modal show={showAcceptModal} onHide={() => setShowAcceptModal(false)} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Assign Technician</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">
            Choose a technician for request <strong>#{selectedRequest?.requestId}</strong>
          </p>

          {activeTechnicians.length === 0 ? (
            <p className="text-muted">No active technicians available</p>
          ) : (
            activeTechnicians.map((tech) => (
              <div
                key={tech.technicianId}
                className="d-flex justify-content-between align-items-center p-3 border rounded mb-2 cursor-pointer hover-bg-light"
                onClick={() => handleAccept(tech.technicianId)}
              >
                <div>
                  <strong>{tech.name}</strong>
                  <div className="small text-muted">{tech.phoneNumber}</div>
                </div>
                <Button variant="primary" size="sm">Assign</Button>
              </div>
            ))
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmergencyRequests;