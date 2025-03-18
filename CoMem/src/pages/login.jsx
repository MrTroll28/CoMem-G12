import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNotification } from "../components/notification";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (result.success) {
        addNotification("Đăng nhập thành công!", "success");
        localStorage.setItem("user", JSON.stringify(result.user)); // Lưu thông tin user vào localStorage
        navigate("/");
      } else {
        addNotification(result.message || "Email hoặc mật khẩu không đúng.", "danger");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      addNotification("Lỗi kết nối đến server.", "danger");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] border border-gray-300">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Đăng Nhập</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email (*)"
            value={credentials.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu (*)"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="flex justify-between items-center">
            <Link to="/reset" className="text-green-600 hover:underline">Quên mật khẩu?</Link>
            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition-all"
            >
              Đăng nhập
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Bạn chưa có tài khoản? <Link to="/register" className="text-green-600 hover:underline">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
}
