import React from 'react';
import NavbarInstance from './Navbar';
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });

  const [newUser, setNewUser] = useState({
    first_name:"",
    last_name:"",
    username:"",
    email: "",
    mobile_number:"",
    shipping_address:"",
    postal_code:"",
    password: "",
    confirm_password:"",
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
    console.log('login');
    await userContext.login(loginDetails.email, loginDetails.password);
    await userContext.getUserProfile();
    navigate("/profile");
  }
  const [newUserError,setNewUserError] = useState({
    email:'',
    emailInvalid:'',
    firstName:'',
    lastName:'',
    mobileInvalid:'',
    mobileNumber:'',
    password:'',
    passwordCapitalCheckInvalid:'',
    passwordNumberCheckInvalid:'',
    passwordSpecialCheckInvalid:'',
    postalCode:'',
    shippingAddress:'',
    username:''
  });
  const createUser = async () => {
    let newUserResponse = await userContext.createUser(newUser);
    console.log('login page create user',newUserResponse);
    setNewUserError(newUserResponse.errorMessages);
    navigate('/tea');
  }

  return (
    <React.Fragment>
      <div style={{minHeight:'100vh'}}>
        <div>
          <NavbarInstance/>
        </div>
        <div style={{height:'57px'}}></div>
        <div className="col col-12" style={{margin:'20px 20px 0px 20px',paddingBottom:'40px',fontFamily:'Khula,sans-serif',display:'flex',flexWrap:'wrap'}}>
          <div className='col col-12 col-sm-12 col-md-6 col-lg-6' >
            <div style={{padding:'0px 30px'}}>
              <h2 style={{fontWeight:'600',margin:'30px 0px'}}>Sign In</h2>
                <p style={{fontWeight:'500',margin:'30px 0px',textAlign:'justify'}}>Welcome back! Login here to view your cart, order history and/or make purchases.</p>
            
                <div style={{marginBottom:'20px',fontWeight:'600'}}>
                  <label>EMAIL ADDRESS:</label>
                  <input type="text" name="email" className="form-control" style={{width:'100%'}} value={loginDetails.email} onChange={updateFormField}/>
                </div>
                <div style={{marginBottom:'20px',fontWeight:'600'}}>
                  <label>PASSWORD:</label>
                  <input type="password" name="password" className="form-control" value={loginDetails.password} onChange={updateFormField}/>
                </div>
                <p style={{marginBottom:'30px'}}>Forgot your password?</p>
                <button className="btn btn-dark" style={{marginBottom:'40px'}} onClick={login}>Login</button>
            </div>
          </div>

          {/* <div className="col col-12 col-sm-12 col-md-0 col-lg-0" style={{height:'2px',backgroundColor:'lightgrey'}}></div> */}

          <div className='col col-12 col-sm-12 col-md-6 col-lg-6' >
            <div style={{padding:'0px 30px'}}>
              <h2 style={{fontWeight:'600',margin:'30px 0px'}}>Create Account</h2>
              <p style={{fontWeight:'500',margin:'30px 0px',textAlign:'justify'}}>Create an account now to start making purchases!</p>
              
              <div style={{marginBottom:'20px',fontWeight:'600'}}>
                <label>FIRST NAME:</label>
                <input type="text" name="first_name" className="form-control" style={{width:'100%'}} value={newUser.first_name} onChange={updateNewUserFormField}/>
                <div style={{color:'red',fontSize:'13px',fontWeight:'500'}}>{newUserError.firstName}</div>
              </div>
              <div style={{marginBottom:'20px',fontWeight:'600'}}>
                <label>LAST NAME:</label>
                <input type="text" name="last_name" className="form-control" style={{width:'100%'}} value={newUser.last_name} onChange={updateNewUserFormField}/>
                <div style={{color:'red',fontSize:'13px',fontWeight:'500'}}>{newUserError.lastName}</div>
              </div>
              <div style={{marginBottom:'20px',fontWeight:'600'}}>
                <label>USERNAME:</label>
                <input type="text" name="username" className="form-control" style={{width:'100%'}} value={newUser.username} onChange={updateNewUserFormField}/>
                <div style={{color:'red',fontSize:'13px',fontWeight:'500'}}>{newUserError.username}</div>
              </div>
              <div style={{marginBottom:'20px',fontWeight:'600'}}>
                <label>EMAIL:</label>
                <input type="text" name="email" className="form-control" style={{width:'100%'}} value={newUser.email} onChange={updateNewUserFormField}/>
                <div style={{color:'red',fontSize:'13px',fontWeight:'500'}}>{newUserError.email}</div>
              </div>
              <div style={{marginBottom:'20px',fontWeight:'600'}}>
                <label>MOBILE NUMBER:</label>
                <input type="text" name="mobile_number" className="form-control" style={{width:'100%'}} value={newUser.mobile_number} onChange={updateNewUserFormField}/>
                <div style={{color:'red',fontSize:'13px',fontWeight:'500'}}>{newUserError.mobileNumber}</div>
                <div style={{color:'red',fontSize:'13px',fontWeight:'500'}}>{newUserError.mobileInvalid}</div>
              </div>
              <div style={{marginBottom:'20px',fontWeight:'600'}}>
                <label>SHIPPING ADDRESS:</label>
                <input type="text" name="shipping_address" className="form-control" style={{width:'100%'}} value={newUser.shipping_address} onChange={updateNewUserFormField}/>
                <div style={{color:'red',fontSize:'13px',fontWeight:'500'}}>{newUserError.shippingAddress}</div>
              </div>
              <div style={{marginBottom:'20px',fontWeight:'600'}}>
                <label>POSTAL CODE:</label>
                <input type="text" name="postal_code" className="form-control" style={{width:'100%'}} value={newUser.postal_code} onChange={updateNewUserFormField}/>
                <div style={{color:'red',fontSize:'13px',fontWeight:'500'}}>{newUserError.postalCode}</div>
              </div>
              <div style={{marginBottom:'30px',fontWeight:'600'}}>
                <label>PASSWORD:</label>
                <input type="password" name="password" className="form-control" value={newUser.password} onChange={updateNewUserFormField}/>
                <div style={{color:'red',fontSize:'13px',fontWeight:'500'}}>{newUserError.password ? newUserError.password + '.' : ''}</div>
                <div style={{color:'red',fontSize:'13px',fontWeight:'500'}}>{newUserError.passwordCapitalCheckInvalid ? newUserError.passwordCapitalCheckInvalid + '.' : ''}</div>
                <div style={{color:'red',fontSize:'13px',fontWeight:'500'}}>{newUserError.passwordNumberCheckInvalid ? newUserError.passwordNumberCheckInvalid + '.' : ''}</div>
                <div style={{color:'red',fontSize:'13px',fontWeight:'500'}}>{newUserError.passwordSpecialCheckInvalid ? newUserError.passwordSpecialCheckInvalid + '.' : ''}</div>
              </div>
              <div style={{marginBottom:'30px',fontWeight:'600'}}>
                <label>CONFIRM PASSWORD:</label>
                <input type="password" name="confirm_password" className="form-control" value={newUser.confirm_password} onChange={updateNewUserFormField}/>
                <div style={{color:'red',fontSize:'13px',fontWeight:'500'}}>
                  {newUser.password === newUser.confirm_password ? '' : 'Confirmed password does not match password.'}
                </div>
              </div>
              <button className="btn btn-dark" style={{marginBottom:'40px'}} onClick={createUser}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment> 
    );
  }
