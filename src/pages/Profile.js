import React from 'react';
import NavbarInstance from './Navbar';
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from 'react-router-dom';

export default function Profile(props) {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const [profileDetails, setProfileDetails] = useState({
    id: 5,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    shipping_address: '',
    postal_code: 0,
    mobile_number: 0
  });

  const userProfile = async () => {
    return await userContext.getUserProfile();
  }
  

  return (
    <React.Fragment>
      <div style = {{backgroundColor:'#d4e0e2',height:'100vh'}}>
        <div>
          <NavbarInstance/>
        </div>
        <div style = {{margin:'20px'}}>
          <h1 style = {{marginTop:'80px'}}>Hi UserName</h1>
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
                  <td>First Name</td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td>Last Name</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>Email</td>
                </tr>
                <tr>
                  <td>Mobile Number</td>
                  <td>Mobile Number</td>
                </tr>
                <tr>
                  <td>Shipping Address</td>
                  <td>Shipping Address</td>
                </tr>
                <tr>
                  <td>Postal Code</td>
                  <td>Postal Code</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{marginTop:'50px'}}>
            <h4>History</h4>
            <table>
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Order Date</th>
                  <th>Order Status</th>
                  <th>Shipping Method</th>
                  <th>Shipping Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </React.Fragment>
    );
  }