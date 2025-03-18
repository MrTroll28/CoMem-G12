import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../components/notification";

export default function Register() {
  const [user, setUser] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const phoneRegex = /^[0-9]{10}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.fullName || !user.phone || !user.email || !user.password || !user.confirmPassword) {
      addNotification("Vui lòng nhập đầy đủ thông tin.", "warning");
      return;
    }

    if (user.password !== user.confirmPassword) {
      addNotification("Mật khẩu không khớp.", "danger");
      return;
    }

    if (!phoneRegex.test(user.phone)) {
      addNotification("Số điện thoại phải có đúng 10 chữ số.", "danger");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: user.fullName,
          phone: user.phone,
          email: user.email,
          password: user.password,
        }),
      });

      const result = await response.json();
      console.log(result)
      if (result.success) {
        addNotification(result.message, "success");
        setUser({ fullName: "", phone: "", email: "", password: "", confirmPassword: "" });
        navigate("/login");
      } else {
        addNotification(result.message, "warning");
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      addNotification("Có lỗi sảy ra", "danger");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] border border-gray-300">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Đăng Ký Tài khoản</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="fullName" placeholder="Họ Tên (*)" value={user.fullName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <input type="text" name="phone" placeholder="Số điện thoại (*)" value={user.phone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <input type="email" name="email" placeholder="Email (*)" value={user.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <input type="password" name="password" placeholder="Nhập mật khẩu (*)" value={user.password} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <input type="password" name="confirmPassword" placeholder="Nhập lại mật khẩu (*)" value={user.confirmPassword} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <div className="flex justify-between items-center">
            <button type="button" onClick={() => navigate('/login')} className="text-green-600 hover:underline">Về trang đăng nhập</button>
            <button type="submit" className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition-all">Đăng ký</button>
          </div>
        </form>
      </div>
    </div>
  );
}
