import React, { useState } from 'react';
// reactstrap components
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
import {
	Button,
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
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiHelper } from '../../helper';
const Signup = () => {
	let history = useHistory();
	const [inputs, setInputs] = useState({
		errors: {},
		firstName: '',
		email: '',
		lastNAme: "",
		 dateOfBirth: new Date(),
		gender: '',
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
	const handleDateOfBirth = (date) =>{
    // setDateOfBirth(date)
    setInputs({
			...inputs,
			dateOfBirth:date,
      errors:{...inputs.errors,dateOfBirth:""}
    })
  }
	//on form submit
	const handleSubmit = (event) => {
		event.preventDefault();
		handleSignup();
	};
	const handleSignup = async () => {
		setLoading(true);
		console.log('inside function', isLoading);
		const { email, firstName, lastName,gender,dateOfBirth } = inputs;
		//validation
		try {
			const objectToValidate = {
				email: email,
        firstName: firstName,
        lastName:lastName,
        gender: gender,
        dateOfBirth:dateOfBirth ?moment(dateOfBirth).format('DD-MM-YYYY'):""
			};
			console.log(objectToValidate,'objectToValidate')
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
					ApiRoutes.SIGNUP.service,
					ApiRoutes.SIGNUP.url,
					ApiRoutes.SIGNUP.method,
					ApiRoutes.SIGNUP.authenticate,
					undefined,
					data
				);
				console.log('res', res);
				if (res && !res.status) {
					setLoading(false);
					toast.error(res.messages && res.messages[0]);
				} else {
					setLoading(false);
					toast.success(res.message);
					// history.push(AppRoutes.LOGIN);
				}
			} else {
				setLoading(false);
				console.log('inside else');
				setInputs({ ...inputs, errors: errors });
				return errors;
			}
		} catch (error) {
			console.log('inside catch errors is', error);
		}
	};
	const { email, errors, firstName, lastName,dateOfBirth } = inputs;
	console.log(errors,'errrrrr')
	return (
		<>
			<div className="auth-wrapper">
				<div className="auth-inner">
					<div
						className='page-header'
					// style={{
					//   backgroundImage: 'url(' + require('assets/img/login-image.jpg') + ')',
					// }}
					>
						{/* <div className='filter' />
        <Container>
          <Row>
            <Col className='padding-top ml-auto mr-auto auth-form' lg='4'>
              <Card className='min-height card-register ml-auto mr-auto'> */}
						<h5 cclassName="text-center">Registration</h5>
						<Form className='register-form' onSubmit={handleSubmit}>
							<FormGroup>
								<Label>First Name</Label>
								<span className='required'>*</span>
								<Input
									type='text'
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
									type='text'
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
										<i className='fa fa-spinner fa-spin' /> Register
                      </>
								) : (
										'Register'
									)}
							</button>
						</Form>
						<div className='forgot'>
							<Button
								className='btn-link'
								color='black'
								onClick={() => history.push(AppRoutes.LOGIN)}
							>
								Click here to Login
                  </Button>
						</div>
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
export default Signup;
