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
            const url = "https://joanneks-tea4uexpressba-shcmrkqyenp.ws-us80.gitpod.io/"
            // const url = "https://3000-joanneks-tea4uexpressba-qiw1tvvgol5.ws-us64.gitpod.io/api/"
            // const url = "https://tea4u-express-tgc18.herokuapp.com/api/"
            let cartResponse = await axios.post(url + "cart/",{
                user_id:customerId
            });
            console.log(cartResponse.data.cartItems)
            this.setState({
                cartItems: cartResponse.data.cartItems,
                totalCost: cartResponse.data.totalCost,
            })
        } else{
            return false;
        }
    };
    render(){
        // const url = "https://3000-joanneks-tea4uexpressba-qiw1tvvgol5.ws-us64.gitpod.io/api/";
        // const url = "https://tea4u-express-tgc18.herokuapp.com/api/"
        const url = "https://joanneks-tea4uexpressba-shcmrkqyenp.ws-us80.gitpod.io/"
        
        const cartContext = { 
            getCartItems:async (teaId) =>{
                let customerId = JSON.parse(localStorage.getItem('customerId'));
                let accessToken = await jwtDecode();
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                let cartResponse = await axios.post(url + "cart/",{
                    user_id:customerId,
                    tea_id:teaId
                });
                const cartItems= cartResponse.data.cartItems;
                console.log('cheerry',cartItems)
                return cartItems;
            },
            addToCart: async(teaId,quantity,customerId) => {
                const addToCartUrl = url + "cart/add/" + teaId;
                customerId = JSON.parse(localStorage.getItem('customerId'));
                let accessToken = await jwtDecode();
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                console.log('MONKEY')
                let addCartResponse = await axios.post(addToCartUrl,{
                    user_id:customerId,
                    tea_id:teaId,
                    quantity
                });
                console.log('GOAT')
                console.log("ADDTOCART",addCartResponse.data);
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
            updateCartQuantity: async (teaId,quantity) =>{
                const updateCartQuantityUrl = url + "cart/update-quantity/" + teaId;
                
                let customerId = JSON.parse(localStorage.getItem('customerId'));
                let accessToken = await jwtDecode();
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                console.log(teaId)
                console.log(customerId);
                console.log(quantity)
                let updateCartQuantityResponse = await axios.post(updateCartQuantityUrl,{
                    user_id:customerId,
                    tea_id:teaId,
                    quantity
                });

                console.log('TESTING',accessToken)
                let updateCartQuantity = updateCartQuantityResponse.data;
                console.log('updatedquantity',updateCartQuantity);
                let cartItems = await cartContext.getCartItems();
                console.log('updated cart items',cartItems.data);
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
