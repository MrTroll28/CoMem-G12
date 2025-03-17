import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 15000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.fullName && user.phone && user.email && user.password && user.confirmPassword) {
      if (user.password !== user.confirmPassword) {
        setNotification("Mật khẩu không khớp.");
        return;
      }
      localStorage.setItem("user", JSON.stringify(user));
      setNotification("Đăng ký thành công!");
      setUser({ fullName: "", phone: "", email: "", password: "", confirmPassword: "" });
    } else {
      setNotification("Vui lòng nhập đầy đủ thông tin.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] border border-gray-300 relative">
        {notification && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md text-sm flex justify-between items-center">
            <span>{notification}</span>
            <button onClick={() => setNotification("")} className="ml-4 text-white font-bold">×</button>
          </div>
        )}
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Đăng Ký Tài khoản</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Họ Tên (*)"
            value={user.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại (*)"
            value={user.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email (*)"
            value={user.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Nhập mật khẩu (*)"
            value={user.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu (*)"
            value={user.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="flex justify-between items-center">
            <button type="button" onClick={() => navigate('/login')} className="text-green-600 hover:underline">
              Về trang đăng nhập
            </button>
            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition-all"
            >
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
