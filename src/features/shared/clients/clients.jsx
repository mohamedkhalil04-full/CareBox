import React, { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import "./clients.css";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب العملاء
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/Bookings/MyClients");

        let data = res.data;

        // التعامل مع الـ response لو wrapped
        if (data && typeof data === "object" && !Array.isArray(data)) {
          data = data.data || [];
        }

        const safeClients = Array.isArray(data) ? data : [];
        setClients(safeClients);
        setFilteredClients(safeClients);
      } catch (err) {
        console.error("Error fetching clients:", err);
        setError("حدث خطأ أثناء جلب بيانات العملاء");
        setClients([]);
        setFilteredClients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // فلتر البحث المحلي
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredClients(clients);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = clients.filter((client) => {
      return [
        client.clientName,
        client.clientPhone,
        client.carMake,
        client.carModel,
        client.kilometers?.toString(),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(term);
    });

    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="fw-bold mb-0">Clients</h2>
        {/* <Button variant="danger" className="px-4 fw-semibold">
          + Add Client
        </Button> */}
      </div>

      {/* Search */}
      <InputGroup className="mb-4" style={{ maxWidth: "500px" }}>
        <Form.Control
          placeholder="Search clients by name, phone, or car..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">loading clients data...</p>
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded bg-white">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Car Brand</th>
                <th>Car Type</th>
                <th>Mileage (km)</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    {searchTerm
                      ? "No clients found matching your search."
                      : "No clients available yet."}
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id || client.clientId || Math.random()}>
                    <td className="fw-medium">{client.clientName || "—"}</td>
                    <td className="text-secondary">{client.clientPhone || "—"}</td>
                    <td className="text-secondary">{client.carMake || "—"}</td>
                    <td className="text-secondary">{client.carModel || "—"}</td>
                    <td className="text-secondary">
                      {client.kilometers != null
                        ? Number(client.kilometers).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Clients;