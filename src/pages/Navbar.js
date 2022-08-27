
import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/navbar.css';


export default function NavbarInstance() {

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
                    <Nav.Link href="/tea">Tea</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
      </React.Fragment>
    );
  }
  
  