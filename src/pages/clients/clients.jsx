// import './clients.css'

// const Clients=()=>{
    

//     return(
//         <>
//         <h1>Clients</h1>
//         </>
//     )
// }

// export default Clients

import React, { useState, useEffect, useCallback } from "react";
import api from "../../api/axiosInstance";
import "./clients.css";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  var fetchClients = useCallback(async () => {
    try {
      const response = await api.get(""); 
      setClients(response.data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // منطق البحث (Filtering)
  const filteredClients = clients.filter(client => 
    client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phoneNumber?.includes(searchTerm) ||
    client.carBrand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="clients-container p-4">
      {/* الرأس: العنوان وزر الإضافة */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title m-0">Clients</h2>
        <button className="btn btn-primary-custom d-flex align-items-center gap-2 px-3 py-2">
          <i className="bi bi-plus-lg"></i> Add Client
        </button>
      </div>

      {/* الكارت الأساسي الذي يحتوي على البحث والجدول */}
      <div className="content-card shadow-sm">
        {/* شريط البحث */}
        <div className="p-4 border-bottom">
          <div className="search-wrapper position-relative" style={{ maxWidth: "400px" }}>
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            <input 
              type="text" 
              className="form-control custom-search-input ps-5" 
              placeholder="Search clients by name, phone, or car..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* جدول الزبائن */}
        <div className="table-responsive">
          <table className="table table-hover mb-0 custom-table ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Car Brand</th>
                <th>Car Type</th>
                <th>Mileage (km)</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td className="fw-bold">{client.name}</td>
                    <td className="text-secondary">{client.phoneNumber}</td>
                    <td className="text-secondary">{client.carBrand}</td>
                    <td className="text-secondary">{client.carType}</td>
                    <td className="text-secondary">{client.mileage?.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    No clients found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clients;