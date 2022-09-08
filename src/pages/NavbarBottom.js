
import React from 'react';
import '../css/navbarBottom.css';

export default function NavbarBottom() {
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

