import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext'; // Import UserContext

const Info = () => {
  const { currentUser } = useContext(UserContext); // Lấy thông tin user từ context
  console.log(currentUser)
  if (!currentUser) {
    return (
      <div className="w-[50%] mx-auto p-6 bg-white rounded-xl shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-700">Bạn chưa đăng nhập!</h2>
        <p className="text-gray-500 mt-2">Vui lòng đăng nhập để xem thông tin tài khoản.</p>
      </div>
    );
  }

  return (
    <div className="w-[50%] mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Thông tin tài khoản</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium">Họ Tên *</label>
          <input 
            type="text" 
            value={currentUser.fullName || "Chưa cập nhật"} 
            readOnly 
            className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100" 
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Số điện thoại *</label>
          <input 
            type="text" 
            value={currentUser.phone || "Chưa cập nhật"} 
            readOnly 
            className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100" 
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Email</label>
          <input 
            type="email" 
            value={currentUser.email || "Chưa cập nhật"} 
            readOnly 
            className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100" 
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
