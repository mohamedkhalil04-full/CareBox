import "./otp.css";
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";
const OTP = () => {

  const [otp, setOtp] = useState('');
  const navigate = useNavigate()
     
 const handleVerify = async (e) => {
  e.preventDefault();
  const email = localStorage.getItem('pendingEmail');
  const flow = localStorage.getItem('otpFlow');

  try {
    await api.post('/Auth/verify-otp', { email, otpCode: otp });
    
    if (flow === 'reset') {
      localStorage.setItem('resetOtp', otp);
      navigate('/createnewpass');
    } else {
      alert("✅ Account Verified!");
      navigate('/login');
    }
    localStorage.removeItem('otpFlow');
  } catch{
    alert("❌ Invalid OTP. Try again.");
  }
 };

  return (

      <form onSubmit={handleVerify} className="otp-form container mx-auto my-4 p-4 rounded w-50 bg-white d-flex flex-column">
        <h2>OTP Verification</h2>
        <small className="text-">Enter the verification code we just sent on your email address</small>
        <div className="otp-inputs d-flex justify-content-center my-4 gap-1">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            isInputNum={true}
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

      </form>


  );
};

export default OTP;