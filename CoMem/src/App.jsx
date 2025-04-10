import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import { NotificationProvider } from "./components/Notification";
import Product from './pages/Product';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import InfoUser from "./pages/InfoUser";

import FeedBack from "./pages/Feedback";
import Voucher from "./pages/Vouchers";
import { UserProvider } from "./context/UserContext"; 
import MembershipCard from "./components/MemberShipCart";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/infouser" element={<InfoUser />} />
            <Route path="/product" element={<Product />} />
            <Route path="/feedback" element={<FeedBack />} />
            <Route path="/vouchers" element={<Voucher />} />
            <Route path="/membership" element={<MembershipCard />} />
          </Routes>
          <Footer/>
        </Router>
      </NotificationProvider>
    </UserProvider>

  );
}

export default App;
