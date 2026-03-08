import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// auth
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Authentication-pages/login/login"
import Register from "./pages/Authentication-pages/register/register";
import OTP from "./pages/Authentication-pages/OTP/otp";
import ForgotPass from "./pages/Authentication-pages/forgotPass/forgotPass";
import CreateNewPass from "./pages/Authentication-pages/CreateNewPass/CreateNewPass";

// main
import MainLayout from "./layouts/MainLayout";
import EditProfile from "./pages/EditProfile/EditProfile";
import Home from "./pages/home/Home";
import Bookings from './pages/bookings/bookings'
import Clients from './pages/clients/clients'
import Services from './pages/services/services'
import Reviews from './pages/reviews/reviews'
import Profile from './pages/profile/profile'
import Settings from './pages/settings/settings'


// not found
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* DashBoard */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/services" element={<Services />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* authontication*/}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<OTP/>} />
          <Route path="/createnewpass" element={<CreateNewPass/>}/>
          <Route path="/editProfile" element={<EditProfile/>} />
          <Route path='/forgotPass' element={<ForgotPass/>}/>
        </Route>

        {/* صفحة الخطأ */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
