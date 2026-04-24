import "./Home.css";

const EmergencyHome = () => {
  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className=" fw-bold font-monospace fst-italic">
          Dashboard Overview:
        </h1>
        <small className="text-muted">Last updated: Just now</small>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 hover-card">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-info bg-opacity-10 fs-4 text-info p-2 rounded">
                  <i className="fa-solid fa-triangle-exclamation mx-2 "></i>
                </div>
                <span className="ms-auto text-success fw-bold">
                  <i className="fa-solid fa-arrow-trend-up"></i>
                  +3 vs yesterday
                </span>
              </div>
              <h6 className="text-muted small">Today's Requests</h6>
              <h2 className="fw-bold">18</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 hover-card">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-danger bg-opacity-10 text-danger p-2 rounded">
                  <i class="fa-solid fa-heart"></i>
                </div>
                <span className="ms-auto text-success fw-bold">
                  <i class="fa-solid fa-circle"></i>
                  Live tracking
                </span>
              </div>
              <h6 className="text-muted small">Active Now</h6>
              <h2 className="fw-bold">5</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 hover-card">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-success bg-opacity-10 text-success p-2 rounded">
                  <i className="fa-regular fa-circle-check"></i>
                </div>
                <span className="ms-auto text-success fw-bold">
                  <i className="fa-solid fa-arrow-trend-up"></i>
                  +2 vs yesterday
                </span>
              </div>
              <h6 className="text-muted small">Completed Today</h6>
              <h2 className="fw-bold">13</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 hover-card">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-primary bg-opacity-10 text-primary p-2 rounded">
                  <i className="fa-regular fa-clock"></i>
                </div>
                <span className="ms-auto text-success fw-bold">
                  <i className="fa-solid fa-arrow-trend-up"></i>
                  -0.8 min improvement
                </span>
              </div>
              <h6 className="text-muted small">Avg Response Time</h6>
              <h2 className="fw-bold">4.2 min</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {/* Recent Requests */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white d-flex justify-content-between align-items-center p-4">
              <h5 className="fw-bold ">Recent Requests:</h5>
              <a href="#" className="text-primary text-decoration-none small">
                View all
              </a>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Request ID</th>
                    <th>Customer</th>
                    <th>Emergency Type</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>REQ-8921</strong>
                    </td>
                    <td>Ahmed</td>
                    <td>Battery Dead</td>
                    <td>
                      <span className="badge bg-warning text-dark">
                        Pending
                      </span>
                    </td>
                    <td className="text-muted">10 mins ago</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>REQ-8920</strong>
                    </td>
                    <td>Ziyad</td>
                    <td>Flat Tire</td>
                    <td>
                      <span className="badge bg-success">Completed</span>
                    </td>
                    <td className="text-muted">1 hour ago</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>REQ-8919</strong>
                    </td>
                    <td>Faisal</td>
                    <td>Accident</td>
                    <td>
                      <span className="badge bg-success">Completed</span>
                    </td>
                    <td className="text-muted">3 hours ago</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>REQ-8918</strong>
                    </td>
                    <td>Basel</td>
                    <td>Flat Tire</td>
                    <td>
                      <span className="badge bg-warning text-dark">
                        On the way
                      </span>
                    </td>
                    <td className="text-muted">15 mins ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Active Emergencies */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0 d-flex align-items-center fst-italic fs-4 text-danger">
                <span className="text-danger me-2">
                  <i className="fa-solid fa-triangle-exclamation mx-2"></i>
                </span>{" "}
                Active Emergencies :-
              </h5>
              <a href="#" className="text-primary text-decoration-none small">
                View all
              </a>
            </div>
            <div className="card-body">
              {/* Flat Tire */}
              <div className="border rounded p-3 mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge text-dark flat-tire fs-6">
                    Flat Tire
                  </span>
                  <small className="text-muted">Just now</small>
                </div>
                <h6 className="mb-1">Toyota Camry 2018</h6>
                <p className="text-muted small mb-2">Obour City, Cairo</p>
                <div className="d-flex align-items-center text-primary">
                  <span className="me-2">
                    <i className="fa-solid fa-circle"></i>
                  </span>
                  <strong>On the way</strong>
                </div>
              </div>

              {/* Dead Battery */}
              <div className="border rounded p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge text-dark flat-tire fs-6">
                    Dead Battery
                  </span>
                  <small className="text-muted">2 hours ago</small>
                </div>
                <h6 className="mb-1">Honda Civic 2015</h6>
                <p className="text-muted small mb-2">New Cairo, Cairo</p>
                <div className="d-flex align-items-center text-success">
                  <span className="me-2">
                    <i className="fa-solid fa-square-check" />
                  </span>
                  <strong>Completed</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHome;
