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
      <label><a target='_blank' style={{textDecoration:"none",padding:'-2px'}} href="https://www.google.com/maps/">open google maps<i class="fa-solid fa-location-dot"></i></a> and please enter the "full URL"</label>
      
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