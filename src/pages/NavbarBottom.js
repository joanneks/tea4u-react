
import React from 'react';
import '../css/navbarBottom.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function NavbarBottom() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const login = () => {
    navigate('/login')
  }

  return (
    <React.Fragment>
        <div className="displayNavbarBottom">
            <div className="navbarBottom">
                <div><a className="navbarBottomLink" href="/tea">Shop</a></div>
                <div><a className="navbarBottomLink" href="/profile">Profile</a></div>
                <div><a className="navbarBottomLink" href="/cart">Cart</a></div>
                <div><a className="navbarBottomLink" href="/orders">Orders</a></div>
            </div>
        </div>
    </React.Fragment>
  );
}

  