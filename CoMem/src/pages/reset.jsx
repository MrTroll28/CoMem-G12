import { useState } from "react";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && email === storedUser.email) {
      setMessage("Mật khẩu của bạn là: " + storedUser.password);
    } else {
      setMessage("Email không tồn tại trong hệ thống.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] border border-gray-300">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Quên Mật Khẩu</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition-all"
          >
            Lấy lại mật khẩu
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
}
