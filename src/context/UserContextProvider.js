import React from 'react';
// import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import axios from 'axios';

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
        const url = "https://3000-joanneks-tea4uexpressba-qiw1tvvgol5.ws-us63.gitpod.io/api/";
        const getUserProfileUrl = url + "customer/profile"
        let customerId = JSON.parse(localStorage.getItem('customerId'));
        if(customerId){
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            const userProfileResponse = await axios.get(getUserProfileUrl);

            const userProfile = userProfileResponse.data
            console.log('userProfile',userProfile);
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
        // const url = "https://tea4u-express.herokuapp.com/api/customer/";
        const url = "https://3000-joanneks-tea4uexpressba-qiw1tvvgol5.ws-us63.gitpod.io/api/";
        const loginUrl = url + "customer/login";
        const refreshUrl = url + "customer/refresh";
        const logoutUrl = url + "customer/logout";

        const userContext = {
            retrieveUserProfile: () =>{
                return this.state.profileDetails;
            },
            login: async (email,password) => {
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
            },
            getNewAccessToken: async () => {
                let customerId = JSON.parse(localStorage.getItem('customerId'));
                if(customerId){
                    let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
                    let refreshTokenResponse = await axios.post(refreshUrl,{
                        refreshToken
                    })
                    let newAccessToken = refreshTokenResponse.data.accessToken;
                    console.log('newAccessToken',newAccessToken);
                    await localStorage.setItem('accessToken', JSON.stringify(newAccessToken));
                } else{
                    return false;
                }
            },
            getUserProfile:async() => {
                let customerId = JSON.parse(localStorage.getItem('customerId'));
                if(customerId){
                    let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    let profileResponse = await axios.get(url + "customer/profile");
                    let userProfile = profileResponse.data;
                    console.log('profileObject',profileResponse.data);
                    return userProfile
                } else{
                    return false;
                }
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
        
        setInterval(userContext.getNewAccessToken,60000)

        return(
            <React.Fragment>
                <UserContext.Provider value={userContext}>
                    {this.props.children}
                </UserContext.Provider>
            </React.Fragment>
        )
    }
}