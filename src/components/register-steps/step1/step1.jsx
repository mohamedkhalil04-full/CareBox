// import React, { useState } from 'react';
// // import your logo if you have one
// // import ProjectLogo from './path/to/logo.png';

// function Step1() {
//   const [selectedService, setSelectedService] = useState(null);

//   const services = [
//     {
//       id: 'repair',
//       title: 'Car Repair',
//       desc: 'Expert diagnostics',
//       icon: '🔧', // أو ممكن تستخدم react-icons: <FaTools />
//       color: '#dc3545', // أحمر
//     },
//     {
//       id: 'wash',
//       title: 'Car Wash',
//       desc: 'Premium detailing',
//       icon: '🧼',
//       color: '#0d6efd', // أزرق
//     },
//     {
//       id: 'emergency',
//       title: 'Emergency',
//       desc: '24/7 roadside help',
//       icon: '⚠️',
//       color: '#fd7e14', // برتقالي
//     },
//     {
//       id: 'parts',
//       title: 'Spare Parts',
//       desc: 'Genuine OEM parts & accessories',
//       icon: '🛠️',
//       color: '#198754', // أخضر
//     },
//   ];

//   const handleNext = () => {
//     if (!selectedService) {
//       alert('Please select a service to continue');
//       return;
//     }
//     // هنا هتروح للخطوة الجاية (مثلاً form التسجيل حسب الخدمة)
//     console.log('Selected service:', selectedService);
//     // navigate('/register/details') مثلاً
//   };

//   return (
//     <div
//       // style={{
//       //   minHeight: '100vh',
//       //   backgroundImage: `url('https://thumbs.dreamstime.com/b/cartoon-garage-interior-furniture-working-tools-illustrates-storeroom-elements-car-repair-equipment-wall-tires-315508038.jpg')`,
//       //   backgroundSize: 'cover',
//       //   backgroundPosition: 'center',
//       //   backgroundRepeat: 'no-repeat',
//       //   display: 'flex',
//       //   flexDirection: 'column',
//       //   alignItems: 'center',
//       //   justifyContent: 'center',
//       //   padding: '20px 15px',
//       // }}
//     >
//       {/* اللوجو اختياري فوق */}
//       {/* <img src={ProjectLogo} className="mb-4" alt="logo" width={100} /> */}

//       <div
//         // className="bg-white rounded-4 shadow-lg p-4 p-md-5"
//         // style={{
//         //   width: '100%',
//         //   maxWidth: '480px',
//         //   border: '1px solid #e0e0e0',
//         // }}
//       >
        

//         <div className="row g-3 mb-5">
//           {services.map((service) => (
//             <div className="col-6" key={service.id}>
//               <button
//                 type="button"
//                 className={`btn w-100 h-100 text-start p-3 border rounded-3 transition-all ${
//                   selectedService === service.id
//                     ? 'border-primary shadow'
//                     : 'border-transparent'
//                 }`}
//                 // style={{
//                 //   backgroundColor:
//                 //     selectedService === service.id ? '#f8f9fa' : 'white',
//                 //   borderColor:
//                 //     selectedService === service.id ? service.color : '#dee2e6',
//                 //   borderWidth: '2px',
//                 // }}
//                 // onClick={() => setSelectedService(service.id)}
//               >
//                 <div className="d-flex flex-column align-items-center text-center">
//                   <div
//                     className="rounded-circle d-flex align-items-center justify-content-center mb-2"
//                     style={{
//                       width: '60px',
//                       height: '60px',
//                       backgroundColor: `${service.color}15`, // لون خفيف
//                       fontSize: '2rem',
//                     }}
//                   >
//                     {service.icon}
//                   </div>
//                   <h5 className="mb-1 fw-bold" style={{ fontSize: '1.1rem' }}>
//                     {service.title}
//                   </h5>
//                   <small className="text-muted">{service.desc}</small>
//                 </div>
//               </button>
//             </div>
//           ))}
//         </div>

        

        
//       </div>
//     </div>
//   );
// }

// export default Step1;








////////////////////////////////////////////////////////////
import './step1.css'

import React, { useState } from 'react';

function RegisterStep2() {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [logoPreview, setLogoPreview] = useState(null);
  const [workingHours, setWorkingHours] = useState({
    from: '09:00',
    to: '17:00',
    // ممكن تضيف أيام الأسبوع لو عايز
  });

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`);
          // ممكن تستخدم reverse geocoding API عشان تحولها لعنوان حقيقي
        },
        (error) => {
          alert('Unable to detect location: ' + error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (!address || !location) {
      alert('Please fill Address and detect Your Location');
      return;
    }
    // هنا ابعت البيانات للـ backend أو الصفحة الجاية
    console.log('Data:', { address, location, workingHours, logo: logoPreview });
    // navigate('/next-step')
  };

  return (
    <div
     
    >
      <div
        // className="bg-white rounded-4 shadow-lg p-4 p-md-5"
        // style={{
        //   width: '100%',
        //   maxWidth: '480px',
        //   border: '1px solid #e0e0e0',
        // }}
      >
       

        {/* Address */}
        <div className="mb-3">
          <label className="form-label fw-medium"></label>
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ borderRadius: '10px' }}
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="form-label fw-medium"></label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Your Location"
              value={location}
              readOnly
              style={{ borderRadius: '10px 0 0 10px' }}
            />
            <button
              className="btn btn-danger ms-3"
              type="button"
              onClick={handleDetectLocation}
              style={{ borderRadius: '10px 10px 10px 10px' }}
            >
              Detect Location
            </button>
          </div>
        </div>

        {/* Working Hours - بسيط جدًا (ممكن توسيعه لأيام) */}
        <div className="mb-4">
          <label className="form-label fw-medium">Working Hours</label>
          <div className="d-flex flex-wrap gap-2 mb-2">
            <span>From:</span>
            {['09:00', '09:30', '10:00'].map((time) => (
              <button
                key={time}
                type="button"
                className={`btn btn-md  border rounded-5  ${
                  workingHours.from === time ? 'btn-danger' : 'btn-outline-secondary'
                }`}
                onClick={() => setWorkingHours({ ...workingHours, from: time })}
              >
                {time} AM
              </button>
            ))}
          </div>
          <div className="d-flex flex-wrap gap-2">
            <span>To:</span>
            {['06:00', '07:00', '09:00'].map((time) => (
              <button
                key={time}
                type="button"
                className={`btn btn-md border rounded-5 ${
                  workingHours.to === time ? 'btn-danger' : 'btn-outline-secondary'
                }`}
                onClick={() => setWorkingHours({ ...workingHours, to: time })}
              >
                {time} {parseInt(time) >= 12 ? 'PM' : 'AM'}
              </button>
            ))}
          </div>
        </div>

        {/* Add Logo */}
        <div className="text-center">
          
          <div
            className="border rounded-3  text-center bg-secondary "
            // style={{
            //   borderStyle: 'dashed',
            //   cursor: 'pointer',
            //   minHeight: '120px',
            //   backgroundColor: '#f8f9fa',
            // }}
            onClick={() => document.getElementById('logoInput').click()}
          >
            
           <b className='plus-sign'>+</b>
           <p>add your logo</p>
          </div>
          <input
            id="logoInput"
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            style={{ display: 'none',  }}
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterStep2;