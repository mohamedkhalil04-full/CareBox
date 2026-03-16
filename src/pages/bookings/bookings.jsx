import React, { useState, useEffect } from "react";
import api from "../../api/axiosInstance";
import { Badge, Button, Form, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const STATUS_MAP = {
  1: { label: "Pending", variant: "warning" },
  2: { label: "Approved", variant: "primary" },
  3: { label: "Cancelled", variant: "danger" },
  4: { label: "Completed", variant: "success" },
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null); // null = all
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async (status = null) => {
    setLoading(true);
    setError(null);
    try {
      const query = status ? `?status=${status}` : "";
      const res = await api.get(`/Bookings/ProviderBookings${query}`);

      let data = res.data;

      // التعامل مع أشكال الـ response المختلفة
      if (data && typeof data === "object" && !Array.isArray(data)) {
        data = data.data || data.bookings || data.result || data.items || [];
      }

      const safeBookings = Array.isArray(data) ? data : [];
      setBookings(safeBookings);
      setFilteredBookings(safeBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("error while fetching bookings");
      setBookings([]);
      setFilteredBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(selectedStatus);
  }, [selectedStatus]);

  // فلتر البحث المحلي
  useEffect(() => {
    let result = [...bookings];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((b) => {
        const searchFields = [
          b.bookingId?.toString(),
          b.clientName,
          b.clientFullName,
          b.carType,
          b.carModel,
          b.serviceType,
        ].filter(Boolean).join(" ").toLowerCase();

        return searchFields.includes(term);
      });
    }

    setFilteredBookings(result);
  }, [searchTerm, bookings]);

  const updateStatus = async (bookingId, newStatus) => {
    const statusLabel = STATUS_MAP[newStatus]?.label || newStatus;
    if (!window.confirm(`confirm changing state to ${statusLabel}?`)) return;

    try {
      await api.patch("/Bookings/UpdateStatus", {
        bookingId,
        status: newStatus,
      });
      fetchBookings(selectedStatus); // refresh
    } catch (err) {
      console.error("Update failed:", err);
      alert("refresh state failed");
    }
  };

  const getActions = (booking) => {
    const status = booking.status;

    if (status === 1) {
      return (
        <div className="d-flex gap-2">
          <Button
            variant="success"
            size="sm"
            className="py-1 px-3"
            onClick={() => updateStatus(booking.bookingId, 2)}
          >
            Approve
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="py-1 px-3"
            onClick={() => updateStatus(booking.bookingId, 3)}
          >
            Cancel
          </Button>
        </div>
      );
    }

    if (status === 2) {
      return (
        <Button
          variant="success"
          size="sm"
          className="py-1 px-3"
          onClick={() => updateStatus(booking.bookingId, 4)}
        >
          Complete
        </Button>
      );
    }

    return null;
  };

  const getServiceDisplay = (booking) => {
    if (booking.serviceType) return booking.serviceType;

    if (Array.isArray(booking.services)) {
      return booking.services
        .map((s) => s.serviceName || s.name || "unknown service")
        .join(", ");
    }

    if (Array.isArray(booking.serviceNames)) {
      return booking.serviceNames.join(", ");
    }

    return "—";
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h3 className="fw-bold">Bookings</h3>
        <Button variant="danger" className="px-4">   {/*  style={{backgroundColor:'red'}}  */}
          + New Booking
        </Button>
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
            {selectedStatus !== null
              ? STATUS_MAP[selectedStatus]?.label || "Unknown"
              : "Filter by Status"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedStatus(null)}>
              All Statuses
            </Dropdown.Item>
            {Object.entries(STATUS_MAP).map(([key, value]) => (
              <Dropdown.Item key={key} onClick={() => setSelectedStatus(Number(key))}>
                {value.label}
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
                  <td colSpan="7" className="text-center text-muted py-5">
                    No bookings yet
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.bookingId || `booking-${Math.random()}`}>
                    <td className="fw-medium">{booking.bookingId || "—"}</td> {/*booking id */}
                    <td>{booking.clientName || booking.clientFullName || "—"}</td> {/* client name */}
                    <td>{booking.carType || booking.carModel || "—"}</td> {/* car type */}
                    <td>{getServiceDisplay(booking)}</td>  {/* service type */}
                    <td>  {/* date & time */}
                      {booking.bookingDateTime ||
                        booking.date ||
                        booking.bookingDate ||
                        "—"}
                    </td>
                    <td className="text-nowrap">
                      <div className="d-flex align-items-center gap-3 flex-wrap">
                        <Badge
                          bg={STATUS_MAP[booking.status]?.variant || "secondary"}
                          className="px-3 py-2 fs-6"
                        >
                          {STATUS_MAP[booking.status]?.label || "unknown"}
                        </Badge>

                        {getActions(booking)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Bookings;