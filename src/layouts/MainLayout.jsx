import SideBar from '../components/sideBar/sideBar';
import Head from '../components/header/header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="d-flex vh-100 overflow-hidden"> 

      <div style={{ width: '260px', flexShrink: 0 }}>  
        <SideBar />
      </div>

      <div className="flex-grow-1 d-flex flex-column overflow-hidden">

        <Head />

        <main className="flex-grow-1 overflow-auto p-4" style={{ backgroundColor: "#f8f9fa" }}>{/* سكرول داخلي فقط */}
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;
