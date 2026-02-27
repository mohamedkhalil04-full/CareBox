// // steps/Step1.jsx
// import { Form,useFormContext } from 'react-hook-form';
// import {Col,Row, FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap';
// import { useEffect } from 'react';
// const Step2=()=> {
//   const { register,setValue,watch, formState: { errors } } = useFormContext();


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


//   return (
//     <>
    
//     {/* address */}
//       <FormGroup className="form-floating mb-3">
//         {/* <FormLabel>Address</FormLabel> */}
//         <FormControl
//         type='text'
//         placeholder='Enter address'
//         required
//           {...register('address')}
//           isInvalid={!!errors.address}
//         />
//         <label htmlFor="flaotingInput">address</label>
//         {errors.address && <FormText className="text-danger">{errors.address.message}</FormText>}
//       </FormGroup>


//       {/* /////////////////////////////////////////////////////// */}


//            {/* Location */}

//       <FormGroup className="form-floating mb-3">
//         {/* <FormLabel>Location</FormLabel> */}
//         <FormControl
//           type="url"
//           placeholder='Enter location'
//           required
//           {...register('location', { required: 'location is required' })}
//           isInvalid={!!errors.location}
//         />
//         <label htmlFor="flaotingInput">location</label>
//         {errors.location && <FormText className="text-danger">{errors.location.message}</FormText>}
//       </FormGroup>



// {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}



// {/* working hours */}

//       <Row>
//         <Col md={6}>
//           <FormGroup className="mb-3">
//             <FormLabel>from</FormLabel>
//             <FormControl type="time" {...register('workingFrom')} isInvalid={!!errors.workingFrom} />
//             {errors.workingFrom && <FormText className="text-danger">{errors.workingFrom.message}</FormText>}
//           </FormGroup>
//         </Col>
//         <Col md={6}>
//           <FormGroup className="mb-3">
//             <FormLabel>to</FormLabel>
//             <FormControl type="time" {...register('workingTo')} isInvalid={!!errors.workingTo} />
//             {errors.workingTo && <FormText className="text-danger">{errors.workingTo.message}</FormText>}
//           </FormGroup>
//         </Col>
//       </Row>
//     </>
//   );
// }

// export default Step2





// // // // داخل Step2 أو كومبوننت منفصل
// // import { useFormContext } from 'react-hook-form';
// // import { useState } from 'react';
// // import { FormGroup, FormLabel, FormControl, FormText, Button } from 'react-bootstrap';

// // export default function Step2() {
// //   const { register, setValue, formState: { errors }, watch } = useFormContext();
  
// //   const [mapLink, setMapLink] = useState('');
// //   const [extractedCoords, setExtractedCoords] = useState({ lat: '', lng: '' });
// //   const [errorMsg, setErrorMsg] = useState('');

// //   const extractCoordinates = () => {
// //     const url = mapLink.trim();
// //     if (!url) {
// //       setErrorMsg('برجاء إدخال رابط Google Maps');
// //       return;
// //     }

// //     // 1. regex للنوع الشائع (@lat,lng)
// //     let match = url.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    
// //     // 2. لو ما لقاش، جرب النوع التاني (!3d lat !4d lng)
// //     if (!match) {
// //       match = url.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/);
// //     }

// //     if (match && match[1] && match[2]) {
// //       const lat = parseFloat(match[1]);
// //       const lng = parseFloat(match[2]);

// //       // تحقق إن الأرقام منطقية (مصر مثلاً بين 22-32 lat و 25-37 lng تقريبًا)
// //       if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
// //         setExtractedCoords({ lat: lat.toFixed(8), lng: lng.toFixed(8) });
// //         setValue('latitude', lat.toFixed(8));   // حفظ في form
// //         setValue('longitude', lng.toFixed(8));
// //         setErrorMsg('');
// //         alert('تم استخراج الإحداثيات بنجاح!');
// //       } else {
// //         setErrorMsg('الإحداثيات غير صالحة');
// //       }
// //     } else {
// //       setErrorMsg('تعذر استخراج الإحداثيات من الرابط، تأكد إنه رابط Google Maps صحيح');
// //     }
// //   };

// //   return (
// //     <>
// //       {/* ... باقي الحقول address, working hours ... */}

// //       <FormGroup className="mb-3">
// //         <FormLabel>رابط الموقع من Google Maps</FormLabel>
// //         <FormControl
// //           type="url"
// //           placeholder="https://www.google.com/maps/place/... أو https://maps.app.goo.gl/..."
// //           value={mapLink}
// //           onChange={(e) => setMapLink(e.target.value)}
// //         />
// //         <FormText className="text-muted">
// //           اضغط Share في Google Maps ثم Copy link
// //         </FormText>
// //         <Button 
// //           variant="outline-primary" 
// //           size="sm" 
// //           className="mt-2"
// //           onClick={extractCoordinates}
// //           disabled={!mapLink.trim()}
// //         >
// //           استخراج الإحداثيات
// //         </Button>

// //         {errorMsg && <FormText className="text-danger mt-2">{errorMsg}</FormText>}

// //         {extractedCoords.lat && (
// //           <div className="mt-2 text-success">
// //             تم استخراج: 
// //             <br />
// //             Latitude: {extractedCoords.lat}
// //             <br />
// //             Longitude: {extractedCoords.lng}
// //           </div>
// //         )}
// //       </FormGroup>

// //       {/* الحقول المخفية للباك إند */}
// //       <input type="hidden" {...register('latitude')} />
// //       <input type="hidden" {...register('longitude')} />
// //     </>
// //   );
// // }



// steps/Step1.jsx
import { Form, useFormContext } from 'react-hook-form';
import { FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap';

// import { useState } from 'react';
const Step2 = () => {
  const { register, formState: { errors } } = useFormContext();

  // const [name, setName] = useState("")
  return (
    <div className='reg1'>
      
      {/* <FormGroup className="mb-3">
        <FormLabel>choose provider type</FormLabel>
        <FormControl as="select" {...register('providerType')} isInvalid={!!errors.providerType}>
          <option value="" hidden>choose type</option>
          <option value="1">Maintenance</option>
          <option value="2">Spare parts and accessories</option>
          <option value="3">Emergancy</option>
          <option value="4">Car Care</option>
        </FormControl>
        {errors.providerType && <FormText className="text-danger">{errors.providerType.message}</FormText>}
      </FormGroup> */}

      {/* //////////////////////// */}

      {/* <FormGroup className="mb-3">
        <FormLabel>الاسم</FormLabel>
        <FormControl {...register('name')} isInvalid={!!errors.name} />
        {errors.name && <FormText className="text-danger">{errors.name.message}</FormText>}
      </FormGroup> */}


{/* name */}
      <FormGroup className="form-floating mb-3">
        {/* <FormLabel>Name</FormLabel> */}
        <FormControl
          type='text'
          placeholder='Enter name'
          // value={name}
          // onChange={(e)=>setName(e.target.value)}
          {...register('name')}
          isInvalid={!!errors.name}
        />
        <label htmlFor="floatingInput">Shop Name</label>
        {errors.name && <FormText className="text-danger">{errors.name.message}</FormText>}
      </FormGroup>


        <FormGroup className="form-floating mb-3">
        {/* <FormLabel>Name</FormLabel> */}
        <FormControl
          type='email'
          placeholder='Enter name'
          // value={name}
          // onChange={(e)=>setName(e.target.value)}
          {...register('name')}
          isInvalid={!!errors.name}
        />
        <label htmlFor="floatingInput">Email</label>
        {errors.name && <FormText className="text-danger">{errors.name.message}</FormText>}
      </FormGroup>


  <FormGroup className="form-floating mb-3">
        {/* <FormLabel>Name</FormLabel> */}
        <FormControl
          type='number'
          placeholder='Enter name'
          // value={name}
          // onChange={(e)=>setName(e.target.value)}
          {...register('name')}
          isInvalid={!!errors.name}
        />
        <label htmlFor="floatingInput">Phone Number</label>
        {errors.name && <FormText className="text-danger">{errors.name.message}</FormText>}
      </FormGroup>

  <FormGroup className="form-floating mb-3">
        {/* <FormLabel>Name</FormLabel> */}
        <FormControl
          type='password'
          placeholder='Enter name'
          // value={name}
          // onChange={(e)=>setName(e.target.value)}
          {...register('name')}
          isInvalid={!!errors.name}
        />
        <label htmlFor="floatingInput">Password</label>
        {errors.name && <FormText className="text-danger">{errors.name.message}</FormText>}
      </FormGroup>


{/* phone */}
      <FormGroup className="form-floating mb-3">
        {/* <FormLabel>Phone Number</FormLabel> */}
        <FormControl
          type="password"
          placeholder='Enter phone number'
          required
          {...register('phone')}
          isInvalid={!!errors.phone}
        />
        <label htmlFor="floatingInput">Confirm Password</label>
        {errors.phone && <FormText className="text-danger">{errors.phone.message}</FormText>}
      </FormGroup>


      


{/* image */}
      {/* <FormGroup className="mb-3">
        <FormLabel>Logo</FormLabel>
        <FormControl
          type="file"
          accept="image/*"
          {...register('image')}
          isInvalid={!!errors.image}
        />
        {errors.image && <FormText className="text-danger">{errors.image.message}</FormText>}
      </FormGroup> */}
    </div>
    
  );
}

export default Step2