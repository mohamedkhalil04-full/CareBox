import { NavLink } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div id="home">
      
    </div>
  );
};

export default Home;



// import React from 'react';

// export default function Home() {
//   // بيانات وهمية للكروت
//   const stats = [
//     { id: 1, title: 'Total Providers', value: '1,245', icon: '👥', color: 'primary' },
//     { id: 2, title: 'Total Services', value: '8,430', icon: '🔧', color: 'success' },
//     { id: 3, title: 'Active Users', value: '45.2K', icon: '📈', color: 'danger' },
//     { id: 4, title: 'Revenue', value: '$12,400', icon: '💰', color: 'warning' },
//   ];

//   return (
//     <div className="container-fluid p-0 bg-white">
//       <h4 className="mb-4 fw-bold text-dark">Dashboard Overview</h4>

//       {/* 1. قسم الكروت (Statistics Cards) */}
//       <div className="row g-4 mb-5">
//         {stats.map((stat) => (
//           <div className="col-12 col-md-6 col-lg-3" key={stat.id}>
//             <div className="card border-0 shadow-sm h-100 rounded-4">
//               <div className="card-body d-flex align-items-center justify-content-between p-4">
//                 <div>
//                   <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>{stat.title}</p>
//                   <h3 className="fw-bold mb-0">{stat.value}</h3>
//                 </div>
//                 <div 
//                   className={`bg-${stat.color} bg-opacity-10 text-${stat.color} rounded-circle d-flex align-items-center justify-content-center`}
//                   style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}
//                 >
//                   {stat.icon}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 2. قسم الجدول (Recent Activity) */}
//       <div className="card border-0 shadow-sm rounded-4">
//         <div className="card-header bg-white border-0 pt-4 pb-0 px-4">
//           <h5 className="fw-bold">Recent Registrations</h5>
//         </div>
//         <div className="card-body p-4">
//           <div className="table-responsive">
//             <table className="table table-hover align-middle mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th>Provider Name</th>
//                   <th>Service Type</th>
//                   <th>Date</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>
//                     <div className="d-flex align-items-center gap-2">
//                       <div className="bg-secondary rounded-circle" style={{width: '35px', height: '35px'}}></div>
//                       <span className="fw-bold">Auto Fix Center</span>
//                     </div>
//                   </td>
//                   <td>Car Maintenance</td>
//                   <td>Oct 24, 2023</td>
//                   <td><span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">Active</span></td>
//                   <td><button className="btn btn-sm btn-outline-dark rounded-pill px-3">View</button></td>
//                 </tr>
//                 {/* ممكن تكرر الـ tr هنا */}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
      
//     </div>
//   );
// }
