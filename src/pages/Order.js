import React from 'react';
import NavbarInstance from './Navbar';
import NavbarBottom from './NavbarBottom';
import { useContext, useState, useEffect } from 'react';
import OrderContext from "../context/OrderContext";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import '../css/order.css';
import loadingPic from '../css/images/loading.gif';

export default function Order(props) {
    const orderContext = useContext(OrderContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getOrders = async () => {
            setLoading(true);
            let customerId = JSON.parse(localStorage.getItem('customerId'));
            if (customerId) {
                const orders = await orderContext.getOrders(customerId);
                await setOrders(orders);
                setTimeout(async () => { await setLoading(false) }, 300)
            } else {
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
            <div style={{ minHeight: '100vh' }}>
                <div>
                    <NavbarInstance />
                </div>
                <NavbarBottom />
                <div style={{ height: '56px' }}></div>
                <div id="orderMargin">
                    <div style={{ paddingBottom: '60px' }}>
                        <h1 style={{ fontSize: '35px', fontFamily: 'Khula,sans-serif', fontWeight: '500', textAlign: 'center' }}>Order History</h1>
                        {
                            loading ?
                                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                    <img src={loadingPic} alt="loadingPic" style={{ position: 'absolute', height: '300px', margin: 'auto' }} />
                                </div>
                                :
                                orders.length === 0 ?
                                    <div style={{ marginTop: '40px', textAlign: 'center' }}>No purchases made yet.</div>
                                    :
                                    <div>
                                        {orders.map(each => {
                                            const createdDate = each.datetime_created.slice(0, 10) + " " + each.datetime_created.slice(11, 18)
                                            const formatOrderedDate = moment(createdDate).format('DD-MM-YYYY')
                                            const modifiedDate = each.datetime_last_modified.slice(0, 10) + " " + each.datetime_created.slice(11, 18)
                                            const expectedDeliveryDate = moment(moment(createdDate).add(7, 'days')).format('DD-MM-YYYY');
                                            const formatModifiedDate = moment(modifiedDate).format('DD-MM-YYYY')
                                            return (
                                                <div key={each.id} style={{ marginTop: '30px' }}>
                                                    <div>
                                                        <div>
                                                            <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#e2d6d4' }}>
                                                                <div className="col-6" style={{ padding: '10px' }}>
                                                                    <div style={{ fontSize: '18px', fontFamily: 'Khula,sans-serif', fontWeight: '600', width: '100%' }}>Order Id #{each.id}</div>
                                                                </div>
                                                                <div className="col-6" style={{ padding: '10px' }}>
                                                                    <div style={{ fontSize: '18px', fontFamily: 'Khula,sans-serif', fontWeight: '600', width: '100%', textAlign: 'end', alignItems: 'center' }}><button className="btn btn-sm" style={{ backgroundColor: '#4c4c4c', color: 'white' }} onClick={() => showOrder(each.id)}>View Items</button></div>
                                                                </div>
                                                            </div>
                                                            <div style={{ backgroundColor: '#eae1e0', padding: '10px' }}>
                                                                <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0px 0px 10px 0px' }}>
                                                                    <div className="col-6" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                                        <div style={{ fontSize: '18px', fontFamily: 'Khula,sans-serif', fontWeight: '600', width: '100%' }}>{each.orderStatus.name.toUpperCase()}</div>
                                                                    </div>
                                                                    <div className="col-6" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                                        <div style={{ fontSize: '18px', fontFamily: 'Khula,sans-serif', fontWeight: '600', width: '100%', textAlign: 'end' }}>{each.orderItem.length === 0 ? '' : <span>{each.orderItem.length} item(s)</span>}</div>
                                                                    </div>
                                                                </div>

                                                                <div style={{ display: 'flex', flexWrap: 'wrap', margin: '20px 0px 20px 0px' }}>
                                                                    <div className="col-6" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4 " style={{ fontSize: '16px', fontFamily: 'Khula,sans-serif', fontWeight: '600' }}>Order Date:</div>
                                                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8 " style={{ fontSize: '16px', fontFamily: 'Khula,sans-serif', fontWeight: '400' }}>{formatOrderedDate}</div>
                                                                    </div>
                                                                    <div className="col-6" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4 " style={{ fontSize: '16px', fontFamily: 'Khula,sans-serif', fontWeight: '600', textAlign: 'end' }}>Last Updated:</div>
                                                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8 " style={{ fontSize: '16px', fontFamily: 'Khula,sans-serif', fontWeight: '400', textAlign: 'end' }}>{formatModifiedDate}</div>
                                                                    </div>
                                                                </div>
                                                                <div style={{ display: 'flex', flexWrap: 'wrap', margin: '20px 0px 20px 0px' }}>
                                                                    <div className="col-6" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4 " style={{ fontSize: '16px', fontFamily: 'Khula,sans-serif', fontWeight: '600' }}>Delivery Method:</div>
                                                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8 " style={{ fontSize: '16px', fontFamily: 'Khula,sans-serif', fontWeight: '400' }}>{each.shippingMethod.name} ({each.shippingMethod.min_days} to {each.shippingMethod.max_days} days) </div>
                                                                    </div>
                                                                    <div className="col-6" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                                        <div className="col-12 col-sm-5 col-md-5 col-lg-4 " style={{ fontSize: '16px', fontFamily: 'Khula,sans-serif', fontWeight: '600', textAlign: 'end' }}>Estimated Arrival:</div>
                                                                        <div className="col-12 col-sm-7 col-md-7 col-lg-8 " style={{ fontSize: '16px', fontFamily: 'Khula,sans-serif', fontWeight: '400', textAlign: 'end' }}>{expectedDeliveryDate}</div>
                                                                    </div>
                                                                </div>
                                                                <div style={{ display: 'flex', flexWrap: 'wrap', margin: '20px 0px 20px 0px' }}>
                                                                    <div className="col-12" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                                        <div className="col-12 col-sm-3 col-md-3 col-lg-2 " style={{ fontSize: '16px', fontFamily: 'Khula,sans-serif', fontWeight: '600' }}>Shipping Address:</div>
                                                                        <div className="col-12 col-sm-9 col-md-9 col-lg-10 " style={{ fontSize: '16px', fontFamily: 'Khula,sans-serif', fontWeight: '400' }}>{each.shipping_address}, S({each.postal_code})</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
