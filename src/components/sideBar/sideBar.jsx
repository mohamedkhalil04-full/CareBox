import "./sideBar.css";
import { NavLink} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance"; // تأكد من المسار

const SideBar =()=>{
const navigate = useNavigate()
const activeStyle = ({ isActive }) => ({
    color: isActive ? "red" : "",
    backgroundColor: isActive ? "#eff6fa" : "",
  });

//   const handleLogout = async () => {
//   try {
//     // نبلغ الباك إند إننا هنقفل الـ Token ده
//     // ملحوظة: الـ axiosInstance بيبعت التوكن أوتوماتيك في الـ Headers
//     await api.post('/Auth/revoke-token/logout'); 
//   } catch (error) {
//     console.error("Logout error:", error);
//   } finally {
//     // 2. بنمسح كل الداتا من الـ localStorage سواء الريكويست نجح أو فشل
//     localStorage.removeItem("token");
//     localStorage.removeItem("isLoggedIn");
    
//     // 3. بنرجع اليوزر لصفحة اللوجن
//     alert("Logged out successfully!");
//     navigate("/"); 
//   }
// };
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
     
      <div className="d-flex flex-column align-items-center  mb-5 mt-2">
        <i class="fa-solid fa-car p-1"></i>
        <small className="text-secondary py-1">Welcome Back</small>
        <b className="mb-0  fw-bold">AutoFix Workshop</b>
      </div>

      {/* لينكات التصفح */}
      <ul className="nav nav-pills flex-column mb-auto gap-2">
        <li className="nav-item ">
          <NavLink style={activeStyle} to="/home" className="nav-link  ">
            <i className="me-2 "><i class="fa-regular fa-house"></i></i> Home
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink style={activeStyle} to="/bookings" className="nav-link ">
            <i className="me-2 "><i class="fa-regular fa-calendar"></i></i> Bookings
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink style={activeStyle} to="/clients" className="nav-link ">
            <i className="me-2 "><i class="fa-solid fa-users"></i></i> Clients
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink style={activeStyle} to="/services" className="nav-link ">
            <i className="me-2 "><i class="fa-solid fa-wrench"></i></i> Services
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink style={activeStyle} to="/reviews" className="nav-link ">
            <i className="me-2 "><i class="fa-regular fa-star"></i></i> Reviews
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink style={activeStyle} to="/profile" className="nav-link ">
            <i className="me-2 "><i class="fa-regular fa-user"></i></i> Profile
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink style={activeStyle} to="/about" className="nav-link  ">
            <i className="me-2 "><i class="fa-solid fa-award"></i></i> About Us
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink style={activeStyle} to="/settings" className="nav-link ">
            <i className="me-2 "><i class="fa-solid fa-gear"></i></i> Settings
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink style={activeStyle} to="/invoices" className="nav-link ">
            <i className="me-2 "><i class="fa-solid fa-gear"></i></i> invoices
          </NavLink>
        </li>
      </ul>

      <hr className="text-dark-50"/>
       
     
      <button onClick={handleLogout} className="btn btn-outline-danger w-100 d-flex justify-content-center gap-2">
        <span>🚪</span> Logout
      </button>
    </aside>
  );

}

export default SideBar


// import "./sideBar.css";
// import { NavLink } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axiosInstance";

// const SideBar = () => {
//   const navigate = useNavigate();
  
//   // 1. قراءة الـ Role من الـ localStorage
//   const userRole = parseInt(localStorage.getItem('userRole')); 

//   const activeStyle = ({ isActive }) => ({
//     color: isActive ? "red" : "",
//     backgroundColor: isActive ? "#eff6fa" : "",
//   });

//   // 2. تعريف اللينكات مع تحديد الـ Roles المسموحة لكل لينك
//   // 1: Maintenance, 2: Spare Parts, 3: Emergency, 4: Car Care
//   const menuItems = [
//     { path: "/home", label: "Home", icon: "fa-house", roles: [1, 2, 3, 4] },
//     { path: "/bookings", label: "Bookings", icon: "fa-calendar", roles: [1, 2, 3, 4] },
//     { path: "/clients", label: "Clients", icon: "fa-users", roles: [1, 2, 3, 4] },
    
//     // لينكات خاصة بمقدمي خدمات معينة
//     { path: "/services", label: "Maintenance Services", icon: "fa-wrench", roles: [1] },
//     { path: "/parts-inventory", label: "Parts Inventory", icon: "fa-gears", roles: [2] },
//     { path: "/emergency-requests", label: "Emergency Calls", icon: "fa-truck-medical", roles: [3] },
//     { path: "/washing-queue", label: "Washing Queue", icon: "fa-soap", roles: [4] },

//     { path: "/reviews", label: "Reviews", icon: "fa-star", roles: [1, 2, 3, 4] },
//     { path: "/profile", label: "Profile", icon: "fa-user", roles: [1, 2, 3, 4] },
//     { path: "/settings", label: "Settings", icon: "fa-gear", roles: [1, 2, 3, 4] },
//   ];

//   const handleLogout = async () => {
//     try {
//       await api.post('/Auth/revoke-token/logout'); 
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       localStorage.clear(); // بتمسح التوكن والـ Role وكل حاجة
//       alert("Logged out successfully!");
//       navigate("/"); 
//     }
//   };

//   return (
//     <aside className="bg-white d-flex flex-column p-3 vh-100" style={{ width: '260px' , borderRight:'1px gray solid' }}>
//       <div className="d-flex flex-column align-items-center mb-5 mt-2">
//         <i className="fa-solid fa-car p-1"></i>
//         <small className="text-secondary py-1">Welcome Back</small>
//         {/* ممكن هنا تظهر اسم الورشة ديناميكياً برضه */}
//         <b className="mb-0 fw-bold">CareBox Partner</b>
//       </div>

//       <ul className="nav nav-pills flex-column mb-auto gap-2">
//         {menuItems.map((item) => (
//           // 3. التشييك: لو الـ Role بتاع اليوزر موجود في الـ roles المسموحة للينك ده، اعرضه
//           item.roles.includes(userRole) && (
//             <li className="nav-item" key={item.path}>
//               <NavLink style={activeStyle} to={item.path} className="nav-link">
//                 <i className="me-2"><i className={`fa-regular ${item.icon}`}></i></i> {item.label}
//               </NavLink>
//             </li>
//           )
//         ))}
//       </ul>

//       <hr className="text-dark-50"/>
//       <button onClick={handleLogout} className="btn btn-outline-danger w-100 d-flex justify-content-center gap-2">
//         <span>🚪</span> Logout
//       </button>
//     </aside>
//   );
// };

// export default SideBar;
