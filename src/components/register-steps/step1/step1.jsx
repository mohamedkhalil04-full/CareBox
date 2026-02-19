// steps/Step1.jsx
import { Form, useFormContext } from 'react-hook-form';
import { FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap';
// import { useState } from 'react';
const Step1 = () => {
  const { register, formState: { errors } } = useFormContext();

  // const [name, setName] = useState("")
  return (
    <>
      <FormGroup className="mb-3">
        <FormLabel>choose provider type</FormLabel>
        <FormControl as="select" {...register('providerType')} isInvalid={!!errors.providerType}>
          <option value="" hidden>choose type</option>
          <option value="1">Maintenance</option>
          <option value="2">Spare parts and accessories</option>
          <option value="3">Emergancy</option>
          <option value="4">Car Care</option>
        </FormControl>
        {errors.providerType && <FormText className="text-danger">{errors.providerType.message}</FormText>}
      </FormGroup>

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
        <label htmlFor="floatingInput">Name</label>
        {errors.name && <FormText className="text-danger">{errors.name.message}</FormText>}
      </FormGroup>


{/* phone */}
      <FormGroup className="form-floating mb-3">
        {/* <FormLabel>Phone Number</FormLabel> */}
        <FormControl
          type="tel"
          placeholder='Enter phone number'
          required
          {...register('phone')}
          isInvalid={!!errors.phone}
        />
        <label htmlFor="floatingInput">Phone Number</label>
        {errors.phone && <FormText className="text-danger">{errors.phone.message}</FormText>}
      </FormGroup>


{/* image */}
      <FormGroup className="mb-3">
        <FormLabel>Logo</FormLabel>
        <FormControl
          type="file"
          accept="image/*"
          {...register('image')}
          isInvalid={!!errors.image}
        />
        {errors.image && <FormText className="text-danger">{errors.image.message}</FormText>}
      </FormGroup>
    </>
  );
}

export default Step1