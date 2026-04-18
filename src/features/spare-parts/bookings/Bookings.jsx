const SparePartsOrders = () => {
  return (
    <div className="p-4 bg-light min-vh-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 fw-bold fs-2 text-dark">Orders</h4>
        <button className="btn btn-outline-dark fw-bold d-flex align-items-center gap-2 px-4">
          <i className="fas fa-download"></i>
          Export Orders
        </button>
      </div>

      {/* Status Tabs */}
      <div className="mb-4">
        <ul className="nav nav-tabs border-2 gap-5 pb-3">
          <li className="nav-item">
            <a className="nav-link active fw-medium px-0" href="#">
              All <span className="badge  rounded-5 ms-1">156</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-muted px-0" href="#">
              Pending{" "}
              <span className="badge  text-dark rounded-5 ms-1">12</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-muted px-0" href="#">
              Approved{" "}
              <span className="badge text-dark rounded-pill ms-1">25</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-muted px-0" href="#">
              Preparing{" "}
              <span className="badge text-dark rounded-5 ms-1">18</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-muted px-0" href="#">
              Out for Delivery{" "}
              <span className="badge  text-dark rounded-pill ms-1">10</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-muted px-0" href="#">
              Completed{" "}
              <span className="badge text-dark rounded-pill ms-1">91</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Search and Date Filter */}
      <div className="row g-3 mb-4">
        <div className="col-lg-5">
          <div className="input-group">
            <input
              type="text"
              className="form-control py-2"
              placeholder="Search order ID, customer..."
            />
          </div>
        </div>
        <div className="col-lg-4">
          <input
            type="text"
            className="form-control py-2"
            value="Oct 1 - Oct 31, 2023"
            readOnly
          />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4" style={{ width: "50px" }}>
                  <input type="checkbox" className="form-check-input" />
                </th>
                <th>Order #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Car Details</th>
                <th>Items</th>
                <th>Delivery</th>
                <th>Status</th>
                <th>Total</th>
                <th style={{ width: "40px" }}></th>
              </tr>
            </thead>
            <tbody className="border-top">
              <tr>
                <td className="ps-4">
                  <input type="checkbox" className="form-check-input" />
                </td>
                <td>
                  <strong className="text-primary">ORD-7829</strong>
                </td>
                <td className="text-muted">Oct 25, 2023</td>
                <td>Ziyad Niazy</td>
                <td>Honda Civic 2019</td>
                <td className="text-muted">2 items (Brake Pads Set...)</td>
                <td>
                  <span className="badge rounded-pill border border-primary text-primary bg-primary-subtle px-3 py-2">
                    Delivery
                  </span>
                </td>
                <td>
                  <span className="badge bg-warning px-3 py-2 text-dark">
                    Pending
                  </span>
                </td>
                <td>
                  <strong>450 LE</strong>
                </td>
                <td className="text-muted">⋯</td>
              </tr>

              <tr>
                <td className="ps-4">
                  <input type="checkbox" className="form-check-input" />
                </td>
                <td>
                  <strong className="text-primary">ORD-7828</strong>
                </td>
                <td className="text-muted">Oct 25, 2023</td>
                <td>Abdallah</td>
                <td>Toyota Camry 2021</td>
                <td className="text-muted">1 item (Oil Filter)</td>
                <td>
                  <span className="badge rounded-pill border border-success text-primary bg-success-subtle text-dark px-3 py-2">
                    Pickup
                  </span>
                </td>
                <td>
                  <span className="badge bg-primary px-3 py-2">Approved</span>
                </td>
                <td>
                  <strong>1,250 LE</strong>
                </td>
                <td className="text-muted">⋯</td>
              </tr>

              <tr>
                <td className="ps-4">
                  <input type="checkbox" className="form-check-input" />
                </td>
                <td>
                  <strong className="text-primary">ORD-7827</strong>
                </td>
                <td className="text-muted">Oct 24, 2023</td>
                <td>Hussin</td>
                <td>Ford F-150 2018</td>
                <td className="text-muted">1 item (Alternator)</td>
                <td>
                  <span className="badge rounded-pill border border-primary text-primary bg-primary-subtle px-3 py-2">
                    Delivery
                  </span>
                </td>
                <td>
                  <span className="badge bg-dark text-white px-3 py-2">
                    Preparing
                  </span>
                </td>
                <td>
                  <strong>185 LE</strong>
                </td>
                <td className="text-muted">⋯</td>
              </tr>

              <tr>
                <td className="ps-4">
                  <input type="checkbox" className="form-check-input" />
                </td>
                <td>
                  <strong className="text-primary">ORD-7826</strong>
                </td>
                <td className="text-muted">Oct 24, 2023</td>
                <td>Assem</td>
                <td>BMW 3 Series 2020</td>
                <td className="text-muted">4 items (Spark Plugs)</td>
                <td>
                  <span className="badge rounded-pill border border-primary text-primary bg-primary-subtle px-3 py-2">
                    Delivery
                  </span>
                </td>
                <td>
                  <span className="badge bg-info text-white px-3 py-2">
                    Out for Delivery
                  </span>
                </td>
                <td>
                  <strong>680 LE</strong>
                </td>
                <td className="text-muted">⋯</td>
              </tr>

              <tr>
                <td className="ps-4">
                  <input type="checkbox" className="form-check-input" />
                </td>
                <td>
                  <strong className="text-primary">ORD-7825</strong>
                </td>
                <td className="text-muted">Oct 24, 2023</td>
                <td>Salah</td>
                <td>Nissan Altima 2017</td>
                <td className="text-muted">1 item (Cabin Air Filter)</td>
                <td>
                  <span className="badge rounded-pill border border-success text-primary bg-success-subtle text-dark px-3 py-2">
                    Pickup
                  </span>
                </td>
                <td>
                  <span
                    style={{ backgroundColor: "#23c55e" }}
                    className="badge px-3 py-2"
                  >
                    Completed
                  </span>
                </td>
                <td>
                  <strong>180 LE</strong>
                </td>
                <td className="text-muted">⋯</td>
              </tr>

              <tr>
                <td className="ps-4">
                  <input type="checkbox" className="form-check-input" />
                </td>
                <td>
                  <strong className="text-primary">ORD-7824</strong>
                </td>
                <td className="text-muted">Oct 23, 2023</td>
                <td>Tallat</td>
                <td>Hyundai Elantra 2022</td>
                <td className="text-muted">2 items (Windshield Wipers)</td>
                <td>
                  <span className="badge rounded-pill border border-primary text-primary bg-primary-subtle px-3 py-2">
                    Delivery
                  </span>
                </td>
                <td>
                  <span
                    style={{ backgroundColor: "#23c55e" }}
                    className="badge  px-3 py-2"
                  >
                    Completed
                  </span>
                </td>
                <td>
                  <strong>320 LE</strong>
                </td>
                <td className="text-muted">⋯</td>
              </tr>

              <tr>
                <td className="ps-4">
                  <input type="checkbox" className="form-check-input" />
                </td>
                <td>
                  <strong className="text-primary">ORD-7823</strong>
                </td>
                <td className="text-muted">Oct 23, 2023</td>
                <td>Hazem</td>
                <td>Chevrolet Silverado 2019</td>
                <td className="text-muted">1 item (Battery 12V)</td>
                <td>
                  <span className="badge rounded-pill border border-success text-primary bg-success-subtle text-dark px-3 py-2">
                    Pickup
                  </span>
                </td>
                <td>
                  <span
                    style={{ backgroundColor: "#23c55e" }}
                    className="badge  px-3 py-2"
                  >
                    Completed
                  </span>
                </td>
                <td>
                  <strong>1,450 LE</strong>
                </td>
                <td className="text-muted">⋯</td>
              </tr>

              <tr>
                <td className="ps-4">
                  <input type="checkbox" className="form-check-input" />
                </td>
                <td>
                  <strong className="text-primary">ORD-7822</strong>
                </td>
                <td className="text-muted">Oct 22, 2023</td>
                <td>Mahmoud</td>
                <td>Subaru Outback 2020</td>
                <td className="text-muted">2 items (Headlight Bulbs)</td>
                <td>
                  <span className="badge rounded-pill border border-primary text-primary bg-primary-subtle px-3 py-2">
                    Delivery
                  </span>
                </td>
                <td>
                  <span
                    style={{ backgroundColor: "#23c55e" }}
                    className=" badge  px-3 py-2"
                  >
                    Completed
                  </span>
                </td>
                <td>
                  <strong>540 LE</strong>
                </td>
                <td className="text-muted">⋯</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center py-3 px-4">
          <div className="text-muted small">Showing 1-8 of 156 orders</div>
          <nav>
            <ul className="pagination pagination-sm mb-0 gap-2">
              <li className="page-item">
                <a className="page-link" href="#">
                  Prev
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  20
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SparePartsOrders;
