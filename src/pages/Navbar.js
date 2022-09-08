
import React from 'react';
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
  const login = () => {
    navigate('/login')
  }

  return (
    <React.Fragment>
      <div style={{display:'flex',flexWrap:'wrap'}}>
            <Navbar fixed="top" bg="light" expand="lg" id="navbar" style={{padding:'2px',display:'flex',flexWrap:'wrap'}}>
              <Navbar.Brand href="/">Tea4U</Navbar.Brand>
              {checkIfLoggedIn() ?
                <div id="loggingSmall" onClick={logout}>LOGOUT</div>
                : <div id="loggingSmall" onClick={login}>LOGIN  ||  JOIN</div>
              }
              <Container id="navContainer">
                <div id="showNavbar">
                  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                      <Nav.Link href="/tea">SHOP</Nav.Link>
                      <Nav.Link href="/profile">PROFILE</Nav.Link>
                      <Nav.Link href="/cart">CART</Nav.Link>
                      <Nav.Link href="/orders">ORDERS</Nav.Link>
                      </Nav>
                  </Navbar.Collapse>
                </div>
              </Container>
              {checkIfLoggedIn() ?
                <div id="logging" onClick={logout}>LOGOUT</div>
                : <div id="logging" onClick={login}>LOGIN  ||  JOIN</div>
              }
              {/* <div style={{width:'20px'}}></div> */}
            </Navbar>
      </div>

    </React.Fragment>
  );
}

  