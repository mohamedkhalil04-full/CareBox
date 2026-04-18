import React, { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import { Badge, Button, Form, InputGroup, Dropdown, Modal, Button as BootstrapButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { } from "react-bootstrap";
// Map للـ status
const STATUS_MAP = {
  Pending: { label: "Pending", variant: "warning" },
  Approved: { label: "Approved", variant: "primary" },
  Cancelled: { label: "Cancelled", variant: "danger" },
  Completed: { label: "Completed", variant: "success" },
};

const MaintenanceBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([]); // الخدمات في الفاتورة
  const [newItem, setNewItem] = useState({ itemDescription: "", price: "" });
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewInvoice, setViewInvoice] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

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
      setError("An error occurred while fetching bookings");
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
      alert("Unknown status");
      return;
    }

    const payload = {
      bookingId: bookingId,
      status: newStatusNumber,
    };

    if (!window.confirm(`Are you sure you want to change the status to ${newStatusString}?`)) {
      return;
    }

    try {
      await api.patch("/Bookings/UpdateStatus", payload);
      fetchBookings(selectedStatus);
      alert(`Status changed successfully to ${newStatusString}`);
    } catch (err) {
      console.error("Update failed:", err);
      let errorMessage = "Changes failed";
      if (err.response) {
        errorMessage += `: ${err.response.data?.message || "Bad Request"}`;
      }
      alert(errorMessage);
    }
  };

  const getActions = (booking) => {
    const status = booking.status?.trim();

    if (status === "Pending") {
      return (
        <div className="d-flex gap-2">
          <Button variant="success" size="sm" onClick={() => updateStatus(booking.bookingId, "Approved")}>
            Approve
          </Button>
          <Button variant="danger" size="sm" onClick={() => updateStatus(booking.bookingId, "Cancelled")}>
            Cancel
          </Button>
        </div>
      );
    }

    if (status === "Approved") {
      return (
        <Button variant="success" size="sm" onClick={() => updateStatus(booking.bookingId, "Completed")}>
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

  const getProblemDisplay = (booking) => {
    if (!booking) return "—";
    if (typeof booking.problem === "string" && booking.problem.trim() !== "") return booking.problem.trim();
    if (booking.problem && typeof booking.problem === "object") {
      return booking.problem.description || booking.problem.title || "—";
    }
    if (typeof booking.problemDescription === "string" && booking.problemDescription.trim() !== "") {
      return booking.problemDescription.trim();
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

  // دالة عرض زر الفاتورة حسب الـ Status
  const getInvoiceAction = (booking) => {
    const status = booking.status?.trim();

    if (status === "Approved") {
      return (
        <Button
          variant="success"
          size="sm"
          onClick={() => handleEditInvoice(booking.bookingId)}
        >
          Edit Invoice
        </Button>
      );
    }

    if (status === "Completed") {
      return (
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleViewInvoice(booking.bookingId)}
        >
          View Invoice
        </Button>
      );
    }

    return <span className="text-muted small">—</span>;
  };

  // // دالة فتح الـ Modal مع تصفية الخدمات القديمة
  //   const handleEditInvoice = async (bookingId) => {
  //   setCurrentBookingId(bookingId);
  //   setShowInvoiceModal(true);
  //   setNewItem({ itemDescription: "", price: "" });

  //   console.log(`🔄 Opening Edit Invoice for booking ID: ${bookingId}`);

  //   try {
  //     const res = await api.get(`/Invoices/GetInvoiceByBooking/${bookingId}`);

  //     console.log("📥 Full API Response:", res.data);

  //     let fetchedItems = [];
  //     if (res.data?.data?.items && Array.isArray(res.data.data.items)) {
  //       fetchedItems = res.data.data.items;
  //     } else if (res.data?.items && Array.isArray(res.data.items)) {
  //       fetchedItems = res.data.items;
  //     }

  //     // تنظيف + إزالة التكرارات
  //     const cleanItems = fetchedItems
  //       .filter(item => {
  //         const desc = (item.itemDescription || item.description || "").trim();
  //         return desc && desc !== "0" && !desc.includes("غخخخ");
  //       })
  //       .map(item => ({
  //         itemDescription: (item.itemDescription || item.description || "").trim(),
  //         price: Number(item.price) || 0
  //       }));

  //     // إزالة المتطابقات
  //     const uniqueItems = cleanItems.filter((item, index, self) =>
  //       index === self.findIndex(t => 
  //         t.itemDescription === item.itemDescription && t.price === item.price
  //       )
  //     );

  //     console.log(`✅ Loaded ${uniqueItems.length} unique items`);

  //     // مهم: نبدأ بالـ items النظيفة
  //     setInvoiceItems(uniqueItems);

  //   } catch (err) {
  //     console.error("Failed to fetch invoice:", err);
  //     setInvoiceItems([]); // نبدأ فاضي لو فيه خطأ
  //   }
  // };

  const handleEditInvoice = (bookingId) => {
    setCurrentBookingId(bookingId);
    setShowInvoiceModal(true);
    setNewItem({ itemDescription: "", price: "" });

    // نبدأ الـ Modal فاضي تمامًا عشان نمنع التكرار
    setInvoiceItems([]);

    console.log(`🆕 Opening fresh Edit Invoice for booking #${bookingId} - Starting empty`);
  };
  // دالة عرض الفاتورة النهائية
  const handleViewInvoice = async (bookingId) => {
    setViewLoading(true);
    setShowViewModal(true);

    try {
      const res = await api.get(`/Invoices/GetInvoiceByBooking/${bookingId}`);

      let invoiceData = res.data?.data || res.data;

      console.log("View Invoice Response:", invoiceData);

      setViewInvoice(invoiceData);
    } catch (err) {
      console.error("Failed to fetch invoice for view:", err);
      alert("Failed to load invoice. Please try again.");
      setViewInvoice(null);
    } finally {
      setViewLoading(false);
    }
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h3 className="fw-bold">Bookings</h3>
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
          <p className="mt-2">Loading bookings...</p>
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0 bg-white">
            <thead className="table-light">
              <tr>
                <th>Booking Code</th>
                <th>Client Name</th>
                <th>Car Type</th>
                <th>Service Type</th>
                <th>Problem Description</th>
                <th>Booking Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Invoices</th>
              </tr>
            </thead>
            <tbody>
              {!Array.isArray(filteredBookings) || filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center text-muted py-5">
                    No bookings yet
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.bookingId || Math.random()}>
                    <td className="fw-medium">
                      {booking.bookingCode || `BK-${String(booking.bookingId).padStart(4, "0")}`}
                    </td>
                    <td>{booking.clientName || "—"}</td>
                    <td>{booking.vehicleDetails || "—"}</td>
                    <td>{getServiceDisplay(booking)}</td>
                    <td>{getProblemDisplay(booking) || "—"}</td>
                    <td>{formatDateTime(booking.appointmentDateTime)}</td>
                    <td className="text-nowrap">
                      <Badge bg={STATUS_MAP[booking.status]?.variant || "secondary"} className="px-3 py-2 fs-6">
                        {booking.status || "Unknown"}
                      </Badge>
                    </td>
                    <td>{getActions(booking)}</td>
                    <td>{getInvoiceAction(booking)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Invoice Edit Modal - النسخة المطورة والمصلحة */}
      <Modal
        show={showInvoiceModal}
        onHide={() => setShowInvoiceModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Invoice - Booking #{currentBookingId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="mb-3">Current Services</h6>

          {invoiceItems.length > 0 ? (
            <div className="mb-4">
              {invoiceItems.map((item, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-3 border rounded bg-light">
                  <span className="flex-grow-1">{item.itemDescription}</span>
                  <span className="fw-bold text-danger me-3">
                    {Number(item.price || 0).toLocaleString("en-US")} EGP
                  </span>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      const updated = invoiceItems.filter((_, i) => i !== index);
                      setInvoiceItems(updated);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted mb-4">No services yet. Add new ones below.</p>
          )}

          <hr className="my-4" />

          <h6 className="mb-3">Add New Service</h6>
          <div className="row g-3 align-items-end">
            <div className="col-md-7">
              <Form.Control
                placeholder="Service description (e.g. Front Right Headlight...)"
                value={newItem.itemDescription}
                onChange={(e) => setNewItem({ ...newItem, itemDescription: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <Form.Control
                type="number"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                step="0.01"
                min="0"
              />
            </div>
            <div className="col-md-2">
              <Button
                variant="success"
                className="w-100"
                onClick={() => {
                  if (newItem.itemDescription.trim() && newItem.price) {
                    setInvoiceItems([
                      ...invoiceItems,
                      {
                        itemDescription: newItem.itemDescription.trim(),
                        price: parseFloat(newItem.price)
                      }
                    ]);
                    setNewItem({ itemDescription: "", price: "" });
                  } else {
                    alert("Please enter both description and price");
                  }
                }}
              >
                Add
              </Button>
            </div>
          </div>

          {/* Total */}
          <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
            <strong>Total Amount</strong>
            <strong className="fs-4 text-danger">
              {invoiceItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0).toLocaleString("en-US")} EGP
            </strong>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInvoiceModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              if (invoiceItems.length === 0) {
                alert("Please add at least one service");
                return;
              }

              try {
                const payload = {
                  bookingId: currentBookingId,
                  items: invoiceItems.map(item => ({
                    itemDescription: item.itemDescription.trim(),
                    price: Number(item.price)
                  }))
                };

                console.log("💾 Sending to API:", payload);

                await api.put("/Invoices/AddCustomItemsToInvoice", payload);

                alert("✅ Invoice saved successfully!");
                setShowInvoiceModal(false);
                fetchBookings(selectedStatus);
              } catch (err) {
                console.error(err);
                alert("❌ Failed to save: " + (err.response?.data?.message || err.message));
              }
            }}
          >
            Save Invoice Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
            {/* View Invoice Modal */}
      <Modal 
        show={showViewModal} 
        onHide={() => setShowViewModal(false)} 
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Invoice - Booking #{currentBookingId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-3">Loading invoice...</p>
            </div>
          ) : viewInvoice ? (
            <div className="invoice-preview p-4 border rounded bg-white">
              <div className="text-center mb-4">
                <h4 className="fw-bold">CareBox - Invoice</h4>
                <p className="text-muted mb-1">Booking #{currentBookingId}</p>
                <p className="text-muted">Issue Date: {new Date(viewInvoice.issueDate || Date.now()).toLocaleDateString('en-US')}</p>
              </div>

              <div className="mb-4">
                <strong>Client:</strong> {viewInvoice.clientName || "—"}
              </div>

              <h6 className="mb-3">Services</h6>
              {viewInvoice.items && viewInvoice.items.length > 0 ? (
                <div>
                  {viewInvoice.items.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between py-2 border-bottom">
                      <span>{item.itemDescription || item.description}</span>
                      <span className="fw-bold">
                        {Number(item.price || 0).toLocaleString("en-US")} EGP
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">No services found.</p>
              )}

              <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center fs-5">
                <strong>Total Amount</strong>
                <strong className="text-danger">
                  {Number(viewInvoice.totalAmount || 
                    viewInvoice.items?.reduce((sum, i) => sum + (Number(i.price) || 0), 0) || 0
                  ).toLocaleString("en-US")} EGP
                </strong>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted py-5">No invoice data available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MaintenanceBookings;