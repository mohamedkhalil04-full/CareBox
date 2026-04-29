import React, { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import "./profile.css";
import LoadingStyle from "../../../utils/loadingStyle";
const Profile = () => {
  const [profile, setProfile] = useState({
    shopName: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    workingHours: "",
    logoUrl: "",
    latitude: "",
    longitude: "",
  });

  const [formData, setFormData] = useState({ ...profile });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [hasChanges, setHasChanges] = useState(false);

  // جلب البيانات
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/ProviderProfile");
        const data = res.data || {};

        //الرابط الأساسي للسيرفر (شيلنا /api من الـ baseURL اللي في ملف axios)
        const SERVER_URL = "http://careboxapi.runasp.net";

        const rawPath = data.logoImageUrl || "";
        const fullImageUrl = rawPath && !rawPath.startsWith("http") 
          ? `${SERVER_URL}${rawPath}` 
          : rawPath;

        const initial = {
          shopName: data.shopName || "",
          name: data.name || "",
          address: data.address || "",
          phone: data.phoneNumber || "", 
          email: data.email || "",
          workingHours: data.workingHours || "",
          logoUrl: fullImageUrl,
          latitude: data.latitude?.toString() || "",
          longitude: data.longitude?.toString() || "",
        };

        setProfile(initial);
        setFormData(initial);
        if (fullImageUrl) {
          setLogoPreview(fullImageUrl);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setMessage({ type: "danger", text: "تعذر تحميل بيانات الملف الشخصي" });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // كشف التغييرات
  useEffect(() => {
    const isChanged =
      JSON.stringify(formData) !== JSON.stringify(profile) || !!logoFile;

    setHasChanges(isChanged);
  }, [formData, logoFile, profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setMessage({ type: "warning", text: "browser doesn't support confirming location" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setFormData((prev) => ({
          ...prev,
          latitude: latitude.toFixed(8),
          longitude: longitude.toFixed(8),
        }));
      },
      (err) => {
        setMessage({ type: "danger", text: "fetching location failed" + err.message });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const payload = new FormData();

      payload.append("Name", formData.name || formData.shopName || "");
      payload.append("ShopName", formData.shopName || formData.name || "");
      payload.append("Address", formData.address || "");
      payload.append("Phone", formData.phone || "");            
      payload.append("WorkingHours", formData.workingHours || "");
      payload.append("Latitude", formData.latitude || "");
      payload.append("Longitude", formData.longitude || "");

      if (logoFile) {
        payload.append("NewLogoImage", logoFile);
      }

      // للـ debug: طباعة كل ما سيتم إرساله
      console.log("Sending FormData:");
      for (let [key, val] of payload.entries()) {
        console.log(key, ":", val instanceof File ? "[File]" : val);
      }

      await api.put("/ProviderProfile", payload, {
  headers: { "Content-Type": "multipart/form-data" },
});

      // تحديث البيانات المحلية بعد النجاح
      const updated = { ...formData };
      if (logoFile) {
        updated.logoUrl = URL.createObjectURL(logoFile); 
      }
      setProfile(updated);
      setLogoFile(null);
      setMessage({ type: "success", text: "changes saved successfully" });
    } catch (err) {
      console.error("Save error:", err);
      let errorMsg = "an error occures while saving";
      if (err.response?.data?.message) {
        errorMsg += `: ${err.response.data.message}`;
      } else if (err.response?.status === 400) {
        errorMsg += " (Bad Request) make sure of the sended data";
      }
      setMessage({ type: "danger", text: errorMsg });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <LoadingStyle/>
        <span className="ms-3">loading data of workshop...</span>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: "1100px" }}>
      <h4 className="mb-2 fw-bold">Workshop Profile</h4>

      {message.text && (
        <Alert
          variant={message.type}
          dismissible
          onClose={() => setMessage({ type: "", text: "" })}
        >
          {message.text}
        </Alert>
      )}

      <div className="card shadow-sm border-0">
        <div className="card-body p-2">
          <h5 className="mb-1 border-bottom pb-1">General Information</h5>

          {/* Logo */}
          <Form.Group className="mb-1">
            <Form.Label>Workshop Logo</Form.Label>
            <div className="d-flex align-items-center gap-4 flex-wrap">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Workshop Logo"
                  className="rounded-circle border"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center text-muted border"
                  style={{ width: "100px", height: "100px" }}
                >
                  No Logo
                </div>
              )}

              <div>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  style={{ display: "none" }}
                  id="logoUpload"
                />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => document.getElementById("logoUpload").click()}
                >
                  ↑ Upload New Logo
                </Button>
              </div>
            </div>
          </Form.Group>

          {/* Workshop Name */}
          <Form.Group className="mb-2">
            <Form.Label>Workshop Name</Form.Label>
            <Form.Control
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Address */}
          <Form.Group className="mb-2">
            <Form.Label>Address</Form.Label>
            <div className="input-group justify-content-between">
              <Form.Control
                name="address"
                className="rounded"
                style={{maxWidth:'850px'}}
                value={formData.address}
                onChange={handleChange}
              />
              <Button
                variant="outline-secondary"
                onClick={handleUseCurrentLocation}
                className="rounded"
              >
                📍 Use Current Location
              </Button>
            </div>
          </Form.Group>

          {/* Phone + Email */}
          <div className="row g-3 mb-2">
            <div className="col-md-6">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+20 1XX XXX XXXX"
              />
            </div>
            <div className="col-md-6">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="bg-light"
              />
            </div>
          </div>

          {/* Working Hours */}
          <Form.Group className="mb-2">
            <Form.Label>Working Hours</Form.Label>
            <Form.Control
              type="text"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleChange}
              placeholder="Ex: Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM"
            />
          </Form.Group>

          {/* زر الحفظ – يظهر فقط لو فيه تغييرات */}
          {hasChanges && (
            <div className="d-flex justify-content-end">
              <Button
                variant="danger"
                size="lg"
                className="px-4 py-1"
                onClick={handleSubmit}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <LoadingStyle/>
                    saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;