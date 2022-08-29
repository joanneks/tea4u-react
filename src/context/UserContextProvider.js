import React from 'react';
// import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default class UserProvider extends React.Component{
    state = {
        userDetails:{
            id:'',
            email:'',
            username:'',
            accessToken:'',
            refreshToken:'',
        }
    }
    render(){
        // const url = "https://tea4u-express.herokuapp.com/api/customer/";
        const url = "https://3000-joanneks-tea4uexpressba-azji6dgmjtq.ws-us63.gitpod.io/api/";
        const loginUrl = url + "customer/login";
        const logoutUrl = url + "customer/logout";
        const userContext = {
            login: async (email,password) => {
                let loginResponse = await axios.post(loginUrl,{
                    email,
                    password,
                })
                console.log(loginResponse);
                let tokenData = loginResponse.data;
                console.log(tokenData);
                let loggedInUser = {
                    id:tokenData.userDetails.id,
                    email:tokenData.userDetails.email,
                    username:tokenData.userDetails.username,
                    accessToken:tokenData.accessToken,
                    refreshToken:tokenData.refreshToken,
                }
                this.setState({
                    userDetails:{loggedInUser}
                })
            },
            logout: async (refreshToken) => {
                refreshToken = this.state.userDetails.refreshToken;
                let logoutResponse = await axios.post (logoutUrl,{
                    refreshToken
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