
import React, { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import LoadingStyle from "../../../utils/loadingStyle";
const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchInventoryData = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/Products/Provider/Inventory");

      let data = res.data?.data || res.data || [];
      if (!Array.isArray(data)) data = [];

      setProducts(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  // حساب الإحصائيات محلياً (الحل الأفضل)
  const stats = React.useMemo(() => {
    const inStock = products.filter(p => {
      const stock = parseInt(p.currentStock ?? p.CurrentStock ?? 0);
      return stock > 20;
    }).length;

    const lowStock = products.filter(p => {
      const stock = parseInt(p.currentStock ?? p.CurrentStock ?? 0);
      return stock > 0 && stock <= 20;
    }).length;

    const outOfStock = products.filter(p => {
      const stock = parseInt(p.currentStock ?? p.CurrentStock ?? 0);
      return stock === 0;
    }).length;

    return { inStock, lowStock, outOfStock };
  }, [products]);

  // تحديث الكمية
  const handleUpdateStock = async (productId, currentStock) => {
    const newCountStr = prompt("Enter new stock count:", currentStock);

    if (newCountStr === null || newCountStr.trim() === "" || isNaN(newCountStr)) return;

    const newCount = parseInt(newCountStr);

    try {
      await api.patch(`/Products/Provider/UpdateProductCountStock/${productId}`, {
        count: newCount,
      });

      alert("Stock updated successfully");
      fetchInventoryData(); // تحديث كل البيانات
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update stock");
    }
  };

  const filteredProducts = products.filter((product) =>
    (product.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (product.productId?.toString() || "").includes(searchQuery)
  );

  const getStockColorClass = (stock) => {
    const s = parseInt(stock) || 0;
    if (s === 0) return "text-danger";
    if (s <= 20) return "text-warning";
    return "text-success";
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Inventory</h4>
      </div>

      {/* Alert */}
      {(stats.outOfStock > 0 || stats.lowStock > 0) && (
        <div className="alert alert-warning d-flex justify-content-between align-items-center">
          <div>
            <i className="fa-solid fa-triangle-exclamation mx-2"></i>
            <strong className="fs-5 fw-bolder">Inventory Alert: </strong>
            {stats.outOfStock} out of stock, {stats.lowStock} running low.
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm text-center">
            <h4 className="text-success">In Stock</h4>
            <h5 className="fw-bold text-success">{isLoading ? "..." : stats.inStock}</h5>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm text-center">
            <h4 className="text-warning">Low Stock</h4>
            <h5 className="fw-bold text-warning">{isLoading ? "..." : stats.lowStock}</h5>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm text-center">
            <h4 className="text-danger">Out of Stock</h4>
            <h5 className="fw-bold text-danger">{isLoading ? "..." : stats.outOfStock}</h5>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Product</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <div>
                  <LoadingStyle />
                  <tr><td colSpan="5" className="text-center py-4">Loading inventory...</td></tr>
                </div>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const stock = parseInt(product.currentStock ?? product.CurrentStock ?? 0);
                  const status = product.status ?? product.Status ?? "Unknown";

                  return (
                    <tr key={product.productId}>
                      <td className="ps-4">
                        <strong>{product.name}</strong><br />
                        <small className="text-muted">ID: {product.productId}</small>
                      </td>
                      <td>{product.categoryName || product.CategoryName || "—"}</td>
                      <td>
                        <span className={`fw-bold ${getStockColorClass(stock)}`}>
                          {stock}
                        </span>
                        <i
                          className="fa-solid fa-pen-to-square ms-2 text-muted"
                          style={{ cursor: "pointer", fontSize: "0.9rem" }}
                          onClick={() => handleUpdateStock(product.productId, stock)}
                        ></i>
                      </td>
                      <td className={`fw-bold ${getStockColorClass(stock)}`}>
                        {status}
                      </td>
                      <td>{product.lastUpdate || "—"}</td>
                    </tr>
                  );
                })
              ) : (
                <tr><td colSpan="5" className="text-center py-4">No results found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;