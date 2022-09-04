
import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/navbar.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function NavbarInstance(props) {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const logout = async () => {
    let customerId = JSON.parse(localStorage.getItem('customerId'));
    if(customerId){
      console.log('logout');
      await userContext.logout();
      navigate("/tea");
    }
  }
  const checkIfLoggedIn = () => {
    let customerId = JSON.parse(localStorage.getItem('customerId'));
    if(customerId){
      return true;
    }else {
      return false;
    }
  }

  return (
    <React.Fragment>
      <div>
          <Navbar fixed="top" bg="light" expand="lg" id="navbar">
              <Container>
              <Navbar.Brand href="/">Tea4U</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                  <Nav.Link href="/about">About Us</Nav.Link>
                  <Nav.Link href="/tea">Shop</Nav.Link>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Nav.Link href="/cart">Cart</Nav.Link>
                  <Nav.Link href="/orders">Orders</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                  </Nav>
              </Navbar.Collapse>
              {checkIfLoggedIn() ?
                <button className="btn btn-danger" onClick={logout}>Logout</button>
                // <a href='' style={{fontFamily:'Khula,sans-serif',fontSize:'16px',fontWeight:'600',textDecoration:'none'}} onClick={logout}>Logout</a>
                : ''
              }
              </Container>
          </Navbar>
      </div>
    </React.Fragment>
  );
}

  