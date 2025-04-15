import React from 'react';
import { useNavigate } from 'react-router-dom';

function ThankYou() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Cảm ơn bạn đã mua sắm!</h1>
      <p className="text-lg text-gray-600 text-center">Đơn hàng của bạn đã được xử lý thành công. Chúng tôi sẽ liên hệ với bạn sớm.</p>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 flex mx-auto"
          onClick={() => navigate("/")} // Redirect to home page
        >
          Về trang chủ
      </button>
    </div>
  );
}

export default ThankYou;
