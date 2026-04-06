import React, { useState, useEffect } from "react";
import api from "../../api/axiosInstance";
import "./services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    serviceName: "",
    price: "",
    description: "",
  });
  const [editingServiceName, setEditingServiceName] = useState(null); // ← معرّف التعديل = اسم الخدمة

  // جلب الخدمات
  var fetchServices = async () => {
    try {
      const response = await api.get("/Services/my-list");
      const apiResponse = response.data;

      if (apiResponse?.success && Array.isArray(apiResponse.data)) {
        setServices(apiResponse.data);
      } else {
        console.warn("Unexpected API format:", apiResponse);
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // إضافة أو تعديل
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.serviceName.trim()) {
      alert("service name is required");
      return;
    }

    const payload = {
      serviceName: formData.serviceName.trim(),
      price: Number(formData.price) || 0,
      description: formData.description.trim(),
    };

    try {
      if (editingServiceName) {
        // تعديل باستخدام الاسم كمعرّف
        await api.put(`/Services/update/${editingServiceName}`, payload);
        alert("service has been changed successfully");
      } else {
        await api.post("/Services/create", payload);
        alert("service has been added successfully");
      }

      // ريست الفورم
      setFormData({ serviceName: "", price: "", description: "" });
      setEditingServiceName(null);
      fetchServices(); // تحديث القائمة
    } catch (error) {
      console.error("Error saving service:", error);
      alert(error.response?.data?.message || "an error occured while saving");
    }
  };

  // تجهيز للتعديل
  const handleEditClick = (service) => {
    setEditingServiceName(service.serviceName);
    setFormData({
      serviceName: service.serviceName || "",
      price: service.price ? service.price.toString() : "",
      description: service.description || "",
    });
  };

  // إلغاء التعديل
  const handleCancelEdit = () => {
    setEditingServiceName(null);
    setFormData({ serviceName: "", price: "", description: "" });
  };

  // حذف
  const handleDelete = async (serviceName) => {
    if (!window.confirm(`are you sure you want to delete this service "${serviceName}"?`)) return;

    try {
      await api.delete(`/Services/remove/${serviceName}`);
      fetchServices();
      alert("service has been deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.message || "an error occured while deleting");
    }
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
      <h2 className="mb-4 fw-bold text-dark">Services</h2>

      <div className="row g-4">
        {/* Existing Services */}
        <div className="col-lg-7 col-md-12">
          <div className="bg-white rounded-3 shadow-sm p-4 h-100" style={{ border: "1px solid #eaeaea" }}>
            <h5 className="mb-4 fw-bold">Existing Services</h5>

            <div className="d-flex flex-column gap-3">
              {services.length === 0 ? (
                <p className="text-muted">No services available. Add one!</p>
              ) : (
                services.map((service) => (
                  <div key={service.serviceName} className="p-3 border rounded-3 position-relative">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="m-0 fw-bold">{service.serviceName}</h6>
                      <span className="fw-bold" style={{ color: "#ff4d4f" }}>
                        {Number(service.price || 0).toFixed(2)}L.E
                      </span>
                    </div>
                    <p className="text-muted small mb-3">{service.description || "No description provided"}</p>

                    <div className="d-flex gap-3 border-top pt-2 mt-2">
                      <button
                      disabled
                        onClick={() => handleEditClick(service)}
                        className="btn btn-sm btn-link text-white bg-success text-decoration-none p-1 d-flex align-items-center gap-1"
                      >
                        Edit <i class="fa-solid fa-pen-to-square"></i> (comming soon)
                      </button>
                      <button
                      disabled
                        onClick={() => handleDelete(service.id)}
                        className="btn btn-sm btn-link text-white bg-danger text-decoration-none p-1 d-flex align-items-center gap-1"
                      >
                        Delete <i class="fa-solid fa-trash"></i> (comming soon)
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="col-lg-5 col-md-12">
          <div className="bg-white rounded-3 shadow-sm p-4 sticky-top" style={{ top: "20px", border: "1px solid #eaeaea" }}>
            <h5 className="mb-4 fw-bold">
              {editingServiceName ? "Update Service" : "Add New Service"}
            </h5>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div>
                <label className="form-label small text-muted mb-1">Service Name</label>
                <input
                  type="text"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Transmission Flush"
                  required
                />
              </div>

              <div>
                <label className="form-label small text-muted mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="form-label small text-muted mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Describe what the service includes..."
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="d-flex gap-2 mt-2">
                <button
                  type="submit"
                  className="btn text-white w-100 py-2 fw-semibold"
                  style={{ backgroundColor: "red", border: "none" }}
                >
                  {editingServiceName ? "Save Changes" : "Add Service"}
                </button>

                {editingServiceName && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="btn btn-light py-2 fw-semibold border"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;