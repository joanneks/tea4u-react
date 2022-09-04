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

  return (
    <React.Fragment>
      <div style={{minHeight:'100vh'}}>
        <div>
          <NavbarInstance/>
        </div>
        <div style={{height:'57px'}}></div>
        <div style = {{margin:'20px 20px 0px 20px',paddingBottom:'40px',fontFamily:'Khula,sans-serif',display:'flex'}}><div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <h2 style={{fontWeight:'600',margin:'10px 0px 30px 0px'}}>Sign In</h2>
              <p style={{fontWeight:'500',margin:'30px 0px',textAlign:'justify'}}>Welcome back! Login here to view your cart, order history and/or make purchases.</p>
          
              <div style={{marginBottom:'20px',fontWeight:'600'}}>
                <label>EMAIL ADDRESS:</label>
                <input type="text" name="email" className="form-control" style={{width:'100%'}} value={loginDetails.email} onChange={updateFormField}/>
              </div>
              <div style={{marginBottom:'30px',fontWeight:'600'}}>
                <label>PASSWORD:</label>
                <input type="password" name="password" className="form-control" value={loginDetails.password} onChange={updateFormField}/>
              </div>
              <button className="btn btn-dark" style={{marginBottom:'40px'}} onClick={login}>Login</button>
            </div>

            <div style={{height:'2px',backgroundColor:'lightgrey'}}></div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <h2 style={{fontWeight:'600',margin:'30px 0px'}}>Create Account</h2>
              <p style={{fontWeight:'500',margin:'30px 0px',textAlign:'justify'}}>Create an account now to start making purchases!</p>
              <div style={{marginBottom:'20px',fontWeight:'600'}}>
                <label>FIRST NAME:</label>
                <input type="text" name="first_name" className="form-control" style={{width:'100%'}} value={loginDetails.email} onChange={updateFormField}/>
              </div>
              <div style={{marginBottom:'20px',fontWeight:'600'}}>
                <label>LAST NAME:</label>
                <input type="text" name="last_name" className="form-control" style={{width:'100%'}} value={loginDetails.email} onChange={updateFormField}/>
              </div>
              <div style={{marginBottom:'20px',fontWeight:'600'}}>
                <label>USERNAME:</label>
                <input type="text" name="username" className="form-control" style={{width:'100%'}} value={loginDetails.email} onChange={updateFormField}/>
              </div>
              <div style={{marginBottom:'20px',fontWeight:'600'}}>
                <label>EMAIL:</label>
                <input type="text" name="email" className="form-control" style={{width:'100%'}} value={loginDetails.email} onChange={updateFormField}/>
              </div>
              <div style={{marginBottom:'20px',fontWeight:'600'}}>
                <label>MOBILE NUMBER:</label>
                <input type="text" name="mobile_number" className="form-control" style={{width:'100%'}} value={loginDetails.email} onChange={updateFormField}/>
              </div>
              <div style={{marginBottom:'20px',fontWeight:'600'}}>
                <label>SHIPPING ADDRESS:</label>
                <input type="text" name="shipping_address" className="form-control" style={{width:'100%'}} value={loginDetails.email} onChange={updateFormField}/>
              </div>
              <div style={{marginBottom:'20px',fontWeight:'600'}}>
                <label>POSTAL CODE:</label>
                <input type="text" name="postal_code" className="form-control" style={{width:'100%'}} value={loginDetails.email} onChange={updateFormField}/>
              </div>
              <div style={{marginBottom:'30px',fontWeight:'600'}}>
                <label>PASSWORD:</label>
                <input type="password" name="password" className="form-control" value={loginDetails.password} onChange={updateFormField}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment> 
    );
  }
