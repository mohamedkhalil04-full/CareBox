// import React, { useState, useEffect } from "react";
// import api from "../../../api/axiosInstance";
// import { Modal, Button, Badge } from "react-bootstrap";

// const SparePartsOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");

//   // Modals
//   const [showItemsModal, setShowItemsModal] = useState(false);
//   const [showDeliveryModal, setShowDeliveryModal] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   // Fetch Orders
//   const fetchOrders = async (statusFilter = null) => {
//     setLoading(true);
//     try {
//       let query = "";
//       if (statusFilter && statusFilter !== "all") {
//         query = `?statusName=${encodeURIComponent(statusFilter)}`;
//       }
//       const res = await api.get(`/Orders/Provider/Orders${query}`);
//       const data = res.data?.data || res.data || [];
//       console.log("Fetched Orders:", data);
//       setOrders(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders(activeTab);
//   }, [activeTab]);

//   const filteredOrders = orders.filter((order) =>
//     order.orderCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ==================== STATUS BADGE ====================
//   const getStatusBadge = (statusName) => {
//     const status = String(statusName || "").trim();

//     const map = {
//       "Pending": { text: "Pending", color: "warning" },
//       "Accepted": { text: "Accepted", color: "primary" },
//       "Preparing": { text: "Preparing", color: "info" },
//       "preparing": { text: "Preparing", color: "info" },
//       "OutForDelivery": { text: "Out for Delivery", color: "primary" },
//       "ReadyForPickup": { text: "Ready for Pickup", color: "success" },
//       "Completed": { text: "Completed", color: "success" },
//       "Cancelled": { text: "Cancelled", color: "danger" },
//     };

//     const s = map[status] || { text: status || "Unknown", color: "secondary" };
//     return <Badge bg={s.color} className="px-3 py-2">{s.text}</Badge>;
//   };

//   // ==================== DELIVERY BADGE ====================
//   const getDeliveryBadge = (order) => {
//     const type = (order.deliveryType || "").toLowerCase().trim();
//     let displayText = order.deliveryType || "—";
//     let className = "";

//     if (type.includes("delivery") || type === "homedelivery") {
//       displayText = "Delivery";
//       className = "badge rounded-pill border border-primary text-primary bg-primary-subtle px-3 py-2";
//     } else if (type.includes("pickup")) {
//       displayText = "Pickup";
//       className = "badge rounded-pill border border-success text-dark bg-success-subtle px-3 py-2";
//     } else {
//       className = `badge rounded-pill px-3 py-2 ${type.includes("delivery") ? "bg-primary" : "bg-success"}`;
//     }

//     return (
//       <span
//         className={className}
//         style={{ cursor: "pointer" }}
//         onClick={() => openDeliveryModal(order)}
//       >
//         {displayText}
//       </span>
//     );
//   };

//   // ==================== RENDER ACTIONS (النهائي مع OutForDelivery) ====================
//   const renderActions = (order) => {
//     const status = String(order.statusName || "").trim();

//     console.log(`Order ${order.orderCode} - Status for actions: ${status}`);

//     if (status === "Pending") {
//       return (
//         <>
//           <Button size="sm" variant="success" className="me-1" onClick={() => handleStatusUpdate(order.orderId, 2)}>
//             Accept
//           </Button>
//           <Button size="sm" variant="danger" onClick={() => handleStatusUpdate(order.orderId, 7)}>
//             Cancel
//           </Button>
//         </>
//       );
//     }

//     if (status === "Accepted") {
//       return (
//         <Button size="sm" variant="info" onClick={() => handleStatusUpdate(order.orderId, 3)}>
//           Prepare
//         </Button>
//       );
//     }

//     if (status === "Preparing" || status === "preparing") {
//       const isDelivery = (order.deliveryType || "").toLowerCase().includes("delivery");
//       return (
//         <Button 
//           size="sm" 
//           variant={isDelivery ? "primary" : "success"} 
//           onClick={() => handleStatusUpdate(order.orderId, isDelivery ? 4 : 5)}
//         >
//           {isDelivery ? "Out for Delivery" : "Ready for Pickup"}
//         </Button>
//       );
//     }

//     if (status === "OutForDelivery") {
//       return (
//         <Button 
//           size="sm" 
//           variant="success" 
//           onClick={() => handleStatusUpdate(order.orderId, 6)}
//         >
//           Complete
//         </Button>
//       );
//     }

//     if (status === "ReadyForPickup") {
//       return (
//         <Button 
//           size="sm" 
//           variant="success" 
//           onClick={() => handleStatusUpdate(order.orderId, 6)}
//         >
//           Complete
//         </Button>
//       );
//     }

//     return null;
//   };

//   const handleStatusUpdate = async (orderId, newStatus) => {
//     if (!window.confirm(`Change status to ${newStatus}?`)) return;
//     try {
//       await api.put(`/Orders/update-status/${orderId}`, { newStatus });
//       fetchOrders(activeTab);
//       alert("Status updated successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update status");
//     }
//   };

//   const openItemsModal = (order) => {
//     setSelectedOrder(order);
//     setShowItemsModal(true);
//   };

//   const openDeliveryModal = (order) => {
//     setSelectedOrder(order);
//     setShowDeliveryModal(true);
//   };

//   return (
//     <div className="p-4 bg-light min-vh-100">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="mb-0 fw-bold">Orders</h2>
//       </div>

//       {/* Status Tabs */}
//       <div className="mb-4">
//         <ul className="nav nav-tabs border-2 gap-5 pb-3">
//           {["all", "Pending", "Accepted", "Preparing", "OutForDelivery", "ReadyForPickup", "Completed"].map((tab) => (
//             <li className="nav-item" key={tab}>
//               <a 
//                 className={`nav-link px-0 ${activeTab === tab ? "active fw-medium" : "text-muted"}`} 
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {tab === "all" ? "All" : 
//                  tab === "OutForDelivery" ? "Out for Delivery" : 
//                  tab === "ReadyForPickup" ? "Ready for Pickup" : tab}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Search */}
//       <div className="mb-4">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search order ID, customer..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Table */}
//       <div className="card border-0 shadow-sm">
//         <div className="table-responsive">
//           <table className="table table-hover align-middle mb-0">
//             <thead className="bg-light">
//               <tr>
//                 <th>Order #</th>
//                 <th>Date</th>
//                 <th>Customer</th>
//                 <th>Car Details</th>
//                 <th>Items</th>
//                 <th>Delivery</th>
//                 <th>Status</th>
//                 <th>Total</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr><td colSpan="9" className="text-center py-5">Loading orders...</td></tr>
//               ) : filteredOrders.length === 0 ? (
//                 <tr><td colSpan="9" className="text-center py-5 text-muted">No orders found</td></tr>
//               ) : (
//                 filteredOrders.map((order) => (
//                   <tr key={order.orderId}>
//                     <td><strong className="text-primary">{order.orderCode}</strong></td>
//                     <td className="text-muted">{new Date(order.orderDate).toLocaleDateString()}</td>
//                     <td>{order.clientName}</td>
//                     <td>{order.carDetails || "—"}</td>
//                     <td>
//                       <span
//                         className="text-primary"
//                         style={{ cursor: "pointer", textDecoration: "underline" }}
//                         onClick={() => openItemsModal(order)}
//                       >
//                         {order.items && order.items.length > 0
//                           ? `${order.items[0].productName}${order.items.length > 1 ? ` +${order.items.length - 1}` : ""}`
//                           : "—"}
//                       </span>
//                     </td>
//                     <td>{getDeliveryBadge(order)}</td>
//                     <td>{getStatusBadge(order.statusName)}</td>
//                     <td><strong>{Number(order.totalPrice || 0).toLocaleString()} LE</strong></td>
//                     <td className="text-center">
//                       {renderActions(order)}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Items Modal */}
//       <Modal show={showItemsModal} onHide={() => setShowItemsModal(false)} size="md" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Order Items - {selectedOrder?.orderCode}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedOrder?.items && selectedOrder.items.length > 0 ? (
//             selectedOrder.items.map((item, i) => (
//               <div key={i} className="d-flex justify-content-between py-2 border-bottom">
//                 <span>{item.productName}</span>
//                 <span><strong>{item.quantity} ×</strong> {Number(item.unitPrice).toLocaleString()} LE</span>
//               </div>
//             ))
//           ) : (
//             <p className="text-muted">No items found</p>
//           )}
//         </Modal.Body>
//       </Modal>

//       {/* Delivery Modal */}
//       <Modal show={showDeliveryModal} onHide={() => setShowDeliveryModal(false)} size="md" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Delivery Details - {selectedOrder?.orderCode}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedOrder && (
//             <>
//               <p><strong>Phone:</strong> {selectedOrder.phoneNumber || "—"}</p>
//               {(selectedOrder.deliveryType === "Delivery" || selectedOrder.deliveryType === "HomeDelivery") && (
//                 <>
//                   <p><strong>Address:</strong> {selectedOrder.deliveryAddress || "—"}</p>
//                   <p><strong>Notes:</strong> {selectedOrder.deliveryNotes || "—"}</p>
//                 </>
//               )}
//               <p><strong>Notes:</strong> {selectedOrder.deliveryNotes || "—"}</p>
//             </>
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default SparePartsOrders;







///////////////////////////////////////////////////////////////////////////////////////////////////




import React, { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import { Modal, Button, Badge } from "react-bootstrap";

const SparePartsOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Status Counts
  const [statusCounts, setStatusCounts] = useState({
    totalOrders: 0,
    pending: 0,
    accepted: 0,
    preparing: 0,
    outForDelivery: 0,
    readyForPickup: 0,
    completed: 0,
    cancelled: 0,
  });

  // Modals
  const [showItemsModal, setShowItemsModal] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch Status Counts
  const fetchStatusCounts = async () => {
    try {
      const res = await api.get("/Orders/provider-ordersStatus");
      const data = res.data?.data || res.data || {};
      setStatusCounts({
        totalOrders: data.totalOrders || 0,
        pending: data.pending || 0,
        accepted: data.accepted || 0,
        preparing: data.preparing || 0,
        outForDelivery: data.outForDelivery || 0,
        readyForPickup: data.readyForPickup || 0,
        completed: data.completed || 0,
        cancelled: data.cancelled || 0,
      });
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  };

  // Fetch Orders - نفس طريقة CarCareBookings
  const fetchOrders = async (status = null) => {
    setLoading(true);
    try {
      const query = status && status !== "all" ? `?statusName=${encodeURIComponent(status)}` : "";
      const res = await api.get(`/Orders/Provider/Orders${query}`);
      const data = res.data?.data || res.data || [];
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatusCounts();
    fetchOrders(activeTab);
  }, [activeTab]);

  // Search
  const filteredOrders = orders.filter((order) =>
    order.orderCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status Badge
  const getStatusBadge = (statusName) => {
    const status = String(statusName || "").trim();
    const map = {
      Pending: { text: "Pending", color: "warning" },
      Accepted: { text: "Accepted", color: "primary" },
      Preparing: { text: "Preparing", color: "info" },
      preparing: { text: "Preparing", color: "info" },
      OutForDelivery: { text: "Out for Delivery", color: "primary" },
      ReadyForPickup: { text: "Ready for Pickup", color: "success" },
      Completed: { text: "Completed", color: "success" },
      Cancelled: { text: "Cancelled", color: "danger" },
    };
    const s = map[status] || { text: status || "Unknown", color: "secondary" };
    return <Badge bg={s.color} className="px-3 py-2">{s.text}</Badge>;
  };

  // Delivery Badge
  const getDeliveryBadge = (order) => {
    const type = (order.deliveryType || "").toLowerCase().trim();
    let displayText = order.deliveryType || "—";
    let className = type.includes("delivery") 
      ? "badge rounded-pill border border-primary text-primary bg-primary-subtle px-3 py-2"
      : "badge rounded-pill border border-success text-dark bg-success-subtle px-3 py-2";

    return (
      <span className={className} style={{ cursor: "pointer" }} onClick={() => openDeliveryModal(order)}>
        {displayText === "HomeDelivery" ? "Delivery" : displayText}
      </span>
    );
  };

  // Actions
  const renderActions = (order) => {
    const status = String(order.statusName || "").trim();

    if (status === "Pending") {
      return (
        <>
          <Button size="sm" variant="success" className="me-1" onClick={() => handleStatusUpdate(order.orderId, 2)}>Accept</Button>
          <Button size="sm" variant="danger" onClick={() => handleStatusUpdate(order.orderId, 7)}>Cancel</Button>
        </>
      );
    }
    if (status === "Accepted") {
      return <Button size="sm" variant="info" onClick={() => handleStatusUpdate(order.orderId, 3)}>Prepare</Button>;
    }
    if (status === "Preparing" || status === "preparing") {
      const isDelivery = (order.deliveryType || "").toLowerCase().includes("delivery");
      return (
        <Button size="sm" variant={isDelivery ? "primary" : "success"} 
          onClick={() => handleStatusUpdate(order.orderId, isDelivery ? 4 : 5)}>
          {isDelivery ? "Out for Delivery" : "Ready for Pickup"}
        </Button>
      );
    }
    if (status === "OutForDelivery" || status === "ReadyForPickup") {
      return <Button size="sm" variant="success" onClick={() => handleStatusUpdate(order.orderId, 6)}>Complete</Button>;
    }
    return null;
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    if (!window.confirm(`Change status to ${newStatus}?`)) return;
    try {
      await api.put(`/Orders/update-status/${orderId}`, { newStatus });
      fetchOrders(activeTab);
      fetchStatusCounts();
      alert("Status updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const openItemsModal = (order) => {
    setSelectedOrder(order);
    setShowItemsModal(true);
  };

  const openDeliveryModal = (order) => {
    setSelectedOrder(order);
    setShowDeliveryModal(true);
  };

  // Tabs
  const tabs = [
    { key: "all", label: "All", count: statusCounts.totalOrders },
    { key: "Pending", label: "Pending", count: statusCounts.pending },
    { key: "Accepted", label: "Accepted", count: statusCounts.accepted },
    { key: "Preparing", label: "Preparing", count: statusCounts.preparing },
    { key: "OutForDelivery", label: "Out for Delivery", count: statusCounts.outForDelivery },
    { key: "ReadyForPickup", label: "Ready for Pickup", count: statusCounts.readyForPickup },
    { key: "Completed", label: "Completed", count: statusCounts.completed },
    { key: "Cancelled", label: "Cancelled", count: statusCounts.cancelled },
  ];

  return (
    <div className="p-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 fw-bold">Orders</h2>
      </div>

      {/* Tabs */}
      <div className="mb-4">
        <ul className="nav nav-tabs border-2 gap-5 pb-3">
          {tabs.map((tab) => (
            <li className="nav-item" key={tab.key}>
              <a
                className={`nav-link px-0 d-flex align-items-center gap-1 ${activeTab === tab.key ? "active fw-medium" : "text-muted"}`}
                onClick={() => setActiveTab(tab.key)}
                style={{ cursor: "pointer" }}
              >
                {tab.label} 
                <span className="badge bg-light text-dark rounded-5">{tab.count}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search order ID, customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th>Order #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Car Details</th>
                <th>Items</th>
                <th>Delivery</th>
                <th>Status</th>
                <th>Total</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="9" className="text-center py-5">Loading orders...</td></tr>
              ) : filteredOrders.length === 0 ? (
                <tr><td colSpan="9" className="text-center py-5 text-muted">No orders found</td></tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td><strong className="text-primary">{order.orderCode}</strong></td>
                    <td className="text-muted">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>{order.clientName}</td>
                    <td>{order.carDetails || "—"}</td>
                    <td>
                      <span style={{ cursor: "pointer" }} onClick={() => openItemsModal(order)}>
                        {order.items?.length > 0 ? `${order.items[0].productName}${order.items.length > 1 ? ` +${order.items.length - 1}` : ""}` : "—"}
                      </span>
                    </td>
                    <td>{getDeliveryBadge(order)}</td>
                    <td>{getStatusBadge(order.statusName)}</td>
                    <td><strong>{Number(order.totalPrice || 0).toLocaleString()} LE</strong></td>
                    <td className="text-center">{renderActions(order)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <Modal show={showItemsModal} onHide={() => setShowItemsModal(false)} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Items - {selectedOrder?.orderCode}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder?.items?.map((item, i) => (
            <div key={i} className="d-flex justify-content-between py-2 border-bottom">
              <span>{item.productName}</span>
              <span><strong>{item.quantity} ×</strong> {Number(item.unitPrice).toLocaleString()} LE</span>
            </div>
          )) || <p className="text-muted">No items found</p>}
        </Modal.Body>
      </Modal>

      <Modal show={showDeliveryModal} onHide={() => setShowDeliveryModal(false)} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Delivery Details - {selectedOrder?.orderCode}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p><strong>Phone:</strong> {selectedOrder.phoneNumber || "—"}</p>
              <p><strong>Address:</strong> {selectedOrder.deliveryAddress || "—"}</p>
              <p><strong>Notes:</strong> {selectedOrder.deliveryNotes || "—"}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SparePartsOrders;