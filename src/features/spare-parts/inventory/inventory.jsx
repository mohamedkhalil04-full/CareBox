import React from "react";
import "./inventory.css";

const Inventory = () => {
  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Inventory</h4>
        <button className="btn btn-outline-secondary btn-sm">
          Export Report
        </button>
      </div>

      {/* Alert */}
      <div className="alert alert-warning d-flex justify-content-between align-items-center">
        <div>
          <i className="fa-solid fa-triangle-exclamation mx-2 "></i>
          <strong className="fs-5 fw-bolder">Inventory Alert:</strong> 1 out of
          stock, 3 running low.
        </div>
        <span style={{ cursor: "pointer" }}>
          <i className="fa-solid fa-x"></i>
        </span>
      </div>

      {/* Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card p-3 shadow-sm hover-card">
            <div className="d-flex">
              <i className="fas fa-box-open fs-3 m-3"></i>
              <div>
                <h4>Total SKUs</h4>
                <h5 className="fw-bold">6</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm hover-card">
            <div className="d-flex">
              <i className="fa-regular fa-circle-check text-success m-1 pt-1"></i>
              <div>
                <h4>In Stock</h4>
                <h5 className="fw-bold text-success">2</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm hover-card">
            <div className="d-flex">
              <i className="fa-solid fa-triangle-exclamation text-warning m-1 fs-4 "></i>
              <div>
                <h4>LOW STOCK</h4>
                <h5 className="fw-bold text-warning">3</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm hover-card">
            <div className="d-flex">
              <i className="fa-regular fa-circle-xmark text-danger m-1 pt-1 fs-5"></i>
              <div>
                <h4>Out Of Stock</h4>
                <h5 className="fw-bold text-danger">1</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or SKU..."
        />
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-lg align-middle mb-0 g-5">
            <thead className="table-light">
              <tr className="py-3">
                <th></th>
                <th>Product</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Reorder Level</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <strong>Premium Ceramic Brake Pads</strong>
                  <br />
                  <small className="text-muted">BP-CER-001</small>
                </td>
                <td>Brakes</td>
                <td>124</td>
                <td>20</td>
                <td className="text-success">In Stock</td>
                <td>Today, 10:00 AM</td>
              </tr>

              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <strong>Synthetic Motor Oil 5W-30</strong>
                  <br />
                  <small className="text-muted">OIL-SYN-5W30</small>
                </td>
                <td>Fluids</td>
                <td className="text-warning">45</td>
                <td>50</td>
                <td className="text-warning">Low Stock</td>
                <td>Yesterday</td>
              </tr>

              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <strong>OEM Alternator Assembly</strong>
                  <br />
                  <small className="text-muted">ALT-OEM-150A</small>
                </td>
                <td>Electrical</td>
                <td className="text-warning">3</td>
                <td>5</td>
                <td className="text-warning">Low Stock</td>
                <td>Oct 24, 2025</td>
              </tr>

              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <strong>High Performance Spark Plugs</strong>
                  <br />
                  <small className="text-muted">SP-HP-X4</small>
                </td>
                <td>Ignition</td>
                <td className="text-danger">0</td>
                <td>10</td>
                <td className="text-danger">Out of Stock</td>
                <td>Oct 23, 2025</td>
              </tr>

              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <strong>Cabin Air Filter</strong>
                  <br />
                  <small className="text-muted">FIL-CAB-001</small>
                </td>
                <td>Filters</td>
                <td>210</td>
                <td>30</td>
                <td className="text-success">In Stock</td>
                <td>Oct 20, 2025</td>
              </tr>

              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <strong>Front Bumper Cover (Unpainted)</strong>
                  <br />
                  <small className="text-muted">BUM-FR-UNP</small>
                </td>
                <td>Body</td>
                <td className="text-warning">2</td>
                <td>2</td>
                <td className="text-warning">Low Stock</td>
                <td>Oct 18, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
