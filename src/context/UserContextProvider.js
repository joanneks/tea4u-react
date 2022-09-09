import React from 'react';
// import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import axios from 'axios';
import {jwtDecode} from './Jwt.js';

export default class UserProvider extends React.Component{
    state = {
        userDetails:{
            id:'',
            email:'',
            username:'',
            accessToken:'',
            refreshToken:'',
        },
        loggedIn:false,
        profileDetails:{
            id: '',
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            shipping_address: '',
            postal_code: 0,
            mobile_number: 0
          }
    }

    async componentDidMount () {
        const url = "https://3000-joanneks-tea4uexpressba-qiw1tvvgol5.ws-us64.gitpod.io/api/";
        // const url = "https://tea4u-express-tgc18.herokuapp.com/api/"
        const getUserProfileUrl = url + "customer/profile"
            let customerId = JSON.parse(localStorage.getItem('customerId'));
            if(customerId){
                let accessToken = await jwtDecode();
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                const userProfileResponse = await axios.get(getUserProfileUrl);
    
                const userProfile = userProfileResponse.data;
                const profileDetails = {
                    id: userProfile.id,
                    first_name: userProfile.first_name,
                    last_name: userProfile.last_name,
                    username: userProfile.username,
                    email: userProfile.email,
                    shipping_address: userProfile.shipping_address,
                    postal_code: userProfile.postal_code,
                    mobile_number: userProfile.mobile_number
                }
                this.setState({profileDetails});
            } else{
                return false;
            }
    }
    
    render(){
        // const url = "https://tea4u-express-tgc18.herokuapp.com/api/"
        const url = "https://3000-joanneks-tea4uexpressba-qiw1tvvgol5.ws-us64.gitpod.io/api/";
        const loginUrl = url + "customer/login";
        const logoutUrl = url + "customer/logout";
        const createUserUrl = url + "customer/create";
        const getProfileUrl = url + "customer/profile";
        const editProfileUrl = url + "customer/edit";
        const editPasswordUrl = url + "customer/edit-password";
        const userContext = {
            retrieveUserProfile: () =>{
                return this.state.profileDetails;
            },
            login: async (email,password) => {
                try{
                    let loginResponse = await axios.post(loginUrl,{
                        email,
                        password,
                    })
                    console.log(loginResponse);
                    let tokenData = loginResponse.data;
                    console.log(tokenData);
    
                    await localStorage.setItem('customerId', JSON.stringify(tokenData.userDetails.id));
                    await localStorage.setItem('accessToken', JSON.stringify(tokenData.accessToken));
                    await localStorage.setItem('refreshToken', JSON.stringify(tokenData.refreshToken));
                    
                    this.setState({
                        userDetails:{
                            id:tokenData.userDetails.id,
                            email:tokenData.userDetails.email,
                            username:tokenData.userDetails.username,
                            accessToken:tokenData.accessToken,
                            refreshToken:tokenData.refreshToken,
                        },
                        loggedIn:true
                    })
                    return this.state.loggedIn;
                }catch(e){
                  
                }
            },
            getUserProfile:async() => {
                let customerId = JSON.parse(localStorage.getItem('customerId'));
                if(customerId){
                    let accessToken = await jwtDecode();
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    let profileResponse = await axios.get(getProfileUrl);
                    let userProfile = profileResponse.data;
                    // console.log('profileObject',profileResponse.data);
                    return userProfile
                } else{
                    return false;
                }
            },
            updateUserProfile: async (customerId,editedUserProfileObject) => {
                let updatedUserDetails =  editedUserProfileObject;
                // let customerId = JSON.parse(localStorage.getItem('customerId'));
                if(customerId){
                    let accessToken = await jwtDecode();
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    let updatedProfileResponse = await axios.post(editProfileUrl,updatedUserDetails);
                    let updatedUserProfile = updatedProfileResponse.data;
                    return updatedUserProfile;
                } else{
                    return false;
                }
            },
            updatePassword: async(customerId,updatePasswordObject) => {
                let updatedPasswordDetails = updatePasswordObject;
                if(customerId){
                    let accessToken = await jwtDecode();
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    console.log('mango')
                    let updatedPasswordResponse = await axios.post(editPasswordUrl,updatedPasswordDetails);
                    console.log('banana')
                    let updatedUserPassword = updatedPasswordResponse.data;
                    return updatedUserPassword;
                } else{
                    return false;
                }
            },
            createUser:async(userDetailsObject) => {
                let userDetails =  userDetailsObject;
                let createUserResponse = await axios.post(createUserUrl,userDetails);
                
                console.log('user context provide create user',createUserResponse.data);
                return createUserResponse.data;
            },
            logout: async () => {
                let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
                let logoutResponse = await axios.post (logoutUrl,{
                    refreshToken
                })
                console.log(logoutResponse.data);
                await localStorage.removeItem('customerId');
                await localStorage.removeItem('accessToken');
                await localStorage.removeItem('refreshToken');
                this.setState({
                    userDetails:{
                        id:'',
                        email:'',
                        username:'',
                        accessToken:'',
                        refreshToken:'',
                    },
                    loggedIn:false
                })
            }
            
        }

        return(
            <React.Fragment>
                <UserContext.Provider value={userContext}>
                    {this.props.children}
                </UserContext.Provider>
            </React.Fragment>
        )
    }
}