// import "./register.css";
// import ProjectLogo from "../../assets/images/proj-logo.png";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [image, setImage] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   // validation احتياطي لحد ما الداتا بيز يعمل شروطه
//   //  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   // const validatePassword = (password) =>
//   //   /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password); // >=6, 1 uppercase, 1 digit

//   // احتياطي برضو عشان لو ضيفنا صورة للمحل
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     // Optional: limit file size ~2MB
//     if (file.size > 2 * 1024 * 1024) {
//       alert("❌ Image size is larger than 2MB");
//       return;
//     }
//     const reader = new FileReader();
//     reader.onloadend = () => setImage(reader.result);
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // basic validations
//     if (!name.trim() || !email.trim() || !password || !confirm) {
//       alert("❌ Please fill in all fields");
//       return;
//     }
//     if (password !== confirm) {
//       alert("❌ Password confirmation does not match");
//       return;
//     }
//     // if (!validateEmail(email)) {
//     //   alert("❌ Invalid email address");
//     //   return;
//     // }
//     // if (!validatePassword(password)) {
//     //   alert(
//     //     "❌ Password must be at least 6 characters, contain an uppercase letter and a number"
//     //   );
//     //   return;
//     // }

//     // users stored as array in localStorage
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const exists = users.find(
//       // عشان ميبقاش في اتنين عندهم نفس الايميل
//       (u) =>
//         u.email.toLowerCase() === email.toLowerCase() ||
//         u.username.toLowerCase() === name.toLowerCase()
//     );
//     if (exists) {
//       alert("❌ A user with the same name or email already exists");
//       return;
//     }

//     const newUser = {
//       id: Date.now(),
//       name,
//       email,
//       password,
//       image: image || null,
//       createdAt: new Date().toISOString(),
//     };

//     users.push(newUser);
//     localStorage.setItem("users", JSON.stringify(users));

//     alert("✅ Account created successfully!");
//     navigate("/login");
//   };

//   return (
//     <div id="back-page">
//       <img src={ProjectLogo} className="p-3" alt="logo" width={100} />

//       <div className="carebox-container container mx-auto my-4 rounded w-25 d-flex flex-column ">
//         {/* <div className="text-start mb-4"></div> */}

//         <h2 className="mb-4 pt-3">Hello! Register to get started</h2>

//         <form onSubmit={handleSubmit}>
//           <div className="d-flex flex-column gap-3  w-100 my-4">

//             {/* Provider Type */}

//             <div className="selection">
//               <select
//                 className="select"
//                 id="select"
//               // value={selectedLanguage}
//               // onChange={handleLanguageChange}

//               >
//                 <option hidden>provider type</option>
//                 <option value="car maintenance center">car maintenance center</option>
//                 <option value="car wash center">car wash center</option>
//                 <option value="Outlet for selling spare parts and accessories">Outlet for selling spare parts and accessories</option>
//               </select>
//             </div>

//             {/* name */}
//             <div className="form-floating">
//               <input
//                 type="text"
//                 className="form-control"
//                 id="floatingInput"
//                 placeholder="Enter user name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//               <label htmlFor="floatingInput">User Name</label>
//             </div>

//             {/* email */}
//             <div className="form-floating">
//               <input
//                 type="email"
//                 className="form-control"
//                 id="floatingInput"
//                 placeholder="name@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <label htmlFor="floatingInput">Email address</label>
//             </div>

//             {/* password */}
//             <div className="form-floating">
//               <input
//                 type={showPassword ? "test" : "password"}
//                 className="form-control"
//                 id="floatingPassword"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <label htmlFor="floatingPassword">Password</label>
//             </div>
//             {/* check box for showing the password */}
//             <div className="form-check mt-2">
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 checked={showPassword}
//                 onChange={() => setShowPassword((s) => !s)}
//               />
//               <label className="form-check-label" htmlFor="showPwdRegister">
//                 Show Password
//               </label>
//             </div>
//             {/* confirm password */}
//             <div className="form-floating">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="form-control"
//                 id="floatingPassword"
//                 placeholder="Confirm Password"
//                 value={confirm}
//                 onChange={(e) => setConfirm(e.target.value)}
//                 required
//               />
//               <label htmlFor="floatingPassword">Confirm Password</label>
//             </div>

//             {/* Phone number */}

//             <div className="form-floating">
//               <input
//                 type={"text"}
//                 className="form-control"
//                 id="floatingPassword"
//                 placeholder="Phone Number"
//                 // isInputNum={true}
//                 // inputType="tel" 
//                 // value={confirm}
//                 // onChange={(e) => setConfirm(e.target.value)}
//                 required
//               />
//               <label htmlFor="floatingPassword">Phone Number</label>
//             </div>

//             {/* Address */}

//             <div className="form-floating">
//               <input
//                 type="text"
//                 className="form-control"
//                 id="floatingInput"
//                 placeholder="Enter Address"
//                 // value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//               <label htmlFor="floatingInput">Address</label>
//             </div>

//             {/* Location */}

//             <div className="form-floating">
//               <input
//                 type="text"
//                 className="form-control"
//                 id="floatingInput"
//                 placeholder="share location URL"
//                 // value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//               <label htmlFor="floatingInput">share location URL</label>
//             </div>


//             {/* working hours */}

//             <div className="form-floating">
//               <input
//                 type="number"
//                 className="form-control"
//                 id="floatingInput"
//                 placeholder="Enter the working hours"
//                 // value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//               <label htmlFor="floatingInput">Enter the working hours</label>
//             </div>

//             {/* logo image */}

// <div className="mb-3">
//             <label className="form-label fw-semibold">
//               Profile Picture
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               className="form-control"
//               onChange={handleImageUpload}
//             />
//             <small className="text-muted">
//               Optional - suggested size less than 2MB
//             </small>
//           </div>


//           </div>

//           {/* button  */}
//           <button type="submit" className="btn text-danger bg-black w-100 mb-3">
//             Register
//           </button>
//         </form>

//         {/* go to login page */}
//         <p className="text-center">
//           Already have an account?{" "}
//           <a className="text-decoration-none" href="/login">
//             <bold className="text-danger">Login Now</bold>
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;


// Register.jsx
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, ProgressBar, Card, Form } from 'react-bootstrap';
import Step1 from '../../components/register-steps/step1/step1';
import Step2 from '../../components/register-steps/step2/step2';
import Step3 from '../../components/register-steps/step3/step3';


// ─── Validation Schema ────────────────────────────────────────
const schema = yup.object({
  // Step 1
  providerType:yup.string().required('the provider type is required'),
  name: yup.string().required('the name is required'),
  phone: yup.string().required('Phone number is required'),
  Image: yup.mixed().optional('you can add an image here'),
  // Step 2
  address: yup.string().required('the Address is required'),
//  latitude: yup.number().min(-90, 'خطأ في خط العرض').max(90, 'خطأ في خط العرض').required('الموقع مطلوب'),
 // longitude: yup.number().min(-180, 'خطأ في خط الطول').max(180, 'خطأ في خط الطول').required('الموقع مطلوب'),
  location: yup.string().url('رابط غير صحيح').required('رابط الموقع مطلوب'),
  workingFrom:yup.string().required('opening time is required'),
  workingTo:yup.string().required('closing time is required'),
  // Step 3
  email: yup.string().email('invalid email').required('email is required'),
  password: yup.string().min(8, 'password must be at least 8 characters').required('password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'password and confirmation must match each other')
    .required('confirming password is required'),

}).required();

export default function Register() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const methods = useForm({
    resolver: yupResolver(schema),
  // defaultValues: {
  //   location: '',
  //   latitude: '',
  //   longitude: ''
  // },
    mode: 'onChange',
  });

  const { handleSubmit, trigger, formState: { isValid } } = methods;

  const nextStep = async () => {
    // تحقق من صحة الحقول الحالية فقط
    let fields = [];
    if (step === 1) fields = ['providerType', 'name', 'phone', 'image'];
    if (step === 2) fields = ['address', 'location', 'workingFrom', 'workingTo'];
    if (step === 3) fields = ['email', 'password', 'confirmPassword'];

    const valid = await trigger(fields);

    if (valid) {
      if (step < 3) setStep(step + 1);
    }
  };

  const prevStep = () => step > 1 && setStep(step - 1);

  const onSubmit = async (data) => {
  // 1. إنشاء FormData
  const formData = new FormData();

  // 2. إضافة كل الحقول العادية (text, select, time, email, password...)
  formData.append('providerType', data.providerType);
  formData.append('name', data.name);
  formData.append('phone', data.phone);
  formData.append('address', data.address);
 // formData.append('Latitude', data.latitude || '');
 // formData.append('Longitude', data.longitude || '');
  formData.append('location', data.location);  
  formData.append('WorkingHours', `${data.workingFrom} - ${data.workingTo}`);
  formData.append('email', data.email);
  formData.append('password', data.password);
  
  // 3. إضافة الملف (الصورة)
  if (data.image && data.image[0]) {
    formData.append('image', data.image[0]);   // 'image' هو الـ key اللي الباك إند هيستقبله
  }

  // اختياري: لو عايز تضيف حاجات إضافية زي token أو user id
  // formData.append('userId', currentUser.id);

  try {
    // طريقة 1: باستخدام fetch (مدمج في المتصفح - مفيش حاجة إضافية)

    const response = await fetch('https://careboxapi.runasp.net/api/Auth/register/provider', {
      method: 'POST',
      body: formData,
      
      // مهم: متضيفش headers: { 'Content-Type': 'multipart/form-data' } بنفسك
      // المتصفح هيضيفها تلقائيًا مع boundary صح
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('خطأ من السيرفر:', errorData);
      alert(`خطأ: ${errorData.message || 'مشكلة في التسجيل'}`);
      return;
    }

    const result = await response.json();
    console.log('الرد من السيرفر:', result);


    // احفظ الإيميل أو رقم مؤقت عشان تستخدمه في صفحة الـ OTP
    localStorage.setItem('pendingEmail', data.email);

    alert('تم إرسال كود التأكيد على الإيميل/التليفون الخاص بك');
    // redirect لصفحة OTP
    navigate('/otp');


  } catch (error) {
    console.error('خطأ أثناء الإرسال:', error);
    alert('حصل خطأ أثناء التسجيل، برجاء المحاولة مرة أخرى');
  }

  // ────────────── أو طريقة 2: باستخدام axios (أكثر شعبية وسهلة) ──────────────
  // لو مثبت axios (npm install axios)

  // import axios from 'axios';

  // try {
  //   const response = await axios.post(
  //     'https://api.yourdomain.com/api/register-provider',
  //     formData,
  //     {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     }
  //   );
  //   console.log('نجاح:', response.data);
  //   alert('تم التسجيل بنجاح!');
  // } catch (error) {
  //   console.error('خطأ:', error.response?.data || error.message);
  //   alert('حصل خطأ، حاول تاني');
  // }
};

  const progress = (step / 3) * 100;

  return (

    // العب هنا براحتك و انت بتغير التصميم
    
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <Card className="shadow">
            <Card.Body className="p-4">
              <h3 className="text-center mb-4">Hello! Register to get started</h3>

              <ProgressBar now={progress} label={`${step}/3`} className="mb-4" striped animated />

              <FormProvider {...methods}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  {step === 1 && <Step1 />}
                  {step === 2 && <Step2 />}
                  {step === 3 && <Step3 />}

                  <div className="d-flex justify-content-between mt-4">
                    {step > 1 && (
                      <Button variant="dark text-danger" onClick={prevStep}>
                        prev
                      </Button>
                    )}

                    {step < 3 ? (
                      <Button variant="dark text-danger" onClick={nextStep}>
                        Next
                      </Button>
                    ) : (
                      <Button variant="success" type="submit" disabled={!isValid}>
                        register
                      </Button>
                    )}
                  </div>
                </Form>
              </FormProvider>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}