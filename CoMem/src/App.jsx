import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './App.css'
import Home from './pages/Home'

import { NotificationProvider } from "./components/Notification";

import Product from './pages/Product'
import Register from "./pages/Register";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import InforUser from "./pages/InforUser";
import { useState, useEffect } from "react";


function App() {
  // Lấy trạng thái đăng nhập từ localStorage khi ứng dụng tải lại
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // Lưu vào localStorage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Xóa khỏi localStorage
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
        <Route path="/inforuser" element={<InforUser isLoggedin={isLoggedIn} onLogout={handleLogout}/>} />
        <Route path="/product" element={<Product />} />
      </Routes> 
    </Router> 
    </NotificationProvider>
  );
}

export default App;
