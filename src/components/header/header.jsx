// import { useProviderType } from '../../hooks/useProviderType'

// const Head = () => {
//   const { providerType } = useProviderType();

//   // // ألوان مختلفة حسب نوع الـ Provider
//   // const getHeaderStyle = () => {
//   //   switch (providerType) {
//   //     case "Maintenance":
//   //       return { backgroundColor: "#343a40", }; // رمادي غامق
//   //     case "Car Care":
//   //       return { backgroundColor: "#fff", }; // أحمر (اللون الأصلي)
//   //     case "Emergency":
//   //       return { backgroundColor: "#fd7e14", }; // برتقالي
//   //     case "Spare parts":
//   //       return { backgroundColor: "#198754", }; // أخضر
//   //     default:
//   //       return { backgroundColor: "#dc3545", };
//   //   }
//    };



import React from "react";
import "./header.css";
import logo from "../../../src/assets/images/proj-logo.png"
// import { useProviderType } from '../../hooks/useProviderType'
import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
const Head = () => {
  // const { providerType } = useProviderType();

  const [profile, setProfile] = useState({
    shopName: "",
    name: "",
  });

  const [formData, setFormData] = useState({ ...profile });

  
    // جلب البيانات
    useEffect(() => {
      const fetchName = async () => {
        try {
          const res = await api.get("/ProviderProfile");
          const data = res.data || {};

          const initial = {
            shopName: data.shopName || "",
            name: data.name || "",
          };
  
          setProfile(initial);
          setFormData(initial);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
  
      fetchName();
    }, []);
  return (
    <header
      className="d-flex align-items-center justify-content-between px-4"
      style={{
        height: "64px",
        borderBottom: "1px solid gray",
        // ...getHeaderStyle(),
      }}
    >
      
        <h2 className="mb-0 fw-bold">
          {formData.shopName}
        </h2>

      <div className="me-3 p-2">
        <img src={logo} alt="logo" width={90} height={60}/>
      </div>

      
    </header>
  );
};

export default Head;