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

const Reports = () => {
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
  const data = [
    { type: "Emergency Towing", revenue: "1,440.00", jobs: 12, percentage: 35 },
    {
      type: "Battery Jump/Replace",
      revenue: "1,200.00",
      jobs: 24,
      percentage: 29,
    },
    { type: "Spare Parts Sales", revenue: "950.00", jobs: 45, percentage: 23 },
    { type: "Tire Change", revenue: "540.00", jobs: 18, percentage: 13 },
  ];

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className=" fw-bold font-monospace fst-italic">
            Operations Reports :-
          </h1>
          <p className="text-muted">
            Monitor your team performance and service metrics.
          </p>
        </div>

        <button className="btn m-4 px-3 bg-body-secondary text-success">
          <i className="fa-solid fa-download mx-2" />
          Download Report
        </button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-success bg-opacity-10 fs-4 text-success p-2 mb-3 rounded">
                  <i className="fa-solid fa-dollar mx-2 "></i>
                </div>
              </div>
              <h6 className="text-muted small">Today's Revenue</h6>
              <h2 className="fw-bold">450.00</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-danger bg-opacity-10 text-danger p-2 mb-3 rounded">
                  <i class="fa-solid fa-book"></i>
                </div>
              </div>
              <h6 className="text-muted small">Weekly Revenue</h6>
              <h2 className="fw-bold">3000</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-success bg-opacity-10 text-success p-2 mb-3 rounded">
                  <i className="fa-solid fa-arrow-trend-up" />
                </div>
              </div>
              <h6 className="text-muted small">Monthly Revenue</h6>
              <h2 className="fw-bold">13000</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-primary bg-opacity-10 text-primary p-2 mb-3 rounded">
                  <i className="fa-regular fa-clipboard"></i>
                </div>
              </div>
              <h6 className="text-muted small">Outstanding Invoices</h6>
              <h2 className="fw-bold">850.00</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pt-4 pb-0">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Revenue Overview</h5>
                <div className="btn-group btn-group-sm" role="group">
                  <div class="form-floating">
                    <select
                      class="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                    >
                      <option value="">This Week</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
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

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-5">Revenue by Service Type</h5>
              {data.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="text-secondary fw-medium">
                      {item.type}
                    </span>
                    <span className="fw-bold">{item.revenue}</span>
                  </div>

                  <div
                    className="progress mb-1"
                    style={{ height: "8px", backgroundColor: "#f0f2f5" }}
                  >
                    <div
                      className="progress-bar rounded-pill"
                      role="progressbar"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: "#2563eb",
                      }}
                      aria-valuenow={item.percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <small className="text-muted">{item.jobs} jobs</small>
                    <small className="text-muted">{item.percentage}%</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
