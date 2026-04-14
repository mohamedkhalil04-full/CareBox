// invoices
import React, { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await api.get("/Invoices/my-invoices");
      
      let data = response.data;
      if (data?.success && Array.isArray(data.data)) data = data.data;
      else if (Array.isArray(data)) data = data.data;

      setInvoices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء تحميل الفواتير");
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const filteredInvoices = invoices.filter(invoice =>
    (invoice.invoiceId?.toString() || "").includes(searchTerm) ||
    (invoice.clientName?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return Number(amount || 0).toLocaleString("en-US") + " EGP";
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="fw-bold">Invoices</h2>

        <input
          type="text"
          className="form-control"
          style={{ maxWidth: "320px" }}
          placeholder="Search by number or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-danger" role="status" />
          <p className="mt-3">Loading invoices...</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredInvoices.length === 0 ? (
            <div className="col-12 text-center py-5 text-muted">
              No invoices found
            </div>
          ) : (
            filteredInvoices.map((invoice) => (
              <div key={invoice.invoiceId} className="col-12 col-lg-6 col-xl-4">
                <div className="card h-100 shadow-sm border-0">
                  {/* Header */}
                  <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center py-3">
                    <div>
                      <strong>#{invoice.invoiceId}</strong>
                    </div>
                    <div className="text-muted small">
                      {formatDate(invoice.issueDate)}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="card-body">
                    <div className="mb-3">
                      <strong>Customer:</strong> {invoice.clientName || "—"}
                    </div>

                    {/* Items */}
                    <div className="mb-4">
                      {invoice.items && invoice.items.length > 0 ? (
                        invoice.items.map((item, index) => (
                          <div key={index} className="d-flex justify-content-between py-1 border-bottom">
                            <span>{item.itemDescription}</span>
                            <span className="fw-medium">
                              {formatCurrency(item.price)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted small">No services</p>
                      )}
                    </div>

                    {/* Total */}
                    <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                      <strong>Total</strong>
                      <strong className="text-danger fs-5">
                        {formatCurrency(invoice.totalAmount)}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Invoices;