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
    <div style={{minHeight:'100vh'}}>
        <div>
          <NavbarInstance/>
        </div>
        <div style={{height:'57px'}}></div>
        <div style = {{marginTop:'20px',fontFamily:'Khula,sans-serif'}}>
          <div>
            <h3 style={{backgroundColor:'#e3ece5',padding:'18px 20px 10px 20px',fontWeight:'600'}}>Account Details</h3>
          </div>
          <div style={{padding:'20px'}}>
            <div style={{display:'flex',flexWrap:'wrap'}}>
              <div className="col-6 col-sm-6 col-md-4 col-lg-3 mb-3">
                <h6 style={{fontWeight:'600'}}>NAME</h6>
                <p style={{fontWeight:'500', fontSize:'17px'}}>{profileDetails.first_name} {profileDetails.last_name}</p>
              </div>
              <div className="col-6 col-sm-6 col-md-4 col-lg-3  mb-3">
                <h6 style={{fontWeight:'600'}}>USERNAME</h6>
                <p style={{ontWeight:'500', fontSize:'17px'}}>{profileDetails.username}</p>
              </div>
              <div className="col-6 col-sm-6 col-md-4 col-lg-3  mb-3">
                <h6 style={{fontWeight:'600'}}>PHONE NUMBER</h6>
                <p style={{fontWeight:'500', fontSize:'17px'}}>{profileDetails.mobile_number}</p>
              </div>
              <div className="col-6 col-sm-6 col-md-4 col-lg-3  mb-3">
                <h6 style={{fontWeight:'600'}}>EMAIL</h6>
                <p style={{ontWeight:'500', fontSize:'17px'}}>{profileDetails.email}</p>
              </div>
              <div className="col-6 col-sm-6 col-md-4 col-lg-3  mb-3">
                <h6 style={{fontWeight:'600'}}>SHIPPING ADDRESS</h6>
                <p style={{fontWeight:'500', fontSize:'17px'}}>{profileDetails.shipping_address}</p>
              </div>
              <div className="col-6 col-sm-6 col-md-4 col-lg-3  mb-3">
                <h6 style={{fontWeight:'600'}}>POSTAL CODE</h6>
                <p style={{fontWeight:'500', fontSize:'17px'}}>{profileDetails.postal_code}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </React.Fragment>
    );
  }