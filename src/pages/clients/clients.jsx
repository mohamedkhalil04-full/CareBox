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
const clients = [
  { name: 'Ziyad Niazy', phone: '+20 111 222 3333', brand: 'Honda', type: 'Civic', mileage: '45,200' },
  { name: 'Ahmed Mohamed', phone: '+20 111 222 3333', brand: 'Toyota', type: 'RAV4', mileage: '12,500' },
  { name: 'Hana Mohamed', phone: '+20 111 222 3333', brand: 'Ford', type: 'F-150', mileage: '89,000' },
  { name: 'Zain Yasser', phone: '+20 111 222 3333', brand: 'BMW', type: '3 Series', mileage: '34,100' },
  { name: 'Omar Salah', phone: '+20 111 222 3333', brand: 'Tesla', type: 'Model 3', mileage: '15,800' },
  { name: 'Ayman Gaber', phone: '+20 111 222 3333', brand: 'Subaru', type: 'Outback', mileage: '67,400' },
  { name: 'Mohamed Magdy', phone: '+20 111 222 3333', brand: 'Hyundai', type: 'Elantra', mileage: '28,900' },
];

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
    <>
      <h2>clients</h2> 
    </>
  );
};

export default Clients;