// import Navbar from '../components/Navbar/Navbar.jsx';
// import Footer from '../components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';
// import Newsletter from './../components/Newsletter/Newsletter';

const MainLayout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <main>
        <Outlet /> 
      </main>
      {/* <Newsletter /> */}
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
