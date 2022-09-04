import React from 'react';
import NavbarInstance from './Navbar';
import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';
import TeaContext from "../context/TeaContext";
import '../css/cart.css';
import Container from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import info from '../css/images/info.png';
import add from '../css/images/add.png';
import minus from '../css/images/minus.png';
import remove from '../css/images/remove.png';
import pay from '../css/images/pay.png';
import axios from 'axios';

export default function Cart(props) {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);
  const teaContext = useContext(TeaContext);
  const [cartItems, setCartItems] = useState([]);
  const [brands,setBrands] = useState();
  const [totalCost,setTotalCost] = useState();
  const [cartItemDetails,setCartItemDetails] = useState([]);

  const addToCart = async (teaId, customerId) => {
    const cartItems = await cartContext.addToCart(teaId, customerId);
    setCartItems(cartItems);
  }
  const minusFromCart = async (teaId, customerId) => {
    const cartItems = await cartContext.minusFromCart(teaId, customerId);
    // let itemDetails = {};
    //     let totalCosts = 0;
    //     for(let item of cartItems){
    //         let quantity = item.quantity;
    //         let teaId = item.tea.id;
    //         let teaName = item.tea.name;
    //         let teaCost = item.tea.cost/100;
    //         let eachTeaCosts = teaCost * quantity;
    //         totalCosts += eachTeaCosts;
    //         itemDetails[teaId] = {
    //             name: teaName,
    //             cost: teaCost,
    //             quantity,
    //             eachTeaCosts
    //         }
    //         await setCartItemDetails(itemDetails);
    //     }
    //     await setTotalCost(totalCosts);
    setCartItems(cartItems);
  }

  useEffect(()=>{},[cartItems])

  const deleteFromCart = async(teaId,customerId) => {
    const cartItems = await cartContext.deleteFromCart(teaId,customerId);
    setCartItems(cartItems);
  }

  const checkout = async (userId,email,shippingAddress,postalCode) => {
    const userProfile =  await userContext.retrieveUserProfile();
    console.log('whale',userProfile);
    const checkoutObject = {
      user_id:userProfile.id,
      user_email:userProfile.email,
      shipping_address:userProfile.shipping_address,
      postal_code:userProfile.postal_code
    }
    const checkoutUrl = "https://3000-joanneks-tea4uexpressba-qiw1tvvgol5.ws-us63.gitpod.io/api/checkout"
        
    const checkoutResponse = await axios.post(checkoutUrl,checkoutObject);
    console.log(checkoutResponse.data)
    window.location.href = checkoutResponse.data.sessionUrl
  }

  useEffect(() => {
    async function getCartItems() {
      let customerId = JSON.parse(localStorage.getItem('customerId'));
      if(customerId){
        const cartItems = await cartContext.getCartItems();
        console.log('cartttt',cartItems)
        setCartItems(cartItems);

        let itemDetails = {};
        let totalCosts = 0;
        for(let item of cartItems){
            let quantity = item.quantity;
            let teaId = item.tea.id;
            let teaName = item.tea.name;
            let teaCost = item.tea.cost/100;
            let eachTeaCosts = teaCost * quantity;
            totalCosts += eachTeaCosts;
            itemDetails[teaId] = {
                name: teaName,
                cost: teaCost,
                quantity,
                eachTeaCosts
            }
        }
        await setCartItemDetails(itemDetails);
        await setTotalCost(totalCosts);

        const brands = await teaContext.getAllTeaBrands();
        let brandObject = {};
        for(let brand of brands){
            brandObject[brand[0]] = brand[1];
        };
        delete brandObject[0];
        setBrands(brandObject);
        
        console.log(cartItemDetails);
        return cartItems;
      } else{
        console.log(`Login required to view past order's details`);
        navigate('/login');
      }
    };
    getCartItems();
  }, [])

  const showTeaInfo = (teaId) => {
    navigate('/tea/'+teaId)
    // `/orders/${orderId}`
  }
  const deriveTotal = () => {
    let totalCost = 0;
    for(let each of cartItemDetails){
      totalCost = totalCost + each.eachTeaCosts;
    }
    setTotalCost(totalCost);
  }

  return (
    <React.Fragment>
      <div style={{minHeight:'100vh'}}>
        <div>
          <NavbarInstance />
        </div>
        <div style={{height:'57px'}}></div>
          <div style={{margin:'20px'}}><h1 style={{fontSize:'35px',fontFamily:'Khula,sans-serif',fontWeight:'500',textAlign:'center'}}>Shopping Cart</h1>
            <Container style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px' }}>
              <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th className="text-left col-5">Product</th>
                      <th className="text-center col-2">Price</th>
                      <th className="text-center col-2">Quantity</th>
                      <th className="text-center col-2">Total</th>
                      <th className="text-center col-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(each => {
                      return (
                        <React.Fragment key={each.tea.id}>
                          <tr>
                            {/* <td style={{width:'150px'}}><img src={each.tea.image_url} alt={each.tea.name} style={{ height: '130px', width: '130px', objectFit: 'cover' }} /></td> */}
                            <td>
                              <div>
                                <span style={{marginRight:'10px'}}>{each.tea.name}</span> <img src={info} alt={each.tea_id} style={{height:'20px',width:'20px'}} onClick={()=>{showTeaInfo(each.tea_id)}}/>
                                
                              </div>
                              <div>Brand: {brands[each.tea.brand_id]}</div>
                              <div>Weight: {each.tea.weight} g</div>
                              <img src={each.tea.image_url} alt={each.tea.name} style={{ height: '130px', width: '130px', objectFit: 'cover' }} />
                            </td>
                            <td className="text-center">S${each.tea.cost/100}</td>
                            <td className="text-center" style={{display:'flex', justifyContent:'center'}}>
                              <Col xs={12} md={3} lg={2} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100px', marginLeftt: '20px' }}>
                                <span style={{ float: 'left', justifyContent: 'center' }}>
                                  <img src={minus} alt="minusFromCartBtn" style={{ height: "20px", width: "20px" }} onClick={() => { minusFromCart(each.tea_id, each.customer_id) }} />
                                </span>
                                <span>{each.quantity}</span>
                                <span style={{ float: 'right', justifyContent: 'center' }}>
                                  <img src={add} alt="addToCartBtn" style={{ height: "20px", width: "20px" }} onClick={() => { addToCart(each.tea_id, each.customer_id) }} />
                                </span>
                              </Col>
                            </td>
                            <td className="text-center">{cartItemDetails[each.tea_id].eachTeaCosts}</td>
                            <td className="text-center"><img src={remove} alt="addToCartBtn" style={{ height: "20px", width: "20px" }} onClick={()=>{deleteFromCart(each.tea_id, each.customer_id)}}/></td>
                          </tr>
                        </React.Fragment>
                      )
                    })}
                    <tr>
                      {/* <td></td> */}
                      <td></td>
                      <td></td>
                      <td className="text-center" style={{verticalAlign:'middle'}}>Total:</td>
                      <td className="text-center" style={{verticalAlign:'middle'}}>{totalCost}</td>
                      <td><img src={pay} alt="addToCartBtn" style={{ height: "40px", width: "40px" }} onClick={checkout}/></td>
                    </tr>
                  </tbody>
              </table>
              
              {/* <button className="btn btn-success my-3" onClick={checkout}>Submit</button> */}
            </Container>
          </div>
      </div>
    </React.Fragment>
  )
}