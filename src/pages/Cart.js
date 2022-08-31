import React from 'react';
import NavbarInstance from './Navbar';
import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import Container from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import add from '../css/images/add.png';
import minus from '../css/images/minus.png';

export default function Cart(props) {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (teaId, customerId) => {
    const cartItems = await cartContext.addToCart(teaId, customerId);
    setCartItems(cartItems);
  }
  const minusFromCart = async (teaId, customerId) => {
    const cartItems = await cartContext.minusFromCart(teaId, customerId);
    setCartItems(cartItems);
  }
  useEffect(() => {
    async function getCartItems() {
      const cartItems = await cartContext.getCartItems();
      setCartItems(cartItems);
    };
    getCartItems();

    // async function addToCart () {
    //   const cartItems = await cartContext.addToCart();
    //   setCartItems(cartItems);
    // };

    // addToCart();

    // async function minusFromCart () {
    //   const cartItems = await cartContext.minusFromCart();
    //   setCartItems(cartItems);
    // };
    // minusFromCart();

  }, [])

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
                    <h5>{each.tea.name}</h5>
                    <div>Product Id: {each.tea_id}</div>
                    <div>Origin: {each.tea.place_of_origin_id}</div>
                    <div>Packaging: {each.tea.packaging_id}</div>
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
          </Container>
        </div>
      </div>
    </React.Fragment>
  )
}