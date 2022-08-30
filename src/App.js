// import logo from './logo.svg';
// import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Tea from './pages/Tea';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

import UserProvider from './context/UserContextProvider';
import TeaProvider from './context/TeaContextProvider';
import CartProvider from './context/CartContextProvider';

function App() {

  return (
    <React.Fragment>
      <div style={{ height: '100vh' }}>
        <TeaProvider>
          <UserProvider>
            <CartProvider>

              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/tea" element={<Tea />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </Router>

            </CartProvider>
          </UserProvider>
        </TeaProvider>
      </div>
    </React.Fragment>
  );
}

export default App;
