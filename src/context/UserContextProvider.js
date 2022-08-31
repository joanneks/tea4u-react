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
        const url = "https://3000-joanneks-tea4uexpressba-azji6dgmjtq.ws-us63.gitpod.io/api/";
        const getUserProfileUrl = url + "customer/profile"
        let accessToken = JSON.parse(localStorage.getItem('accessToken'));
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        console.log('black sheep')
        const userProfileResponse = await axios.get(getUserProfileUrl);

        console.log('black sheep2')
        const userProfile = userProfileResponse.data
        console.log(userProfile);
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
    }
    
    render(){
        // const url = "https://tea4u-express.herokuapp.com/api/customer/";
        const url = "https://3000-joanneks-tea4uexpressba-azji6dgmjtq.ws-us63.gitpod.io/api/";
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
                let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
                let refreshTokenResponse = await axios.post(refreshUrl,{
                    refreshToken
                })
                let newAccessToken = refreshTokenResponse.data.accessToken;
                await localStorage.setItem('accessToken', JSON.stringify(newAccessToken));
            },
            getUserProfile:async() => {
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                let profileResponse = await axios.get(url + "customer/profile");
                let userProfile = profileResponse.data;
                console.log('profileObject',profileResponse.data);
                return userProfile

                // let customerId = JSON.parse(localStorage.getItem('customerId'));
                // let orderHistoryResponse = await axios.get(url + "order/" + customerId);
                // console.log(orderHistoryResponse);
                // this.setState({
                //     orders: orderHistoryResponse.data.orders
                // })
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