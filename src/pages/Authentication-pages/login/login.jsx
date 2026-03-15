import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../../api/axiosInstance'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/Auth/login', { email, password });
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isLoggedIn", "true");
      // localStorage.setItem("userRole", response.data.providerTypeId); // دي عشان نوع المستخدم
      alert("✅ Welcome Back!");
      navigate("/home");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid email or password";
      alert(`❌ ${errorMsg}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="carebox-container p-2 mx-auto my-2 rounded  d-flex flex-column">

      <h2 className="mb-4 pt-3">Welcome back! Glad to see you, Again!</h2>
      <div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {/* check box for showing the password */}
        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((s) => !s)}
          />
          <label className="form-check-label" htmlFor="showPwdLogin">
            Show Password
          </label>
        </div>
      </div>

      <div className="text-end mb-4">
        <a
          href="/forgotPass"
          className="text-decoration-none text-danger"
          style={{ fontSize: "0.9em" }}
        >
          Forgot Your Password.
        </a>
      </div>

      <div className="pb-5">
        <button type="submit" className="btn w-100 p-3 text-danger bg-black w-100 mb-3 ">
          Login
        </button>
      </div>
      <div className="pt-3">
        <p className="text-center ">
          Don't have an account?{" "}
          <a className="text-decoration-none " href="/register">
            <label className="text-danger">Register Now</label>
          </a>
        </p>
      </div>
    </form>
  );
};

export default Login;