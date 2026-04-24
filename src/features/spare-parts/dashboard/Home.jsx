import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

import "../inventory/inventory.css";

const SparePartsHome = () => {
  // Revenue Chart Data & Options
  const revenueData = {
    labels: ["1", "5", "10", "15", "20", "25", "30"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1800, 1600, 2400, 2100, 2800, 3200],
        borderColor: "#3b82f6",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return;
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top,
          );
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.05)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0.4)");
          return gradient;
        },
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        fill: true,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#1e2937",
        titleColor: "#fff",
        bodyColor: "#cbd5e1",
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { color: "#e2e8f0", lineWidth: 1 },
        ticks: { color: "#64748b", font: { size: 12 } },
      },
      y: {
        min: 0,
        max: 3500,
        grid: { color: "#e2e8f0" },
        ticks: {
          color: "#64748b",
          font: { size: 12 },
          callback: (value) => value + " " + "EGP",
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return (
    <div className="p-4 p-lg-5 bg-light min-vh-100">
      {/* Top Stats Cards - Same as before */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card h-100 border-0 shadow-sm hover-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 fs-6">Total Orders</p>
                  <h2 className="mb-0 fw-semibold">1,284</h2>
                </div>
                <div className="fs-1 text-secondary">
                  <i className="fas fa-shopping-cart"></i>
                </div>
              </div>
              <div className="mt-3 d-flex align-items-center text-success">
                <span className="fw-medium">
                  <i className="fas fa-arrow-up"></i> 12.5%
                </span>
                <span className="text-muted ms-2 small">vs last month</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card h-100 border-0 shadow-sm hover-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 fs-6">Revenue</p>
                  <h2 className="mb-0 fw-semibold">$24,500</h2>
                </div>
                <div className="fs-1 text-secondary">
                  <i className="fas fa-dollar-sign"></i>
                </div>
              </div>
              <div className="mt-3 d-flex align-items-center text-success">
                <span className="fw-medium">
                  <i className="fas fa-arrow-up"></i>8.2%
                </span>
                <span className="text-muted ms-2 small">vs last month</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card h-100 border-0 shadow-sm hover-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 fs-6">Cancelled Orders</p>
                  <h2 className="mb-0 fw-semibold">6</h2>
                </div>
                <div className="fs-1 text-secondary">
                  <i className="fas fa-box-open"></i>
                </div>
              </div>
              <div className="mt-3 d-flex align-items-center text-danger">
                <span className="fw-medium">
                  <i className="fas fa-arrow-down"></i> 2.1%
                </span>
                <span className="text-muted ms-2 small">vs last month</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card h-100 border-0 shadow-sm hover-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 fs-6">Pending Orders</p>
                  <h2 className="mb-0 fw-semibold">12</h2>
                </div>
                <div className="fs-1 text-warning">
                  <i className="fas fa-exclamation-circle"></i>
                </div>
              </div>
              <p className="text-warning fw-medium mt-3 mb-0 small">
                Requires action
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Revenue Overview with Real Chart.js Line Chart */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pt-4 pb-0">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Revenue Overview</h5>
                <div className="btn-group btn-group-sm" role="group">
                  <button
                    type="button"
                    className="btn btn-outline-secondary active rounded-start-pill"
                  >
                    7d
                  </button>
                  <button type="button" className="btn btn-outline-secondary">
                    30d
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-end-pill"
                  >
                    90d
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div style={{ height: "340px" }}>
                <Line data={revenueData} options={revenueOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Order Status - Same as previous */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Order Status</h5>

              <div className="d-flex justify-content-center my-4">
                <div
                  className="position-relative"
                  style={{ width: "220px", height: "220px" }}
                >
                  <div
                    className="mx-auto"
                    style={{
                      width: "220px",
                      height: "220px",
                      borderRadius: "50%",
                      background: `conic-gradient(
                        #22c55e 0deg 200deg,
                        #3b82f6 200deg 290deg,
                        #eab308 290deg 340deg,
                        #1e2937 340deg 360deg
                      )`,
                      position: "relative",
                    }}
                  >
                    <div
                      className="position-absolute top-50 start-50 translate-middle bg-white rounded-circle d-flex align-items-center justify-content-center flex-column shadow-sm"
                      style={{ width: "140px", height: "140px" }}
                    >
                      <h2 className="mb-0 fw-bold">150</h2>
                      <small className="text-muted">Total Orders</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-3 text-start">
                <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="bg-success rounded-circle"
                      style={{ width: "12px", height: "12px" }}
                    ></div>
                    <span className="small">Completed</span>
                    <div className="fw-semibold ms-4">85</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="bg-primary rounded-circle"
                      style={{ width: "12px", height: "12px" }}
                    ></div>
                    <span className="small">Approved</span>
                    <div className="fw-semibold ms-4">25</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="bg-warning rounded-circle"
                      style={{ width: "12px", height: "12px" }}
                    ></div>
                    <span className="small">Pending</span>
                    <div className=" fw-semibold ms-4">12</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="bg-danger rounded-circle"
                      style={{ width: "12px", height: "12px" }}
                    ></div>
                    <span className="small">Out for Delivery</span>
                    <div className="fw-semibold ms-4">10</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="bg-dark rounded-circle"
                      style={{ width: "12px", height: "12px" }}
                    ></div>
                    <span className="small">Preparing</span>
                    <div className="fw-semibold ms-4">18</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table - Same as before */}
      <div className="card border-0 shadow-sm mt-5">
        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
          <h5 className="mb-0">Recent Orders</h5>
          <a
            href="#"
            className="text-primary text-decoration-none small fw-medium"
          >
            View All Orders <span className="ms-1">→</span>
          </a>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Car & Part</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>ORD-7829</strong>
                </td>
                <td>Ahmed Mohamed</td>
                <td>
                  Brake Pads Set
                  <br />
                  <small className="text-muted">Honda Civic 2019</small>
                </td>
                <td>
                  <small>Today, 10:42 AM</small>
                </td>
                <td>
                  <strong>450 LE</strong>
                </td>
                <td>
                  <span className="fs-6 badge bg-warning text-dark rounded-5">
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>ORD-7828</strong>
                </td>
                <td>Sarah Fahmy</td>
                <td>
                  Oil Filter
                  <br />
                  <small className="text-muted">Toyota Camry 2021</small>
                </td>
                <td>
                  <small>Today, 09:15 AM</small>
                </td>
                <td>
                  <strong>1,200 LE</strong>
                </td>
                <td>
                  <span className="fs-6 rounded-5 badge bg-primary">
                    Approved
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>ORD-7827</strong>
                </td>
                <td>Faiz Ahmed</td>
                <td>
                  Alternator
                  <br />
                  <small className="text-muted">Ford F-150 2018</small>
                </td>
                <td>
                  <small>Yesterday, 04:30 PM</small>
                </td>
                <td>
                  <strong>185 LE</strong>
                </td>
                <td>
                  <span className="fs-6 rounded-5 badge bg-dark">
                    Preparing
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>ORD-7826</strong>
                </td>
                <td>Mona Ali</td>
                <td>
                  Spark Plugs (x4)
                  <br />
                  <small className="text-muted">BMW 3 Series 2020</small>
                </td>
                <td>
                  <small>Yesterday, 02:10 PM</small>
                </td>
                <td>
                  <strong>680 LE</strong>
                </td>
                <td>
                  <span className="fs-6 rounded-5 badge bg-danger text-white">
                    Out for Delivery
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SparePartsHome;
