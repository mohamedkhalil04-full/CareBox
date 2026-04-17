import "./sideBar.css";
import api from "../../api/axiosInstance";
import { NavLink, useNavigate } from 'react-router-dom';
import { UseProvider } from '../../context/ProviderContext';
import { getSidebarItems } from '../../constants/navigation';
import React, { useState, useEffect } from "react"; 

const SideBar =()=>{

const [profileData, setProfileData] = useState({ name: "", logo: "" });
const BASE_URL = "http://careboxapi.runasp.net"; 

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await api.get("/ProviderProfile/Profile");
      const data = res.data?.data || res.data || {};

        const rawPath = data.logoImageUrl || "";
        const fullImageUrl = rawPath && !rawPath.startsWith("http") 
          ? `${BASE_URL}${rawPath}` 
          : rawPath;
      setProfileData({
        name: data.shopName || data.name || "AutoFix Workshop",
        logo: fullImageUrl 
      });
    } catch (err) {
      console.error("Failed to fetch sidebar profile:", err);
    }
  };
  fetchProfile();
}, []);

const navigate = useNavigate()
const { providerType } = UseProvider();
const activeStyle = ({ isActive }) => ({
    color: isActive ? "red" : "",
    backgroundColor: isActive ? "#eff6fa" : "",
  });

const sidebarItems = getSidebarItems(providerType);

const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      // 1. نبلغ الباك إند (revoke) – نرسل التوكن في الـ body زي ما الـ endpoint متوقع
      await api.post('/Auth/revoke-token/logout', { token });
      // لو الباك رجع 401 هنا → الـ interceptor هيحاول refresh → لكن في الغالب مش لازم نعتمد عليه في logout
    }

  } catch (error) {
    // حتى لو فشل الـ revoke (مثلاً التوكن منتهي أو السيرفر down) → نكمل الـ logout محليًا
    console.error("Logout failed:", error?.response?.data || error.message);
  } finally {
    // 2. مسح البيانات المهمة فقط (مش clear() عشان ما نمسحش حاجات تانية)
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    // لو في refreshToken في المستقبل → localStorage.removeItem("refreshToken");

    // 3. إعادة توجيه + رسالة
    alert("Logged out successfully!");
    navigate("/"); 
    // أو window.location.href = "/" لو عايز reload كامل
  }
};
 
    return (
    <aside className="bg-white d-flex flex-column p-3 vh-100" style={{borderRight:'1px gray solid'}}>
      {/* الجزء الفوقاني بتاعه */}
      <div className="d-flex flex-column align-items-center  mb-4 mt-2">
        {profileData.logo ? (
      <img 
        src={profileData.logo.startsWith('http') ? profileData.logo : `${BASE_URL}${profileData.logo}`} 
        alt="Logo" 
        className="rounded-circle mb-2 shadow-sm"
        style={{ width: "60px", height: "60px", objectFit: "cover", border: "2px solid #f8f9fa" }}
        onError={(e) => { e.target.src = "https://via.placeholder.com/60"; }}
      />
    ) : (
      <i className="fa-solid fa-car p-1 fs-2 mb-2"></i> // أيقونة احتياطية
    )}
        <small className="text-secondary py-1">Welcome Back</small>
        <b className="mb-0 fw-bold text-center">{profileData.name || "AutoFix Workshop"}</b>
        {providerType && (
           <small className="text-muted mt-1" style={{ fontSize: '0.85rem' }}>
             {providerType}
           </small>
         )}
      </div>

      {/* لينكات التصفح */}
      <ul className="nav nav-pills flex-column mb-auto gap-2">
         {sidebarItems.map((item) => (
           <li className="nav-item" key={item.path} id="item-hover" >
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

      <hr className="text-dark-50"/>
       
      <button onClick={handleLogout} className="btn btn-outline-danger w-100 d-flex justify-content-center gap-2">
        <span>🚪</span> Logout
      </button>
    </aside>
  );

}

export default SideBar