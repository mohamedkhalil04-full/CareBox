import "./sideBar.css";
import api from "../../api/axiosInstance";
import { NavLink, useNavigate } from 'react-router-dom';
import { UseProvider } from '../../context/ProviderContext';
import { getSidebarItems } from '../../constants/navigation';
import {useState, useEffect} from "react"

const SideBar =()=>{

  const [profile, setProfile] = useState({
      shopName: "",
      name: "",
    });
  
    const [formData, setFormData] = useState({ ...profile });
    const [logoPreview, setLogoPreview] = useState(null);
  // جلب البيانات
    useEffect(() => {
      const fetchProfile = async () => {
        
          const res = await api.get("/ProviderProfile");
          const data = res.data || {};
  
          //الرابط الأساسي للسيرفر (شيلنا /api من الـ baseURL اللي في ملف axios)
          const SERVER_URL = "http://careboxapi.runasp.net";
  
          const rawPath = data.logoImageUrl || "";
          const fullImageUrl = rawPath && !rawPath.startsWith("http") 
            ? `${SERVER_URL}${rawPath}` 
            : rawPath;
  
          const initial = {
            shopName: data.shopName || "",
            name: data.name || "",
          };

          
        setProfile(initial);
        setFormData(initial);
        if (fullImageUrl) {
          setLogoPreview(fullImageUrl);
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
        {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Workshop Logo"
                  className="rounded-circle border"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              ) : (
                <i className="fa-solid fa-car p-1 fs-2 mb-2"></i>
              )}
        
        <b className="mb-0 fw-bold text-center">{formData.shopName}</b>
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