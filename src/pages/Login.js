import React from 'react';
import NavbarInstance from './Navbar';
import NavbarBottom from './NavbarBottom';
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(props) {

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });

  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    mobile_number: "",
    shipping_address: "",
    postal_code: "",
    password: "",
    confirm_password: "",
  });


  const updateNewUserFormField = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    })
  }

  const updateFormField = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value
    })
  }

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const login = async () => {
    const loginToast = toast.loading("Validating credentials...");
    console.log('login');
    await userContext.login(loginDetails.email, loginDetails.password);
    let userProfile = await userContext.getUserProfile();
    if(!userProfile){
      toast.update(loginToast, {
        render: <span>Invalid credentials, please try again</span>,
        type: "error",
        isLoading: false,
        autoClose: 2000
      });
    } else{
      toast.update(loginToast, {
        render: <span>Logged in successfully! View <a href="/cart">cart</a>?</span>,
        type: "success",
        isLoading: false,
        autoClose: 4000
      });
      setTimeout(()=>{navigate("/tea")},4000);
    }
  }
  const [newUserError, setNewUserError] = useState({
    email: '',
    emailInvalid: '',
    emailExist:'',
    firstName: '',
    lastName: '',
    mobileInvalid: '',
    mobileNumber: '',
    password: '',
    passwordCapitalCheckInvalid: '',
    passwordNumberCheckInvalid: '',
    passwordSpecialCheckInvalid: '',
    postalCode: '',
    shippingAddress: '',
    username: ''
  });
  const createUser = async () => {
    const createUserToast = toast.loading("Creating new user...");
    let newUserResponse = await userContext.createUser(newUser);
    console.log('login page create user', newUserResponse);
    setNewUserError(newUserResponse.errorMessages);
    if(newUserResponse.errorMessages){
      toast.update(createUserToast, {
        render: <span>New user details does not meet requirements</span>,
        type: "error",
        isLoading: false,
        autoClose: 2000
      });
    } else {
      if(newUser.confirm_password === newUser.password){
        setNewUserError({
          email: '',
          emailInvalid: '',
          emailExist:'',
          firstName: '',
          lastName: '',
          mobileInvalid: '',
          mobileNumber: '',
          password: '',
          passwordCapitalCheckInvalid: '',
          passwordNumberCheckInvalid: '',
          passwordSpecialCheckInvalid: '',
          postalCode: '',
          shippingAddress: '',
          username: ''
        });
        setNewUser({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          mobile_number: "",
          shipping_address: "",
          postal_code: "",
          password: "",
          confirm_password: "",
        });
        toast.update(createUserToast, {
          render: <span>User created! Login now to add to cart</span>,
          type: "success",
          isLoading: false,
          autoClose: 2000
        });
        setTimeout(()=>{window.scrollTo({top: 0, left: 0, behavior: 'smooth'});},2000)
      }else{
        toast.update(createUserToast, {
          render: <span>New user details does not meet requirements</span>,
          type: "error",
          isLoading: false,
          autoClose: 2000
        });
      }
    }
  }

  return (
    <React.Fragment>
      <div style={{ minHeight: '100vh' }}>
        <div>
          <NavbarInstance />
        </div>
        <NavbarBottom />
        <div style={{ height: '46px' }}></div>
        <ToastContainer />
        <div id="loginBig">
          <div className="col col-12" style={{ padding: '20px', paddingBottom: '40px', fontFamily: 'Khula,sans-serif', display: 'flex', flexWrap: 'wrap' }}>
            <div className='col col-12 col-sm-12 col-md-12 col-lg-6' >
              <div id="loginPadding">
                <h1 style={{ fontWeight: '500', margin: '30px 0px' }}>Sign In</h1>
                <p style={{ fontWeight: '500', margin: '30px 0px', textAlign: 'justify' }}>Welcome back! Login here to view your profile, cart, orders history or make purchases.</p>

                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>EMAIL ADDRESS:</label>
                  <input type="text" name="email" className="form-control" style={{ width: '100%' }} value={loginDetails.email} onChange={updateFormField} />
                </div>
                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>PASSWORD:</label>
                  <input type="password" name="password" className="form-control" value={loginDetails.password} onChange={updateFormField} />
                </div>
                <p style={{ marginBottom: '30px' }}>Forgot your password?</p>
                <div className="col-lg-6 my-3"
                  style={{ display: 'inline-block', height: '34px', fontWeight: '400', fontSize: '17px', padding: '6px', textAlign: 'center', backgroundColor: '#4c4c4c', color: 'white' }}
                  onClick={login}
                >
                  LOGIN
                </div>
              </div>
            </div>

            <div className='col col-12 col-sm-12 col-md-12 col-lg-6' id="loginPadding">
              <div>
                <h1 style={{ fontWeight: '500', margin: '30px 0px' }}>Create Account</h1>
                <p style={{ fontWeight: '500', margin: '30px 0px', textAlign: 'justify' }}>Create an account now to start making purchases!</p>

                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>FIRST NAME:</label>
                  <input type="text" name="first_name" className="form-control" style={{ width: '100%' }} value={newUser.first_name} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.firstName}</div>
                </div>
                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>LAST NAME:</label>
                  <input type="text" name="last_name" className="form-control" style={{ width: '100%' }} value={newUser.last_name} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.lastName ? newUserError.lastName : ''}</div>
                </div>
                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>USERNAME:</label>
                  <input type="text" name="username" className="form-control" style={{ width: '100%' }} value={newUser.username} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.username ? newUserError.username : ''}</div>
                </div>
                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>EMAIL:</label>
                  <input type="email" name="email" className="form-control" style={{ width: '100%' }} value={newUser.email} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.email ? newUserError.email : ''}</div>
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.emailInvalid ? newUserError.emailInvalid : ''}</div>
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.emailExist ? newUserError.emailExist : ''}</div>
                </div>
                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>MOBILE NUMBER:</label>
                  <input type="text" name="mobile_number" className="form-control" style={{ width: '100%' }} value={newUser.mobile_number} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.mobileNumber ? newUserError.mobileNumber : ''}</div>
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.mobileInvalid ? newUserError.mobileInvalid : ''}</div>
                </div>
                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>SHIPPING ADDRESS:</label>
                  <input type="text" name="shipping_address" className="form-control" style={{ width: '100%' }} value={newUser.shipping_address} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.shippingAddress ? newUserError.shippingAddress : ''}</div>
                </div>
                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>POSTAL CODE:</label>
                  <input type="text" name="postal_code" className="form-control" style={{ width: '100%' }} value={newUser.postal_code} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.postalCode ? newUserError.postalCode : ''}</div>
                </div>
                <div style={{ marginBottom: '30px', fontWeight: '600' }}>
                  <label>PASSWORD:</label>
                  <input type="password" name="password" className="form-control" value={newUser.password} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.password ? newUserError.password + '.' : ''}</div>
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.passwordCapitalCheckInvalid ? newUserError.passwordCapitalCheckInvalid + '.' : ''}</div>
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.passwordNumberCheckInvalid ? newUserError.passwordNumberCheckInvalid + '.' : ''}</div>
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.passwordSpecialCheckInvalid ? newUserError.passwordSpecialCheckInvalid + '.' : ''}</div>
                </div>
                <div style={{ marginBottom: '30px', fontWeight: '600' }}>
                  <label>CONFIRM PASSWORD:</label>
                  <input type="password" name="confirm_password" className="form-control" value={newUser.confirm_password} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>
                    {newUser.password === newUser.confirm_password ? '' : 'Confirmed password does not match password.'}
                  </div>
                </div>
                <div className="col-lg-6 my-3"
                  style={{ display: 'inline-block', height: '34px', fontWeight: '400', fontSize: '17px', padding: '6px', textAlign: 'center', backgroundColor: '#4c4c4c', color: 'white' }}
                  onClick={createUser}
                >
                  CREATE ACCOUNT
                </div>
              </div>
            </div>
          </div>
        </div>


        <div id="loginSmall">
          <div className="col col-12" style={{ padding: '20px', paddingBottom: '40px', fontFamily: 'Khula,sans-serif', display: 'flex', flexWrap: 'wrap' }}>
            <div className='col col-12 col-sm-12 col-md-12 col-lg-6' >
              <div id="loginPadding">
                <h1 style={{ fontWeight: '500', margin: '30px 0px' }}>Sign In</h1>
                <p style={{ fontWeight: '500', margin: '30px 0px', textAlign: 'justify' }}>Welcome back! Login here to view your profile, cart, orders history or make purchases</p>

                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>EMAIL ADDRESS:</label>
                  <input type="text" name="email" className="form-control" style={{ width: '100%' }} value={loginDetails.email} onChange={updateFormField} />
                </div>
                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>PASSWORD:</label>
                  <input type="password" name="password" className="form-control" value={loginDetails.password} onChange={updateFormField} />
                </div>
                <p style={{ marginBottom: '30px' }}>Forgot your password?</p>
                <div className="col-12 col-sm-12 col-md-6 mt-1 mb-4"
                  style={{ display: 'inline-block', height: '34px', fontWeight: '400', fontSize: '17px', padding: '6px', textAlign: 'center', backgroundColor: '#4c4c4c', color: 'white' }}
                  onClick={login}
                >
                  LOGIN
                </div>
              </div>
            </div>

            <div id="loginBreak" style={{ height: '2px', backgroundColor: 'lightgrey', width: '90%', margin: 'auto' }}></div>

            <div className='col col-12 col-sm-12 col-md-12 col-lg-6' id="loginPadding">
              <div>
                <h1 style={{ fontWeight: '500', margin: '30px 0px' }}>Create Account</h1>
                <p style={{ fontWeight: '500', margin: '30px 0px', textAlign: 'justify' }}>Create an account now to start making purchases!</p>

                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>FIRST NAME:</label>
                  <input type="text" name="first_name" className="form-control" style={{ width: '100%' }} value={newUser.first_name} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.firstName}</div>
                </div>
                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>LAST NAME:</label>
                  <input type="text" name="last_name" className="form-control" style={{ width: '100%' }} value={newUser.last_name} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.lastName ? newUserError.lastName : ''}</div>
                </div>
                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>USERNAME:</label>
                  <input type="text" name="username" className="form-control" style={{ width: '100%' }} value={newUser.username} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.username ? newUserError.username : ''}</div>
                </div>
                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>EMAIL:</label>
                  <input type="text" name="email" className="form-control" style={{ width: '100%' }} value={newUser.email} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.email ? newUserError.email : ''}</div>
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.emailInvalid ? newUserError.emailInvalid : ''}</div>
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.emailExist ? newUserError.emailExist : ''}</div>
                </div>
                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>MOBILE NUMBER:</label>
                  <input type="text" name="mobile_number" className="form-control" style={{ width: '100%' }} value={newUser.mobile_number} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.mobileNumber ? newUserError.mobileNumber : ''}</div>
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.mobileInvalid ? newUserError.mobileInvalid : ''}</div>
                </div>
                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>SHIPPING ADDRESS:</label>
                  <input type="text" name="shipping_address" className="form-control" style={{ width: '100%' }} value={newUser.shipping_address} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.shippingAddress ? newUserError.shippingAddress : ''}</div>
                </div>
                <div style={{ marginBottom: '20px', fontWeight: '600' }}>
                  <label>POSTAL CODE:</label>
                  <input type="text" name="postal_code" className="form-control" style={{ width: '100%' }} value={newUser.postal_code} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.postalCode ? newUserError.postalCode : ''}</div>
                </div>
                <div style={{ marginBottom: '30px', fontWeight: '600' }}>
                  <label>PASSWORD:</label>
                  <input type="password" name="password" className="form-control" value={newUser.password} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.password ? newUserError.password + '.' : ''}</div>
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.passwordCapitalCheckInvalid ? newUserError.passwordCapitalCheckInvalid + '.' : ''}</div>
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.passwordNumberCheckInvalid ? newUserError.passwordNumberCheckInvalid + '.' : ''}</div>
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>{newUserError.passwordSpecialCheckInvalid ? newUserError.passwordSpecialCheckInvalid + '.' : ''}</div>
                </div>
                <div style={{ marginBottom: '30px', fontWeight: '600' }}>
                  <label>CONFIRM PASSWORD:</label>
                  <input type="password" name="confirm_password" className="form-control" value={newUser.confirm_password} onChange={updateNewUserFormField} />
                  <div style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>
                    {newUser.password === newUser.confirm_password ? '' : 'Confirmed password does not match password.'}
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 mt-3 mb-4"
                  style={{ display: 'inline-block', height: '34px', fontWeight: '400', fontSize: '17px', padding: '6px', textAlign: 'center', backgroundColor: '#4c4c4c', color: 'white' }}
                  onClick={createUser}
                >
                  CREATE ACCOUNT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
