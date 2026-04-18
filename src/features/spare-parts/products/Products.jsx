const SparePartsProducts = () => {
  return (
    <div className="p-4 p-lg-5 bg-light min-vh-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 fw-bold">Products</h2>
        <button className="btn btn-dark px-4 py-2 d-flex align-items-center gap-2">
          <i className="fas fa-plus"></i> Add New Product
        </button>
      </div>

      {/* Filters & Search */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body py-3">
          <div className="row g-3 align-items-center">
            <div className="col-lg-5">
              <input
                type="text"
                className="form-control bg-body-secondary"
                placeholder="Search products..."
              />
            </div>
            <div className="col-lg-2 ">
              <select className="form-select bg-body-secondary ">
                <option>All Categories</option>
                <option>Brakes</option>
                <option>Fluids</option>
                <option>Electrical</option>
                <option>Ignition</option>
                <option>Filters</option>
                <option>Body</option>
              </select>
            </div>
            <div className="col-lg-2">
              <select className="form-select bg-body-secondary">
                <option>All Conditions</option>
                <option>New</option>
                <option>Refurbished</option>
                <option>Used</option>
              </select>
            </div>
            <div className="col-lg-3 text-lg-end">
              <div className="d-flex align-items-center justify-content-lg-end gap-2">
                <span className="text-muted small">Sort by:</span>
                <select className="form-select w-auto bg-body-secondary">
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Stock: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th style={{ width: "40px" }}></th>
                <th>Product</th>
                <th>Category</th>
                <th>Condition</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr>
                {/* <td><input type="checkbox" className="form-check-input" /></td> */}
                <img
                  src="/assets/images/OIP.webp"
                  alt=""
                  style={{ width: "150px" }}
                />
                <td>
                  <div className="fw-semibold">Premium Ceramic Brake Pads</div>
                  <div className="text-muted small">BP-CER-001</div>
                </td>
                <td>Brakes</td>
                <td>
                  <span className="badge bg-success p-2 ">New</span>
                </td>
                <td>
                  <strong>45 LE</strong>
                </td>
                <td>124</td>
                <td>
                  <span className="text-success fw-medium">Active</span>
                </td>
                <td className="text-center">
                  <button className="btn btn-link text-muted p-1">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-link text-muted p-1">
                    <i className="bi bi-trash"></i>
                  </button>
                  <button className="btn btn-link text-muted">
                    <i className="fas fa-pencil"></i>
                    <i className="m-2 fas fa-trash"></i>
                    <i className="fas fa-ellipsis-vertical"></i>
                  </button>
                </td>
              </tr>

              {/* Row 2 */}
              <tr>
                <img
                  src="/assets/images/OIP.webp"
                  alt=""
                  style={{ width: "150px" }}
                />
                <td>
                  <div className="fw-semibold">Synthetic Motor Oil 5W-30</div>
                  <div className="text-muted small">OIL-SYN-5W30</div>
                </td>
                <td>Fluids</td>
                <td>
                  <span className="badge bg-success p-2 ">New</span>
                </td>
                <td>
                  <strong>24 LE</strong>
                </td>
                <td>45</td>
                <td>
                  <span className="text-success fw-medium">Active</span>
                </td>
                <td className="text-center">
                  <button className="btn btn-link text-muted p-1">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-link text-muted p-1">
                    <i className="bi bi-trash"></i>
                  </button>
                  <button className="btn btn-link text-muted">
                    <i className="fas fa-pencil"></i>
                    <i className="m-2 fas fa-trash"></i>
                    <i className="fas fa-ellipsis-vertical"></i>
                  </button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr>
                <img
                  src="/assets/images/OIP.webp"
                  alt=""
                  style={{ width: "150px" }}
                />
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <div>
                      <div className="fw-semibold">OEM Alternator Assembly</div>
                      <div className="text-muted small">ALT-OEM-150A</div>
                    </div>
                  </div>
                </td>
                <td>Electrical</td>
                <td>
                  <span className="badge bg-secondary p-2 ">Refurbished</span>
                </td>
                <td>
                  <strong>185 LE</strong>
                </td>
                <td className="text-danger fw-medium">3</td>
                <td>
                  <span className="text-success fw-medium">Active</span>
                </td>
                <td className="text-center">
                  <button className="btn btn-link text-muted p-1">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-link text-muted p-1">
                    <i className="bi bi-trash"></i>
                  </button>
                  <button className="btn btn-link text-muted">
                    <i className="fas fa-pencil"></i>
                    <i className="m-2 fas fa-trash"></i>
                    <i className="fas fa-ellipsis-vertical"></i>
                  </button>
                </td>
              </tr>

              {/* Row 4 */}
              <tr>
                <img
                  src="/assets/images/OIP.webp"
                  alt=""
                  style={{ width: "150px" }}
                />
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <div>
                      <div className="fw-semibold">
                        High Performance Spark Plugs
                      </div>
                      <div className="text-muted small">SP-HP-X4</div>
                    </div>
                  </div>
                </td>
                <td>Ignition</td>
                <td>
                  <span className="badge bg-success p-2 ">New</span>
                </td>
                <td>
                  <strong>68 LE</strong>
                </td>
                <td className="text-danger fw-medium">0</td>
                <td>
                  <span className="badge bg-secondary p-2 ">Draft</span>
                </td>
                <td className="text-center">
                  <button className="btn btn-link text-muted p-1">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-link text-muted p-1">
                    <i className="bi bi-trash"></i>
                  </button>
                  <button className="btn btn-link text-muted">
                    <i className="fas fa-pencil"></i>
                    <i className="m-2 fas fa-trash"></i>
                    <i className="fas fa-ellipsis-vertical"></i>
                  </button>
                </td>
              </tr>

              {/* Row 5 */}
              <tr>
                <img
                  src="/assets/images/OIP.webp"
                  alt=""
                  style={{ width: "150px" }}
                />
                <td>
                  <div className="fw-semibold">Cabin Air Filter</div>
                  <div className="text-muted small">FIL-CAB-001</div>
                </td>
                <td>Filters</td>
                <td>
                  <span className="badge bg-success p-2 ">New</span>
                </td>
                <td>
                  <strong>180 LE</strong>
                </td>
                <td>210</td>
                <td>
                  <span className="text-success fw-medium">Active</span>
                </td>
                <td className="text-center">
                  <button className="btn btn-link text-muted p-1">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-link text-muted p-1">
                    <i className="bi bi-trash"></i>
                  </button>
                  <button className="btn btn-link text-muted">
                    <i className="fas fa-pencil"></i>
                    <i className="m-2 fas fa-trash"></i>
                    <i className="fas fa-ellipsis-vertical"></i>
                  </button>
                </td>
              </tr>

              {/* Row 6 */}
              <tr>
                <img
                  src="/assets/images/OIP.webp"
                  alt=""
                  style={{ width: "150px" }}
                />
                <td>
                  <div className="fw-semibold">
                    Front Bumper Cover (Unpainted)
                  </div>
                  <div className="text-muted small">BUM-FR-UNP</div>
                </td>
                <td>Body</td>
                <td>
                  <span className="badge bg-warning text-dark p-2 ">Used</span>
                </td>
                <td>
                  <strong>120 LE</strong>
                </td>
                <td className="text-danger fw-medium">2</td>
                <td>
                  <span className="text-success fw-medium">Active</span>
                </td>
                <td className="text-center">
                  <button className="btn btn-link text-muted p-1">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-link text-muted p-1">
                    <i className="bi bi-trash"></i>
                  </button>
                  <button className="btn btn-link text-muted">
                    <i className="fas fa-pencil"></i>
                    <i className="m-2 fas fa-trash"></i>
                    <i className="fas fa-ellipsis-vertical"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="card-footer bg-white d-flex justify-content-between align-items-center py-3">
          <div className="text-muted small">Showing 1-6 of 148 products</div>
          <nav>
            <ul className="pagination pagination-sm mb-0 gap-3">
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

export default SparePartsProducts;
