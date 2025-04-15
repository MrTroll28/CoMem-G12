import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "./components/Notification";
import { UserProvider } from "./context/UserContext"; 
import { CartProvider } from "./context/CartContext";
import Cart from './pages/Cart';
import './App.css';
import Home from './pages/Home';
import Product from './pages/Product';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import InfoUser from "./pages/InfoUser";
import FeedBack from "./pages/Feedback";
import Voucher from "./pages/Vouchers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Membership from "./pages/Membership";
import Orders from "./pages/Orders";
import Warranty from "./pages/Warranty";
import NotFound from "./pages/NotFound";
import ReturnPolicy from "./pages/ReturnPolicy";
import ProductDetail from "./pages/ProductDetail";
import Story from "./pages/Story";

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <CartProvider>
          <Router>
            <Header/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/infouser" element={<InfoUser />} />
              <Route path="/product" element={<Product />} />
              <Route path="/feedback" element={<FeedBack />} />
              <Route path="/vouchers" element={<Voucher />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/warranty" element={<Warranty />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/story" element={<Story />} />
            </Routes>
            <Footer/>
          </Router>
        </CartProvider>
      </NotificationProvider>
    </UserProvider>

  );
}

export default App;
