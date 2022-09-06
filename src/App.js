import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Tea from './pages/Tea';
import TeaDetails from './pages/TeaDetails';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Order from './pages/Order';
import OrderItems from './pages/OrderItems';

import { useContext } from "react";
import UserContext from "./context/UserContext";
import UserProvider from './context/UserContextProvider';
import TeaProvider from './context/TeaContextProvider';
import CartProvider from './context/CartContextProvider';
import OrderProvider from './context/OrderContextProvider';

function App() {
  const userContext = useContext(UserContext);

  // setInterval(userContext.getNewAccessToken,890000)
  return (
    <React.Fragment>
      <div style={{minHeight:'100vh',backgroundColor: '#f5f2ee' }}>
        <TeaProvider>
          <UserProvider>
            <CartProvider>
              <OrderProvider>

                <Router>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tea" element={<Tea />} />
                    <Route path="/tea/:teaId" element={<TeaDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Order />} />
                    <Route path="/orders/:orderId" element={<OrderItems />} />
                  </Routes>
                </Router>
              </OrderProvider>
            </CartProvider>
          </UserProvider>
        </TeaProvider>
      </div>
    </React.Fragment>
  );
}

export default App;
