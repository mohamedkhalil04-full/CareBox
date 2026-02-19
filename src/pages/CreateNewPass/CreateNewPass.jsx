import "./CreateNewPass.css";
import ProjectLogo from "../../assets/images/proj-logo.png";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
const CreateNewPass = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");


  // const handleSave = (e) => {
  //   e.preventDefault();

  //   if (password && password !== confirm) {
  //     alert("❌ Password confirmation does not match");
  //     return;
  //   }
  // }

  // const users = JSON.parse(localStorage.getItem("users")) || [];
  // // ensure uniqueness except for current user
  // const other = users.find(
  //   (u) =>
  //     u.id !== stored.id &&
  //     (u.email.toLowerCase() === email.toLowerCase() ||
  //       u.username.toLowerCase() === username.toLowerCase())
  // );
  // if (other) {
  //   alert("❌ Another user with the same name or email already exists");
  //   return;
  // }


  // // update user inside users array
  // const updatedUsers = users.map((u) => {
  //   if (u.id === stored.id) {
  //     return {
  //       ...u,
  //       // only update password if provided
  //       password: password ? password : u.password,
  //     };
  //   }
  //   return u;
  // });

  // localStorage.setItem("users", JSON.stringify(updatedUsers));

  // const updatedCurrent = updatedUsers.find((u) => u.id === stored.id);
  // localStorage.setItem("currentUser", JSON.stringify(updatedCurrent));

  // alert("✅ Changes saved successfully");
  // navigate("/profile");





  return (
    <div id="back-page">
      <img src={ProjectLogo} className="p-3" alt="logo" width={100} />
      <form className="new-pass-form container mx-auto my-4 p-4 rounded w-50 bg-white d-flex flex-column ">
        <h2>Create New Password</h2>
        <small>
          Your new password must be unique from those previously used .
        </small>
        <div className="newpassinputs d-flex flex-column gap-3  w-100 my-4">
          {/* new password */}
          <div className="form-floating">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="floatingPassword"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">New Password</label>
          </div>
          <div className="form-check mt-3">
            <input
              type="checkbox"
              className="form-check-input"
              checked={showPassword}
              onChange={() => {
                setShowPassword((s) => !s);
              }}
            />
            <label className="form-check-label" htmlFor="showPwdNew">
              Show Password
            </label>
          </div>
          {/* confirm password */}
          <div className="form-floating">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control newpassinput"
              id="floatingPassword"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>
        </div>
        <button
          type="submit"
          className="rounded text-danger bg-black p-3 w-100"
          // onClick={() => navigate("/login")}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default CreateNewPass;
