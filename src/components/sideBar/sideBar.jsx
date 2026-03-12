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

  const handleLogout = async () => {
  try {
    // نبلغ الباك إند إننا هنقفل الـ Token ده
    // ملحوظة: الـ axiosInstance بيبعت التوكن أوتوماتيك في الـ Headers
    await api.post('/Auth/revoke-token/logout'); 
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // 2. بنمسح كل الداتا من الـ localStorage سواء الريكويست نجح أو فشل
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    
    // 3. بنرجع اليوزر لصفحة اللوجن
    alert("Logged out successfully!");
    navigate("/"); 
  }
};
 


    return (
    
    <aside className="bg-white d-flex flex-column p-3 vh-100" style={{ width: '260px' , borderRight:'1px gray solid', }}>
     
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
          <NavLink style={activeStyle} to="/settings" className="nav-link ">
            <i className="me-2 "><i class="fa-solid fa-gear"></i></i> Settings
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


