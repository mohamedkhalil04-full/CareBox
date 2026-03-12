import "./CreateNewPass.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";
const CreateNewPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("❌ Password confirmation does not match");
      return;
    }

    const email = localStorage.getItem('pendingEmail');
    const otpCode = localStorage.getItem('resetOtp');

    try {
      const response = await api.post('/Auth/reset-password', {
        email,
        otpCode,
        newPassword: password
      });

      if (response.ok) {
        alert("✅ Password reset successfully!");
        localStorage.removeItem('otpFlow');
        localStorage.removeItem('resetOtp');
        navigate("/");
      } else {
        alert("❌ Failed to reset password.");
      }
    } catch {
      alert("Server error.");
    }
  };

  return (
    <form onSubmit={handleSave} className="new-pass-form container mx-auto my-4 p-4 rounded w-50 bg-white d-flex flex-column">
      <h2>Create New Password</h2>
      <small>Your new password must be unique from those previously used.</small>
      <div className="newpassinputs d-flex flex-column gap-3 w-100 my-4">

        <div className="form-floating">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="floatingPassword"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <label htmlFor="floatingPassword">New Password</label>
        </div>

        <div className="form-check mt-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="showPwdNew"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label className="form-check-label" htmlFor="showPwdNew">
            Show Password
          </label>
        </div>

        <div className="form-floating">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control newpassinput"
            id="floatingConfirm"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <label htmlFor="floatingConfirm">Confirm Password</label>
        </div>
      </div>

      <button type="submit" className="rounded text-danger bg-black p-3 w-100">
        Reset Password
      </button>
    </form>
  );
};

export default CreateNewPass;
