import React from 'react';
import NavbarInstance from './Navbar';
import NavbarBottom from './NavbarBottom';
import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';
import TeaContext from "../context/TeaContext";
import '../css/cart.css';
import Container from 'react-bootstrap/Col';
import Col from 'react-bootstrap/Col';
import info from '../css/images/info.png';
import add from '../css/images/add.png';
import minus from '../css/images/minus.png';
import remove from '../css/images/remove.png';
import pay from '../css/images/pay.png';
import axios from 'axios';
import loadingPic from '../css/images/loading.gif';

export default function Cart(props) {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);
  const teaContext = useContext(TeaContext);
  const [cartItems, setCartItems] = useState([]);
  const [brands, setBrands] = useState();
  const [totalCost, setTotalCost] = useState();
  const [cartItemDetails, setCartItemDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCartItems() {
      setLoading(true);
      let customerId = JSON.parse(localStorage.getItem('customerId'));
      if (customerId) {
        const cartItems = await cartContext.getCartItems();
        setCartItems(cartItems);

        let itemDetails = {};
        let totalCosts = 0;
        for (let item of cartItems) {
          let quantity = item.quantity;
          let teaId = item.tea.id;
          let teaName = item.tea.name;
          let teaCost = item.tea.cost / 100;
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
        for (let brand of brands) {
          brandObject[brand[0]] = brand[1];
        };
        delete brandObject[0];
        setBrands(brandObject);

        setTimeout(async () => { await setLoading(false) }, 500)
        console.log('CARRTTT',cartItems)
        return cartItems;
      } else {
        console.log(`Login required to view cart`);
        navigate('/login');
      }
    };
    getCartItems();
  }, [])

  const addToCart = async (teaId, customerId) => {
    console.log("dog")
    console.log('before',cartItemDetails)
    let newQuantity = parseInt(cartItemDetails[teaId].quantity) + parseInt(1);
    let newEachTeaCosts = cartItemDetails[teaId].cost * newQuantity;
    let newTotalCosts = totalCost + cartItemDetails[teaId].cost;
    
    let cartItemDetailsToRevise = cartItemDetails;
    cartItemDetailsToRevise[teaId].quantity = newQuantity;
    cartItemDetailsToRevise[teaId].eachTeaCosts = newEachTeaCosts;
    console.log(cartItemDetails)
    console.log('originalqty',cartItemDetails[teaId].quantity)
    console.log('newQuantity',newQuantity)
    console.log('newEachTeaCosts',newEachTeaCosts)
    console.log('newTotalCosts',newTotalCosts)
    console.log('after',cartItemDetails)

    setTotalCost(newTotalCosts);
    setCartItemDetails(cartItemDetailsToRevise)

    const cartItems = await cartContext.addToCart(teaId, 1, customerId);
    setCartItems(cartItems);
  }
  const minusFromCart = async (teaId, customerId) => {
    let newQuantity = cartItemDetails[teaId].quantity - 1;
    let newEachTeaCosts = cartItemDetails[teaId].cost * newQuantity;
    let newTotalCosts = totalCost - cartItemDetails[teaId].cost;

    let cartItemDetailsToRevise = cartItemDetails;
    cartItemDetailsToRevise[teaId].quantity = newQuantity;
    cartItemDetailsToRevise[teaId].eachTeaCosts = newEachTeaCosts;

    setTotalCost(newTotalCosts);
    setCartItemDetails(cartItemDetailsToRevise)

    const cartItems = await cartContext.minusFromCart(teaId, customerId);
    setCartItems(cartItems);
  }

  useEffect(() => { }, [cartItems])

  const deleteFromCart = async (teaId, customerId) => {
    const cartItems = await cartContext.deleteFromCart(teaId, customerId);
    setCartItems(cartItems);
  }

  const checkout = async (userId, email, shippingAddress, postalCode) => {
    const userProfile = await userContext.retrieveUserProfile();
    const checkoutObject = {
      user_id: userProfile.id,
      user_email: userProfile.email,
      shipping_address: userProfile.shipping_address,
      postal_code: userProfile.postal_code
    }
    // const checkoutUrl = "https://3000-joanneks-tea4uexpressba-qiw1tvvgol5.ws-us63.gitpod.io/api/checkout"
    // const checkoutUrl = "https://tea4u-express-tgc18.herokuapp.com/api/checkout"
    const checkoutUrl = "https://tea4ubackend.onrender.com/api/checkout"
    
    const checkoutResponse = await axios.post(checkoutUrl, checkoutObject);
    console.log(checkoutResponse.data)
    window.location.href = checkoutResponse.data.sessionUrl
  }


  const showTeaInfo = (teaId) => {
    navigate('/tea/' + teaId)
  }

  return (
    <React.Fragment>
      <div style={{ minHeight: '100vh' }}>
        <div>
          <NavbarInstance />
        </div>
        <NavbarBottom />
        <div style={{ height: '56px' }}></div>
        <div id="cartMargin"><h1 style={{ fontSize: '35px', fontFamily: 'Khula,sans-serif', fontWeight: '500', textAlign: 'center', marginBottom: '30px' }}>Shopping Cart</h1>
          {
            loading ?
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <img src={loadingPic} alt="loadingPic" style={{ position: 'absolute', height: '300px', margin: 'auto' }} />
              </div>
              :
              cartItems.length === 0 ? 
              <div style={{paddingTop:'10px',marginBottom:'40px',textAlign:'center'}}>No items were added to cart.</div>
              :
              <div>
                <Container style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px' }}>
                  {
                    <table id="cartTable" className="table table-borderless">
                      <thead>
                        <tr style={{ fontSize: '19px', fontFamily: 'Khula,sans-serif', fontWeight: '500' }}>
                          <th className="text-left col-2 col-lg-1">PRODUCT</th>
                          <th className="text-left col-3 col-lg-5"></th>
                          <th className="text-center col-2">PRICE</th>
                          <th className="text-center col-2">QUANTITY</th>
                          <th className="text-center col-2">SUBTOTAL</th>
                          <th className="text-center col-1"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map(each => {
                          return (
                            <React.Fragment key={each.tea.id}>
                              <tr style={{ fontSize: '18px', fontFamily: 'Khula,sans-serif', fontWeight: '500' }}>
                                <td style={{ width: '150px' }}><img src={each.tea.image_url} alt={each.tea.name} style={{ height: '130px', width: '130px', objectFit: 'cover' }} /></td>
                                <td>
                                  <div>
                                    <span style={{ marginRight: '10px' }}>{each.tea.name}</span> <img src={info} alt={each.tea_id} style={{ height: '20px', width: '20px' }} onClick={() => { showTeaInfo(each.tea_id) }} />
  
                                  </div>
                                  <div>Brand: {brands[each.tea.brand_id]}</div>
                                  <div>Weight: {each.tea.weight} g</div>
                                </td>
                                <td className="text-center">S${each.tea.cost / 100}</td>
                                <td className="text-center" style={{ display: 'flex', justifyContent: 'center' }}>
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
                                <td className="text-center">{parseFloat(cartItemDetails[each.tea_id].eachTeaCosts).toFixed(2)}</td>
                                <td className="text-center">
                                  <img src={remove} alt="addToCartBtn" style={{ height: "20px", width: "20px" }}
                                    onClick={() => { deleteFromCart(each.tea_id, each.customer_id) }}
                                  />
                                </td>
                              </tr>
                            </React.Fragment>
                          )
                        })}
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr style={{ fontSize: '20px', fontFamily: 'Khula,sans-serif', fontWeight: '600' }}>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className="text-center" style={{ verticalAlign: 'middle' }}>TOTAL:</td>
                          <td className="text-center" style={{ verticalAlign: 'middle' }}>S${parseFloat(totalCost).toFixed(2)}</td>
                          <td><img src={pay} alt="addToCartBtn" style={{ height: "40px", width: "40px" }} onClick={checkout} /></td>
                        </tr>
                      </tbody>
                    </table>
                  }

                </Container>
                <div id="cartDiv">
                  {cartItems.map(each => {
                    return (
                      <div key={each.tea.id} style={{ display: 'flex', flexWrap: 'wrap', fontFamily: 'Khula,sans serif', fontSize: '17px' }}>
                        <div style={{ marginRight: '20px' }}>
                          <img src={each.tea.image_url} alt={each.tea.name} style={{ height: '130px', width: '130px', objectFit: 'cover' }} />
                        </div>
                        <div style={{ width: '50%', minWidth: '50px' }}>
                          <div style={{ marginRight: '10px' }}>
                            <span style={{ marginRight: '10px' }}>{each.tea.name}</span>
                            <img src={info} alt={each.tea_id} style={{ height: '20px', width: '20px' }}
                              onClick={() => { showTeaInfo(each.tea_id) }}
                            />
                          </div>
                          <div>Brand: {brands[each.tea.brand_id]}</div>
                          <div>Weight: {each.tea.weight} g</div>
                          <div style={{ display: 'flex' }}>
                            <div style={{ marginRight: '20px' }}>
                              <img src={minus} alt="minusFromCartBtn" style={{ height: "20px", width: "20px" }} onClick={() => { minusFromCart(each.tea_id, each.customer_id) }} />
                            </div>
                            <div style={{ marginRight: '20px' }}>{each.quantity}</div>
                            <div style={{ marginRight: '20px' }}>
                              <img src={add} alt="addToCartBtn" style={{ height: "20px", width: "20px" }} onClick={() => { addToCart(each.tea_id, each.customer_id) }} />
                            </div>
                          </div>
                        </div>
                        <div style={{ margin: '10px 0px 20px 0px', fontSize: '18px', fontWeight: '600' }}>
                          <div style={{ display: 'flex' }}>
                            <div style={{ width: '130px', marginRight: '20px' }}>Unit Price: </div>
                            <div>S${parseFloat(cartItemDetails[each.tea_id].cost).toFixed(2)}</div>
                          </div>
                          <div style={{ display: 'flex' }}>
                            <div style={{ width: '130px', marginRight: '20px' }}>Subtotal: </div>
                            <div>S${parseFloat(cartItemDetails[each.tea_id].eachTeaCosts).toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div style={{ display: 'flex', margin: '10px 0px', fontSize: '18px', fontWeight: '600' }}>
                    <div style={{ width: '130px', marginRight: '20px' }}>Total: </div>
                    <div>S${parseFloat(totalCost).toFixed(2)}<img src={pay} alt="addToCartBtn" style={{ height: "40px", width: "40px", marginLeft: '30px' }} onClick={checkout} /></div>
                  </div>
                </div>
              </div>
          }
          {
          }
        </div>
      </div>
    </React.Fragment>
  )
}