import React from 'react';
import NavbarInstance from './Navbar';
// import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
// import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const userContext = useContext(UserContext);
    // const navigate = useNavigate();

  return (
    <React.Fragment>
      <div>
        <NavbarInstance/>
      </div>
      <div style={{marginTop:'70px'}} className="container-fluid">
        <h1>Checkout</h1>
        <div style={{width:'300px'}}>
        </div>
      </div>

</React.Fragment>
    );
  }
