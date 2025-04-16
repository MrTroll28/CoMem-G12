import UserMenu from "../components/User/UserMenu"
import { useNotification } from "../components/Notification";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";


const FeedBack = () => {
    const {addNotification}=useNotification();

    const handleSubmit=()=>{
        addNotification("Cỏ mềm xin cảm ơn bạn đã đóng góp ý kiến!!!","success");
    }
    const navigate = useNavigate();
   
    const { isLoggedIn, handleLogout } = useContext(UserContext); 
    const hasRedirected = useRef(false);
    useEffect(() => {
      if (!isLoggedIn && !hasRedirected.current) {
          addNotification("Bạn cần đăng nhập để xem thông tin!", "warning");
          hasRedirected.current = true; // Đánh dấu đã điều hướng
          navigate("/login");
      }
  }, [isLoggedIn, navigate, addNotification]);

    return (
        <>
          <div className="h-[500px] flex items-center justify-start px-6">
          <div className="ml-40">
            <UserMenu />
          </div>
          <div className="ml-20">
          <div className="h-[500px] flex flex-col md:flex-row items-center justify-center px-6">
                <div className="ml-10 md:ml-40">
                  
                </div>
                <div className="h-[500px] max-w-lg w-500 p-20">
                    <h1 className="font-bold text-3xl text-emerald-900 mb-4">Gửi ý kiến cho Cỏ Mềm</h1>
                    <label htmlFor="feedback" className="block text-emerald-800 font-medium mb-2">
                        Ý kiến của bạn:
                    </label>
                    <textarea 
                        id="feedback" 
                        cols="50" 
                        rows="4" 
                        className="w-full border-2 border-emerald-600 p-2 focus:outline-none focus:border-emerald-800"
                        placeholder="Nhập ý kiến của bạn..."
                    ></textarea>

                    <button className="bg-green-200 text-emerald-800 p-2 rounded-2xl float-end hover:bg-emerald-700 hover:text-amber-50" onClick={handleSubmit}> Gửi ý kiến</button>
                </div>
            </div>
          </div>
        </div>
           {/* //=== */}
           
           
        </>
    );
};

export default FeedBack;
