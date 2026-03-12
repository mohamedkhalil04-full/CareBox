import "./otp.css";
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";
const OTP = () => {

  const [otp, setOtp] = useState('');
  const navigate = useNavigate()
     
  // const handleVerify = async (e) => {
  //   e.preventDefault();
  //   const email = localStorage.getItem('pendingEmail');
  //   const flow = localStorage.getItem('otpFlow'); // register OR reset

  //   if (!email) {
  //     alert("Email not found. Please restart the process.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch('http://careboxapi.runasp.net/api/Auth/verify-otp', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, otpCode: otp }),
  //     });

  //     if (response.ok) {
  //       if (flow === 'reset') {
  //         // حفظ الـ OTP عشان نبعته مع الباسوورد الجديد
  //         localStorage.setItem('resetOtp', otp);
  //         navigate('/createnewpass');
  //       } else {
  //         alert("✅ Account Verified!");
  //         localStorage.removeItem('otpFlow');
  //         navigate('/');
  //       }
  //       // تنظيف الـ Flag بعد الاستخدام (اختياري)
  //         localStorage.removeItem('otpFlow');
  //     }
  //      else {
  //       alert("❌ Invalid OTP. Try again.");
  //     }
  //   } catch {
  //     alert("Server error.");
  //   }
  // };

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
      navigate('/');
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
        {/* <p className="text-center">Didn't received code? <label className="text-danger">Resend</label></p> */}

      </form>


  );
};

export default OTP;





// // 2. دالة إعادة الإرسال (Resend)
//   const handleResend = async () => {
//     const email = localStorage.getItem('pendingEmail');
//     const flow = localStorage.getItem('otpFlow');

//     if (!email) return;

//     setLoading(true);
//     try {
//       // نحدد الـ endpoint اللي بتبعت الـ OTP بناءً على الحالة
//       // في حالة الـ Reset بننادي forgot-password تاني
//       // في حالة الـ Register بننادي resend-otp (أو الـ endpoint المخصصة لديكم)
//       const resendEndpoint = flow === 'reset' 
//         ? 'http://careboxapi.runasp.net/api/Auth/forgot-password' 
//         : 'http://careboxapi.runasp.net/api/Auth/resend-otp'; 

//       const response = await fetch(resendEndpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         alert("📩 A new code has been sent to your email.");
//       } else {
//         alert("❌ Failed to resend code. Please try again later.");
//       }
//     } catch (error) {
//       alert("❌ Network error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleVerify} className="otp-form container mx-auto my-4 p-4 rounded w-50 bg-white d-flex flex-column">
//       <h2>OTP Verification</h2>
//       <small>Enter the verification code we just sent on your email address</small>
      
//       <div className="otp-inputs d-flex justify-content-center my-4 gap-1">
//         <OtpInput
//           value={otp}
//           onChange={setOtp}
//           numInputs={6}
//           renderInput={(props) => (
//             <input
//               {...props}
//               className="otp-input form-control text-center rounded fs-4 mx-1 border-danger border-2"
//               style={{ width: '60px', height: '55px' }}
//             />
//           )}
//           shouldAutoFocus
//           containerStyle="d-flex justify-content-center mb-1"
//         />
//       </div>

//       <button 
//         type="submit" 
//         className="rounded text-danger bg-black p-3 w-100" 
//         disabled={otp.length < 6}
//       >
//         Verify
//       </button>

//       <p className="text-center mt-3">
//         Didn't receive code?{" "}
//         <b 
//           className="text-danger" 
//           style={{ 
//             cursor: loading ? "not-allowed" : "pointer", 
//             opacity: loading ? 0.6 : 1 
//           }} 
//           onClick={!loading ? handleResend : null}
//         >
//           {loading ? "Sending..." : "Resend"}
//         </b>
//       </p>
//     </form>
//   );
// };