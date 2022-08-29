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
    navigate("/tea");
  }

  return (
    <React.Fragment>
      <div>
        <NavbarInstance/>
      </div>
      <div style={{marginTop:'70px'}} className="container-fluid">
        <h1>Login</h1>
        <div style={{width:'300px'}}>
          <div>
            <label>Email:</label>
            <input type="text" name="email" className="form-control" value={loginDetails.email} onChange={updateFormField}/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" className="form-control" value={loginDetails.password} onChange={updateFormField}/>
          </div>
          <button className="btn btn-dark" onClick={login}>Login</button>
        </div>
      </div>

</React.Fragment>
    );
  }
