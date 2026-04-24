import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New Emergency Request",
      desc: "Flat tire reported 2.4km away. Respond within 30 seconds.",
      time: "2 mins ago",
      unread: true,
      icon: <i className="fa-solid fa-triangle-exclamation"></i>,
      color: "#fff7ed",
      iconColor: "#f97316",
    },
    {
      id: 2,
      title: "New Spare Parts Order",
      desc: "Order #ORD-8921 received for Brake Pads (Front).",
      time: "15 mins ago",
      unread: true,
      icon: <i className="fa-solid fa-dolly" />,
      color: "#eff6ff", // أزرق فاتح
      iconColor: "#3b82f6",
    },
    {
      id: 3,
      title: "Payout Processed",
      desc: "Your weekly payout of 1,240.00 has been sent to your bank account.",
      time: "2 hours ago",
      unread: false,
      icon: <i className="fa-solid fa-square-check" />,
      color: "#f0fdf4", // أخضر فاتح
      iconColor: "#22c55e",
    },
    {
      id: 4,
      title: "System Update",
      desc: "The platform will undergo scheduled maintenance tonight at 2 AM EST.",
      time: "1 day ago",
      unread: false,
      icon: <i className="fa-solid fa-exclamation"></i>,
      color: "#eff6ff",
      iconColor: "#3b82f6",
    },
    {
      id: 5,
      title: "Order Cancelled",
      desc: "Customer cancelled Order #ORD-8918.",
      time: "1 day ago",
      unread: false,
      icon: <i className="fa-regular fa-circle-xmark" />,
      color: "#ffefef",
      iconColor: "#f63b3b",
    },
  ];

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="fw-bold m-0 pb-3 fst-italic font">
            Notifications <i className="fa-solid fa-bell" /> : -
          </h1>
          <p className="text-muted small fs-6">
            Stay updated on requests and orders.
          </p>
        </div>
        <button
          className="btn btn-sm px-3 rounded-3"
          style={{
            backgroundColor: "#eff6ff",
            color: "#2563eb",
            fontWeight: "500",
          }}
        >
          Mark all as read
        </button>
      </div>

      <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
        <div className="list-group list-group-flush gap-5 ">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="list-group-item p-3  border-bottom position-relative"
              style={{ backgroundColor: "#fff" }}
            >
              <div className="d-flex align-items-start">
                {/* Icon Circle */}
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "45px",
                    height: "45px",
                    backgroundColor: n.color,
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>{n.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-1 fw-bold" style={{ color: "#1e293b" }}>
                      {n.title}
                    </h6>
                    <small className="text-muted">{n.time}</small>
                  </div>
                  <p className="mb-0 text-muted small pe-4">{n.desc}</p>
                </div>

                {/* Unread Indicator Dot */}
                {n.unread && (
                  <div
                    className="position-absolute m-3 end-0 top-50 translate-middle-y me-3"
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#2563eb",
                      borderRadius: "50%",
                    }}
                  ></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
