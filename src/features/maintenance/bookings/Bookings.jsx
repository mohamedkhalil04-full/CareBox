import React, { useState, useEffect, useCallback } from "react";
import api from "../../../api/axiosInstance";
import { Badge, Button, Form, InputGroup, Dropdown, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingStyle from "../../../utils/loadingStyle";

const STATUS_MAP = {
  Pending:   { label: "Pending",   variant: "warning"  },
  Approved:  { label: "Approved",  variant: "primary"  },
  Cancelled: { label: "Cancelled", variant: "danger"   },
  Completed: { label: "Completed", variant: "success"  },
};

const STATUS_TO_NUMBER = {
  Pending: 1, Approved: 2, Cancelled: 3, Completed: 4,
};

const EDITABLE_STATUSES = ["Approved"];

const formatDateTime = (dateStr) => {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true,
    });
  } catch { return dateStr; }
};

const formatMoney = (amount) =>
  Number(amount || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const safeArray = (val) => (Array.isArray(val) ? val : []);

/**
 * Defensively extract the per-item unique ID.
 * The backend may return it under several different key names.
 * Priority order matches the API documentation (invoiceDetailId first).
 */
const extractItemId = (item) =>
  item.invoiceDetailId ??
  item.invoiceDetailID ??
  item.itemId ??
  item.itemID ??
  item.id ??
  null;

const cleanItems = (raw) =>
  safeArray(raw)
    .filter((item) => {
      const desc = (item.itemDescription || item.description || "").trim();
      return desc && desc !== "0";
    })
    .map((item) => ({
      invoiceDetailId: extractItemId(item),   // ← robust multi-key extraction
      itemDescription: (item.itemDescription || item.description || "").trim(),
      price: Number(item.price) || 0,
    }));

const InvoiceEditModal = ({ show, onHide, bookingId, onSaved }) => {
  const [items,            setItems]            = useState([]);
  const [fetchLoading,     setFetchLoading]     = useState(false);
  const [fetchError,       setFetchError]       = useState(null);
  // const [saveLoading,      setSaveLoading]      = useState(false);

  // Edit panel visibility
  const [editPanelOpen,    setEditPanelOpen]    = useState(false);

  // Inline row editing state
  const [editIndex,        setEditIndex]        = useState(null);
  const [editData,         setEditData]         = useState({ itemDescription: "", price: "" });
  const [editSaving,       setEditSaving]       = useState(false);

  // New item form
  const [newItem,          setNewItem]          = useState({ itemDescription: "", price: "" });
  const [addSaving,        setAddSaving]        = useState(false);

  // Per-row delete loading
  const [deleteLoadingIdx, setDeleteLoadingIdx] = useState(null);

  // Derived total
  const total = items.reduce((s, i) => s + (Number(i.price) || 0), 0);

  // ── Load existing invoice when modal opens ──
  const loadInvoice = useCallback(async () => {
    if (!bookingId) return;
    setFetchLoading(true);
    setFetchError(null);
    setItems([]);
    setEditPanelOpen(false);
    setEditIndex(null);
    setNewItem({ itemDescription: "", price: "" });
    try {
      const res  = await api.get(`/Invoices/GetInvoiceByBooking/${bookingId}`);
      const data = res.data?.data ?? res.data;
      setItems(cleanItems(data?.items));
    } catch (err) {
      if (err.response?.status !== 404) {
        setFetchError("Could not load existing invoice items.");
      }
      // 404 → no invoice yet, start fresh (items stays [])
    } finally {
      setFetchLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    if (show) loadInvoice();
  }, [show, loadInvoice]);

  // ── DELETE: confirm → API (uses item's own invoiceDetailId) → state ──
  const handleDeleteItem = async (item, index) => {
    if (!window.confirm("Are you sure you want to delete this item from the invoice?")) return;

    // Guard: if no invoiceDetailId the row is local-only (never persisted).
    if (!item.invoiceDetailId) {
      setItems((prev) => prev.filter((_, i) => i !== index));
      return;
    }

    setDeleteLoadingIdx(index);
    try {
      // DELETE /Invoices/Delete-item-FromInvoice/{invoiceDetailId}
      // Critically: pass the ITEM's unique ID, NOT the parent bookingId.
      await api.delete(`/Invoices/Delete-item-FromInvoice/${item.invoiceDetailId}`);
      // Only update state after a confirmed successful API response.
      setItems((prev) => prev.filter((_, i) => i !== index));
      alert("Item deleted successfully.");
    } catch (err) {
      alert("Failed to delete item: " + (err.response?.data?.message || err.message));
    } finally {
      setDeleteLoadingIdx(null);
    }
  };

  // ── START inline-edit ──
  const handleStartEdit = (index) => {
    setEditIndex(index);
    setEditData({
      itemDescription: items[index].itemDescription,
      price: String(items[index].price),
    });
  };

  // ── SAVE inline-edit: API PATCH (uses item's own invoiceDetailId for price) → state ──
  const handleConfirmEdit = async (index) => {
    const desc  = editData.itemDescription.trim();
    const price = parseFloat(editData.price);
    if (!desc || isNaN(price) || price < 0) {
      alert("Please enter a valid description and price.");
      return;
    }

    const item = items[index];
    setEditSaving(true);
    try {
      if (item.invoiceDetailId) {
        // PATCH /Invoices/updateprice-item-FromInvoice/{invoiceDetailId}
        // Critically: pass the ITEM's unique ID, NOT the parent bookingId.
        // Body is the raw numeric price value (Content-Type: application/json).
        await api.patch(
          `/Invoices/updateprice-item-FromInvoice/${item.invoiceDetailId}`,
          price,
          { headers: { "Content-Type": "application/json" } }
        );
      }
      // Update local state only after a successful API response (or for local-only items).
      setItems((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], itemDescription: desc, price };
        return updated;
      });
      setEditIndex(null);
      setEditData({ itemDescription: "", price: "" });
      if (item.invoiceDetailId) alert("Item updated successfully.");
    } catch (err) {
      alert("Failed to update item: " + (err.response?.data?.message || err.message));
    } finally {
      setEditSaving(false);
    }
  };

  // ── ADD item: API PUT (uses parent bookingId to associate item with invoice) → state ──
  const handleAddItem = async () => {
    const desc  = newItem.itemDescription.trim();
    const price = parseFloat(newItem.price);
    if (!desc || isNaN(price) || price < 0) {
      alert("Please enter a valid description and price.");
      return;
    }

    setAddSaving(true);
    try {
      // PUT /Invoices/AddCustomItemsToInvoice
      // Uses the PARENT bookingId to link the new item to the correct invoice.
      const payload = {
        bookingId,
        items: [{ itemDescription: desc, price }],
      };
      await api.put("/Invoices/AddCustomItemsToInvoice", payload);
      // Re-fetch the invoice to get the server-assigned invoiceDetailId for the new item.
      const fetchRes  = await api.get(`/Invoices/GetInvoiceByBooking/${bookingId}`);
      const fetchData = fetchRes.data?.data ?? fetchRes.data;
      setItems(cleanItems(fetchData?.items));
      setNewItem({ itemDescription: "", price: "" });
      alert("Item added successfully.");
    } catch (err) {
      alert("Failed to add item: " + (err.response?.data?.message || err.message));
    } finally {
      setAddSaving(false);
    }
  };

  const handleFinish = () => {
    if (onSaved) onSaved();
    onHide();
  };

  const headerStyle = {
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    borderBottom: "2px solid #e94560",
  };
  const cardStyle = {
    background: "#fff",
    border: "1px solid #dee2e6",
    borderRadius: 10,
    overflow: "hidden",
  };
  const totalBarStyle = {
    background: "linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)",
    borderRadius: 8,
    padding: "14px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      {/* Header */}
      <Modal.Header closeButton style={headerStyle}>
        <Modal.Title className="text-white fw-bold">
          <span style={{ color: "#e94560" }}>✏</span>&nbsp; Edit Invoice —&nbsp;
          <span style={{ color: "#f0a500" }}>Booking #{bookingId}</span>
        </Modal.Title>
      </Modal.Header>

      {/* Body */}
      <Modal.Body style={{ background: "#f4f6fb", padding: "1.75rem" }}>
        {fetchLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-3 text-muted">Loading invoice data…</p>
          </div>
        ) : (
          <>
            {fetchError && (
              <div className="alert alert-warning py-2 small mb-3">{fetchError}</div>
            )}

            {/* ── SECTION 1: Current Services (read-only display) ── */}
            <h6
              className="fw-bold mb-3"
              style={{ color: "#1a1a2e", letterSpacing: ".04em", fontSize: "0.85rem", textTransform: "uppercase" }}
            >
              📋 Current Services
            </h6>

            <div style={cardStyle}>
              {/* Table header row */}
              <div
                className="d-flex justify-content-between px-3 py-2 small fw-bold"
                style={{ background: "#f0f4f8", color: "#0f3460", borderBottom: "1px solid #e9ecef" }}
              >
                <span>Description</span>
                <span>Amount</span>
              </div>

              {items.length > 0 ? (
                items.map((item, idx) => (
                  <div
                    key={item.invoiceDetailId ?? `item-${idx}`}
                    className="d-flex justify-content-between align-items-center px-3 py-2"
                    style={{
                      borderBottom: idx < items.length - 1 ? "1px solid #f0f0f0" : "none",
                      background: idx % 2 === 0 ? "#fff" : "#fafbfc",
                    }}
                  >
                    <span className="text-dark">{item.itemDescription}</span>
                    <span className="fw-semibold" style={{ color: "#e94560" }}>
                      {formatMoney(item.price)} EGP
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-3 py-4 text-muted small fst-italic text-center">
                  No services added yet. Use the edit panel below to add items.
                </div>
              )}
            </div>

            {/* ── Total bar ── */}
            <div style={totalBarStyle}>
              <span className="fw-bold text-white" style={{ fontSize: "1rem" }}>Total</span>
              <span className="fw-bold" style={{ color: "#f0a500", fontSize: "1.4rem" }}>
                {formatMoney(total)} EGP
              </span>
            </div>

            {/* ── Edit toggle button (just below services) ── */}
            <div className="d-flex justify-content-end mt-3">
              <Button
                size="sm"
                variant={editPanelOpen ? "outline-secondary" : "warning"}
                onClick={() => {
                  setEditPanelOpen((prev) => !prev);
                  if (editPanelOpen) {
                    setEditIndex(null);
                    setEditData({ itemDescription: "", price: "" });
                    setNewItem({ itemDescription: "", price: "" });
                  }
                }}
                style={{ minWidth: 110, fontWeight: 600 }}
              >
                {editPanelOpen ? "✕ Close Edit" : "✏ Edit"}
              </Button>
            </div>

            {/* ── SECTION 2: Edit Panel (toggled) ── */}
            {editPanelOpen && (
              <div
                className="mt-3 p-3 rounded-3"
                style={{ background: "#fff", border: "2px dashed #e94560" }}
              >
                <h6
                  className="fw-bold mb-3"
                  style={{ color: "#e94560", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: ".04em" }}
                >
                  🛠 Edit Services
                </h6>

                {/* ── Editable items list ── */}
                {items.length > 0 ? (
                  <div style={cardStyle} className="mb-3">
                    {items.map((item, index) => (
                      <div
                        key={item.invoiceDetailId ?? `edit-${index}`}
                        className="d-flex align-items-center gap-2 px-3 py-2 bg-white"
                        style={{
                          borderBottom: index < items.length - 1 ? "1px solid #f0f0f0" : "none",
                        }}
                      >
                        {editIndex === index ? (
                          // ── Inline edit mode ──
                          <>
                            <Form.Control
                              size="sm"
                              value={editData.itemDescription}
                              onChange={(e) =>
                                setEditData({ ...editData, itemDescription: e.target.value })
                              }
                              placeholder="Service description"
                              style={{ flex: 2 }}
                              disabled={editSaving}
                            />
                            <Form.Control
                              size="sm"
                              type="number"
                              value={editData.price}
                              onChange={(e) =>
                                setEditData({ ...editData, price: e.target.value })
                              }
                              placeholder="Price"
                              step="0.01"
                              min="0"
                              style={{ flex: 1 }}
                              disabled={editSaving}
                            />
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => handleConfirmEdit(index)}
                              disabled={editSaving}
                              style={{ whiteSpace: "nowrap" }}
                            >
                              {editSaving ? (
                                <span className="spinner-border spinner-border-sm" />
                              ) : "✔ Save"}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => {
                                setEditIndex(null);
                                setEditData({ itemDescription: "", price: "" });
                              }}
                              disabled={editSaving}
                            >
                              ✕
                            </Button>
                          </>
                        ) : (
                          // ── Display-with-actions mode ──
                          <>
                            <div className="flex-grow-1">
                              <span className="fw-medium text-dark">{item.itemDescription}</span>
                              {item.invoiceDetailId ? (
                                <Badge
                                  bg="success"
                                  className="ms-2"
                                  style={{ fontSize: "0.6rem", opacity: 0.75 }}
                                  title={`invoiceDetailId: ${item.invoiceDetailId}`}
                                >
                                  Saved #{item.invoiceDetailId}
                                </Badge>
                              ) : (
                                <Badge
                                  bg="warning"
                                  text="dark"
                                  className="ms-2"
                                  style={{ fontSize: "0.6rem", opacity: 0.85 }}
                                  title="This item has no invoiceDetailId — it may not be persisted yet."
                                >
                                  ⚠ No ID
                                </Badge>
                              )}
                            </div>
                            <span
                              className="fw-semibold me-1"
                              style={{ color: "#e94560", minWidth: 90, textAlign: "right" }}
                            >
                              {formatMoney(item.price)} EGP
                            </span>
                            <Button
                              size="sm"
                              variant="outline-warning"
                              className="py-0 px-2"
                              onClick={() => handleStartEdit(index)}
                              disabled={deleteLoadingIdx === index}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              className="py-0 px-2"
                              disabled={deleteLoadingIdx === index}
                              onClick={() => handleDeleteItem(item, index)}
                            >
                              {deleteLoadingIdx === index ? (
                                <span className="spinner-border spinner-border-sm" />
                              ) : "Delete"}
                            </Button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted small fst-italic mb-3">
                    No services yet — add new ones below.
                  </p>
                )}

                {/* ── Add New Item form ── */}
                <div
                  className="rounded-3 p-3"
                  style={{ background: "#f8f9fa", border: "1px solid #dee2e6" }}
                >
                  <p
                    className="mb-2 fw-semibold small"
                    style={{ color: "#1a1a2e" }}
                  >
                    ➕ Add New Service
                  </p>
                  <div className="row g-2 align-items-end">
                    <div className="col-md-7">
                      <Form.Control
                        placeholder="Service description (e.g. Front headlight replacement)"
                        value={newItem.itemDescription}
                        onChange={(e) =>
                          setNewItem({ ...newItem, itemDescription: e.target.value })
                        }
                        onKeyDown={(e) => e.key === "Enter" && !addSaving && handleAddItem()}
                        disabled={addSaving}
                        size="sm"
                      />
                    </div>
                    <div className="col-md-3">
                      <Form.Control
                        type="number"
                        placeholder="Price (EGP)"
                        value={newItem.price}
                        onChange={(e) =>
                          setNewItem({ ...newItem, price: e.target.value })
                        }
                        step="0.01"
                        min="0"
                        onKeyDown={(e) => e.key === "Enter" && !addSaving && handleAddItem()}
                        disabled={addSaving}
                        size="sm"
                      />
                    </div>
                    <div className="col-md-2">
                      <Button
                        variant="dark"
                        className="w-100"
                        onClick={handleAddItem}
                        disabled={addSaving}
                        size="sm"
                      >
                        {addSaving ? (
                          <span className="spinner-border spinner-border-sm" />
                        ) : "Add"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer style={{ background: "#f4f6fb", borderTop: "1px solid #dee2e6" }}>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          onClick={handleFinish}
          style={{ background: "#e94560", border: "none", minWidth: 130 }}
        >
          ✅ Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ─────────────────────────────────────────────
//  Sub-component: InvoiceViewModal  (read-only)
//  Shows services list + Total. No discount UI.
// ─────────────────────────────────────────────
const InvoiceViewModal = ({ show, onHide, bookingId }) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const loadInvoice = useCallback(async () => {
    if (!bookingId) return;
    setLoading(true);
    setError(null);
    setInvoice(null);
    try {
      const res = await api.get(`/Invoices/GetInvoiceByBooking/${bookingId}`);
      setInvoice(res.data?.data ?? res.data);
    } catch (err) {
      setError("Failed to load invoice. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    if (show) loadInvoice();
  }, [show, loadInvoice]);

  const items = safeArray(invoice?.items).filter((item) => {
    const desc = (item.itemDescription || item.description || "").trim();
    return desc && desc !== "0";
  });
  const total = items.reduce((s, i) => s + (Number(i.price) || 0), 0);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      {/* Header */}
      <Modal.Header
        closeButton
        style={{
          background: "linear-gradient(135deg, #0f3460 0%, #16213e 100%)",
          borderBottom: "2px solid #f0a500",
        }}
      >
        <Modal.Title className="text-white fw-bold">
          <span style={{ color: "#f0a500" }}>🧾</span>&nbsp; Invoice — Booking&nbsp;
          <span style={{ color: "#f0a500" }}>#{bookingId}</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ background: "#f4f6fb", padding: "1.75rem" }}>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-3 text-muted">Loading invoice…</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : invoice ? (
          <div
            className="bg-white rounded-3 shadow-sm p-4"
            style={{ border: "1px solid #dee2e6" }}
          >
            {/* Invoice brand header */}
            <div
              className="text-center mb-4 pb-3"
              style={{ borderBottom: "2px solid #f0a500" }}
            >
              <div
                style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "linear-gradient(135deg, #0f3460, #e94560)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 12px",
                }}
              >
                <span style={{ color: "#fff", fontSize: 22 }}>📦</span>
              </div>
              <h4 className="fw-bold mb-1" style={{ color: "#0f3460" }}>CareBox</h4>
              <p className="text-muted mb-0" style={{ fontSize: ".85rem" }}>Official Invoice</p>
            </div>

            {/* Meta row */}
            <div className="row mb-4 g-2">
              <div className="col-6">
                <div className="text-muted small">Booking ID</div>
                <div className="fw-semibold">#{bookingId}</div>
              </div>
              <div className="col-6 text-end">
                <div className="text-muted small">Issue Date</div>
                <div className="fw-semibold">
                  {invoice.issueDate
                    ? new Date(invoice.issueDate).toLocaleDateString("en-US", {
                        day: "numeric", month: "short", year: "numeric",
                      })
                    : new Date().toLocaleDateString("en-US", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                </div>
              </div>
              {invoice.clientName && (
                <div className="col-12">
                  <div className="text-muted small">Client</div>
                  <div className="fw-semibold">{invoice.clientName}</div>
                </div>
              )}
            </div>

            {/* Services Rendered */}
            <h6
              className="fw-bold mb-2 pb-1"
              style={{
                color: "#0f3460",
                borderBottom: "1px solid #e9ecef",
                letterSpacing: ".04em",
              }}
            >
              Services Rendered
            </h6>

            {items.length > 0 ? (
              <>
                {/* Column labels */}
                <div
                  className="d-flex justify-content-between px-3 py-2 rounded-2 mb-1 small fw-bold"
                  style={{ background: "#f0f4f8", color: "#0f3460" }}
                >
                  <span>Description</span>
                  <span>Price</span>
                </div>
                {items.map((item, idx) => (
                  <div
                    key={item.invoiceDetailId ?? idx}
                    className="d-flex justify-content-between px-3 py-2"
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      background: idx % 2 === 0 ? "#fff" : "#fafbfc",
                    }}
                  >
                    <span>{item.itemDescription || item.description}</span>
                    <span className="fw-semibold" style={{ color: "#0f3460" }}>
                      {formatMoney(item.price)} EGP
                    </span>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-muted small fst-italic px-3">No service items found.</p>
            )}

            {/* Total (no discount) */}
            <div
              className="d-flex justify-content-between align-items-center mt-3 pt-3"
              style={{ borderTop: "2px solid #0f3460" }}
            >
              <span className="fw-bold fs-5" style={{ color: "#0f3460" }}>
                Total Price
              </span>
              <span className="fw-bold fs-4" style={{ color: "#e94560" }}>
                {formatMoney(total)} EGP
              </span>
            </div>

            {/* Footer note */}
            <p
              className="text-center text-muted mt-4 mb-0"
              style={{
                fontSize: ".75rem",
                borderTop: "1px dashed #dee2e6",
                paddingTop: "1rem",
              }}
            >
              Thank you for choosing CareBox. This is an official invoice document.
            </p>
          </div>
        ) : (
          <p className="text-center text-muted py-5">No invoice data available.</p>
        )}
      </Modal.Body>

      <Modal.Footer style={{ background: "#f4f6fb", borderTop: "1px solid #dee2e6" }}>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ─────────────────────────────────────────────
//  Main Component: MaintenanceBookings
// ─────────────────────────────────────────────
const MaintenanceBookings = () => {
  const [bookings,         setBookings]         = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm,       setSearchTerm]       = useState("");
  const [selectedStatus,   setSelectedStatus]   = useState(null);
  const [loading,          setLoading]          = useState(true);
  const [error,            setError]            = useState(null);

  // Invoice modal states
  const [editModal, setEditModal] = useState({ show: false, bookingId: null });
  const [viewModal, setViewModal] = useState({ show: false, bookingId: null });

  // ── Fetch bookings ──
  const fetchBookings = useCallback(async (status = null) => {
    setLoading(true);
    setError(null);
    try {
      const query = status ? `?status=${status}` : "";
      const res   = await api.get(`/Bookings/ProviderBookings${query}`);
      let data    = res.data;
      if (data && typeof data === "object" && !Array.isArray(data)) data = data.data || [];
      const safe  = Array.isArray(data) ? data : [];
      setBookings(safe);
      setFilteredBookings(safe);
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching bookings.");
      setBookings([]);
      setFilteredBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBookings(selectedStatus); }, [selectedStatus, fetchBookings]);

  // ── Client-side search filter ──
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) { setFilteredBookings(bookings); return; }
    setFilteredBookings(
      bookings.filter((b) =>
        [b.bookingCode, b.clientName, b.vehicleDetails, ...safeArray(b.servicesIncluded)]
          .join(" ")
          .toLowerCase()
          .includes(term)
      )
    );
  }, [searchTerm, bookings]);

  // ── Status update ──
  const updateStatus = async (bookingId, newStatus) => {
    const num = STATUS_TO_NUMBER[newStatus];
    if (!num) { alert("Unknown status"); return; }
    if (!window.confirm(`Change status to ${newStatus}?`)) return;
    try {
      await api.patch("/Bookings/UpdateStatus", { bookingId, status: num });
      fetchBookings(selectedStatus);
      alert(`Status changed to ${newStatus}`);
    } catch (err) {
      alert("Update failed: " + (err.response?.data?.message || err.message));
    }
  };

  // ── Row action helpers ──
  const getActions = (booking) => {
    const status = booking.status?.trim();
    if (status === "Pending")
      return (
        <div className="d-flex gap-1">
          <Button
            size="sm"
            variant="success"
            onClick={() => updateStatus(booking.bookingId, "Approved")}
          >
            Approve
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => updateStatus(booking.bookingId, "Cancelled")}
          >
            Cancel
          </Button>
        </div>
      );
    if (status === "Approved")
      return (
        <Button
          size="sm"
          variant="success"
          onClick={() => updateStatus(booking.bookingId, "Completed")}
        >
          Complete
        </Button>
      );
    return null;
  };

  /**
   * Invoice column logic:
   *  - "Edit Invoice"  → status is strictly AFTER "Pending" AND BEFORE "Completed"
   *                      (i.e. in EDITABLE_STATUSES list)
   *  - "Show Invoice"  → status is strictly "Completed"
   *  - Otherwise       → em-dash placeholder
   */
  const getInvoiceAction = (booking) => {
    const status = booking.status?.trim();

    if (EDITABLE_STATUSES.includes(status)) {
      return (
        <Button
          size="sm"
          variant="warning"
          onClick={() => setEditModal({ show: true, bookingId: booking.bookingId })}
        >
          ✏ Edit Invoice
        </Button>
      );
    }

    if (status === "Completed") {
      return (
        <Button
          size="sm"
          variant="primary"
          onClick={() => setViewModal({ show: true, bookingId: booking.bookingId })}
        >
          🧾 Show Invoice
        </Button>
      );
    }

    return <span className="text-muted small">—</span>;
  };

  const getServiceDisplay = (b) =>
    Array.isArray(b.servicesIncluded) && b.servicesIncluded.length > 0
      ? b.servicesIncluded.join(", ")
      : "—";

  const getProblemDisplay = (b) => {
    if (!b) return "—";
    if (typeof b.problem === "string" && b.problem.trim()) return b.problem.trim();
    if (b.problem && typeof b.problem === "object")
      return b.problem.description || b.problem.title || "—";
    if (typeof b.problemDescription === "string" && b.problemDescription.trim())
      return b.problemDescription.trim();
    return "—";
  };

  // ── Render ──
  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Page title + controls */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h3 className="fw-bold mb-0">Bookings</h3>
      </div>

      <div className="d-flex flex-wrap gap-3 mb-4">
        <InputGroup style={{ maxWidth: 400 }}>
          <Form.Control
            placeholder="Search bookings…"
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
          <LoadingStyle />
          <p className="mt-2 text-muted">Loading bookings…</p>
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
                <th>Booking Date &amp; Time</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center text-muted py-5">
                    No bookings yet
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.bookingId ?? Math.random()}>
                    <td className="fw-medium">
                      {booking.bookingCode ||
                        `BK-${String(booking.bookingId).padStart(4, "0")}`}
                    </td>
                    <td>{booking.clientName || "—"}</td>
                    <td>{booking.vehicleDetails || "—"}</td>
                    <td>{getServiceDisplay(booking)}</td>
                    <td>{getProblemDisplay(booking)}</td>
                    <td>{formatDateTime(booking.appointmentDateTime)}</td>
                    <td className="text-nowrap">
                      <Badge
                        bg={STATUS_MAP[booking.status]?.variant || "secondary"}
                        className="px-3 py-2 fs-6"
                      >
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

      {/* Modals */}
      <InvoiceEditModal
        show={editModal.show}
        bookingId={editModal.bookingId}
        onHide={() => setEditModal({ show: false, bookingId: null })}
        onSaved={() => fetchBookings(selectedStatus)}
      />

      <InvoiceViewModal
        show={viewModal.show}
        bookingId={viewModal.bookingId}
        onHide={() => setViewModal({ show: false, bookingId: null })}
      />
    </div>
  );
};

export default MaintenanceBookings;