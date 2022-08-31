import React from 'react';
// import { useNavigate } from "react-router-dom";
import CartContext from "./CartContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default class CartProvider extends React.Component{
    state = {
        cartItems:[],
        totalCost:0,
      }
    async componentDidMount() {
        let customerId = JSON.parse(localStorage.getItem('customerId'));
        let accessToken = JSON.parse(localStorage.getItem('accessToken'));
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        const url = "https://3000-joanneks-tea4uexpressba-azji6dgmjtq.ws-us63.gitpod.io/api/"
        let cartResponse = await axios.post(url + "cart/",{
            user_id:customerId
        });
        console.log('ComponentDidMount cartResponse',cartResponse.data);
        console.log('ComponentDidMount cartResponse -cartItems',cartResponse.data.cartItems);
        this.setState({
            cartItems: cartResponse.data.cartItems,
            totalCost: cartResponse.data.totalCost,
        })
    };
    render(){
        const url = "https://3000-joanneks-tea4uexpressba-azji6dgmjtq.ws-us63.gitpod.io/api/";
        
        const cartContext = { 
            addToCart: async(teaId,customerId) => {
                const addToCartUrl = url + "cart/" + "add/" + teaId
                customerId = JSON.parse(localStorage.getItem('customerId'));
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                console.log('CUStOMER ID',customerId)
                let addCartResponse = await axios.post(addToCartUrl,{
                    user_id:customerId,
                    tea_id:teaId,
                });
                let itemToAdd = addCartResponse.data;
                let revisedCartItems = itemToAdd.cartItems;
                console.log('addtocart',itemToAdd);
                console.log('addtocart,Cartitems',itemToAdd.cartItems);
                return revisedCartItems;
            },
            minusFromCart: async(teaId,customerId) => {
                const minusFromCartUrl = url + "cart/" + "minus/" + teaId
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                let minusFromCartResponse = await axios.post(minusFromCartUrl,{
                    user_id:customerId,
                    tea_id:teaId,
                });
                let itemToMinus = minusFromCartResponse.data;
                let revisedCartItems = itemToMinus.cartItems;
                console.log('minusfromcart',itemToMinus);
                console.log('minusfromcart,Cartitems',itemToMinus.cartItems);
                return revisedCartItems;
            },
            getCartItems:async () =>{
                let customerId = JSON.parse(localStorage.getItem('customerId'));
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                const url = "https://3000-joanneks-tea4uexpressba-azji6dgmjtq.ws-us63.gitpod.io/api/"
                let cartResponse = await axios.post(url + "cart/",{
                    user_id:customerId
                });
                console.log('cartResponse -cartItems GET CART',cartResponse.data.cartItems);
                const cartItems= cartResponse.data.cartItems;
                return cartItems;
            },
            displayCartItems: () => {
                console.log('state',this.state.cartItems);
                return this.state.cartItems;
            },
            displayTotalCost: () => {
                return this.state.totalCost;
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
