import "./login.css";
import Register from "./../register/register";
import ProjectLogo from "../../assets/images/proj-logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("✅ Logged in successfully!");
      navigate("/");
    } else {
      alert("❌ Invalid email or password");
    }
  };
  return (
    <div id="back-page">
      <img src={ProjectLogo} className="p-3" alt="logo" width={100} />
      <div className="carebox-container p-5  my-4 rounded w-25 d-flex flex-column">
        {/* <div className="text-start mb-4"></div> */}
        <h2 className="mb-4 pt-3">Welcome back! Glad to see you, Again!</h2>

        <form onSubmit={handleSubmit}>
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
                type={showPassword?"text":"password"}
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
              href="/otp"
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
        </form>

       <div className="pt-5">
         <p className="text-center pt-5">
          Don't have an account?{" "}
          <a className="text-decoration-none " href="/register">
            <bold className="text-danger">Register Now</bold>
          </a>
        </p>
       </div>
      </div>
    </div>
  );
};

export default Login;
