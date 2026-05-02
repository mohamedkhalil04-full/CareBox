
// import React, { useState, useEffect } from "react";
// import api from "../../../api/axiosInstance";
// import { Badge, Button, Form, InputGroup, Dropdown, Modal } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import LoadingStyle from "../../../utils/loadingStyle";

// // Map للـ status
// const STATUS_MAP = {
//   Pending: { label: "Pending", variant: "warning" },
//   Approved: { label: "Approved", variant: "primary" },
//   Cancelled: { label: "Cancelled", variant: "danger" },
//   Completed: { label: "Completed", variant: "success" },
// };

// const MaintenanceBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Edit Invoice States
//   const [showInvoiceModal, setShowInvoiceModal] = useState(false);
//   const [currentBookingId, setCurrentBookingId] = useState(null);
//   const [invoiceItems, setInvoiceItems] = useState([]);
//   const [newItem, setNewItem] = useState({ itemDescription: "", price: "" });
//   const [discountPercent, setDiscountPercent] = useState(0);
//   const [editingItemIndex, setEditingItemIndex] = useState(null);
//   const [editItemData, setEditItemData] = useState({ itemDescription: "", price: "" });
  
//   // View Invoice States
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [viewInvoice, setViewInvoice] = useState(null);
//   const [viewLoading, setViewLoading] = useState(false);

//   // ---- Fetch Bookings ----
//   const fetchBookings = async (status = null) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const query = status ? `?status=${status}` : "";
//       const res = await api.get(`/Bookings/ProviderBookings${query}`);
//       let data = res.data;
//       if (data && typeof data === "object" && !Array.isArray(data)) {
//         data = data.data || [];
//       }
//       const safeBookings = Array.isArray(data) ? data : [];
//       setBookings(safeBookings);
//       setFilteredBookings(safeBookings);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//       setError("An error occurred while fetching bookings");
//       setBookings([]);
//       setFilteredBookings([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings(selectedStatus);
//   }, [selectedStatus]);

//   // ---- Search Filter ----
//   useEffect(() => {
//     let result = [...bookings];
//     if (searchTerm.trim()) {
//       const term = searchTerm.toLowerCase();
//       result = result.filter((b) =>
//         [b.bookingCode, b.clientName, b.vehicleDetails, ...(b.servicesIncluded || [])]
//           .join(" ")
//           .toLowerCase()
//           .includes(term)
//       );
//     }
//     setFilteredBookings(result);
//   }, [searchTerm, bookings]);

//   // ---- Status Management ----
//   const statusToNumber = {
//     Pending: 1,
//     Approved: 2,
//     Cancelled: 3,
//     Completed: 4,
//   };

//   const updateStatus = async (bookingId, newStatusString) => {
//     const newStatusNumber = statusToNumber[newStatusString];
//     if (!newStatusNumber) {
//       alert("Unknown status");
//       return;
//     }
//     const payload = { bookingId, status: newStatusNumber };
//     if (!window.confirm(`Are you sure you want to change the status to ${newStatusString}?`)) return;

//     try {
//       await api.patch("/Bookings/UpdateStatus", payload);
//       fetchBookings(selectedStatus);
//       alert(`Status changed successfully to ${newStatusString}`);
//     } catch (err) {
//       console.error("Update failed:", err);
//       let errorMessage = "Changes failed";
//       if (err.response) errorMessage += `: ${err.response.data?.message || "Bad Request"}`;
//       alert(errorMessage);
//     }
//   };

//   // ---- Edit Invoice Handler (معدل) ----
//   const handleEditInvoice = async (bookingId) => {
//     setCurrentBookingId(bookingId);
//     setShowInvoiceModal(true);
//     setNewItem({ itemDescription: "", price: "" });
//     setEditingItemIndex(null);
//     setEditItemData({ itemDescription: "", price: "" });
//     setDiscountPercent(0);

//     try {
//       const res = await api.get(`/Invoices/GetInvoiceByBooking/${bookingId}`);
//       let invoiceData = res.data?.data || res.data;
      
//       let fetchedItems = [];
//       if (invoiceData?.items && Array.isArray(invoiceData.items)) {
//         fetchedItems = invoiceData.items;
//       }
      
//       // تنظيف البيانات
//       const cleanItems = fetchedItems
//         .filter((item) => {
//           const desc = (item.itemDescription || item.description || "").trim();
//           return desc && desc !== "0";
//         })
//         .map((item) => ({
//           invoiceDetailId: item.invoiceDetailId || null,
//           itemDescription: (item.itemDescription || item.description || "").trim(),
//           price: Number(item.price) || 0,
//         }));

//       setInvoiceItems(cleanItems);
      
//       // جلب نسبة الخصم لو موجودة
//       if (invoiceData.discountPercent) {
//         setDiscountPercent(Number(invoiceData.discountPercent));
//       }
//     } catch (err) {
//       console.error("Failed to fetch invoice items:", err);
//       setInvoiceItems([]);
//     }
//   };

//   // ---- View Invoice Handler (معدل) ----
//   const handleViewInvoice = async (bookingId) => {
//     setViewLoading(true);
//     setShowViewModal(true);
//     setCurrentBookingId(bookingId);

//     try {
//       const res = await api.get(`/Invoices/GetInvoiceByBooking/${bookingId}`);
//       let invoiceData = res.data?.data || res.data;
//       console.log("View Invoice Response:", invoiceData);
//       setViewInvoice(invoiceData);
//     } catch (err) {
//       console.error("Failed to fetch invoice for view:", err);
//       alert("Failed to load invoice. Please try again.");
//       setViewInvoice(null);
//     } finally {
//       setViewLoading(false);
//     }
//   };

//   // ---- Delete Item من API ----
//   const handleDeleteItem = async (item, index) => {
//     // لو عنده invoiceDetailId, نحذف من API
//     if (item.invoiceDetailId) {
//       if (!window.confirm(`Delete "${item.itemDescription}" from invoice?`)) return;
//       try {
//         await api.delete(`/Invoices/Delete-item-FromInvoice/${item.invoiceDetailId}`);
//         // نحذف من الـ state بعد النجاح
//         const updated = invoiceItems.filter((_, i) => i !== index);
//         setInvoiceItems(updated);
//         alert("Item deleted successfully!");
//       } catch (err) {
//         console.error("Delete failed:", err);
//         alert("❌ Failed to delete: " + (err.response?.data?.message || err.message));
//       }
//     } else {
//       // لو جديد (ملهوش ID)، نحذف محلياً
//       const updated = invoiceItems.filter((_, i) => i !== index);
//       setInvoiceItems(updated);
//     }
//   };

//   // ---- Start Editing Item ----
//   const handleStartEdit = (index) => {
//     setEditingItemIndex(index);
//     setEditItemData({
//       itemDescription: invoiceItems[index].itemDescription,
//       price: invoiceItems[index].price,
//     });
//   };

//   // ---- Save Edited Item ----
//   const handleSaveEdit = (index) => {
//     if (!editItemData.itemDescription.trim() || !editItemData.price) {
//       alert("Please enter both description and price");
//       return;
//     }
//     const updated = [...invoiceItems];
//     updated[index] = {
//       ...updated[index],
//       itemDescription: editItemData.itemDescription.trim(),
//       price: parseFloat(editItemData.price),
//     };
//     setInvoiceItems(updated);
//     setEditingItemIndex(null);
//     setEditItemData({ itemDescription: "", price: "" });
//   };

//   // ---- Cancel Edit ----
//   const handleCancelEdit = () => {
//     setEditingItemIndex(null);
//     setEditItemData({ itemDescription: "", price: "" });
//   };

//   // ---- Add New Item (local) ----
//   const handleAddItem = () => {
//     if (newItem.itemDescription.trim() && newItem.price) {
//       setInvoiceItems([
//         ...invoiceItems,
//         {
//           invoiceDetailId: null, // جديد، لسه ما نزلش API
//           itemDescription: newItem.itemDescription.trim(),
//           price: parseFloat(newItem.price),
//         },
//       ]);
//       setNewItem({ itemDescription: "", price: "" });
//     } else {
//       alert("Please enter both description and price");
//     }
//   };

//   // ---- حساب التوتال ----
//   const subtotal = invoiceItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
//   const discountValue = (subtotal * (Number(discountPercent) || 0)) / 100;
//   const totalAfterDiscount = subtotal - discountValue;

//   // ---- Save All Changes to API ----
//   const handleSaveInvoice = async () => {
//     if (invoiceItems.length === 0) {
//       alert("Please add at least one service");
//       return;
//     }
//     try {
//       const payload = {
//         bookingId: currentBookingId,
//         discountPercent: Number(discountPercent) || 0,
//         items: invoiceItems.map((item) => ({
//           itemDescription: item.itemDescription.trim(),
//           price: Number(item.price),
//         })),
//       };

//       console.log("📤 Sending to API:", payload);

//       await api.put("/Invoices/AddCustomItemsToInvoice", payload);

//       alert("✅ Invoice saved successfully!");
//       setShowInvoiceModal(false);
//       fetchBookings(selectedStatus);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to save: " + (err.response?.data?.message || err.message));
//     }
//   };

//   // ---- Helper Functions ----
//   const getActions = (booking) => {
//     const status = booking.status?.trim();
//     if (status === "Pending") {
//       return (
//         <div className="d-flex gap-2">
//           <Button variant="success" size="sm" onClick={() => updateStatus(booking.bookingId, "Approved")}>
//             Approve
//           </Button>
//           <Button variant="danger" size="sm" onClick={() => updateStatus(booking.bookingId, "Cancelled")}>
//             Cancel
//           </Button>
//         </div>
//       );
//     }
//     if (status === "Approved") {
//       return (
//         <Button variant="success" size="sm" onClick={() => updateStatus(booking.bookingId, "Completed")}>
//           Complete
//         </Button>
//       );
//     }
//     return null;
//   };

//   const getServiceDisplay = (booking) => {
//     if (Array.isArray(booking.servicesIncluded) && booking.servicesIncluded.length > 0) {
//       return booking.servicesIncluded.join(", ");
//     }
//     return "—";
//   };

//   const getProblemDisplay = (booking) => {
//     if (!booking) return "—";
//     if (typeof booking.problem === "string" && booking.problem.trim() !== "") return booking.problem.trim();
//     if (booking.problem && typeof booking.problem === "object") {
//       return booking.problem.description || booking.problem.title || "—";
//     }
//     if (typeof booking.problemDescription === "string" && booking.problemDescription.trim() !== "") {
//       return booking.problemDescription.trim();
//     }
//     return "—";
//   };

//   const formatDateTime = (dateStr) => {
//     if (!dateStr) return "—";
//     try {
//       const date = new Date(dateStr);
//       return date.toLocaleString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//         hour: "numeric",
//         minute: "2-digit",
//         hour12: true,
//       });
//     } catch {
//       return dateStr;
//     }
//   };

//   const getInvoiceAction = (booking) => {
//     const status = booking.status?.trim();
//     if (status === "Approved") {
//       return (
//         <Button variant="success" size="sm" onClick={() => handleEditInvoice(booking.bookingId)}>
//           Edit Invoice
//         </Button>
//       );
//     }
//     if (status === "Completed") {
//       return (
//         <Button variant="primary" size="sm" onClick={() => handleViewInvoice(booking.bookingId)}>
//           View Invoice
//         </Button>
//       );
//     }
//     return <span className="text-muted small">—</span>;
//   };

//   // ======================== RENDER ========================
//   return (
//     <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
//       {/* Header & Filters */}
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
//         <h3 className="fw-bold">Bookings</h3>
//       </div>

//       <div className="d-flex flex-wrap gap-3 mb-4">
//         <InputGroup style={{ maxWidth: "400px" }}>
//           <Form.Control
//             placeholder="Search bookings..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </InputGroup>

//         <Dropdown>
//           <Dropdown.Toggle variant="outline-secondary">
//             {selectedStatus || "Filter by Status"}
//           </Dropdown.Toggle>
//           <Dropdown.Menu>
//             <Dropdown.Item onClick={() => setSelectedStatus(null)}>All Statuses</Dropdown.Item>
//             {Object.keys(STATUS_MAP).map((key) => (
//               <Dropdown.Item key={key} onClick={() => setSelectedStatus(key)}>
//                 {STATUS_MAP[key].label}
//               </Dropdown.Item>
//             ))}
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       {error && <div className="alert alert-danger">{error}</div>}

//       {/* Bookings Table */}
//       {loading ? (
//         <div className="text-center py-5">
//           <LoadingStyle />
//           <p className="mt-2">Loading bookings...</p>
//         </div>
//       ) : (
//         <div className="table-responsive shadow-sm rounded">
//           <table className="table table-hover align-middle mb-0 bg-white">
//             <thead className="table-light">
//               <tr>
//                 <th>Booking Code</th>
//                 <th>Client Name</th>
//                 <th>Car Type</th>
//                 <th>Service Type</th>
//                 <th>Problem Description</th>
//                 <th>Booking Date & Time</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//                 <th>Invoices</th>
//               </tr>
//             </thead>
//             <tbody>
//               {!Array.isArray(filteredBookings) || filteredBookings.length === 0 ? (
//                 <tr>
//                   <td colSpan="9" className="text-center text-muted py-5">
//                     No bookings yet
//                   </td>
//                 </tr>
//               ) : (
//                 filteredBookings.map((booking) => (
//                   <tr key={booking.bookingId || Math.random()}>
//                     <td className="fw-medium">
//                       {booking.bookingCode || `BK-${String(booking.bookingId).padStart(4, "0")}`}
//                     </td>
//                     <td>{booking.clientName || "—"}</td>
//                     <td>{booking.vehicleDetails || "—"}</td>
//                     <td>{getServiceDisplay(booking)}</td>
//                     <td>{getProblemDisplay(booking) || "—"}</td>
//                     <td>{formatDateTime(booking.appointmentDateTime)}</td>
//                     <td className="text-nowrap">
//                       <Badge
//                         bg={STATUS_MAP[booking.status]?.variant || "secondary"}
//                         className="px-3 py-2 fs-6"
//                       >
//                         {booking.status || "Unknown"}
//                       </Badge>
//                     </td>
//                     <td>{getActions(booking)}</td>
//                     <td>{getInvoiceAction(booking)}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* ========== EDIT INVOICE MODAL (المعدل) ========== */}
//       <Modal show={showInvoiceModal} onHide={() => setShowInvoiceModal(false)} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Invoice - Booking #{currentBookingId}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <h6 className="mb-3">Invoice Services</h6>

//           {/* قائمة الخدمات الحالية */}
//           {invoiceItems.length > 0 ? (
//             <div className="mb-4">
//               {invoiceItems.map((item, index) => (
//                 <div
//                   key={index}
//                   className="d-flex justify-content-between align-items-center mb-2 p-3 border rounded bg-light"
//                 >
//                   {editingItemIndex === index ? (
//                     // وضع التعديل
//                     <div className="w-100 d-flex gap-2 align-items-center">
//                       <Form.Control
//                         size="sm"
//                         placeholder="Service description"
//                         value={editItemData.itemDescription}
//                         onChange={(e) =>
//                           setEditItemData({ ...editItemData, itemDescription: e.target.value })
//                         }
//                       />
//                       <Form.Control
//                         size="sm"
//                         type="number"
//                         placeholder="Price"
//                         value={editItemData.price}
//                         onChange={(e) =>
//                           setEditItemData({ ...editItemData, price: e.target.value })
//                         }
//                         step="0.01"
//                         min="0"
//                         style={{ maxWidth: "120px" }}
//                       />
//                       <Button variant="success" size="sm" onClick={() => handleSaveEdit(index)}>
//                         Save
//                       </Button>
//                       <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
//                         Cancel
//                       </Button>
//                     </div>
//                   ) : (
//                     // وضع العرض العادي
//                     <>
//                       <div className="flex-grow-1">
//                         <span className="fw-medium">{item.itemDescription}</span>
//                         {item.invoiceDetailId && (
//                           <Badge bg="info" className="ms-2" style={{ fontSize: "0.7rem" }}>
//                             Saved
//                           </Badge>
//                         )}
//                       </div>
//                       <span className="fw-bold text-danger me-3">
//                         {Number(item.price || 0).toLocaleString("en-US")} EGP
//                       </span>
//                       <Button
//                         variant="outline-warning"
//                         size="sm"
//                         className="me-1"
//                         onClick={() => handleStartEdit(index)}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="outline-danger"
//                         size="sm"
//                         onClick={() => handleDeleteItem(item, index)}
//                       >
//                         Delete
//                       </Button>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-muted mb-4">No services yet. Add new ones below.</p>
//           )}

//           <hr className="my-4" />

//           {/* إضافة خدمة جديدة */}
//           <h6 className="mb-3">Add New Service</h6>
//           <div className="row g-3 align-items-end">
//             <div className="col-md-7">
//               <Form.Control
//                 placeholder="Service description (e.g. Front Right Headlight...)"
//                 value={newItem.itemDescription}
//                 onChange={(e) => setNewItem({ ...newItem, itemDescription: e.target.value })}
//               />
//             </div>
//             <div className="col-md-3">
//               <Form.Control
//                 type="number"
//                 placeholder="Price"
//                 value={newItem.price}
//                 onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
//                 step="0.01"
//                 min="0"
//               />
//             </div>
//             <div className="col-md-2">
//               <Button variant="success" className="w-100" onClick={handleAddItem}>
//                 Add
//               </Button>
//             </div>
//           </div>

//           <hr className="my-4" />

//           {/* ===== قسم الخصم ===== */}
//           <div className="row mb-3">
//             <div className="col-md-6">
//               <Form.Label className="fw-bold">Discount (%)</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter discount percentage"
//                 value={discountPercent}
//                 onChange={(e) => setDiscountPercent(Math.max(0, Math.min(100, Number(e.target.value))))}
//                 step="0.1"
//                 min="0"
//                 max="100"
//               />
//             </div>
//           </div>

//           {/* ===== التوتال ===== */}
//           <div className="mt-4 pt-3 border-top">
//             <div className="d-flex justify-content-between align-items-center mb-1">
//               <span>Subtotal</span>
//               <span>{subtotal.toLocaleString("en-US")} EGP</span>
//             </div>
//             {discountPercent > 0 && (
//               <div className="d-flex justify-content-between align-items-center mb-1 text-success">
//                 <span>Discount ({discountPercent}%)</span>
//                 <span>- {discountValue.toLocaleString("en-US")} EGP</span>
//               </div>
//             )}
//             <div className="d-flex justify-content-between align-items-center fs-4 fw-bold mt-2 pt-2 border-top">
//               <span>Total</span>
//               <span className="text-danger">
//                 {totalAfterDiscount.toLocaleString("en-US")} EGP
//               </span>
//             </div>
//           </div>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowInvoiceModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleSaveInvoice}>
//             Save Invoice Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* ========== VIEW INVOICE MODAL (المعدل) ========== */}
//       <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Invoice - Booking #{currentBookingId}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {viewLoading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status" />
//               <p className="mt-3">Loading invoice...</p>
//             </div>
//           ) : viewInvoice ? (
//             <div className="invoice-preview p-4 border rounded bg-white">
//               <div className="text-center mb-4">
//                 <h4 className="fw-bold">CareBox - Invoice</h4>
//                 <p className="text-muted mb-1">Booking #{currentBookingId}</p>
//                 <p className="text-muted">
//                   Issue Date:{" "}
//                   {new Date(viewInvoice.issueDate || Date.now()).toLocaleDateString("en-US")}
//                 </p>
//               </div>

//               <div className="mb-4">
//                 <strong>Client:</strong> {viewInvoice.clientName || "—"}
//               </div>

//               <h6 className="mb-3">Services</h6>
//               {viewInvoice.items && viewInvoice.items.length > 0 ? (
//                 <div>
//                   {viewInvoice.items.map((item, index) => (
//                     <div
//                       key={index}
//                       className="d-flex justify-content-between py-2 border-bottom"
//                     >
//                       <span>{item.itemDescription || item.description}</span>
//                       <span className="fw-bold">
//                         {Number(item.price || 0).toLocaleString("en-US")} EGP
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-muted">No services found.</p>
//               )}

//               {/* حساب وعرض الخصم والتوتال في View Modal */}
//               {(() => {
//                 const sub = viewInvoice.items?.reduce(
//                   (sum, i) => sum + (Number(i.price) || 0),
//                   0
//                 ) || 0;
//                 const discPct = Number(viewInvoice.discountPercent) || 0;
//                 const discVal = (sub * discPct) / 100;
//                 const total = sub - discVal;
//                 return (
//                   <div className="mt-4 pt-3 border-top">
//                     <div className="d-flex justify-content-between mb-1">
//                       <span>Subtotal</span>
//                       <span>{sub.toLocaleString("en-US")} EGP</span>
//                     </div>
//                     {discPct > 0 && (
//                       <div className="d-flex justify-content-between mb-1 text-success">
//                         <span>Discount ({discPct}%)</span>
//                         <span>- {discVal.toLocaleString("en-US")} EGP</span>
//                       </div>
//                     )}
//                     <div className="d-flex justify-content-between align-items-center fs-5 fw-bold mt-2 pt-2 border-top">
//                       <strong>Total Amount</strong>
//                       <strong className="text-danger">
//                         {total.toLocaleString("en-US")} EGP
//                       </strong>
//                     </div>
//                   </div>
//                 );
//               })()}
//             </div>
//           ) : (
//             <p className="text-center text-muted py-5">No invoice data available</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowViewModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default MaintenanceBookings;



























// /////////////////////////////////////////////////////////////////////////




import React, { useState, useEffect, useCallback } from "react";
import api from "../../../api/axiosInstance";
import { Badge, Button, Form, InputGroup, Dropdown, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingStyle from "../../../utils/loadingStyle";

// ─────────────────────────────────────────────
//  Constants
// ─────────────────────────────────────────────
const STATUS_MAP = {
  Pending:   { label: "Pending",   variant: "warning"   },
  Approved:  { label: "Approved",  variant: "primary"   },
  Cancelled: { label: "Cancelled", variant: "danger"    },
  Completed: { label: "Completed", variant: "success"   },
};

const STATUS_TO_NUMBER = {
  Pending: 1, Approved: 2, Cancelled: 3, Completed: 4,
};

const BASE_URL = "http://careboxapi.runasp.net";

// ─────────────────────────────────────────────
//  Utility helpers
// ─────────────────────────────────────────────
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
  Number(amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const safeArray = (val) => (Array.isArray(val) ? val : []);

const cleanItems = (raw) =>
  safeArray(raw)
    .filter((item) => {
      const desc = (item.itemDescription || item.description || "").trim();
      return desc && desc !== "0";
    })
    .map((item) => ({
      invoiceDetailId: item.invoiceDetailId ?? null,
      itemDescription: (item.itemDescription || item.description || "").trim(),
      price: Number(item.price) || 0,
    }));

// ─────────────────────────────────────────────
//  Sub-component: InvoiceEditModal
// ─────────────────────────────────────────────
const InvoiceEditModal = ({
  show,
  onHide,
  bookingId,
  onSaved,
}) => {
  const [items,            setItems]            = useState([]);
  const [newItem,          setNewItem]          = useState({ itemDescription: "", price: "" });
  const [discountPercent,  setDiscountPercent]  = useState(0);
  const [editIndex,        setEditIndex]        = useState(null);
  const [editData,         setEditData]         = useState({ itemDescription: "", price: "" });
  const [fetchLoading,     setFetchLoading]     = useState(false);
  const [saveLoading,      setSaveLoading]      = useState(false);
  const [deleteLoadingIdx, setDeleteLoadingIdx] = useState(null);
  const [fetchError,       setFetchError]       = useState(null);

  // ── Derived totals ──
  const subtotal          = items.reduce((s, i) => s + (Number(i.price) || 0), 0);
  const discountValue     = (subtotal * (Number(discountPercent) || 0)) / 100;
  const totalAfterDiscount = subtotal - discountValue;

  // ── Load existing invoice when modal opens ──
  const loadInvoice = useCallback(async () => {
    if (!bookingId) return;
    setFetchLoading(true);
    setFetchError(null);
    setItems([]);
    setDiscountPercent(0);
    setNewItem({ itemDescription: "", price: "" });
    setEditIndex(null);
    try {
      const res = await api.get(`/Invoices/GetInvoiceByBooking/${bookingId}`);
      const data = res.data?.data ?? res.data;
      setItems(cleanItems(data?.items));
      if (data?.discountPercent) setDiscountPercent(Number(data.discountPercent));
    } catch (err) {
      // 404 means no invoice yet — that's fine, start empty
      if (err.response?.status !== 404) {
        setFetchError("Could not load existing invoice items.");
      }
    } finally {
      setFetchLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    if (show) loadInvoice();
  }, [show, loadInvoice]);

  // ── Add item (local only) ──
  const handleAddItem = () => {
    if (!newItem.itemDescription.trim() || !newItem.price) {
      alert("Please enter both a description and a price.");
      return;
    }
    setItems((prev) => [
      ...prev,
      { invoiceDetailId: null, itemDescription: newItem.itemDescription.trim(), price: parseFloat(newItem.price) },
    ]);
    setNewItem({ itemDescription: "", price: "" });
  };

  // ── Start inline-edit ──
  const handleStartEdit = (index) => {
    setEditIndex(index);
    setEditData({ itemDescription: items[index].itemDescription, price: items[index].price });
  };

  // ── Confirm inline-edit (local only; persisted on Save) ──
  const handleConfirmEdit = (index) => {
    if (!editData.itemDescription.trim() || !editData.price) {
      alert("Please enter both a description and a price.");
      return;
    }
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        itemDescription: editData.itemDescription.trim(),
        price: parseFloat(editData.price),
      };
      return updated;
    });
    setEditIndex(null);
    setEditData({ itemDescription: "", price: "" });
  };

  // ── Delete item ──
  const handleDeleteItem = async (item, index) => {
    if (!window.confirm(`Remove "${item.itemDescription}" from the invoice?`)) return;

    if (item.invoiceDetailId) {
      // Saved on server — delete via API
      setDeleteLoadingIdx(index);
      try {
        await api.delete(`/Invoices/Delete-item-FromInvoice/${item.invoiceDetailId}`);
        setItems((prev) => prev.filter((_, i) => i !== index));
      } catch (err) {
        alert("Failed to delete: " + (err.response?.data?.message || err.message));
      } finally {
        setDeleteLoadingIdx(null);
      }
    } else {
      // Local-only item — just remove from state
      setItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // ── Save entire invoice ──
  const handleSaveInvoice = async () => {
    if (items.length === 0) {
      alert("Please add at least one service before saving.");
      return;
    }
    setSaveLoading(true);
    try {
      const payload = {
        bookingId,
        items: items.map(({ itemDescription, price }) => ({
          itemDescription: itemDescription.trim(),
          price: Number(price),
        })),
      };
      await api.put("/Invoices/AddCustomItemsToInvoice", payload);
      alert("Invoice saved successfully!");
      onHide();
      if (onSaved) onSaved();
    } catch (err) {
      alert("Failed to save invoice: " + (err.response?.data?.message || err.message));
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      {/* ── Header ── */}
      <Modal.Header
        closeButton
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderBottom: "2px solid #e94560" }}
      >
        <Modal.Title className="text-white fw-bold">
          <span style={{ color: "#e94560" }}>✏</span>&nbsp; Edit Invoice — Booking&nbsp;
          <span style={{ color: "#f0a500" }}>#{bookingId}</span>
        </Modal.Title>
      </Modal.Header>

      {/* ── Body ── */}
      <Modal.Body style={{ background: "#f4f6fb", padding: "2rem" }}>
        {fetchLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-3 text-muted">Loading invoice data…</p>
          </div>
        ) : (
          <>
            {fetchError && (
              <div className="alert alert-warning py-2 small mb-4">{fetchError}</div>
            )}

            {/* ── Current Services ── */}
            <div className="mb-2">
              <h6 className="fw-bold text-dark mb-3" style={{ letterSpacing: ".04em" }}>
                📋 Current Services
              </h6>

              {items.length > 0 ? (
                <div
                  className="rounded-3 overflow-hidden shadow-sm"
                  style={{ border: "1px solid #dee2e6" }}
                >
                  {items.map((item, index) => (
                    <div
                      key={item.invoiceDetailId ?? `new-${index}`}
                      className="d-flex align-items-center gap-2 px-3 py-2 bg-white"
                      style={{
                        borderBottom: index < items.length - 1 ? "1px solid #f0f0f0" : "none",
                        transition: "background .15s",
                      }}
                    >
                      {editIndex === index ? (
                        // ── Inline edit mode ──
                        <>
                          <Form.Control
                            size="sm"
                            value={editData.itemDescription}
                            onChange={(e) => setEditData({ ...editData, itemDescription: e.target.value })}
                            placeholder="Service description"
                            style={{ flex: 2 }}
                          />
                          <Form.Control
                            size="sm"
                            type="number"
                            value={editData.price}
                            onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                            placeholder="Price"
                            step="0.01"
                            min="0"
                            style={{ flex: 1 }}
                          />
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleConfirmEdit(index)}
                            style={{ whiteSpace: "nowrap" }}
                          >
                            ✔ Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={() => { setEditIndex(null); setEditData({ itemDescription: "", price: "" }); }}
                          >
                            ✕
                          </Button>
                        </>
                      ) : (
                        // ── Display mode ──
                        <>
                          <div className="flex-grow-1">
                            <span className="fw-medium text-dark">{item.itemDescription}</span>
                            {item.invoiceDetailId && (
                              <Badge bg="success" className="ms-2" style={{ fontSize: "0.65rem", opacity: .8 }}>
                                Saved
                              </Badge>
                            )}
                          </div>
                          <span
                            className="fw-bold me-2"
                            style={{ color: "#e94560", minWidth: "90px", textAlign: "right" }}
                          >
                            {formatMoney(item.price)} EGP
                          </span>
                          <Button
                            size="sm"
                            variant="outline-warning"
                            className="py-0 px-2"
                            onClick={() => handleStartEdit(index)}
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
                <p className="text-muted small fst-italic">
                  No services yet — add new ones below.
                </p>
              )}
            </div>

            <hr style={{ borderColor: "#dee2e6", margin: "1.5rem 0" }} />

            {/* ── Add New Service ── */}
            <h6 className="fw-bold text-dark mb-3" style={{ letterSpacing: ".04em" }}>
              ➕ Add New Service
            </h6>
            <div className="row g-2 align-items-end mb-2">
              <div className="col-md-7">
                <Form.Control
                  placeholder="Service description (e.g. Front Right Headlight Replacement)"
                  value={newItem.itemDescription}
                  onChange={(e) => setNewItem({ ...newItem, itemDescription: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                />
              </div>
              <div className="col-md-3">
                <Form.Control
                  type="number"
                  placeholder="Price (EGP)"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  step="0.01"
                  min="0"
                  onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                />
              </div>
              <div className="col-md-2">
                <Button variant="dark" className="w-100" onClick={handleAddItem}>
                  Add
                </Button>
              </div>
            </div>

            <hr style={{ borderColor: "#dee2e6", margin: "1.5rem 0" }} />

            {/* ── Discount ── */}
            <h6 className="fw-bold text-dark mb-3" style={{ letterSpacing: ".04em" }}>
              🏷 Discount
            </h6>
            <div className="row mb-1">
              <div className="col-md-5">
                <InputGroup>
                  <Form.Control
                    type="number"
                    placeholder="0"
                    value={discountPercent}
                    onChange={(e) =>
                      setDiscountPercent(Math.max(0, Math.min(100, Number(e.target.value))))
                    }
                    step="0.1"
                    min="0"
                    max="100"
                  />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
              </div>
            </div>

            <hr style={{ borderColor: "#dee2e6", margin: "1.5rem 0" }} />

            {/* ── Totals ── */}
            <div
              className="rounded-3 p-3"
              style={{ background: "#fff", border: "1px solid #dee2e6" }}
            >
              <div className="d-flex justify-content-between mb-1 text-secondary small">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal)} EGP</span>
              </div>
              {discountPercent > 0 && (
                <div className="d-flex justify-content-between mb-1 small" style={{ color: "#198754" }}>
                  <span>Discount ({discountPercent}%)</span>
                  <span>− {formatMoney(discountValue)} EGP</span>
                </div>
              )}
              <div
                className="d-flex justify-content-between align-items-center mt-2 pt-2"
                style={{ borderTop: "2px solid #dee2e6" }}
              >
                <span className="fw-bold fs-5">Total</span>
                <span className="fw-bold fs-4" style={{ color: "#e94560" }}>
                  {formatMoney(totalAfterDiscount)} EGP
                </span>
              </div>
            </div>
          </>
        )}
      </Modal.Body>

      {/* ── Footer ── */}
      <Modal.Footer style={{ background: "#f4f6fb", borderTop: "1px solid #dee2e6" }}>
        <Button variant="outline-secondary" onClick={onHide} disabled={saveLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSaveInvoice}
          disabled={saveLoading || fetchLoading}
          style={{ background: "#e94560", border: "none", minWidth: "160px" }}
        >
          {saveLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Saving…
            </>
          ) : (
            "💾 Save Invoice"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// ─────────────────────────────────────────────
//  Sub-component: InvoiceViewModal
// ─────────────────────────────────────────────
const InvoiceViewModal = ({ show, onHide, bookingId }) => {
  const [invoice,  setInvoice]  = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

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

  // Derived totals from invoice data
  const items      = safeArray(invoice?.items);
  const sub        = items.reduce((s, i) => s + (Number(i.price) || 0), 0);
  const discPct    = Number(invoice?.discountPercent) || 0;
  const discVal    = (sub * discPct) / 100;
  const total      = sub - discVal;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      {/* ── Header ── */}
      <Modal.Header
        closeButton
        style={{ background: "linear-gradient(135deg, #0f3460 0%, #16213e 100%)", borderBottom: "2px solid #f0a500" }}
      >
        <Modal.Title className="text-white fw-bold">
          <span style={{ color: "#f0a500" }}>🧾</span>&nbsp; Invoice — Booking&nbsp;
          <span style={{ color: "#f0a500" }}>#{bookingId}</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ background: "#f4f6fb", padding: "2rem" }}>
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
            {/* ── Invoice header ── */}
            <div className="text-center mb-4 pb-3" style={{ borderBottom: "2px solid #f0a500" }}>
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

            {/* ── Meta row ── */}
            <div className="row mb-4 g-2 text-sm">
              <div className="col-6">
                <div className="text-muted small">Booking ID</div>
                <div className="fw-semibold">#{bookingId}</div>
              </div>
              <div className="col-6 text-end">
                <div className="text-muted small">Issue Date</div>
                <div className="fw-semibold">
                  {invoice.issueDate
                    ? new Date(invoice.issueDate).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
                    : new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                </div>
              </div>
              {invoice.clientName && (
                <div className="col-12 mt-1">
                  <div className="text-muted small">Client</div>
                  <div className="fw-semibold">{invoice.clientName}</div>
                </div>
              )}
            </div>

            {/* ── Line items ── */}
            <h6
              className="fw-bold mb-2 pb-1"
              style={{ color: "#0f3460", borderBottom: "1px solid #e9ecef", letterSpacing: ".04em" }}
            >
              Services Rendered
            </h6>

            {items.length > 0 ? (
              <>
                {/* Table header */}
                <div
                  className="d-flex justify-content-between px-3 py-2 rounded-2 mb-1 small fw-bold"
                  style={{ background: "#f0f4f8", color: "#0f3460" }}
                >
                  <span>Description</span>
                  <span>Amount</span>
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

            {/* ── Totals ── */}
            <div className="mt-3 pt-2" style={{ borderTop: "1px solid #dee2e6" }}>
              <div className="d-flex justify-content-between small text-muted mb-1">
                <span>Subtotal</span>
                <span>{formatMoney(sub)} EGP</span>
              </div>
              {discPct > 0 && (
                <div className="d-flex justify-content-between small mb-1" style={{ color: "#198754" }}>
                  <span>Discount ({discPct}%)</span>
                  <span>− {formatMoney(discVal)} EGP</span>
                </div>
              )}
              <div
                className="d-flex justify-content-between align-items-center mt-2 pt-2"
                style={{ borderTop: "2px solid #0f3460" }}
              >
                <span className="fw-bold fs-5" style={{ color: "#0f3460" }}>Total Amount</span>
                <span className="fw-bold fs-4" style={{ color: "#e94560" }}>
                  {formatMoney(total)} EGP
                </span>
              </div>
            </div>

            {/* ── Footer note ── */}
            <p
              className="text-center text-muted mt-4 mb-0"
              style={{ fontSize: ".75rem", borderTop: "1px dashed #dee2e6", paddingTop: "1rem" }}
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
  const [editModal,        setEditModal]        = useState({ show: false, bookingId: null });
  const [viewModal,        setViewModal]        = useState({ show: false, bookingId: null });

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
          .join(" ").toLowerCase().includes(term)
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

  // ── Row helpers ──
  const getActions = (booking) => {
    const status = booking.status?.trim();
    if (status === "Pending")
      return (
        <div className="d-flex gap-1">
          <Button size="sm" variant="success" onClick={() => updateStatus(booking.bookingId, "Approved")}>Approve</Button>
          <Button size="sm" variant="danger"  onClick={() => updateStatus(booking.bookingId, "Cancelled")}>Cancel</Button>
        </div>
      );
    if (status === "Approved")
      return (
        <Button size="sm" variant="success" onClick={() => updateStatus(booking.bookingId, "Completed")}>Complete</Button>
      );
    return null;
  };

  const getInvoiceAction = (booking) => {
    const status = booking.status?.trim();
    if (status === "Approved")
      return (
        <Button
          size="sm"
          variant="warning"
          onClick={() => setEditModal({ show: true, bookingId: booking.bookingId })}
        >
          ✏ Edit Invoice
        </Button>
      );
    if (status === "Completed")
      return (
        <Button
          size="sm"
          variant="primary"
          onClick={() => setViewModal({ show: true, bookingId: booking.bookingId })}
        >
          🧾 View Invoice
        </Button>
      );
    return <span className="text-muted small">—</span>;
  };

  const getServiceDisplay = (b) =>
    Array.isArray(b.servicesIncluded) && b.servicesIncluded.length > 0
      ? b.servicesIncluded.join(", ")
      : "—";

  const getProblemDisplay = (b) => {
    if (!b) return "—";
    if (typeof b.problem === "string" && b.problem.trim()) return b.problem.trim();
    if (b.problem && typeof b.problem === "object") return b.problem.description || b.problem.title || "—";
    if (typeof b.problemDescription === "string" && b.problemDescription.trim()) return b.problemDescription.trim();
    return "—";
  };

  // ── Render ──
  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* ── Page title + controls ── */}
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
                  <td colSpan="9" className="text-center text-muted py-5">No bookings yet</td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.bookingId ?? Math.random()}>
                    <td className="fw-medium">
                      {booking.bookingCode || `BK-${String(booking.bookingId).padStart(4, "0")}`}
                    </td>
                    <td>{booking.clientName  || "—"}</td>
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

      {/* ── Modals ── */}
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