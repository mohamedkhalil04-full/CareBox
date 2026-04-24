const AllRequests = () => {
  const requests = [
    {
      id: "REQ-8921",
      customer: "Sarah Ahmed",
      car: "Toyota Camry 2018",
      type: "Battery Dead",
      location: "124 Main St, Downtown",
      status: "Pending",
      tech: "Unassigned",
      time: "10 mins ago",
    },
    {
      id: "REQ-8920",
      customer: "faisal",
      car: "Honda Civic 2015",
      type: "Flat Tire",
      location: "Obour City, Cairo",
      status: "Completed",
      tech: "Ahmed Hassan",
      time: "1 hour ago",
    },
    {
      id: "REQ-8919",
      customer: "Basel",
      car: "Ford F-150 2019",
      type: "Engine Overheating",
      location: "New Cairo, Cairo",
      status: "Completed",
      tech: "Omar Khalil",
      time: "3 hours ago",
    },
    {
      id: "REQ-8918",
      customer: "Essam",
      car: "Hyundai Elantra",
      type: "Lockout",
      location: "Maadi",
      status: "On the way",
      tech: "Youssef Nabil",
      time: "15 mins ago",
    },
    {
      id: "REQ-8917",
      customer: "Ezat",
      car: "BMW 3 Series",
      type: "Accident Towing",
      location: "New Giza",
      status: "Accepted",
      tech: "Karim Mostafa",
      time: "20 mins ago",
    },
    {
      id: "REQ-8916",
      customer: "Niazy",
      car: "Audi A4",
      type: "Out of Gas",
      location: "Sodic",
      status: "Completed",
      tech: "Ahmed Hassan",
      time: "5 hours ago",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span className="badge bg-warning text-dark px-3 py-2">Pending</span>
        );
      case "Completed":
        return <span className="badge bg-success px-3 py-2">Completed</span>;
      case "On the way":
        return (
          <span className="badge bg-warning text-dark px-3 py-2">
            On the way
          </span>
        );
      case "Accepted":
        return (
          <span className="badge bg-info text-white px-3 py-2">Accepted</span>
        );
      default:
        return <span className="badge bg-secondary px-3 py-2">{status}</span>;
    }
  };

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">All Emergency Requests</h1>
          <p className="text-muted mb-0 fs-6">
            <i className="fa-solid fa-code-pull-request" />
            Manage and track all past and present service requests.
          </p>
        </div>
        <button className="btn btn-outline-dark d-flex align-items-center gap-2">
          <span>↓</span> Export
        </button>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-lg-5">
              <input
                type="text"
                className="form-control"
                placeholder="Search by ID, customer, or type..."
              />
            </div>
            <div className="col-lg-3">
              <select className="form-select">
                <option>Status: All</option>
                <option>Pending</option>
                <option>Completed</option>
                <option>On the way</option>
                <option>Accepted</option>
              </select>
            </div>
            <div className="col-lg-4 text-lg-end">
              <button className="btn btn-outline-secondary">
                Last 30 Days
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Request ID</th>
                <th>Customer &amp; Car</th>
                <th>Emergency Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Assigned Tech</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>
                    <strong className="text-primary">{req.id}</strong>
                  </td>
                  <td>
                    <div>
                      <strong>{req.customer}</strong>
                      <div className="text-muted small">{req.car}</div>
                    </div>
                  </td>
                  <td>{req.type}</td>
                  <td className="text-muted">{req.location}</td>
                  <td>{getStatusBadge(req.status)}</td>
                  <td className="text-muted">{req.tech}</td>
                  <td className="text-muted">{req.time}</td>
                  <td>
                    <button className="btn btn-link text-primary p-0 fw-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllRequests;
