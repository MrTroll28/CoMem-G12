import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './App.css'
import Home from './pages/Home'

import { NotificationProvider } from "./components/Notification";

import Product from './pages/Product'
import Register from "./pages/Register";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import InfoUser from "./pages/InfoUser";
import ProductDetail from './pages/ProductDetail';
import { useState, useEffect } from "react";
import FeedBack from "./pages/Feedback";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    console.log("Trang thái login app >>", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <NotificationProvider>
      <Router> 
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/infouser" element={<InfoUser isLoggedin={isLoggedIn} onLogout={handleLogout}/>} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/feedback" element={<FeedBack />} />
        </Routes> 
      </Router> 
    </NotificationProvider>
  );
}

export default App;
