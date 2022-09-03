import React from 'react';
import NavbarInstance from './Navbar';
import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';
import TeaContext from "../context/TeaContext";
import Container from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import info from '../css/images/info.png';
import add from '../css/images/add.png';
import minus from '../css/images/minus.png';
import axios from 'axios';

export default function Cart(props) {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);
  const teaContext = useContext(TeaContext);
  const [cartItems, setCartItems] = useState([]);
  const [brands,setBrands] = useState();
  const [cartItemDetails,setCartItemDetails] = useState([]);

  const addToCart = async (teaId, customerId) => {
    const cartItems = await cartContext.addToCart(teaId, customerId);
    setCartItems(cartItems);
  }
  const minusFromCart = async (teaId, customerId) => {
    const cartItems = await cartContext.minusFromCart(teaId, customerId);
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
    const checkoutUrl = "https://3000-joanneks-tea4uexpressba-azji6dgmjtq.ws-us63.gitpod.io/api/checkout"
        
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

        itemDetails['totalCosts'] = totalCosts;
        console.log('ITEMS333',itemDetails);
        setCartItemDetails(itemDetails)

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

  return (
    <React.Fragment>
      <div style={{ backgroundColor: '#d4e0e2', height: '100vh' }}>
        <div>
          <NavbarInstance />
        </div>
        <div style={{ marginTop: '70px', backgroundColor: '#d4e0e2' }}>
          <h1 style={{ marginLeft: '30px' }}>Cart</h1>
          <Container style={{ marginLeft: '30px', marginRight: '30px', marginTop: '10px' }}>
            {cartItems.map(each => {
              return (
                <Row className="g-2" key={each.id}>
                  <Col xs={12} md={7} lg={7} style={{ marginTop: '40px' }}>
                    <h5>{each.tea.name} <img src={info} alt={each.tea_id} style={{height:'25px',width:'25px'}} onClick={()=>{showTeaInfo(each.tea_id)}}/></h5>
                    <div>Subtotal: {cartItemDetails[each.tea_id].eachTeaCosts}</div>
                    <div>Brand: {brands[each.tea.brand_id]}</div>
                    <div>Quantity: {each.quantity}</div>
                    <div>Cost: {each.tea.cost/100}</div>
                    <div>Weight: {each.tea.weight}</div>
                  </Col>
                  <Col xs={12} md={3} lg={2} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100px', marginRight: '20px', marginLeftt: '20px' }}>
                    <span style={{ float: 'left', justifyContent: 'center' }}>
                      <img src={minus} alt="minusFromCartBtn" style={{ height: "25px", width: "25px" }} onClick={() => { minusFromCart(each.tea_id, each.customer_id) }} />
                    </span>
                    <span>{each.quantity}</span>
                    <span style={{ float: 'right', justifyContent: 'center' }}>
                      <img src={add} alt="addToCartBtn" style={{ height: "25px", width: "25px" }} onClick={() => { addToCart(each.tea_id, each.customer_id) }} />
                    </span>
                  </Col>
                  <Col xs={12} md={2} lg={2}>
                    <img src={each.tea.image_url} alt={each.tea.name} style={{ height: '150px', width: '150px', objectFit: 'cover' }} />
                  </Col>
                </Row>
              )
            })}
            <div>Total:{cartItemDetails.totalCost}</div>
            <button className="btn btn-success my-3" onClick={checkout}>Submit</button>
          </Container>
        </div>
      </div>
    </React.Fragment>
  )
}