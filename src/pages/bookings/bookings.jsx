import React, { useState, useEffect } from "react";
import api from "../../api/axiosInstance";
import { Badge, Button, Form, InputGroup, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Map للـ status (بناءً على الداتا الحقيقية: string مش رقم)
const STATUS_MAP = {
  Pending: { label: "Pending", variant: "warning" },
  Approved: { label: "Approved", variant: "primary" },
  Cancelled: { label: "Cancelled", variant: "danger" },
  Completed: { label: "Completed", variant: "success" },
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async (status = null) => {
    setLoading(true);
    setError(null);
    try {
      const query = status ? `?status=${status}` : "";
      const res = await api.get(`/Bookings/ProviderBookings${query}`);

      let data = res.data;
      if (data && typeof data === "object" && !Array.isArray(data)) {
        data = data.data || [];
      }

      const safeBookings = Array.isArray(data) ? data : [];
      setBookings(safeBookings);
      setFilteredBookings(safeBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("an error occures while fetching bookings");
      setBookings([]);
      setFilteredBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(selectedStatus);
  }, [selectedStatus]);

  // فلتر البحث
  useEffect(() => {
    let result = [...bookings];
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((b) => {
        return [
          b.bookingCode,
          b.clientName,
          b.vehicleDetails,
          ...(b.servicesIncluded || []),
        ].join(" ").toLowerCase().includes(term);
      });
    }
    setFilteredBookings(result);
  }, [searchTerm, bookings]);

  const statusToNumber = {
  "Pending": 1,
  "Approved": 2,
  "Cancelled": 3,
  "Completed": 4,
};

const updateStatus = async (bookingId, newStatusString) => {
  const newStatusNumber = statusToNumber[newStatusString];
  
  if (!newStatusNumber) {
    alert("unknown status");
    return;
  }

  const payload = {
    bookingId: bookingId,
    status: newStatusNumber,
  };

  // console.log("Sending PATCH payload:", payload);

  if (!window.confirm(`are you sure you want to change the status to ${newStatusString}?`)) {
    return; // لو لا نطلع من الدالة
  }

  try {
    const response = await api.patch("/Bookings/UpdateStatus", payload);
    
    // لو وصلنا هنا يبقى الطلب نجح (status 200-299)
    console.log("Update success:", response.data); // لو في رد مفيد نشوفه

    fetchBookings(selectedStatus);
    alert(`status changed successfully to ${newStatusString}`);
  } catch (err) {
    console.error("Update failed:", err);
    
    // هنا بنحاول نطلّع الرسالة الحقيقية من السيرفر
    let errorMessage = "changes failed";
    
    if (err.response) {
      
      const serverMsg = err.response.data?.message 
        || err.response.data?.error 
        || err.response.data 
        || "Bad Request (400)";
      
      errorMessage += `: ${serverMsg}`;
      console.log("Server error details:", err.response.data);
    } else if (err.request) {
      errorMessage += " (No response from the server)";
    } else {
      errorMessage += `: ${err.message}`;
    }

    alert(errorMessage);
  }
};

  const getActions = (booking) => {
  const status = booking.status?.trim(); // "Pending", "Approved", ...

  if (status === "Pending") {
    return (
      <div className="d-flex gap-2">
        <Button
          variant="success"
          size="sm"
          onClick={() => updateStatus(booking.bookingId, "Approved")}
        >
          Approve
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => updateStatus(booking.bookingId, "Cancelled")}
        >
          Cancel
        </Button>
      </div>
    );
  }

  if (status === "Approved") {
    return (
      <Button
        variant="success"
        size="sm"
        onClick={() => updateStatus(booking.bookingId, "Completed")}
      >
        Complete
      </Button>
    );
  }

  return null;
};

  const getServiceDisplay = (booking) => {
    if (Array.isArray(booking.servicesIncluded) && booking.servicesIncluded.length > 0) {
      return booking.servicesIncluded.join(", ");
    }
    return "—";
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const date = new Date(dateStr);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h3 className="fw-bold">Bookings</h3>
        <Button variant="danger" className="px-4">+ New Booking</Button>
      </div>

      <div className="d-flex flex-wrap gap-3 mb-4">
        <InputGroup style={{ maxWidth: "400px" }}>
          <Form.Control
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary">
            {selectedStatus || "Filter by Status"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedStatus(null)}>All Statuses</Dropdown.Item>
            {Object.keys(STATUS_MAP).map((key) => (
              <Dropdown.Item key={key} onClick={() => setSelectedStatus(key)}>
                {STATUS_MAP[key].label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">loading bookings...</p>
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0 bg-white">
            <thead className="table-light">
              <tr>
                <th>Booking ID</th>
                <th>Client Name</th>
                <th>Car Type</th>
                <th>Service Type</th>
                <th>Booking Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {!Array.isArray(filteredBookings) || filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-5">
                    No bookings yet
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => {
      // console.log("Full booking object:", booking); // عشان كنت عايز اتأكد ان طلعت ضاف البيانات بتاعته بنجاح
                  return (
                    <tr key={booking.bookingId || Math.random()}>
                      <td className="fw-medium">
                        {booking.bookingCode || `BK-${String(booking.bookingId).padStart(4, "0")}`}
                      </td>
                      <td>{booking.clientName || "—"}</td>
                      <td>{booking.vehicleDetails || "—"}</td>
                      <td>{getServiceDisplay(booking)}</td>
                      <td>{formatDateTime(booking.appointmentDateTime)}</td>
                      <td className="text-nowrap">
                        <div className="d-flex align-items-center gap-3 flex-wrap">
                          <Badge
                            bg={STATUS_MAP[booking.status]?.variant || "secondary"}
                            className="px-3 py-2 fs-6"
                          >
                            {booking.status || "Unknown"}
                          </Badge>
                          {getActions(booking)}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Bookings;