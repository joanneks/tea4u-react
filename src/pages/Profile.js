import React from 'react';
import NavbarInstance from './Navbar';
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from 'react-router-dom';

export default function Profile(props) {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const [profileDetails, setProfileDetails] = useState({
    id: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    shipping_address: '',
    postal_code: 0,
    mobile_number: 0
  });

  useEffect(() => {
    const userProfile = async () => {
      let customerId = JSON.parse(localStorage.getItem('customerId'));
      if(customerId){
        const data = await userContext.getUserProfile();
        setProfileDetails(data);
        console.log('userprofile',data);
      } else{
        console.log(`Login required to view past order's details`);
        navigate('/login');
      }
    }
  
    userProfile()
    }, 
    [])

  

  return (
    <React.Fragment>
      <div style = {{backgroundColor:'#d4e0e2',height:'100vh'}}>
        <div>
          <NavbarInstance/>
        </div>
        <div style = {{margin:'20px'}}>
          <h1 style = {{marginTop:'80px'}}>Hi {profileDetails.username}</h1>
          <div style = {{margin:'20px'}}>
            <table>
              <thead>
                <tr>
                  <th style={{width:"250px"}}></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>First Name</td>
                  <td>{profileDetails.first_name}</td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td>{profileDetails.last_name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{profileDetails.email}</td>
                </tr>
                <tr>
                  <td>Mobile Number</td>
                  <td>{profileDetails.mobile_number}</td>
                </tr>
                <tr>
                  <td>Shipping Address</td>
                  <td>{profileDetails.shipping_address}</td>
                </tr>
                <tr>
                  <td>Postal Code</td>
                  <td>{profileDetails.postal_code}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{marginTop:'50px'}}>
            
          </div>
        </div>
      </div>
      </React.Fragment>
    );
  }