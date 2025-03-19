import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../components/Notification";

const  Reset=()=> {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Nhập email, 2: Nhập mã xác nhận, 3: Đặt lại mật khẩu
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  // Xử lý gửi email
  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        addNotification("Mã xác nhận đã được gửi. Vui lòng kiểm tra email!", "success");
        setStep(2);
      } else {
        addNotification(data.message, "danger");
      }
    } catch (error) {
      addNotification("Lỗi hệ thống, vui lòng thử lại.", "danger");
    }
  };

  // Xử lý xác minh mã xác nhận
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();
      if (data.success) {
        addNotification("Mã xác nhận hợp lệ! Vui lòng đặt lại mật khẩu.", "success");
        setStep(3);
      } else {
        addNotification("Mã xác nhận không đúng.", "danger");
      }
    } catch (error) {
      addNotification("Lỗi hệ thống, vui lòng thử lại.", "danger");
    }
  };

  // Xử lý đặt lại mật khẩu mới
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if (data.success) {
        addNotification("Mật khẩu đã được đặt lại thành công!", "success");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        addNotification(data.message, "danger");
      }
    } catch (error) {
      addNotification("Lỗi hệ thống, vui lòng thử lại.", "danger");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] border border-gray-300">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Quên Mật Khẩu</h2>

        {step === 1 && (
          <form onSubmit={handleSendEmail} className="space-y-4">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button type="submit" className="w-full bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition-all">
              Gửi mã xác nhận
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <input
              type="text"
              placeholder="Nhập mã xác nhận"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button type="submit" className="w-full bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition-all">
              Xác nhận mã
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button type="submit" className="w-full bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition-all">
              Đặt lại mật khẩu
            </button>
          </form>
        )}

        <button onClick={() => navigate("/login")} className="mt-4 w-full text-green-600 hover:underline">
          Về trang đăng nhập
        </button>
      </div>
    </div>
  );
}


export default Reset