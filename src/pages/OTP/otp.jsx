import "./otp.css";
import ProjectLogo from "../../assets/images/proj-logo.png"
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from "react-router-dom";


const OTP = () => {

  const [otp, setOtp] = useState('');
  
  const navigate = useNavigate()

  const handleVerify = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('pendingEmail');
    try {
      const response = await fetch('http://careboxapi.runasp.net/api/Auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otpCode: otp }),
      });

      if (response.ok) {
        alert("✅ Account Verified!");
        navigate('/login');
      } else {
        alert("❌ Invalid OTP. Try again.");
      }
    } catch {
      alert("Server error.");
    }
  };

  return (
    <div id="back-page">
      <img src={ProjectLogo} className="p-3" alt="logo" width={100} />
      <form onSubmit={handleVerify} className="otp-form container mx-auto my-4 p-4 rounded w-50 bg-white d-flex flex-column">
        <h2>OTP Verification</h2>
        <small className="text-">Enter the verification code we just sent on your email address</small>
        <div className="otp-inputs d-flex justify-content-center my-4 gap-1">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            isInputNum={true}
            // renderSeparator={<span className="mx-1 text-muted">-</span>}
            renderInput={(props) => (
              <input
                {...props}
                className="otp-input form-control text-center rounded fs-4 mx-1 border-danger border-2"
                style={{ width: '70px', height: '55px' }}
              />
            )}
            inputType="tel"
            shouldAutoFocus
            containerStyle="d-flex justify-content-center mb-1"
          />
        </div>
        <button type="submit" className="rounded text-danger bg-black p-3 w-100">Verify</button>
        <p className="text-center">Didn't received code? <bold className="text-danger">Resend</bold></p>

      </form>


    </div>
  );
};

export default OTP;


