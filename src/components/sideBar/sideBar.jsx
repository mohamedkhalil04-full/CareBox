import "./sideBar.css";
import api from "../../api/axiosInstance";
import { NavLink, useNavigate } from 'react-router-dom';
import { UseProvider } from '../../context/providerContext';
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
  const activeBg = isSpareParts || isEmergency ? "#080616" : "#eff6fa"; 
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
      navigate("/login"); 
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
          backgroundColor: isSpareParts || isEmergency ? "#1e2937" : "#f8f9fa",
          color: isSpareParts || isEmergency ? "#e2e8f0" : "#dc3545",
          border: isSpareParts || isEmergency ? "1px solid #475569" : "1px solid #dc3545",
        }}
      >
        <span>🚪</span> Logout
      </button>
    </aside>
  );
};

export default SideBar;