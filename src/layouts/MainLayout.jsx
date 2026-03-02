import SideBar from '../components/sideBar/sideBar';
import Head from '../components/header/header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className='d-flex'>

      <SideBar />
      <div className='w-100'>
        <Head />
        <main>
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default MainLayout;
