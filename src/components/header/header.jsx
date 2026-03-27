import "./header.css";

const Head =()=>{

    return (
    <header 
      className="d-flex align-items-center justify-content-between px-4 bg-white" 
      style={{ height: '64px', borderBottom:"1px solid gray " }}
    >
     <input type="search" className="search rounded m-3" id="" placeholder="search bookings, clients, or sevices..." />

<i class="fa-regular fa-bell" style={{ fontSize: "28px", color: "#6c757d", cursor: "pointer" }}></i>
      
    </header>
  );
}

export default Head      