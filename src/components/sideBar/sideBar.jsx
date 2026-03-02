import "./sideBar.css";

import React from 'react';
import { Link } from 'react-router-dom';
import ProjectLogo from '../../assets/images/proj-logo.png';


  
const SideBar =()=>{





    return (
    // vh-100 بتخلي السايد بار ياخد 100% من طول الشاشة
    <aside className="bg-dark text-white d-flex flex-column p-3 vh-100 shadow" style={{ width: '260px' }}>
      
      {/* اللوجو واسم المشروع */}
      <div className="d-flex align-items-center gap-3 mb-5 mt-2 px-2">
        <img src={ProjectLogo} alt="Logo" width="45" />
        <h4 className="mb-0 text-danger fw-bold">CareBox</h4>
      </div>

      {/* لينكات التصفح */}
      <ul className="nav nav-pills flex-column mb-auto gap-2">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white bg-danger shadow-sm">
            <i className="me-2">🏠</i> Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/bookings" className="nav-link text-white">
            <i className="me-2">🔧</i> Bookings
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/clients" className="nav-link text-white">
            <i className="me-2">🔧</i> Clients
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/services" className="nav-link text-white">
            <i className="me-2">🔧</i> Services
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/reviews" className="nav-link text-white">
            <i className="me-2">🔧</i> Reviews
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link text-white">
            <i className="me-2">🔧</i> Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/settings" className="nav-link text-white">
            <i className="me-2">👥</i> Settings
          </Link>
        </li>
      </ul>

      <hr className="text-white-50" />
      
      {/* زرار تسجيل الخروج في الأسفل */}
      <button className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2">
        <span>🚪</span> Logout
      </button>
    </aside>
  );

}

export default SideBar


