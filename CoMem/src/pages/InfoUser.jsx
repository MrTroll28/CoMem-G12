import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserMenu from "../components/User/UserMenu";
import Info from "../components/User/Info";
import { useNotification } from "../components/Notification";
import { UserContext } from "../context/UserContext"; // Import context
import { useRef } from "react";

const InfoUser = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { isLoggedIn, handleLogout } = useContext(UserContext); // Lấy trạng thái và hàm từ context
  const hasRedirected = useRef(false);
  useEffect(() => {
    if (!isLoggedIn && !hasRedirected.current) {
        addNotification("Bạn cần đăng nhập để xem thông tin!", "warning");
        hasRedirected.current = true; // Đánh dấu đã điều hướng
        navigate("/login");
    }
}, [isLoggedIn, navigate, addNotification]);

  if (!isLoggedIn) return null;

  return (
    <>
      
      <div className="h-[500px] flex items-center justify-start px-6">
        <div className="ml-40">
          <UserMenu onLogout={handleLogout} />
        </div>
        <Info />
      </div>
      
    </>
  );
};

export default InfoUser;
