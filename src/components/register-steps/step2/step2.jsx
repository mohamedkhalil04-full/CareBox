// steps/Step1.jsx
import { Form,useFormContext } from 'react-hook-form';
import {Col,Row, FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap';
import Location from './location-fun'
const Step2=()=> {
  const { register, formState: { errors } } = useFormContext();


  return (
    <>
    
    {/* address */}
      <FormGroup className="form-floating mb-3">
        {/* <FormLabel>Address</FormLabel> */}
        <FormControl
        type='text'
        placeholder='Enter address'
        required
          {...register('address')}
          isInvalid={!!errors.address}
        />
        <label htmlFor="flaotingInput">address</label>
        {errors.address && <FormText className="text-danger">{errors.address.message}</FormText>}
      </FormGroup>


{/* ///////////////////////////////////// */}

      {/* Location */}

      <Location/>

{/* ///////////////////////////////////// */}

{/* working hours */}

      <Row>
        <Col md={6}>
          <FormGroup className="mb-3">
            <FormLabel>from</FormLabel>
            <FormControl type="time" {...register('workingFrom')} isInvalid={!!errors.workingFrom} />
            {errors.workingFrom && <FormText className="text-danger">{errors.workingFrom.message}</FormText>}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup className="mb-3">
            <FormLabel>to</FormLabel>
            <FormControl type="time" {...register('workingTo')} isInvalid={!!errors.workingTo} />
            {errors.workingTo && <FormText className="text-danger">{errors.workingTo.message}</FormText>}
          </FormGroup>
        </Col>
      </Row>
    </>
  );
}

export default Step2