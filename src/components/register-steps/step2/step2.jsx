
import { Form, useFormContext } from 'react-hook-form';
import { FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap';
import { useState } from "react";
const Step2 = () => {
  const { register, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>

      {/* name */}

      <FormGroup className="form-floating mb-3">
        {/* <FormLabel>name</FormLabel> */}
        <FormControl
          type='text'
          placeholder=''
          {...register('name')}
          isInvalid={!!errors.name}
        />
        <label htmlFor="flaotingInput">name</label>
        {errors.name && <FormText className="text-danger">{errors.name.message}</FormText>}
      </FormGroup>


      {/* /////////////////////////////////////////////////////// */}


      {/* email */}

      <FormGroup className="form-floating mb-3">
        {/* <FormLabel>Email</FormLabel> */}
        <FormControl
          type="email"
          placeholder=''
          {...register('email')}
          isInvalid={!!errors.email}
        />
        <label htmlFor="floatingInput">Email</label>
        {errors.email && <FormText className="text-danger">{errors.email.message}</FormText>}
      </FormGroup>


      {/* /////////////////////////////////////////////////////// */}


      {/* phone */}

      <FormGroup className="form-floating mb-3">
        {/* <FormLabel>Phone</FormLabel> */}
        <FormControl
          type="tel"
          placeholder=''
          {...register('phone')}
          isInvalid={!!errors.phone}
        />
        <label htmlFor="floatingInput">Phone</label>
        {errors.phone && <FormText className="text-danger">{errors.phone.message}</FormText>}
      </FormGroup>



      {/* /////////////////////////////////////////////////////// */}


      {/* password */}

      <FormGroup className="form-floating mb-3">
        {/* <FormLabel>Password</FormLabel> */}
        <FormControl
          type={showPassword ? "text" : "password"}
          placeholder=''
          {...register('password')}
          isInvalid={!!errors.password}

        />
        <label htmlFor="floatingInput">Password</label>
        {errors.password && <FormText className="text-danger">{errors.password.message}</FormText>}
      </FormGroup>


      {/* check box for showing the password */}


      <div className="form-check mt-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword((s) => !s)}
        />
        <label className="form-check-label" htmlFor="showPwdRegister">
          Show Password
        </label>
      </div>

      {/* /////////////////////////////// */}

      {/* confirm */}
      <FormGroup className="form-floating mb-3">
        {/* <FormLabel>Confirm Password</FormLabel> */}
        <FormControl
          type={showPassword ? "text" : "password"}
          placeholder=''
          {...register('confirmPassword')}
          isInvalid={!!errors.confirm}

        />
        <label htmlFor="floatingInput">confirm password</label>
        {errors.confirmPassword && <FormText className="text-danger">{errors.confirmPassword.message}</FormText>}
      </FormGroup>


    </>
  );
}

export default Step2
