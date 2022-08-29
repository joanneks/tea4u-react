// import logo from './logo.svg';
// import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Tea from './pages/Tea';
import Login from './pages/Login';

import UserProvider from './context/UserContextProvider';
import TeaProvider from './context/TeaContextProvider';

function App() {

  return (
    <React.Fragment>
      <div style={{ height: '100vh' }}>
        <TeaProvider>
          <UserProvider>

            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/tea" element={<Tea />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Router>

          </UserProvider>
        </TeaProvider>
      </div>
    </React.Fragment>
  );
}

export default App;
