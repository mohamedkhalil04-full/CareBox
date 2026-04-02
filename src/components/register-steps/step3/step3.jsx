// import './step3.css'
// import { Form,useFormContext } from 'react-hook-form';
// import {Col,Row, FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap';
// import { useEffect , useState } from 'react';

// const Step3=()=> {

// const { register,setValue,watch, formState: { errors } } = useFormContext();
// const [logoPreview, setLogoPreview] = useState(null);
//   // راقب حقل الرابط فقط
//   const mapLink = watch('mapLink'); // لازم تضيف mapLink في الـ defaultValues أو في الـ yup

//   useEffect(() => {
//     if (!mapLink || typeof mapLink !== 'string' || mapLink.trim() === '') {
//       // لو الرابط فاضي → امسح الإحداثيات
//       setValue('latitude', '');
//       setValue('longitude', '');
//       return;
//     }
//     const url = mapLink.trim();

//     // محاولة استخراج الإحداثيات مباشرة من الرابط (يدعم الطويل والقصير بعد redirect نظري)
//     const match =
//       url.match(/@(-?\d+\.?\d{1,8}),(-?\d+\.?\d{1,8})/) ||
//       url.match(/!3d(-?\d+\.?\d{1,8})!4d(-?\d+\.?\d{1,8})/) ||
//       url.match(/(-?\d+\.\d{5,8}),\s*(-?\d+\.\d{5,8})/); // بعض الروابط بتنسيق مختلف

//     if (match && match[1] && match[2]) {
//       const lat = parseFloat(match[1]);
//       const lng = parseFloat(match[2]);

//       if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
//         const latFixed = lat.toFixed(8);
//         const lngFixed = lng.toFixed(8);

//         // حفظ داخلي فقط
//         setValue('latitude', latFixed);
//         setValue('longitude', lngFixed);

//         // للتطوير فقط – شيلها لاحقًا لو عايز
//         console.log('تم استخراج الإحداثيات من الرابط:', { latitude: latFixed, longitude: lngFixed });
//       } else {
//         console.warn('إحداثيات غير صالحة من الرابط:', url);
//         setValue('latitude', '');
//         setValue('longitude', '');
//       }
//     } else {
//       // لو ما لقاش → ممكن الرابط قصير جدًا ومحتاج fetch
//       // هنا بنحاول نعمل fetch بسيط (HEAD) عشان نجيب الـ final URL
//       fetch(url, { method: 'HEAD', redirect: 'follow', mode: 'no-cors' })
//         .then((res) => {
//           // للأسف no-cors مش هيدينا res.url
//           // لذا الطريقة الأفضل هي نعتمد على أن المستخدم يعطي الرابط الطويل
//           // أو نطلب منه يفتح الرابط وياخد النسخة الكاملة
//           console.log('الرابط بعد redirect (في المتصفح):', res.url || url);
//         })
//         .catch((err) => {
//           console.warn('مشكلة في متابعة الرابط القصير:', err);
//         });

//       // في الإصدار ده بنمسح الإحداثيات لو ما نفعش الـ regex
//       setValue('latitude', '');
//       setValue('longitude', '');
//     }
//   }, [mapLink, setValue]);

  
//    const handleLogoChange = (e) => {
//      const file = e.target.files[0];
//      if (file) {
//       setValue('image', file, { shouldValidate: true }); // حفظها في Hook Form
//        const reader = new FileReader();
//        reader.onloadend = () => {
//           setLogoPreview(reader.result);
//        };
//        reader.readAsDataURL(file);
//      }
//      console.log('Data:', { logo: logoPreview });
//    };
  
//   return (
//     <>

//     {/* address */}
//     <FormGroup className="form-floating mb-3">
//         {/* <FormLabel>address</FormLabel> */}
//         <FormControl
//           type="text"
//           placeholder=''
//           {...register('address')}
//           isInvalid={!!errors.address}
//         />
//         <label htmlFor="floatingInput">address</label>
//         {errors.address && <FormText className="text-danger">{errors.address.message}</FormText>}
//       </FormGroup>

      
//             {/* Location */}

//        <FormGroup className="form-floating mb-3">
//          {/* <FormLabel>Location</FormLabel> */}
//          <FormControl
//            type="url"
//            placeholder='Enter location'
//            required
//            {...register('location', { required: 'location is required' })}
//            isInvalid={!!errors.location}
//          />
//          <label htmlFor="flaotingInput">location</label>
//          {errors.location && <FormText className="text-danger">{errors.location.message}</FormText>}
//        </FormGroup>

      
//  {/* working hours */}

//        <Row>
//          <Col md={6}>
//            <FormGroup className="mb-3">
//              <FormLabel>from</FormLabel>
//              <FormControl type="time" {...register('workingFrom')} isInvalid={!!errors.workingFrom} />
//              {errors.workingFrom && <FormText className="text-danger">{errors.workingFrom.message}</FormText>}
//            </FormGroup>
//          </Col>
//          <Col md={6}>
//            <FormGroup className="mb-3">
//              <FormLabel>to</FormLabel>
//              <FormControl type="time" {...register('workingTo')} isInvalid={!!errors.workingTo} />
//              {errors.workingTo && <FormText className="text-danger">{errors.workingTo.message}</FormText>}
//            </FormGroup>
//          </Col>
//        </Row>


// {/* ////////////////////////////////////////////////// */}
       
//          {/* Add Logo */}
//          <div className="text-center">
          
//            <div
//              className="border rounded-3  text-center bg-secondary "
//               style={{
//                 borderStyle: 'dashed',
//                 cursor: 'pointer',
//                 minHeight: '120px',
//                 backgroundColor: '#f8f9fa',
//               }}
//              onClick={() => document.getElementById('logoInput').click()}
//            >
            
//             <b className='plus-sign'>+</b>
//             <p>add your logo</p>
//            </div>
//            <input
//              id="logoInput"
//              type="file"
//              accept="image/*"
//              onChange={handleLogoChange}
//              style={{ display: 'none',  }}
//            />
//          </div>
//      </>
  
//   );
// }

// export default Step3
















import './step3.css'
import { Form, useFormContext } from 'react-hook-form';
import { Col, Row, FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const Step3 = () => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [logoPreview, setLogoPreview] = useState(null);

  // استخراج الإحداثيات (اللوجيك كما هو)
  const mapLink = watch('location'); 

  useEffect(() => {
    if (!mapLink || typeof mapLink !== 'string' || mapLink.trim() === '') {
      setValue('latitude', '');
      setValue('longitude', '');
      return;
    }
    const url = mapLink.trim();
    const match =
      url.match(/@(-?\d+\.?\d{1,8}),(-?\d+\.?\d{1,8})/) ||
      url.match(/!3d(-?\d+\.?\d{1,8})!4d(-?\d+\.?\d{1,8})/) ||
      url.match(/(-?\d+\.\d{5,8}),\s*(-?\d+\.\d{5,8})/);

    if (match && match[1] && match[2]) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        setValue('latitude', lat.toFixed(8));
        setValue('longitude', lng.toFixed(8));
      }
    } else {
      setValue('latitude', '');
      setValue('longitude', '');
    }
  }, [mapLink, setValue]);

  // تحديث الصورة في الفورم وعمل Preview
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('image', file, { shouldValidate: true }); // حفظها في Hook Form
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <>
      <FormGroup className="form-floating mb-3">
        <FormControl
          type="text"
          placeholder=''
          {...register('address')}
          isInvalid={!!errors.address}
        />
        <label>Address</label>
        {errors.address && <FormText className="text-danger">{errors.address.message}</FormText>}
      </FormGroup>
      <label><a target='_blank' style={{textDecoration:"none",color:'black',padding:'-2px'}} href="https://www.google.com/maps/">open google maps<i class="fa-solid fa-location-dot"></i></a></label>
      
      <FormGroup className="form-floating mb-3">
        <FormControl
          type="url"
          placeholder='Enter location'
          {...register('location', { required: 'location is required' })}
          isInvalid={!!errors.location}
        />
        <label>Location URL</label>
        {errors.location && <FormText className="text-danger">{errors.location.message}</FormText>}
        </FormGroup>
        

      <Row>
        <Col md={6}>
          <FormGroup className="mb-3">
            <FormLabel>From</FormLabel>
            <FormControl type="time" {...register('workingFrom')} isInvalid={!!errors.workingFrom} />
            {errors.workingFrom && <FormText className="text-danger">{errors.workingFrom.message}</FormText>}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup className="mb-3">
            <FormLabel>To</FormLabel>
            <FormControl type="time" {...register('workingTo')} isInvalid={!!errors.workingTo} />
            {errors.workingTo && <FormText className="text-danger">{errors.workingTo.message}</FormText>}
          </FormGroup>
        </Col>
      </Row>

      <div className="text-center">
        <div
          className="border rounded-3 text-center bg-secondary"
          style={{
            borderStyle: 'dashed',
            cursor: 'pointer',
            minHeight: '120px',
            backgroundColor: '#f8f9fa',
            overflow: 'hidden'
          }}
          onClick={() => document.getElementById('logoInput').click()}
        >
          {logoPreview ? (
            <img src={logoPreview} alt="Logo preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <>
              <b className='plus-sign'>+</b>
              <p>Add your logo</p>
            </>
          )}
        </div>
        <input
          id="logoInput"
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          style={{ display: 'none' }}
        />
      </div>
    </>
  );
}

export default Step3;










  
//   return (
//     <>
//       <FormGroup className="form-floating mb-3">
//         <FormControl
//           type="text"
//           placeholder=''
//           {...register('address')}
//           isInvalid={!!errors.address}
//         />
//         <label>Address</label>
//         {errors.address && <FormText className="text-danger">{errors.address.message}</FormText>}
//       </FormGroup>

//       <FormGroup className="form-floating mb-3">
//         <FormControl
//           type="url"
//           placeholder='Enter location'
//           {...register('location', { required: 'location is required' })}
//           isInvalid={!!errors.location}
//         />
//         <label>Location URL</label>
//         {errors.location && <FormText className="text-danger">{errors.location.message}</FormText>}
//       </FormGroup>

//       <Row>
//         <Col md={6}>
//           <FormGroup className="mb-3">
//             <FormLabel>From</FormLabel>
//             <FormControl type="time" {...register('workingFrom')} isInvalid={!!errors.workingFrom} />
//             {errors.workingFrom && <FormText className="text-danger">{errors.workingFrom.message}</FormText>}
//           </FormGroup>
//         </Col>
//         <Col md={6}>
//           <FormGroup className="mb-3">
//             <FormLabel>To</FormLabel>
//             <FormControl type="time" {...register('workingTo')} isInvalid={!!errors.workingTo} />
//             {errors.workingTo && <FormText className="text-danger">{errors.workingTo.message}</FormText>}
//           </FormGroup>
//         </Col>
//       </Row>

//       <div className="text-center">
//         <div
//           className="border rounded-3 text-center bg-secondary"
//           style={{
//             borderStyle: 'dashed',
//             cursor: 'pointer',
//             minHeight: '120px',
//             backgroundColor: '#f8f9fa',
//             overflow: 'hidden'
//           }}
//           onClick={() => document.getElementById('logoInput').click()}
//         >
//           {logoPreview ? (
//             <img src={logoPreview} alt="Logo preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//           ) : (
//             <>
//               <b className='plus-sign'>+</b>
//               <p>Add your logo</p>
//             </>
//           )}
//         </div>
//         <input
//           id="logoInput"
//           type="file"
//           accept="image/*"
//           onChange={handleLogoChange}
//           style={{ display: 'none' }}
//         />
//       </div>
//     </>
//   );
// }














































































////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









// import React, { useState } from 'react';

// function RegisterStep2() {
//   const [address, setAddress] = useState('');
//   const [location, setLocation] = useState('');
//   // const [logoPreview, setLogoPreview] = useState(null);
//   const [workingHours, setWorkingHours] = useState({
//     from: '09:00',
//     to: '17:00',
//     // ممكن تضيف أيام الأسبوع لو عايز
//   });

//   const handleDetectLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`);
//           // ممكن تستخدم reverse geocoding API عشان تحولها لعنوان حقيقي
//         },
//         (error) => {
//           alert('Unable to detect location: ' + error.message);
//         }
//       );
//     } else {
//       alert('Geolocation is not supported by your browser.');
//     }
//   };

//   //   // هنا ابعت البيانات للـ backend أو الصفحة الجاية
//   //   console.log('Data:', { address, location, workingHours, logo: logoPreview });
//   //   // navigate('/next-step')
//   // };

//   return (
//     <div
     
//     >
//       <div
//         // className="bg-white rounded-4 shadow-lg p-4 p-md-5"
//         // style={{
//         //   width: '100%',
//         //   maxWidth: '480px',
//         //   border: '1px solid #e0e0e0',
//         // }}
//       >
       

//         {/* Location */}
//         <div className="mb-4">
//           <label className="form-label fw-medium"></label>
//           <div className="input-group">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Your Location"
//               value={location}
//               readOnly
//               style={{ borderRadius: '10px 0 0 10px' }}
//             />
//             <button
//               className="btn btn-danger ms-3"
//               type="button"
//               onClick={handleDetectLocation}
//               style={{ borderRadius: '10px 10px 10px 10px' }}
//             >
//               Detect Location
//             </button>
//           </div>
//         </div>

//         {/* Working Hours - بسيط جدًا (ممكن توسيعه لأيام) */}
//         <div className="mb-4">
//           <label className="form-label fw-medium">Working Hours</label>
//           <div className="d-flex flex-wrap gap-2 mb-2">
//             <span>From:</span>
//             {/* {['09:00', '09:30', '10:00'].map((time) => (
//               <button
//                 key={time}
//                 type="button"
//                 className={`btn btn-md  border rounded-5  ${
//                   workingHours.from === time ? 'btn-danger' : 'btn-outline-secondary'
//                 }`}
//                 onClick={() => setWorkingHours({ ...workingHours, from: time })}
//               >
//                 {time} AM
//               </button>
//             ))} */}
//           </div>
//           <div className="d-flex flex-wrap gap-2">
//             <span>To:</span>
//             {['06:00', '07:00', '09:00'].map((time) => (
//               <button
//                 key={time}
//                 type="button"
//                 className={`btn btn-md border rounded-5 ${
//                   workingHours.to === time ? 'btn-danger' : 'btn-outline-secondary'
//                 }`}
//                 onClick={() => setWorkingHours({ ...workingHours, to: time })}
//               >
//                 {time} {parseInt(time) >= 12 ? 'PM' : 'AM'}
//               </button>
//             ))}
//           </div>
//         </div>


// export default RegisterStep2;










////////////////////////////////////////////////////////////////////////////////////////////////////////////////



















// {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}


