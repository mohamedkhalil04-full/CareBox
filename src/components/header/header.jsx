import "./header.css";

const Head =()=>{



    return (
    // الهيدر بياخد عرض الجزء اللي هو جواه بس
    <header 
      className="d-flex align-items-center justify-content-between px-4 bg-white" 
      style={{ height: '64px', borderBottom:"1px solid gray " }}
    >
     <input type="search" className="search rounded" id="" placeholder="search bookings, clients, or sevices..." />

<i class="fa-regular fa-bell"></i>
      
    </header>
  );
}

export default Head