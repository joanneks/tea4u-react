import React from 'react';
import CartContext from "./CartContext";
import axios from 'axios';
import {jwtDecode} from './Jwt.js';

export default class CartProvider extends React.Component{
    state = {
        cartItems:[],
        // totalCost:0,
      }
      
    async componentDidMount() {
        let customerId = JSON.parse(localStorage.getItem('customerId'));
        if(customerId){
            let accessToken = await jwtDecode();
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            const url = "https://3000-joanneks-tea4uexpressba-qiw1tvvgol5.ws-us63.gitpod.io/api/"
            let cartResponse = await axios.post(url + "cart/",{
                user_id:customerId
            });
            this.setState({
                cartItems: cartResponse.data.cartItems,
                totalCost: cartResponse.data.totalCost,
            })
        } else{
            return false;
        }
    };
    render(){
        const url = "https://3000-joanneks-tea4uexpressba-qiw1tvvgol5.ws-us63.gitpod.io/api/";
        
        const cartContext = { 
            addToCart: async(teaId,customerId) => {
                const addToCartUrl = url + "cart/add/" + teaId;
                customerId = JSON.parse(localStorage.getItem('customerId'));
                let accessToken = await jwtDecode();
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                let addCartResponse = await axios.post(addToCartUrl,{
                    user_id:customerId,
                    tea_id:teaId,
                });
                let itemToAdd = addCartResponse.data;
                let revisedCartItems = itemToAdd.cartItems;
                return revisedCartItems;
            },
            minusFromCart: async(teaId,customerId) => {
                const minusFromCartUrl = url + "cart/minus/" + teaId;
                let accessToken = await jwtDecode();
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                let minusFromCartResponse = await axios.post(minusFromCartUrl,{
                    user_id:customerId,
                    tea_id:teaId,
                });
                let itemToMinus = minusFromCartResponse.data;
                let revisedCartItems = itemToMinus.cartItems;
                return revisedCartItems;
            },
            getCartItems:async () =>{
                let customerId = JSON.parse(localStorage.getItem('customerId'));
                let accessToken = await jwtDecode();
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                // const url = "https://3000-joanneks-tea4uexpressba-azji6dgmjtq.ws-us63.gitpod.io/api/"
                let cartResponse = await axios.post(url + "cart/",{
                    user_id:customerId
                });
                const cartItems= cartResponse.data.cartItems;
                return cartItems;
            },
            displayCartItems: () => {
                return this.state.cartItems;
            },
            deleteFromCart: async(teaId,customerId) => {
                const deleteFromCartUrl = url + "cart/remove/" + teaId
                let accessToken = await jwtDecode();
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                let deleteFromCartResponse = await axios.post(deleteFromCartUrl,{
                    user_id:customerId,
                    tea_id:teaId,
                });
                let cartItems = deleteFromCartResponse.data.cartItems;
                return cartItems;
            }
        }
        return(
            <React.Fragment>
                <CartContext.Provider value={cartContext}>
                    {this.props.children}
                </CartContext.Provider>
            </React.Fragment>
        )
    }
}
