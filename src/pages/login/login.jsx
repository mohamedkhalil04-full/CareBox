import "./login.css";
import Register from './../register/register';

const Login = () => {
  
  return (
    <div className="carebox-container">
      <div className="text-start mb-4"></div>

      <h2 className="mb-4">Welcome back! Glad to see you, Again!</h2>

      <form>
        <div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
        </div>

        <div className="text-end mb-4">
          <a
            href="/forgot-password"
            className="text-decoration-none"
            style={{ fontSize: "0.9em" }}
          >
            Forgot Your Password.
          </a>
        </div>

        <button type="submit" className="btn text-danger bg-black w-100 mb-3">
          Login
        </button>
      </form>

      <p className="text-center mt-4">
        Don't have an account?
        {" "}
        <a href="Register"  className="text-decoration-none text-danger">
          Register Now

        </a>
        
      </p>
    </div>
  );
};

export default Login;
