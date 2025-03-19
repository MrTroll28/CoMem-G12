import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './App.css'
import Home from './pages/Home'

import { NotificationProvider } from "./components/Notification"; 

import Product from './pages/Product'
import Register from "./pages/register";
import Login from "./pages/login";
import Reset from "./pages/reset";


function App() {
  return (
    <NotificationProvider>
      <Router> 
      <Routes> 

        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} />

       
        <Route path="/product" element={<Product />} />

      </Routes> 
    </Router> 
    </NotificationProvider>
  
  )
}

export default App
