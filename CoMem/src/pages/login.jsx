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

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && credentials.email === storedUser.email && credentials.password === storedUser.password) {
      addNotification("Đăng nhập thành công!", "success"); 
      
        navigate("/");
      
    } else {
      addNotification("Email hoặc mật khẩu không đúng.", "danger"); 
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
