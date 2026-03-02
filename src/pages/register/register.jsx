// Register.jsx
import "./register.css";
import ProjectLogo from "../../assets/images/proj-logo.png";

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, ProgressBar, Card, Form } from 'react-bootstrap';
import Step1 from '../../components/register-steps/step1/step1';
import Step2 from '../../components/register-steps/step2/step2';
import Step3 from '../../components/register-steps/step3/step3';
// import { div } from "framer-motion/client";

const providerTypeMapping = {
  "Maintenance": 1,
  "Spare parts and accessories": 2,
  "Emergancy": 3,
  "Car Care": 4
};

const schema = yup.object({
  providerType: yup.string().required('the provider type is required'),
  name: yup.string().required('the name is required'),
  phone: yup.string().required('Phone number is required'),
  image: yup.mixed().optional(),
  address: yup.string().required('the Address is required'),
  location: yup.string().url('invalid URL').required('url location is required'),
  latitude: yup.string().nullable(),
  longitude: yup.string().nullable(),
  workingFrom: yup.string().required('opening time is required'),
  workingTo: yup.string().required('closing time is required'),
  email: yup.string().email('invalid email').required('email is required'),
  password: yup.string().matches(/[^a-zA-Z0-9]/, 'password must has at least 1 symbol like -> (@#$%^&*...)')
   .required('password is required').matches(/[a-z]/,'password must has at least 1 Lower case litter')
   .min(8,'password must be at least 8 digits').matches(/[A-Z]/,'password must has at least 1 Upper case litter')
   .matches(/[0-9]/,'password must has at least 1 Number'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('confirming password is required'),
}).required();

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: { latitude: '', longitude: '', location: '' }
  });

  const { handleSubmit, trigger, formState: { isValid } } = methods;

  const nextStep = async () => {
    let fields = [];

    if (step === 1) fields = ['providerType'];
    if (step === 2) fields = ['name', 'email', 'phone', 'password', 'confirm']
    const valid = await trigger(fields);
    if (valid) setStep(step + 1);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // 2. التحويل للـ IDs اللي السيرفر طالبها (بناءً على رسالة الخطأ ProviderTypeId)
    const typeId = providerTypeMapping[data.providerType] || 1;
    formData.append('ProviderTypeId', typeId);

    // 3. تعديل المسميات لتبدأ بحرف كابيتال (PascalCase) عشان تطابق السيرفر
    formData.append('Name', data.name);
    formData.append('PhoneNumber', data.phone);
    formData.append('Address', data.address);
    formData.append('LocationUrl', data.location);

    // إرسال الإحداثيات المستخرجة تلقائياً من ملف location-fun
    formData.append('Latitude', data.latitude || "");
    formData.append('Longitude', data.longitude || "");

    formData.append('WorkingHours', `${data.workingFrom} - ${data.workingTo}`);
    formData.append('Email', data.email);
    formData.append('Password', data.password);

    // السيرفر قلك ConfirmPassword مطلوب؟ يبقى نبعته
    formData.append('ConfirmPassword', data.confirmPassword);

    if (data.image && data.image[0]) {
      formData.append('Image', data.image[0]);
    }

    try {
      const response = await fetch('http://careboxapi.runasp.net/api/Auth/register/provider', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('pendingEmail', data.email);
        alert('Success! Check your email for OTP.');
        navigate('/otp');
      } else {
        // لو في خطأ تاني، الكود ده هيظهرهولك بالتفصيل في alert
        console.error('Server Error:', result);
        alert(`خطأ: ${JSON.stringify(result.errors || result.message || result)}`);
      }
    } catch {
      alert('Network error, please check your connection.');
    }
  };

  return (
    <div id="back-page">
      <img src={ProjectLogo} className="p-3" alt="logo" width={100} />
      <div className="container py-5">
        <Card className="shadow mx-auto" style={{ maxWidth: '600px' }}>
          <Card.Body className="p-4">
            <h3 className="text-center mb-4">
              Hello! Register to get started
            </h3>
            <ProgressBar now={(step / 3) * 100} label={`${step}/3`} className="mb-4" striped animated />
            <FormProvider {...methods}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
                <div className="d-flex justify-content-between mt-3">
                  {step > 1 && <Button variant="dark text-danger" onClick={() => setStep(step - 1)}>Back</Button>}
                  {step < 3 ? (
                    <Button variant="dark text-danger" className={step === 1 ? "w-100" : ""} onClick={nextStep}>Next</Button>

                  ) : (
                    <Button variant="success" type="submit" disabled={!isValid}>Register</Button>
                  )}
                </div>
                <div className="pt-3">
                  <p className="text-center">
                    Already have an account?{" "}
                    <a className="text-decoration-none " href="/login">
                      <bold className="text-danger">Login Now</bold>
                    </a>
                  </p>
                </div>
              </Form>
            </FormProvider>
          </Card.Body>
        </Card>
      </div>
    </div>
  );

}