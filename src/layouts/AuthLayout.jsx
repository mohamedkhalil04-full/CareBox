import { Outlet } from 'react-router-dom';
import ProjectLogo from "../assets/images/proj-logo.png";
import './AuthLayout.css'

const AuthLayout = () => {

  return (
    <div className='100-vh' id='auth'>
      <img src={ProjectLogo} className="p-3" alt="logo" width={100} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;