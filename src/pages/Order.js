import React from 'react';
import NavbarInstance from './Navbar';
import{useContext, useState, useEffect } from 'react';
import OrderContext from "../context/OrderContext";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import moment from 'moment';

export default function Order(props) {
    const orderContext = useContext(OrderContext);
    const navigate = useNavigate();
    const [orders,setOrders] = useState([]);
    // setInterval(userContext.getNewAccessToken,60000)


    useEffect(()=>{
        const getOrders = async () => {
            let customerId = JSON.parse(localStorage.getItem('customerId'));
            if(customerId){
                console.log('customerId',customerId)
                const orders = await orderContext.getOrders(customerId);
                console.log('ORDERSSSS',orders)
                await setOrders(orders);
            } else{
                console.log('Login required to view past orders')
                navigate('/login');
            }
        }
        getOrders();
    }, [])

    const showOrder = (orderId) => {
        navigate(`/orders/${orderId}`)
    }

  return (
    <React.Fragment>
        <div style = {{backgroundColor:'#d4e0e2',height:'100vh'}}>
            <div>
            <NavbarInstance/>
            </div>
            <div style={{margin:'20px'}}>
                <div style={{marginTop:'100px'}}>
                    <h1>Orders</h1>
                    <div>
                        {orders.map(each=>{
                            const createdDate = each.datetime_created.slice(0,10) + " " +each.datetime_created.slice(11,18)
                            // const formatCreatedDate = moment(createdDate).format('DD-MM-YYYY hh:mm:ss A')
                            const formatOrderedDate = moment(createdDate).format('DD-MM-YYYY')
                            const modifiedDate = each.datetime_last_modified.slice(0,10) + " " +each.datetime_created.slice(11,18)
                            // const formatModifiedDate = moment(modifiedDate).format('DD-MM-YYYY hh:mm:ss A')
                            const expectedDeliveryDate = moment(moment(createdDate).add(7, 'days')).format('DD-MM-YYYY hh:mm:ss A');
                            const formatModifiedDate = moment(modifiedDate).format('DD-MM-YYYY')
                                return(
                                    <div key={each.id} style={{marginTop:'20px'}}>
                                        <div>
                                            <div>Order Id: {each.id} <span style={{float:'right'}}>Date: {formatOrderedDate}</span></div>
                                            <div>Order Status: {each.orderStatus.name} <span style={{float:'right'}}>Updated: {formatModifiedDate}</span></div>
                                            {/* <div>Updated On: {formatModifiedDate}</div> */}
                                            <div>Delivery Method: {each.shippingMethod.name} ({each.shippingMethod.min_days} to {each.shippingMethod.max_days} days) {each.orderItem.length === 0 ? '' : <span style={{float:'right'}}>{each.orderItem.length} items</span>}</div>
                                            <div>ETA: {expectedDeliveryDate}</div>
                                            <div>Recipient Address: {each.shipping_address}, S({each.postal_code})</div>
                                            {each.remarks === 'nil' ? '' : <div>Remarks: {each.remarks}</div>}
                                            {/* <a href={`orders/${each.id}`} className="btn btn-dark btn-sm">View Items</a> */}
                                            <button className="btn btn-dark btn-sm" onClick={()=>showOrder(each.id)}>View Items</button>
                                        </div>
                                        <div style={{display:'none'}}>

                                        </div>
                                    </div>
                                )
                        })}
                    </div>
                </div>
            </div>  
        </div>

    </React.Fragment>
    );
  }
  