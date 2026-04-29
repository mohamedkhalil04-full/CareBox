// import "./sideBar.css";
// import api from "../../api/axiosInstance";
// import { NavLink, useNavigate } from 'react-router-dom';
// import { UseProvider } from '../../context/ProviderContext';
// import { getSidebarItems } from '../../constants/navigation';
// import {useState, useEffect} from "react"

// const SideBar =()=>{

//   const [profile, setProfile] = useState({
//       shopName: "",
//       name: "",
//     });
  
//     const [formData, setFormData] = useState({ ...profile });
//     const [logoPreview, setLogoPreview] = useState(null);
//   // جلب البيانات
//     useEffect(() => {
//       const fetchProfile = async () => {
        
//           const res = await api.get("/ProviderProfile");
//           const data = res.data || {};
  
//           //الرابط الأساسي للسيرفر (شيلنا /api من الـ baseURL اللي في ملف axios)
//           const SERVER_URL = "http://careboxapi.runasp.net";
  
//           const rawPath = data.logoImageUrl || "";
//           const fullImageUrl = rawPath && !rawPath.startsWith("http") 
//             ? `${SERVER_URL}${rawPath}` 
//             : rawPath;
  
//           const initial = {
//             shopName: data.shopName || "",
//             name: data.name || "",
//           };

          
//         setProfile(initial);
//         setFormData(initial);
//         if (fullImageUrl) {
//           setLogoPreview(fullImageUrl);
//         }
//     };

//     fetchProfile();
//   }, []);

// const navigate = useNavigate()
// const { providerType } = UseProvider();
// const activeStyle = ({ isActive }) => ({
//     color: isActive ? "red" : "",
//     backgroundColor: isActive ? "#eff6fa" : "",
//   });

// const sidebarItems = getSidebarItems(providerType);

// const handleLogout = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     if (token) {
//       // 1. نبلغ الباك إند (revoke) – نرسل التوكن في الـ body زي ما الـ endpoint متوقع
//       await api.post('/Auth/revoke-token/logout', { token });
//       // لو الباك رجع 401 هنا → الـ interceptor هيحاول refresh → لكن في الغالب مش لازم نعتمد عليه في logout
//     }

//   } catch (error) {
//     // حتى لو فشل الـ revoke (مثلاً التوكن منتهي أو السيرفر down) → نكمل الـ logout محليًا
//     console.error("Logout failed:", error?.response?.data || error.message);
//   } finally {
//     // 2. مسح البيانات المهمة فقط (مش clear() عشان ما نمسحش حاجات تانية)
//     localStorage.removeItem("token");
//     localStorage.removeItem("isLoggedIn");
//     // لو في refreshToken في المستقبل → localStorage.removeItem("refreshToken");

//     // 3. إعادة توجيه + رسالة
//     alert("Logged out successfully!");
//     navigate("/"); 
//     // أو window.location.href = "/" لو عايز reload كامل
//   }
// };
 
//     return (
//     <aside className="bg-white d-flex flex-column p-3 vh-100" style={{borderRight:'1px gray solid'}}>
//       {/* الجزء الفوقاني بتاعه */}
//       <div className="d-flex flex-column align-items-center  mb-4 mt-2">
//         {logoPreview ? (
//                 <img
//                   src={logoPreview}
//                   alt="Workshop Logo"
//                   className="rounded-circle border"
//                   style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                 />
//               ) : (
//                 <i className="fa-solid fa-car p-1 fs-2 mb-2"></i>
//               )}
        
//         <b className="mb-0 fw-bold text-center">{formData.shopName}</b>
//         {providerType && (
//            <small className="text-muted mt-1" style={{ fontSize: '0.85rem' }}>
//              {providerType}
//            </small>
//          )}
//       </div>

//       {/* لينكات التصفح */}
//       <ul className="nav nav-pills flex-column mb-auto gap-2">
//          {sidebarItems.map((item) => (
//            <li className="nav-item" key={item.path} id="item-hover" >
//              <NavLink 
//                style={activeStyle} 
//                to={item.path} 
//                className="nav-link"
//              >
//                <i className={`me-2 ${item.icon}`}></i> {item.label}
//              </NavLink>
//            </li>
//          ))}
//       </ul>

//       <hr className="text-dark-50"/>
       
//       <button onClick={handleLogout} className="btn btn-outline-danger w-100 d-flex justify-content-center gap-2">
//         <span>🚪</span> Logout
//       </button>
//     </aside>
//   );

// }

// export default SideBar



import "./sideBar.css";
import api from "../../api/axiosInstance";
import { NavLink, useNavigate } from 'react-router-dom';
import { UseProvider } from '../../context/ProviderContext';
import { getSidebarItems } from '../../constants/navigation';
import { useState, useEffect } from "react";

const SideBar = () => {

  const [logoPreview, setLogoPreview] = useState(null);

  // جلب البيانات
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/ProviderProfile");
        const data = res.data || {};

        const SERVER_URL = "http://careboxapi.runasp.net";

        const rawPath = data.logoImageUrl || "";
        const fullImageUrl = rawPath && !rawPath.startsWith("http") 
          ? `${SERVER_URL}${rawPath}` 
          : rawPath;

        if (fullImageUrl) {
          setLogoPreview(fullImageUrl);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const navigate = useNavigate();
  const { providerType } = UseProvider();

  // تحديد نوع الثيم
  const isSpareParts = providerType === "Spare Parts";
  const isEmergency = providerType ==="Emergency"
  // ألوان ديناميكية
  const sidebarBg = isSpareParts || isEmergency ? "#0f172a" : "#ffffff";
  const textColor = isSpareParts || isEmergency ? "white" :"black";
  const textNavColor = isSpareParts || isEmergency ? "gray" : "gray";
  const activeBg = isSpareParts || isEmergency ? "#080616" : "#eff6fa"; // 162E93
  const activeText = isSpareParts || isEmergency ? "#ffffff" : "red";
  const borderColor = isSpareParts || isEmergency ? "#334155" : "gray";

  const activeStyle = ({ isActive }) => ({
    color: isActive ? activeText : textNavColor,
    backgroundColor: isActive ? activeBg : "",
  });

  const sidebarItems = getSidebarItems(providerType);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await api.post('/Auth/revoke-token/logout', { token });
      }
    } catch (error) {
      console.error("Logout failed:", error?.response?.data || error.message);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      alert("Logged out successfully!");
      navigate("/"); 
    }
  };

  return (
    <aside 
      className="d-flex flex-column p-3 vh-100" 
      style={{ 
        backgroundColor: sidebarBg,
        color: textNavColor,
        borderRight: `1px solid ${borderColor}` 
      }}
    >
      {/* الجزء الفوقاني بتاعه */}
      <div className="d-flex flex-column align-items-center mb-4 mt-2">
        {logoPreview ? (
          <img
            src={logoPreview}
            alt="Workshop Logo"
            className="rounded-circle"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ) : (
          <i className="fa-solid fa-car p-1 fs-2 mb-2"></i>
        )}

        {providerType && (
          <small className="mt-1" style={{ fontSize: '0.8rem' , color: textColor }}>
            {providerType}
          </small>
        )}
      </div>

      {/* لينكات التصفح */}
      <ul className="nav nav-pills flex-column mb-auto gap-2">
        {sidebarItems.map((item) => (
          <li className="nav-item" key={item.path} id="item-hover">
            <NavLink
              style={activeStyle}
              to={item.path}
              className="nav-link"
            >
              <i className={`me-2 ${item.icon}`}></i> {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <hr className="text-dark-50" style={{ borderColor: borderColor }} />

      <button 
        onClick={handleLogout} 
        className="btn w-100 d-flex justify-content-center gap-2"
        style={{
          backgroundColor: isSpareParts ? "#1e2937" : "#f8f9fa",
          color: isSpareParts ? "#e2e8f0" : "#dc3545",
          border: isSpareParts ? "1px solid #475569" : "1px solid #dc3545",
        }}
      >
        <span>🚪</span> Logout
      </button>
    </aside>
  );
};

export default SideBar;