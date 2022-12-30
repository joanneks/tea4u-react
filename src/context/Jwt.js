import jwt_decode from "jwt-decode";
import axios from 'axios';

export async function jwtDecode () {
    const customAxios = axios.create({
        baseURL: "https://tea4ubackend.onrender.com/api/"
        // baseURL: "https://tea4u-express-tgc18.herokuapp.com/api/"
        // baseURL : "https://3000-joanneks-tea4uexpressba-qiw1tvvgol5.ws-us64.gitpod.io/api/"
    });

    let accessToken = JSON.parse(localStorage.getItem('accessToken'));
    let decoded = jwt_decode(accessToken);

    let currentDate = new Date();

    // let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    // let decodedRefreshToken = jwt_decode(refreshToken);
    // if(decodedRefreshToken.exp * 1000 < currentDate.getTime()){
    //     let logoutResponse = await customAxios.post('customer/logout',{
    //         refreshToken
    //     })
    //     console.log('refreshTokenexpire, to logout',logoutResponse.data);
        
    // } else{
    //     console.log('refreshToken still valid')
    //     return refreshToken;
    // }

    if(decoded.exp * 1000 < currentDate.getTime()){
        console.log("access token invalid");
        const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
        let tokenResponse = await customAxios.post('customer/refresh',{
            refreshToken
        })
        const newAccessToken = tokenResponse.data.accessToken;

        await localStorage.setItem('accessToken',JSON.stringify(newAccessToken));
        return newAccessToken;
    } else{
        return accessToken;
    }
}