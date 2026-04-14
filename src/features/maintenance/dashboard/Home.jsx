// // src/features/car-care/dashboard/Home.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import api from "../../../api/axiosInstance";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const CarCareHome = () => {
//   const navigate = useNavigate();

//   const [todayBookings, setTodayBookings] = useState([]);
//   const [monthlyEarnings, setMonthlyEarnings] = useState([]);
//   const [topServices, setTopServices] = useState([]);

//   const [loadingEarnings, setLoadingEarnings] = useState(true);
//   const [loadingBookings, setLoadingBookings] = useState(true);
//   const [loadingTopServices, setLoadingTopServices] = useState(true);

//   // 1. Monthly Earnings (الجراف الكبير العلوي)
//   const fetchMonthlyEarnings = async () => {
//     try {
//       setLoadingEarnings(true);
//       const currentYear = new Date().getFullYear();
//       const res = await api.get(`/Dashboard/ProviderDashboard/MonthlyEarnings?year=${currentYear}`);
      
//       let data = res.data?.data || res.data || [];
//       setMonthlyEarnings(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching monthly earnings:", err);
//       setMonthlyEarnings([]);
//     } finally {
//       setLoadingEarnings(false);
//     }
//   };

//   // 2. Top 5 Most Requested Services
//   const fetchTopServices = async () => {
//     try {
//       setLoadingTopServices(true);
//       const res = await api.get("/Dashboard/ProviderDashboard/TopServices?count=5");
      
//       let data = res.data?.data || res.data || [];
//       setTopServices(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching top services:", err);
//       setTopServices([]);
//     } finally {
//       setLoadingTopServices(false);
//     }
//   };

//   // 3. Today's Bookings
//   const fetchTodayBookings = async () => {
//     try {
//       setLoadingBookings(true);
//       const res = await api.get("/Bookings/ProviderBookings");
//       let data = res.data?.data || res.data || [];
//       if (!Array.isArray(data)) data = [];

//       const latest = data.slice(0, 5);
//       setTodayBookings(latest);
//     } catch (err) {
//       console.error("Error fetching today's bookings:", err);
//       setTodayBookings([]);
//     } finally {
//       setLoadingBookings(false);
//     }
//   };

//   useEffect(() => {
//     fetchMonthlyEarnings();
//     fetchTopServices();
//     fetchTodayBookings();
//   }, []);

//   const handleBookingClick = () => {
//     navigate("/bookings");
//   };

//   // بيانات Monthly Revenue Chart
//   const revenueData = {
//     labels: monthlyEarnings.map(item => item.monthName || `Month ${item.monthNumber}`),
//     datasets: [
//       {
//         label: "Monthly Revenue",
//         data: monthlyEarnings.map(item => item.totalEarnings || 0),
//         backgroundColor: "#ff3b3b",
//         borderRadius: 6,
//       },
//     ],
//   };

//   const revenueOptions = {
//     responsive: true,
//     plugins: { legend: { display: false } },
//     scales: {
//       y: {
//         ticks: { callback: (value) => `${value / 1000}k` },
//       },
//     },
//   };

//   // بيانات Top Services Chart
//   const topServicesData = {
//     labels: topServices.map(item => item.serviceName || "Unknown"),
//     datasets: [
//       {
//         label: "Request Count",
//         data: topServices.map(item => item.requestCount || 0),
//         backgroundColor: "#ff3b3b",
//         borderRadius: 6,
//       },
//     ],
//   };

//   return (
//     <div className="p-4">
//       <div className="container mt-4">
//         {/* Revenue Overview - الجراف الكبير */}
//         <div className="card p-4 mb-4 shadow-sm">
//           <h5 className="mb-3">Revenue Overview</h5>
//           {loadingEarnings ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-danger" role="status" />
//             </div>
//           ) : monthlyEarnings.length > 0 ? (
//             <Bar data={revenueData} options={revenueOptions} />
//           ) : (
//             <p className="text-muted text-center py-4">No revenue data available</p>
//           )}
//         </div>

//         <div className="row g-4">
//           {/* Top 5 Most Requested Services */}
//           <div className="col-md-4">
//             <div className="card p-3 h-100">
//               <h6>Top 5 Most Requested Services</h6>
//               {loadingTopServices ? (
//                 <p className="text-muted text-center py-4">Loading...</p>
//               ) : topServices.length > 0 ? (
//                 <Bar data={topServicesData} />
//               ) : (
//                 <p className="text-muted text-center py-4">No top services data</p>
//               )}
//             </div>
//           </div>

//           {/* Monthly Bookings - مؤقتاً (هنعدله بعدين) */}
//           <div className="col-md-4">
//             <div className="card p-3 h-100">
//               <h6>Monthly Bookings</h6>
//               <Bar data={{
//                 labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
//                 datasets: [{ label: "Bookings", data: [85, 100, 90, 110, 120, 115], backgroundColor: "#ff3b3b" }]
//               }} />
//             </div>
//           </div>

//           {/* Today's Bookings */}
//           <div className="col-md-4">
//             <div className="card p-3 h-100">
//               <h6 className="mb-3">Today's Bookings</h6>

//               {loadingBookings ? (
//                 <p className="text-muted">Loading bookings...</p>
//               ) : todayBookings.length === 0 ? (
//                 <p className="text-muted">No bookings today</p>
//               ) : (
//                 <div className="table-responsive" style={{ maxHeight: "320px", overflowY: "auto" }}>
//                   <table className="table table-hover table-sm">
//                     <thead className="table-light">
//                       <tr>
//                         <th>Service</th>
//                         <th>Car Brand</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {todayBookings.map((booking) => (
//                         <tr 
//                           key={booking.bookingId}
//                           style={{ cursor: "pointer" }}
//                           onClick={handleBookingClick}
//                           title="Click to view all bookings"
//                         >
//                           <td>{booking.servicesIncluded?.[0] || "—"}</td>
//                           <td>{booking.vehicleDetails || "—"}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}

//               <div className="text-end mt-3">
//                 <button 
//                   className="btn btn-sm btn-outline-danger"
//                   onClick={() => navigate("/bookings")}
//                 >
//                   View All Bookings →
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarCareHome;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../../../api/axiosInstance";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MaintenanceHome = () => {
  const navigate = useNavigate();

  const [todayBookings, setTodayBookings] = useState([]);
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [monthlyBookings, setMonthlyBookings] = useState([]);

  const [loadingEarnings, setLoadingEarnings] = useState(true);
  const [loadingTopServices, setLoadingTopServices] = useState(true);
  const [loadingMonthlyBookings, setLoadingMonthlyBookings] = useState(true);
  const [loadingTodayBookings, setLoadingTodayBookings] = useState(true);

  // Monthly Earnings
  const fetchMonthlyEarnings = async () => {
    try {
      setLoadingEarnings(true);
      const currentYear = new Date().getFullYear();
      const res = await api.get(`/Dashboard/ProviderDashboard/MonthlyEarnings?year=${currentYear}`);
      let data = res.data?.data || res.data || [];
      setMonthlyEarnings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setMonthlyEarnings([]);
    } finally {
      setLoadingEarnings(false);
    }
  };

  // Top 5 Services
  const fetchTopServices = async () => {
    try {
      setLoadingTopServices(true);
      const res = await api.get("/Dashboard/ProviderDashboard/TopServices?count=5");
      let data = res.data?.data || res.data || [];
      setTopServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setTopServices([]);
    } finally {
      setLoadingTopServices(false);
    }
  };

  // Monthly Bookings
  const fetchMonthlyBookings = async () => {
    try {
      setLoadingMonthlyBookings(true);
      const currentYear = new Date().getFullYear();
      const res = await api.get(`/Dashboard/ProviderDashboard/MonthlyBookings?year=${currentYear}`);
      let data = res.data?.data || res.data || [];
      setMonthlyBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setMonthlyBookings([]);
    } finally {
      setLoadingMonthlyBookings(false);
    }
  };

  // Today's Bookings - الجديد والأفضل
  const fetchTodayBookings = async () => {
    try {
      setLoadingTodayBookings(true);
      const res = await api.get("/Dashboard/ProviderDashboard/TodayBookings");
      let data = res.data?.data || res.data || [];
      setTodayBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching today bookings:", err);
      setTodayBookings([]);
    } finally {
      setLoadingTodayBookings(false);
    }
  };

  useEffect(() => {
    fetchMonthlyEarnings();
    fetchTopServices();
    fetchMonthlyBookings();
    fetchTodayBookings();
  }, []);

  const handleViewAllBookings = () => {
    navigate("/bookings");
  };

  // Revenue Chart
  const revenueData = {
    labels: monthlyEarnings.map(item => item.monthName || `Month ${item.monthNumber}`),
    datasets: [{
      label: "Monthly Revenue",
      data: monthlyEarnings.map(item => item.totalEarnings || 0),
      backgroundColor: "#ff3b3b",
      borderRadius: 6,
    }],
  };

  return (
    <div className="p-4">
      <div className="container mt-1">
                {/* Revenue Overview - الجزء العلوي الكبير (محسن) */}
        <div className="card p-4 mb-4 shadow-sm">
          <h5 className="mb-3">Revenue Overview</h5>
          
          {loadingEarnings ? (
            <div className="text-center py-5">
              <div className="spinner-border text-danger" role="status" />
              <p className="mt-3">Loading revenue data...</p>
            </div>
          ) : monthlyEarnings.length > 0 ? (
            <div style={{ height: "320px" }}>   {/* ← قللنا الارتفاع هنا */}
              <Bar 
                data={revenueData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: {
                      ticks: {
                        font: { size: 12 },
                        maxRotation: 45,
                        minRotation: 45,
                        padding: 10,
                      },
                    },
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => `${value / 1000}k`,
                      },
                    },
                  },
                }}
              />
            </div>
          ) : (
            <p className="text-muted text-center py-5">No revenue data available for this year</p>
          )}
        </div>

        <div className="row g-4">
          {/* Top 5 Most Requested Services */}
          <div className="col-md-4">
            <div className="card p-3 h-100">
              <h6 className="mb-3">Top 5 Most Requested Services</h6>
              {loadingTopServices ? (
                <p className="text-muted text-center py-4">Loading...</p>
              ) : (
                <div style={{ height: "280px" }}>
                  <Bar 
                    data={{
                      labels: topServices.map(item => item.serviceName),
                      datasets: [{
                        label: "Request Count",
                        data: topServices.map(item => item.requestCount || 0),
                        backgroundColor: "#ff3b3b",
                        borderRadius: 6,
                      }],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: { ticks: { font: { size: 11 }, maxRotation: 65, minRotation: 65, padding: 12 } },
                        y: { beginAtZero: true, ticks: { stepSize: 1 } },
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Monthly Bookings */}
          <div className="col-md-4">
            <div className="card p-3 h-100">
              <h6 className="mb-3">Monthly Bookings</h6>
              {loadingMonthlyBookings ? (
                <p className="text-muted text-center py-4">Loading...</p>
              ) : (
                <div style={{ height: "280px" }}>
                  <Bar 
                    data={{
                      labels: monthlyBookings.map(item => item.monthName || `Month ${item.month}`),
                      datasets: [{
                        label: "Bookings",
                        data: monthlyBookings.map(item => item.bookingCount || 0),
                        backgroundColor: "#ff3b3b",
                        borderRadius: 6,
                      }],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { ticks: { font: { size: 11 }, maxRotation: 45, minRotation: 45 } },
                        y: { beginAtZero: true, ticks: { stepSize: 1 } },
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Today's Bookings - باستخدام الـ API الجديد */}
          <div className="col-md-4">
            <div className="card p-3 h-100">
              <h6 className="mb-3">Today's Bookings</h6>

              {loadingTodayBookings ? (
                <p className="text-muted">Loading today's bookings...</p>
              ) : todayBookings.length === 0 ? (
                <p className="text-muted text-center py-4">No bookings today</p>
              ) : (
                <div className="table-responsive" style={{ maxHeight: "320px", overflowY: "auto" }}>
                  <table className="table table-hover table-sm">
                    <thead className="table-light">
                      <tr>
                        <th>Service</th>
                        <th>Customer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todayBookings.map((booking) => (
                        <tr 
                          key={booking.bookingId}
                          style={{ cursor: "pointer" }}
                          onClick={handleViewAllBookings}
                          title="Click to view all bookings"
                        >
                          <td>{booking.servicesIncluded?.[0] || booking.serviceName || "—"}</td>
                          <td>{booking.clientName || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="text-end mt-3">
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={handleViewAllBookings}
                >
                  View All Bookings →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceHome;