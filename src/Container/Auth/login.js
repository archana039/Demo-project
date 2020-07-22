import React, { useState } from 'react';
import * as queryString from 'query-string';
// reactstrap components
import {  Form, Input ,FormGroup,Row, Col,Button, } from 'reactstrap';

// core components
import { validation } from '../../validation/validator';
import { useHistory } from 'react-router';
import { AppRoutes } from '../../Config';
import { ApiRoutes } from '../../Config';
import 'react-toastify/dist/ReactToastify.css';
import { ApiHelper } from '../../helper';
import { toast } from 'react-toastify';

const Login = (props) => {
  let history = useHistory();
  const [inputs, setInputs] = useState({
    errors: {},
    email: '',
  });
  // for loader
  const [isLoading, setLoading] = useState(false);
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

  //on form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };
  const handleLogin = async () => {
    setLoading(true);
    console.log('inside function');
    const { email, password } = inputs;
    //validation
    try {
      const objectToValidate = {
        email: email,
      };
      const { isValid, errors } = validation(objectToValidate);
      console.log('is valid', isValid);

      if (isValid) {
        setInputs({ ...inputs, errors: {} });
        console.log('i am in validation');
        const data = {
          email,
        };
        const res = await new ApiHelper().FetchFromServer(
          ApiRoutes.LOGIN.service,
          ApiRoutes.LOGIN.url,
          ApiRoutes.LOGIN.method,
          ApiRoutes.LOGIN.authenticate,
          undefined,
          data
        );
        // console.log('response', res);
        if (res && res.status) {
          toast.success(res.message)
          console.log(res.token,'tokkkkkkkkkkk')
          setLoading(false);
          console.log('inside if');
          localStorage.setItem('token', res.token);         
        } else {
          setLoading(false);
          toast.error(res.messages && res.messages[0]);
        }
      } else {
        setLoading(false);
        setInputs({ ...inputs, errors });
        return errors;
      }
    } catch (error) { }
  };

  //google login
  const responseGoogle = async (response) => {
    console.log(response, 'response')
    if (response && response.Tt) {
      const data = {
        email: response.Tt.Du
      }
      const res = await new ApiHelper().FetchFromServer(
        ApiRoutes.GOOGLE_LOGIN.service,
        ApiRoutes.GOOGLE_LOGIN.url,
        ApiRoutes.GOOGLE_LOGIN.method,
        ApiRoutes.GOOGLE_LOGIN.authenticate,
        undefined,
        data
      );
      if (res && res.isError) {

      }
      else {
        history.push(AppRoutes.HOME);
        localStorage.setItem('token', res.data.token);

      }
    }

  }
  const { email, password, errors } = inputs;
  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">      
      <div
        className='page-header'
      >
        {/* <div className='filter' /> */}
        {/* <Container> */}
          {/* <Row> */}
            {/* <Col className='ml-auto mr-auto auth-form' lg='4'> */}
              {/* <Card className='card-register ml-auto mr-auto'> */}
                <h5 className="text-center">Login</h5>
                <Form className='register-form' onSubmit={handleSubmit}>
                  <FormGroup >
                  <label>Email</label>
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
                        <i className='fa fa-spinner fa-spin' /> Login
                      </>
                    ) : (
                        'Login'
                      )}
                  </button>
                </Form>
                <div className='forgot'>
                  <Row>
                    <Col sm='5'>
                      <Button
                        className='btn-link'
                        color='black'
                        onClick={() => history.push(AppRoutes.SIGNUP)}
                      >
                        Signup
                      </Button>
                    </Col>
                    {/* <Col sm='7'>
                      <Button
                        className='btn-link'
                        color='black'
                        onClick={() => history.push(AppRoutes.FORGET_PASSWORD)}
                      >
                        Forget Password?
                      </Button>
                    </Col> */}
                  </Row>
                </div>
              {/* </Card> */}
            {/* </Col> */}
          {/* </Row> */}
        {/* </Container> */}
      </div>
      </div>
      </div>
    </>
  );
};

export default Login;
