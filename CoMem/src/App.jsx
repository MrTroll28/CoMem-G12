import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './App.css'
import Home from './pages/Home'

// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Reset from "./pages/Reset";
import { NotificationProvider } from "./components/Notification"; 

import Product from './pages/Product'


function App() {
  return (
    <NotificationProvider>
      <Router> 
      <Routes> 

        <Route path="/" element={<Home />} /> 
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} /> */}

       
        <Route path="/product" element={<Product />} />

      </Routes> 
    </Router> 
    </NotificationProvider>
  
  )
}

export default App
