import React from "react";
import "./header.css";
import { useProviderType } from '../../hooks/useProviderType'

const Head = () => {
  const { providerType } = useProviderType();

   // أيقونة الجرس حسب النوع
  const renderBellIcon = () => {
    switch (providerType) {
      case "Car Care":
        return <i style={{ fontSize:"30px" }}>🚿</i>;

      case "Emergency":
        return <i style={{ fontSize:"30px" }}>⚠️</i>;

      case "Spare parts":
      case "Spare parts and accessories":
        return <i className="bi bi-lightbulb-fill fs-4" style={{ color: "#fff" }}></i>; // حط فانوس هنا

      case "Maintenance":
        return <i style={{ fontSize:"30px" }}>🛠️</i>;
      // default:
      //   return <i></i>
         
    }
  // };
  // // ألوان مختلفة حسب نوع الـ Provider
  // const getHeaderStyle = () => {
  //   switch (providerType) {
  //     case "Maintenance":
  //       return { backgroundColor: "#343a40", }; // رمادي غامق
  //     case "Car Care":
  //       return { backgroundColor: "#fff", }; // أحمر (اللون الأصلي)
  //     case "Emergency":
  //       return { backgroundColor: "#fd7e14", }; // برتقالي
  //     case "Spare parts":
  //       return { backgroundColor: "#198754", }; // أخضر
  //     default:
  //       return { backgroundColor: "#dc3545", };
  //   }
   };

  return (
    <header
      className="d-flex align-items-center justify-content-between px-4"
      style={{
        height: "64px",
        borderBottom: "1px solid gray",
        // ...getHeaderStyle(),
      }}
    >
      <input
        type="search"
        className="search rounded m-3"
        placeholder="search bookings, clients, or services..."
      />

      <div className="me-3">
        {renderBellIcon()}
      </div>
    </header>
  );
};

export default Head;



