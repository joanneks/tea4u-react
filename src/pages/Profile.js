import React from 'react';
import NavbarInstance from './Navbar';
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const [newProfileDetails, setNewProfileDetails] = useState({
    id: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    shipping_address: '',
    postal_code: '',
    postalNumberCheck:'',
    mobile_number: '',
    mobileNumberCheck:'',
    existing_password:'',
    password:'',
    confirm_password:''
  });

  const [updatePassword, setUpdatePassword] = useState({
    email:'',
    existing_password:'',
    password:''
  })

  useEffect(() => {
    const userProfile = async () => {
      let customerId = JSON.parse(localStorage.getItem('customerId'));
      if(customerId){
        const data = await userContext.getUserProfile();
        console.log('data',data)
        setProfileDetails(data);
        setNewProfileDetails({
          ...newProfileDetails,
          id: data.id,
          first_name:data.first_name,
          last_name:data.last_name,
          username:data.username,
          email: data.email,
        })
        setUpdatePassword({
          ...updatePassword,
          email: data.email,
        })
      } else{
        console.log(`Login required to view past order's details`);
        navigate('/login');
      }
    }
    userProfile()
    }, 
    [])

  const updateUserFormField = (e) => {
    setNewProfileDetails({
      ...newProfileDetails,
      [e.target.name]: e.target.value
    })
  }

  const updatePasswordFormField = (e) => {
    setUpdatePassword({
      ...updatePassword,
      [e.target.name]: e.target.value
    })
  }

  const [errorMessages,setErrorMessages] = useState({
    firstName:'',
    lastName:'',
    mobileInvalid:'',
    mobileNumber:'',
    password:'',
    postalCode:'',
    shippingAddress:'',
    username:''
  })
  const [updatedStatus,setUpdatedStatus] = useState(false);
  const [passwordErrorMessage,setPasswordErrorMessage] = useState({
    existingPasswordMatch:'',
    passwordCapitalCheckInvalid:'',
    passwordNumberCheckInvalid:'',
    passwordSpecialCheckInvalid:'',
    passwordMatch:'',
    password:''
  });
  const [updatePasswordStatus,setUpdatePasswordStatus] = useState(false);

  const updateUserPassword = async () => {
    const editPasswordToast = toast.loading("Validating password update...");
    let newPassword = updatePassword.password === updatePassword.confirm_password;
    if(newPassword){
      let editedUserPassword = updatePassword;
      let updatedUserPasswordResponse = await userContext.updatePassword(profileDetails.id,editedUserPassword);
      console.log(updatedUserPasswordResponse);
        
      if(updatedUserPasswordResponse.updatedPasswordStatus){
        setUpdatePasswordStatus(true)
        toast.update(editPasswordToast, {
          render: `Password updated`,
          type: "success",
          isLoading: false,
          autoClose: 3000
        });
        setTimeout(function () {
            navigate("/profile");
        }, 3000)
        setUpdatePasswordStatus(false);
      } else{
        setUpdatePasswordStatus(false);
        toast.update(editPasswordToast, {
          render: "Invalid password/new password does not meet requirements.",
          type: "error",
          isLoading: false,
          autoClose: 2000
        });
      };
        if(updatePassword.password === '' && updatePassword.passwordCapitalCheckInvalid === '' &&
          updatePassword.passwordNumberCheckInvalid === '' && updatePassword.passwordSpecialCheckInvalid === '' 
          ){
          setPasswordErrorMessage({
            existingPasswordMatch:'',
            passwordCapitalCheckInvalid:'',
            passwordNumberCheckInvalid:'',
            passwordSpecialCheckInvalid:'',
            passwordMatch:'',
            password:''
          });
          // if(updatedUserPasswordResponse.errorMessages.existingPasswordMatch === ''){
          // }
        } else{
          setPasswordErrorMessage({
            ...passwordErrorMessage,
            existingPasswordMatch:updatedUserPasswordResponse.errorMessages.existingPasswordMatch,
            password:updatedUserPasswordResponse.errorMessages.password,
            passwordCapitalCheckInvalid:updatedUserPasswordResponse.errorMessages.passwordCapitalCheckInvalid,
            passwordNumberCheckInvalid:updatedUserPasswordResponse.errorMessages.passwordNumberCheckInvalid,
            passwordSpecialCheckInvalid:updatedUserPasswordResponse.errorMessages.passwordSpecialCheckInvalid,
            passwordMatch:''
          });
        }
    }else{
      setPasswordErrorMessage({
        ...passwordErrorMessage,
        passwordMatch:'Password does not match confirm_password field.'
      });
    }
    
  }

  const updateUserProfile = async() => {
    const editUserToast = toast.loading("Validating Update...");
    let editedUserProfile = newProfileDetails;
    delete editedUserProfile['existing_password'];
    delete editedUserProfile['confirm_password'];
    console.log('SESAME STREET',editedUserProfile);

    let updatedUserResponse = await userContext.updateUserProfile(profileDetails.id,editedUserProfile);

    setErrorMessages(updatedUserResponse.errorMessages);
    console.log('UPDATED',updatedUserResponse);
    if(updatedUserResponse.updatedStatus === true){
      setUpdatedStatus(true);
      toast.update(editUserToast, {
        render: `User details updated, ${updatedUserResponse.modifiedCustomerDetails.username}`,
        type: "success",
        isLoading: false,
        autoClose: 2000
      });
      setTimeout(function () {
          navigate("/profile");
      }, 2000)
      setUpdatedStatus(false);
    } else{
      setUpdatedStatus(false);
      toast.update(editUserToast, {
        render: "Invalid fields for user update.",
        type: "error",
        isLoading: false,
        autoClose: 2000
      });
    }
  }

  useEffect(()=>{
    const updateStatus = () => {
      let updatedUserDetails = {...newProfileDetails};
      delete newProfileDetails['existing_password'];
      delete newProfileDetails['confirm_password'];
  
      setProfileDetails(updatedUserDetails);
      setErrorMessages({
        firstName:'',
        lastName:'',
        mobileInvalid:'',
        mobileNumber:'',
        password:'',
        postalCode:'',
        shippingAddress:'',
        username:''
      })
    }
    updateStatus();
  },[updatedStatus])
  

  return (
    <React.Fragment>
    <div style={{minHeight:'100vh'}}>
        <div>
          <NavbarInstance/>
        </div>
        <div style={{height:'57px'}}></div>
        <div style = {{marginTop:'20px',fontFamily:'Khula,sans-serif'}}>
          <div>
            <h4 style={{backgroundColor:'#e3ece5',padding:'18px 20px 10px 20px',fontWeight:'600'}}>{profileDetails.first_name.toUpperCase()} {profileDetails.last_name.toUpperCase()}'S ACCOUNT </h4>
          </div>
          <div style={{padding:'20px'}}>
            <div style={{display:'flex',flexWrap:'wrap'}}>
              <div className="col-6 col-sm-6 col-md-4 col-lg-4 mb-3">
                <h6 style={{fontWeight:'600'}}>NAME</h6>
                <p style={{fontWeight:'500', fontSize:'17px'}}>{profileDetails.first_name} {profileDetails.last_name}</p>
              </div>
              <div className="col-6 col-sm-6 col-md-5 col-lg-4  mb-3">
                <h6 style={{fontWeight:'600'}}>USERNAME</h6>
                <p style={{fontWeight:'500', fontSize:'17px'}}>{profileDetails.username}</p>
              </div>
              <div className="col-6 col-sm-6 col-md-3 col-lg-4  mb-3">
                <h6 style={{fontWeight:'600'}}>PHONE NUMBER</h6>
                <p style={{fontWeight:'500', fontSize:'17px'}}>{profileDetails.mobile_number}</p>
              </div>
              <div className="col-6 col-sm-6 col-md-4 col-lg-4  mb-3">
                <h6 style={{fontWeight:'600'}}>EMAIL</h6>
                <p style={{ontWeight:'500', fontSize:'17px'}}>{profileDetails.email}</p>
              </div>
              <div className="col-12 col-sm-12 col-md-5 col-lg-4  mb-3">
                <h6 style={{fontWeight:'600'}}>SHIPPING ADDRESS</h6>
                <p style={{fontWeight:'500', fontSize:'17px'}}>{profileDetails.shipping_address}</p>
              </div>
              <div className="col-6 col-sm-6 col-md-3 col-lg-3  mb-3">
                <h6 style={{fontWeight:'600'}}>POSTAL CODE</h6>
                <p style={{fontWeight:'500', fontSize:'17px'}}>{profileDetails.postal_code}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{backgroundColor:'#e3ece5',padding:'18px 20px 10px 20px',fontWeight:'600'}}>EDIT PASSWORD</h4>
          </div>
          <div style={{padding:'20px'}}>
            <div style={{display:'flex',flexWrap:'wrap'}} >
              <div className="col-7 col-sm-6 col-md-4 col-lg-3 mb-3">
                <h6 style={{fontWeight:'600'}}>NEW PASSWORD</h6>
                <input type='password' name="password" value={updatePassword.password} onChange={updatePasswordFormField} className="form-control" style={{fontWeight:'500', fontSize:'17px'}}/>
                <div style={{fontWeight:'500',color:'red',fontSize:'13px'}}>{passwordErrorMessage.password}</div>
                <div style={{fontWeight:'500',color:'red',fontSize:'13px'}}>{passwordErrorMessage.passwordCapitalCheckInvalid}</div>
                <div style={{fontWeight:'500',color:'red',fontSize:'13px'}}>{passwordErrorMessage.passwordNumberCheckInvalid}</div>
                <div style={{fontWeight:'500',color:'red',fontSize:'13px'}}>{passwordErrorMessage.passwordSpecialCheckInvalid}</div>
              </div>
              <div className="col-1 col-sm-1 col-md-0 col-lg-0 mb-3"></div>
              <div className="col-7 col-sm-6 col-md-4 col-lg-3 mb-3">
                <h6 style={{fontWeight:'600'}}>CONFIRM PASSWORD</h6>
                <input type='password' name="confirm_password" value={updatePassword.confirm_password} onChange={updatePasswordFormField} className="form-control" style={{fontWeight:'500', fontSize:'17px'}}/>
                <div style={{fontWeight:'500',color:'red',fontSize:'13px'}}>{passwordErrorMessage.passwordMatch}</div>
              </div>
              <div className="col-1 col-sm-1 col-md-0 col-lg-0 mb-3"></div>
              <div className="col-7 col-sm-6 col-md-4 col-lg-3 mb-3">
                <h6 style={{fontWeight:'600'}}>EXISTING PASSWORD</h6>
                <input type='password' name="existing_password" value={updatePassword.existing_password} onChange={updatePasswordFormField} className="form-control" style={{fontWeight:'500', fontSize:'17px'}}/>
                <div style={{fontWeight:'500',color:'red',fontSize:'13px'}}>{passwordErrorMessage.existingPasswordMatch}</div>
              </div>
              <div className="col-0 col-sm-0 col-md-6 col-lg-0 mb-3"></div>
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 my-3" 
                style={{display:'inline-block', height:'34px', fontWeight:'400',fontSize:'17px',padding:'6px',textAlign:'center',backgroundColor:'#4c4c4c',color:'white'}}
                onClick={()=>{updateUserPassword()}}
              >
                SAVE NEW PASSWORD
              </div>
            </div>
          </div>

          <div>
            <h4 style={{backgroundColor:'#e3ece5',padding:'18px 20px 10px 20px',fontWeight:'600'}}>EDIT ACCOUNT DETAILS</h4>
            <p style={{margin:'0px 20px',fontStyle:'italic',fontSize:'small'}}>If you wish to change email for this account, kindly contact us at admin@tea4u.com</p>
          </div>
          <div style={{padding:'20px',fontFamily:'Khula, sans-serif'}}>
            <div style={{display:'flex',flexWrap:'wrap'}} >
              <div className="col-6 col-sm-6 col-md-5 col-lg-3 mb-3">
                <h6 style={{fontWeight:'600'}}>FIRST NAME</h6>
                <input type='text' name="first_name" value={newProfileDetails.first_name} onChange={updateUserFormField} className="form-control" style={{fontWeight:'500', fontSize:'17px'}}/>
                <div style={{fontWeight:'500',color:'red',fontSize:'13px'}}>{errorMessages.firstName}</div>
              </div>
              <div className="col-1 col-sm-1 col-md-0 col-lg-0 mb-3"></div>
              <div className="col-5 col-sm-6 col-md-5 col-lg-3 mb-3">
                <h6 style={{fontWeight:'600'}}>LAST NAME</h6>
                <input type='text' name="last_name" value={newProfileDetails.last_name} onChange={updateUserFormField} className="form-control" style={{fontWeight:'500', fontSize:'17px'}}/>
                <div style={{fontWeight:'500',color:'red',fontSize:'13px'}}>{errorMessages.lastName}</div>
              </div>
              <div className="col-0 col-sm-0 col-md-0 col-lg-1 mb-3"></div>
              <div className="col-6 col-sm-6 col-md-5 col-lg-3 mb-3">
                <h6 style={{fontWeight:'600'}}>USERNAME</h6>
                <input type='text' name="username" value={newProfileDetails.username} onChange={updateUserFormField} className="form-control" style={{fontWeight:'500', fontSize:'17px'}}/>
                <div style={{fontWeight:'500',color:'red',fontSize:'13px'}}>{errorMessages.username}</div>
              </div>
              <div className="col-1 col-sm-1 col-md-0 col-lg-0 mb-3"></div>
              <div className="col-5 col-sm-6 col-md-5 col-lg-3 mb-3">
                <h6 style={{fontWeight:'600'}}>PHONE NUMBER</h6>
                <input type='text' name="mobile_number" value={newProfileDetails.mobile_number} onChange={updateUserFormField} className="form-control" style={{fontWeight:'500', fontSize:'17px'}}/>
                <div style={{fontWeight:'500',color:'red',fontSize:'13px'}}>{errorMessages.mobileNumber ? 'Mobile number must have 8 numbers' : ''}</div>
                <div style={{fontWeight:'500',color:'red',fontSize:'13px'}}>{errorMessages.mobileInvalid}</div>
                <div style={{fontWeight:'500',color:'red',fontSize:'13px'}}>{errorMessages.mobileNumberCheck}</div>
              </div>
              <div className="col-0 col-sm-0 col-md-0 col-lg-1 mb-3"></div>
              <div className="col-12 col-sm-6 col-md-5 col-lg-3 mb-3">
                <h6 style={{fontWeight:'600'}}>SHIPPING ADDRESS</h6>
                <input type='text' name="shipping_address" value={newProfileDetails.shipping_address} onChange={updateUserFormField} className="form-control" style={{fontWeight:'500', fontSize:'17px'}}/>
                <div style={{fontWeight:'500',color:'red',fontSize:'13px'}}>{errorMessages.shippingAddress}</div>
              </div>
              <div className="col-0 col-sm-0 col-md-1 col-lg-1 mb-3"></div>
              <div className="col-6 col-sm-6 col-md-5 col-lg-3 mb-3">
                <h6 style={{fontWeight:'600'}}>POSTAL CODE</h6>
                <input type='text' name="postal_code" value={newProfileDetails.postal_code} onChange={updateUserFormField} className="form-control" style={{fontWeight:'500', fontSize:'17px'}}/>
                <div style={{fontWeight:'500',color:'red',fontSize:'13px'}}>{errorMessages.postalCode}</div>
                <div style={{fontWeight:'500',color:'red',fontSize:'13px'}}>{errorMessages.postalNumberCheck}</div>
              </div>
              <div className="col-1 col-sm-1 col-md-1 col-lg-0 mb-3"></div>
              <div className="col-6 col-sm-6 col-md-5 col-lg-3 mb-3">
                <h6 style={{fontWeight:'600'}}>PASSWORD</h6>
                <input type='password' name="password" value={newProfileDetails.password} onChange={updateUserFormField} className="form-control" style={{fontWeight:'500', fontSize:'17px'}}/>
                <div style={{fontWeight:'500',color:'red',fontSize:'13px'}}>{errorMessages.password}</div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-5 col-lg-3 my-3" 
              style={{display:'inline-block', height:'34px', fontWeight:'400',fontSize:'17px',padding:'6px',textAlign:'center',backgroundColor:'#4c4c4c',color:'white'}}
              onClick={()=>{updateUserProfile()}}
            >
              SAVE CHANGES
            </div>
            <ToastContainer />
          </div>

        </div>
      </div>
      </React.Fragment>
    );
  }