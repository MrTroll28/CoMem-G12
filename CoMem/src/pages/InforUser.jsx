import { FaUserCircle, FaMoneyBill, FaClipboardList, FaStar, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserMenu from '../components/User/UserMenu';
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import Infor from '../components/User/Infor';
import { useNotification } from '../components/Notification';

const InforUser=({isLoggedin,onLogout})=>{
    console.log("user>> ",isLoggedin)
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    useEffect(() => {
        if (!isLoggedin) {
            addNotification("Bạn cần đăng nhập để xem thông tin!!!","warning");
            navigate("/login");
        }
    }, [isLoggedin, navigate]); 

    if (!isLoggedin) return null;
    return (
        <>
            <Header/>

            <div className='h-[500px] flex items-center justify-start  px-6 '>
                <div className='ml-40'>
                 <UserMenu onLogout={onLogout}  />
                </div>
                <Infor />
            </div>

            
            <Footer/>
        </>
    );
    
}

export default InforUser;