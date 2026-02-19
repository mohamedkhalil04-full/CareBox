import { NavLink } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <>
      <h1>HELLO FROM HOME</h1>

      <NavLink to="/login">login</NavLink>
      <NavLink to="/register">register</NavLink>
      <NavLink to="/otp">OTP</NavLink>
      <NavLink to="/createnewpass">Create new password</NavLink>
      <NavLink to="/editProfile">Edit Profile</NavLink>
    </>
  );
};

export default Home;
