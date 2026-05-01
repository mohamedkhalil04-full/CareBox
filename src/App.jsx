import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProviderProvider } from './context/providerContext';

// auth
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Authentication-pages/login/login"
import Register from "./pages/Authentication-pages/register/register";
import OTP from "./pages/Authentication-pages/OTP/otp";
import ForgotPass from "./pages/Authentication-pages/forgotPass/forgotPass";
import CreateNewPass from "./pages/Authentication-pages/CreateNewPass/CreateNewPass";

// main
import MainLayout from "./layouts/MainLayout";
// Shared Features     
import Clients from "./features/shared/clients/Clients";
import Invoices from "./features/shared/invoices/Invoices";
import Reviews from "./features/shared/reviews/Reviews";
import Profile from "./features/shared/profile/Profile";
// import Settings from "./features/shared/settings/Settings";
import About from "./features/shared/about/About";
// // Wrappers for dynamic pages
import HomeWrapper from "./features/home/HomeWrapper";
import BookingWrapper from "./features/bookings/BookingWrapper";
import ServiceWrapper from "./features/services/ServiceWrapper";

// special for spare parts
import Inventory from './features/spare-parts/inventory/inventory'

// special for emergency
import Reports from "./features/emergency/Reports/reports"
import AllRequests from "./features/emergency/All Requests/allRequests"
import EmergencyRequests from "./features/emergency/Emergency Requests/emergencyRequests";
// import Notifications from "./features/emergency/Notifications/notifications";
import MyTech from "./features/emergency/myTech/myTech"
// Not Found
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <ProviderProvider>   {/* Context هنا */}
      <Router>
        <Routes>
          {/* Main LayOut "protected routes" for Dashboard */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomeWrapper />} />
            <Route path="/bookings" element={<BookingWrapper />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/services" element={<ServiceWrapper />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/settings" element={<Settings />} /> */}
            
            {/* only spare parts */}
            <Route path="/inventory" element={<Inventory />} />

            {/* only emergency */}
            <Route path="/allRequests" element={<AllRequests/>}/>
            <Route path="/EmergencyRequests" element={<EmergencyRequests/>}/>
            {/* <Route path="/Notifications" element={<Notifications/>}/> */}
            <Route path="/MyTech" element={<MyTech/>}/>
            <Route path="/Reports" element={<Reports/>}/>
          </Route>

          {/* authontication routes*/}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/createnewpass" element={<CreateNewPass />} />
            <Route path='/forgotPass' element={<ForgotPass />} />
          </Route>

          {/*404 Not Found*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ProviderProvider>
  );
}
export default App;