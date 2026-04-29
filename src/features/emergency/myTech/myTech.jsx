import React, { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import LoadingStyle from "../../../utils/loadingStyle"
const MyTech = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    isAvailable: true,
  });

  const [editingTechnicianId, setEditingTechnicianId] = useState(null);

  // Fetch Technicians
  const fetchTechnicians = async () => {
    setLoading(true);
    try {
      // جرب الـ endpoint اللي شغال عندك
      const res = await api.get("/Technician/my-technicians");
      const data = res.data?.data || res.data || [];
      setTechnicians(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch technicians:", err);
      setTechnicians([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phoneNumber) {
      alert("Name and Phone Number are required");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      isAvailable: formData.isAvailable,
    };

    try {
      if (editingTechnicianId) {
        await api.put(`/Technician/update-technician/${editingTechnicianId}`, payload);
        alert("Technician updated successfully");
      } else {
        await api.post("/Technician/add-technician", payload);
        alert("Technician added successfully");
      }

      setShowAddModal(false);
      fetchTechnicians();
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to save technician: " + (err.response?.data?.message || err.message));
    }
  };

  const resetForm = () => {
    setFormData({ name: "", phoneNumber: "", isAvailable: true });
    setEditingTechnicianId(null);
  };

  const handleEdit = (tech) => {
    setEditingTechnicianId(tech.technicianId || tech.id);
    setFormData({
      name: tech.name || "",
      phoneNumber: tech.phoneNumber || "",
      isAvailable: tech.isAvailable !== false,
    });
    setShowAddModal(true);
  };

  const handleDelete = async (technicianId) => {
    if (!window.confirm("Are you sure you want to delete this technician?")) return;

    try {
      await api.delete(`/Technician/delete-technician/${technicianId}`);
      alert("Technician deleted successfully");
      fetchTechnicians();
    } catch (err) {
      alert("Failed to delete technician");
      console.error(err);
    }
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Technicians</h2>
        <button 
          className="btn btn-dark px-4 py-2"
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
        >
          <i className="fas fa-plus"></i> Add New Technician
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <div>
                  <LoadingStyle/>
                <tr><td colSpan="4" className="text-center py-5">Loading technicians...</td></tr>
                </div>
              ) : technicians.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-5 text-muted">No technicians yet</td></tr>
              ) : (
                technicians.map((tech) => (
                  <tr key={tech.technicianId || tech.id}>
                    <td className="fw-semibold">{tech.name}</td>
                    <td>{tech.phoneNumber}</td>
                    <td>
                      <Badge bg={tech.isAvailable ? "success" : "secondary"}>
                        {tech.isAvailable ? "Available" : "Not Available"}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <button 
                        className="btn btn-sm btn-link text-primary me-2"
                        onClick={() => handleEdit(tech)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-link text-danger"
                        onClick={() => handleDelete(tech.technicianId || tech.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingTechnicianId ? "Edit Technician" : "Add New Technician"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ali Mohamad"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="01026831743"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check 
                type="checkbox" 
                label="Available" 
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleSubmit}>
            {editingTechnicianId ? "Update" : "Add"} Technician
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyTech;