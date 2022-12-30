import React from 'react';
import OrderContext from "./OrderContext";
import axios from 'axios';
import {jwtDecode} from './Jwt.js';

export default class OrderProvider extends React.Component{
    state={
        orderItems:[]
    }
    
    render(){
        const url = "https://tea4ubackend.onrender.com/api/"
        // const url = "https://3000-joanneks-tea4uexpressba-qiw1tvvgol5.ws-us64.gitpod.io/api/";
        // const url = "https://tea4u-express-tgc18.herokuapp.com/api/"
        
        const orderContext = {
            getOrders: async (customerId) => {
                let accessToken = await jwtDecode();
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                const getOrdersUrl = url + "order/" + customerId;
                const ordersResponse = await axios.get(getOrdersUrl);
                const orders = ordersResponse.data.orders;
                console.log('orderssss',orders);
                return orders;
            },
            getOrderItems: async (customerId,orderId) => {
                let accessToken = await jwtDecode();
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                const getOrderItemsUrl = url + "order/" + customerId + "/" + orderId;
                const orderItemsResponse = await axios.get(getOrderItemsUrl);
                const orderItems = orderItemsResponse.data.orderItems;
                this.setState({orderItems})
                console.log('ALOHA',this.state.orderItems);
                return orderItems;
            },
        }
        return(
            <React.Fragment>
                <OrderContext.Provider value={orderContext}>
                    {this.props.children}
                </OrderContext.Provider>
            </React.Fragment>
    
        )
    }
}