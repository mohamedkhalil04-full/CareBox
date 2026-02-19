import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import NotFound from "./pages/NotFound/NotFound";
import AuthLayout from "./layouts/AuthLayout";
import OTP from "./pages/OTP/otp";
import CreateNewPass from "./pages/CreateNewPass/CreateNewPass";
import EditProfile from "./pages/EditProfile/EditProfile";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* دول لوحدهم */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<OTP/>} />
          <Route path="/createnewpass" element={<CreateNewPass/>}/>
          <Route path="/editProfile" element={<EditProfile/>} />
        </Route>

        {/* صفحة الخطأ */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
