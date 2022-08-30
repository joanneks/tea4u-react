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
        console.log('cartResponse',cartResponse.data);
        console.log('cartResponse -cartItems',cartResponse.data.cartItems);
        // let searchFieldsResponse = await axios.get(url + "products/fields");
        this.setState({
            cartItems: cartResponse.data.cartItems,
            totalCost: cartResponse.data.totalCost,
        })
    };
    render(){
        const url = "https://3000-joanneks-tea4uexpressba-azji6dgmjtq.ws-us63.gitpod.io/api/";
        
        const cartContext = { 
            addToCart: async(teaId) => {
                const addToCartUrl = url + "cart/" + "add/" + teaId
                let customerId = JSON.parse(localStorage.getItem('customerId'));
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                let addCartResponse = await axios.post(addToCartUrl,{
                    user_id:customerId,
                    tea_id:teaId,
                });
                let itemToAdd = addCartResponse.data;
                console.log('addtocart',itemToAdd);
                // if(itemToAdd.message = "Tea Product is out of stock"){
                // }
            },
            minusFromCart: async(teaId) => {
                const minusFromCartUrl = url + "cart/" + "minus/" + teaId
                let customerId = JSON.parse(localStorage.getItem('customerId'));
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                let minusFromCartResponse = await axios.post(minusFromCartUrl,{
                    user_id:customerId,
                    tea_id:teaId,
                });
                let itemToMinus = minusFromCartResponse.data;
                console.log('minusfromcart',itemToMinus);
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
