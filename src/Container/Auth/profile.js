import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
// reactstrap components
import {
  // Button,
  // Card,
  Form,
  Input,
  // Container,
  // Row,
  // Col,
  Label,
  FormGroup
} from 'reactstrap';
// core components
import { validation } from '../../validation/validator';
import { AppRoutes, ApiRoutes } from '../../Config';
import { ApiHelper } from '../../helper';

import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Profile = () => {
  let history = useHistory();
  const [inputs, setInputs] = useState({
    errors: {},
    firstName: '',
    lastName: "",
    email: '',
    gender: '',
    dateOfBirth: new Date()
  });
  // for loader
  const [isLoading, setLoading] = useState(false);

  //Fecth user profile data 
  useEffect(() => {
    async function getUserData() {
      const res = await new ApiHelper().FetchFromServer(
        ApiRoutes.GET_USER_PROFILE.service,
        ApiRoutes.GET_USER_PROFILE.url,
        ApiRoutes.GET_USER_PROFILE.method,
        ApiRoutes.GET_USER_PROFILE.authenticate,
        undefined,
        undefined,
      );
      if (res && res.status) {
        setInputs(res.data.data)
      }
    }
    getUserData()
  }, [])
  //handle change in fields
  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;
    setInputs({
      ...inputs,
      [name]: value,
      errors: { ...inputs.errors, [name]: "" }
    });
  };
  const handleDateOfBirth = (date) => {
    setInputs({
      ...inputs,
      dateOfBirth: date,
      errors: { ...inputs.errors, dateOfBirth: "" }
    })
  }
  //on form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile();
  };
  const updateProfile = async () => {
    setLoading(true);
    console.log('inside function', isLoading);
    const { email, firstName, lastName, gender, dateOfBirth } = inputs;
    //validation
    try {
      const objectToValidate = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        dateOfBirth: dateOfBirth ? moment(dateOfBirth).format('DD-MM-YYYY') : ""
      };
      const { isValid, errors } = validation(objectToValidate);
      console.log('is valid', isValid);
      const data = {
        email,
        firstName,
        lastName,
        dateOfBirth,
        gender: gender,
      };
      if (isValid) {
        setInputs({ ...inputs, errors: {} });
        console.log('i am in validation');
        const res = await new ApiHelper().FetchFromServer(
          ApiRoutes.UPDATE_PROFILE.service,
          ApiRoutes.UPDATE_PROFILE.url,
          ApiRoutes.UPDATE_PROFILE.method,
          ApiRoutes.UPDATE_PROFILE.authenticate,
          undefined,
          data
        );
        console.log('res', res);
        if (res && res.isError) {
          setLoading(false);
          toast.error(res.messages && res.messages[0]);
        } else {
          setLoading(false);
          toast.success(res.messages && res.messages[0]);
          history.push(AppRoutes.LOGIN);
        }
      } else {
        setLoading(false);
        setInputs({ ...inputs, errors: errors });
        return errors;
      }
    } catch (error) {
      console.log('inside catch errors is', error);
    }
  };
  const { email, errors, firstName, lastName, dateOfBirth, gender } = inputs;
  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <div
            className='page-header'
          >
            {/* <div className='filter' />
        <Container>
          <Row>
            <Col className='padding-top ml-auto mr-auto auth-form' lg='4'>
              <Card className='min-height card-register ml-auto mr-auto'> */}
            <h5 className="text-center"> My Profile</h5>
            <Form className='register-form' onSubmit={handleSubmit}>
              <FormGroup>
                <Label>First Name</Label>
                <span className='required'>*</span>
                <Input
                  type='name'
                  name={'firstName'}
                  value={firstName}
                  placeholder='First Name'
                  onChange={handleChange}
                />
              </FormGroup>
              {errors && errors.firstName ? (
                <p className='required-error'>{errors.firstName}</p>
              ) : null}
              <FormGroup>
                <Label>Last Name</Label>
                <span className='required'>*</span>
                <Input
                  type='name'
                  name={'lastName'}
                  value={lastName}
                  placeholder='Last Name'
                  onChange={handleChange}
                />
              </FormGroup>
              {errors && errors.lastName ? (
                <p className='required-error'>{errors.lastName}</p>
              ) : null}

              <FormGroup>
                <Label>Email</Label>
                <span className='required'>*</span>{' '}
                <Input
                  placeholder='Email'
                  type='email'
                  name={'email'}
                  value={email}
                  onChange={handleChange}
                />
              </FormGroup>
              {errors && errors.email ? (
                <p className='required-error'>{errors.email}</p>
              ) : null}
              <FormGroup>
                <Label>Date Of Birth</Label>
                <span className='required'>*</span>{' '}
                <DatePicker
                  selected={dateOfBirth}
                  onChange={handleDateOfBirth}
                  className='date-picker date-input'
                />
              </FormGroup>
              {errors && errors.dateOfBirth ? (
                <p className='required-error'>{errors.dateOfBirth}</p>
              ) : null}
              <FormGroup>
                <Label>Gender</Label>
                <Label className='ml-5'>
                  <Input
                    id='male'
                    type='radio'
                    name='gender'
                    value='Male'
                    onChange={handleChange}
                  />
                    Male
                  </Label>
                <Label className='ml-5'>
                  <Input
                    id='female'
                    type='radio'
                    name='gender'
                    value='Female'
                    onChange={handleChange}
                  />
                    Female
                  </Label>
              </FormGroup>
              <br />
              {errors && errors.gender ?
                <p className='required-error'>{errors.gender}</p> : null}
              <button
                block
                // className='btn-round'
                className="btn btn-primary btn-block"
                color='black'
                onClick={handleSubmit}
                disabled={isLoading}
                type='submit'
              >
                {isLoading ? (
                  <>
                    <i className='fa fa-spinner fa-spin' /> Submit
                      </>
                ) : (
                    'Submit'
                  )}
              </button>
            </Form>
            {/* </Card>
            </Col>
          </Row>
        </Container> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
