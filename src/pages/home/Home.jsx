import { NavLink } from "react-router-dom";
import "./home.css";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Home = () => {
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Revenue",
        data: [45, 52, 48, 60, 55, 67, 72, 69],
        backgroundColor: "#ff3b3b",
        borderRadius: 5,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return "$" + value + "k";
          },
        },
      },
    },
  };

  const servicesData = {
    labels: ["Oil", "Brake", "Engine", "Wash", "Tire"],
    datasets: [
      {
        label: "Services",
        data: [120, 95, 85, 75, 65],
        backgroundColor: "#ff3b3b",
      },
    ],
  };

  const bookingsData = {
    labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Bookings",
        data: [85, 100, 90, 110, 120, 115],
        backgroundColor: "#ff3b3b",
      },
    ],
  };

  return (
    <div id="home">
      <div className="container mt-4">
        {/* Revenue Chart */}
        <div className="card p-4 mb-4">
          <h5>Revenue Overview</h5>
          <Bar data={revenueData} options={options} />
        </div>

        <div className="row">
          {/* Top Services */}
          <div className="col-md-4">
            <div className="card p-3">
              <h6>Top 5 Most Requested Services</h6>
              <Bar data={servicesData} />
            </div>
          </div>

          {/* Monthly Bookings */}
          <div className="col-md-4">
            <div className="card p-3">
              <h6>Monthly Bookings</h6>
              <Bar data={bookingsData} />
            </div>
          </div>

          {/* Table */}
          <div className="col-md-4">
            <div className="card p-3">
              <h6>Today's Bookings</h6>

              <table className="table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Car Brand</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Oil Change</td>
                    <td>Toyota</td>
                  </tr>
                  <tr>
                    <td>Brake Service</td>
                    <td>Honda</td>
                  </tr>
                  <tr>
                    <td>Engine Repair</td>
                    <td>BMW</td>
                  </tr>
                  <tr>
                    <td>Car Wash</td>
                    <td>Ford</td>
                  </tr>
                  <tr>
                    <td>Tire Replacement</td>
                    <td>Hyundai</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
