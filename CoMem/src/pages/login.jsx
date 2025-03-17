import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    if (storedUser && credentials.email === storedUser.email && credentials.password === storedUser.password) {
      setNotification({ message: "Đăng nhập thành công!", type: "success" });
    } else {
      setNotification({ message: "Email hoặc mật khẩu không đúng.", type: "error" });
    }

    setTimeout(() => setNotification(null), 15000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] border border-gray-300 relative">
        {notification && (
          <div className={`absolute top-2 right-2 p-4 rounded-md text-white ${notification.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
            {notification.message}
            <button onClick={() => setNotification(null)} className="ml-4 text-white font-bold">×</button>
          </div>
        )}
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
