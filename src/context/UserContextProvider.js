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
        }
    }
    render(){
        // const url = "https://tea4u-express.herokuapp.com/api/customer/";
        const url = "https://3000-joanneks-tea4uexpressba-azji6dgmjtq.ws-us63.gitpod.io/api/";
        const loginUrl = url + "customer/login";
        const userContext = {
            login: async (email,password) => {
                let loginResponse = await axios.post(loginUrl,{
                    email,
                    password,
                })
                console.log(loginResponse);
                let tokenData = loginResponse.data;
                console.log(tokenData);
                this.setState({
                    userDetails:tokenData.userDetails.id,

                })
                // await localStorage.setItem('accessToken', JSON.stringify(tokenData.accessToken));
                // await localStorage.setItem('refreshToken', JSON.stringify(tokenData.refreshToken));
                // await this.setState({
                //     loggedIn: true
                // })
                // console.log(loginResponse.data);
                // return this.state.loggedIn
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