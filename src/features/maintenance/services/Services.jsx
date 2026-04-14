// خدمات مركز الصيانة

import React, { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";

const MaintenanceServices = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);

    const [serviceType, setServiceType] = useState("no-category"); // "no-category" | "with-category"

    const [formData, setFormData] = useState({
        serviceName: "",
        price: "",
        description: "",
        categoryName: "",        // للكاتيجوري الجديدة أو المختارة
    });

    const [editingServiceName, setEditingServiceName] = useState(null);

    // جلب الخدمات
    const fetchServices = async () => {
        try {
            const response = await api.get("/Services/my-list");
            const apiResponse = response.data;
            setServices(apiResponse?.success && Array.isArray(apiResponse.data) ? apiResponse.data : []);
        } catch (error) {
            console.error("Error fetching services:", error);
            setServices([]);
        }
    };

    // جلب الكاتيجوريز
    var fetchCategories = async () => {
        try {
            const response = await api.get("/Services/my-categories");
            const apiResponse = response.data;

            let cats = [];

            if (apiResponse?.success) {
                cats = apiResponse.data || [];
            } else if (Array.isArray(apiResponse)) {
                cats = apiResponse;
            } else if (apiResponse?.categories) {
                cats = apiResponse.categories;
            }

            setCategories(cats);
        } catch (error) {
            console.warn("Could not fetch categories from /Services/my-categories", error);
            setCategories([]);   // fallback
        }
    };

    useEffect(() => {
        fetchServices();
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.serviceName.trim()) {
            alert("Service name is required");
            return;
        }

        const payload = {
            serviceName: formData.serviceName.trim(),
            price: Number(formData.price) || 0,
            description: formData.description.trim(),
        };

        // إضافة categoryName فقط لو With Category
        if (serviceType === "with-category" && formData.categoryName.trim()) {
            payload.categoryName = formData.categoryName.trim();
        }

        try {
            if (editingServiceName) {
                await api.put(`/Services/update/${editingServiceName}`, payload);
                alert("Service updated successfully");
            } else {
                await api.post("/Services/create", payload);
                alert("Service added successfully");
            }

            // Reset
            setFormData({ serviceName: "", price: "", description: "", categoryName: "" });
            setEditingServiceName(null);
            fetchServices();
            fetchCategories(); // تحديث الكاتيجوريز
        } catch (error) {
            console.error("Error saving service:", error);
            alert(error.response?.data?.message || "An error occurred while saving");
        }
    };

    const handleEditClick = (service) => {
        setEditingServiceName(service.serviceName);
        setFormData({
            serviceName: service.serviceName || "",
            price: service.price ? service.price.toString() : "",
            description: service.description || "",
            categoryName: service.categoryName || "",
        });
        setServiceType(service.categoryName ? "with-category" : "no-category");
    };

    const handleCancelEdit = () => {
        setEditingServiceName(null);
        setFormData({ serviceName: "", price: "", description: "", categoryName: "" });
    };

    return (
        <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
            <h2 className="mb-4 fw-bold text-dark">Services</h2>

            <div className="row g-4">
                {/* Existing Services */}
                <div className="col-lg-7 col-md-12">
                    <div className="bg-white rounded-3 shadow-sm p-4 h-100">
                        <h5 className="mb-4 fw-bold">Existing Services</h5>

                        <div className="d-flex flex-column gap-3">
                            {services.length === 0 ? (
                                <p className="text-muted">No services available yet.</p>
                            ) : (
                                services.map((service) => (
                                    <div key={service.serviceName} className="p-3 border rounded-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="fw-bold mb-1">{service.serviceName}</h6>
                                                {service.categoryName && (
                                                    <small className="text-danger">Category:{service.categoryName}</small>
                                                )}
                                            </div>
                                            <span className="fw-bold text-danger">
                                                {Number(service.price || 0).toFixed(2)} EGP
                                            </span>
                                        </div>
                                        <p className="text-muted small mt-2">{service.description}</p>

                                        <div className="d-flex gap-2 mt-3">
                                            <button
                                                onClick={() => handleEditClick(service)}
                                                className="btn btn-sm btn-success"
                                                disabled
                                            >
                                                Edit <i class="fa-solid fa-pen-to-square"></i> (comming soon)
                                            </button>
                                            <button
                                                onClick={() => alert("Delete coming soon")}
                                                className="btn btn-sm btn-danger"
                                                disabled
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

                {/* Add/Edit Form */}
                <div className="col-lg-5 col-md-12">
                    <div className="bg-white rounded-3 shadow-sm p-3 sticky-top" style={{ top: "20px" }}>
                        <h5 className="mb-4 fw-bold">
                            {editingServiceName ? "Update Service" : "Add New Service"}
                        </h5>

                        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

                            {/* Radio Buttons */}
                            <div className="mb-1">
                                <div className="btn-group" role="group">
                                    <button
                                        type="button"
                                        className={`btn ${serviceType === "no-category" ? "btn-danger" : "btn-outline-danger"}`}
                                        onClick={() => setServiceType("no-category")}
                                    >
                                        No Category
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn ${serviceType === "with-category" ? "btn-danger" : "btn-outline-danger"}`}
                                        onClick={() => setServiceType("with-category")}
                                    >
                                        With Category
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="form-label medium text-muted mb-1">Service Name</label>
                                <input
                                    type="text"
                                    name="serviceName"
                                    value={formData.serviceName}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="e.g. Oil Change"
                                    required
                                />
                            </div>
                            <div>
                                <label className="form-label medium text-muted mb-1">Price (EGP)</label>
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
                                <label className="form-label medium text-muted mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Describe what the service includes..."
                                    rows="3"
                                ></textarea>
                            </div>
                            {/* With Category Section */}
                            {serviceType === "with-category" && (
                                <div>
                                    <label className="form-label medium text-muted mb-1">Category</label>
                                    <select
                                        className="form-select text-muted mb-2"
                                        value={formData.categoryName}
                                        onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                                    >
                                        <option value="">Select existing category</option>

                                        {categories.map((cat) => {
                                            const catName = cat.categoryName || cat.name || cat;
                                            const catValue = cat.categoryName || cat.name || cat;

                                            return (
                                                <option key={cat.categoryId || catName} value={catValue}>
                                                    {catName}
                                                </option>
                                            );
                                        })}

                                        {categories.length === 0 && (
                                            <option value="" disabled>No categories available yet</option>
                                        )}
                                    </select>

                                    <div className="form-text text-muted small mb-1">Or type a new category name:</div>
                                    <input
                                        type="text"
                                        name="categoryName"
                                        value={formData.categoryName}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="e.g. Air Conditioning Repair"
                                    />
                                </div>
                            )}

                            <div className="d-flex gap-2 mt-3">
                                <button
                                    type="submit"
                                    className="btn btn-danger w-100 py-2 fw-bold"
                                    style={{ backgroundColor: "red" }}
                                >
                                    {editingServiceName ? "Save Changes" : "Add Service"}
                                </button>

                                {editingServiceName && (
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="btn btn-light border"
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

export default MaintenanceServices;