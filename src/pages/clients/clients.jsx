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
  return (


    <div className="container py-4">
      {/* Header + Add button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-3 fw-bolder my-5">Clients</h2>
        <button className="btn btn-danger px-4 my-5">
          + Add Client
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-lg search-input"
          placeholder="Search clients by name, phone, or car..."
        />
      </div>

      {/* Table */}
      <div className="table-responsive shadow-sm rounded overflow-hidden">
        <table className="table table-hover mb-0 clients-table">
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
            {clients.map((client, index) => (
              <tr key={index}>
                <td>{client.name}</td>
                <td>{client.phone}</td>
                <td>{client.brand}</td>
                <td>{client.type}</td>
                <td>{client.mileage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

export default Clients;