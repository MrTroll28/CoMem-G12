import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sử dụng SweetAlert2 để hiển thị thông báo thay vì alert
    Swal.fire({
      title: 'Thanh toán thành công!',
      text: 'Cảm ơn bạn đã mua sắm cùng chúng tôi. Đơn hàng của bạn sẽ được xử lý ngay lập tức.',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Đóng',
    }).then(() => {
      // Sau khi thông báo thành công, điều hướng đến trang cảm ơn
      navigate('/thank-you');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Thông tin thanh toán</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form nhập thông tin khách hàng */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Thông tin khách hàng</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-medium">Họ và tên</label>
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Địa chỉ giao hàng</label>
              <input
                type="text"
                name="address"
                value={customerInfo.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={customerInfo.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            >
              Thanh toán
            </button>
          </form>
        </div>

        {/* Tóm tắt giỏ hàng */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.productId} className="flex justify-between">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold mt-4">
            <span>Tổng cộng:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
