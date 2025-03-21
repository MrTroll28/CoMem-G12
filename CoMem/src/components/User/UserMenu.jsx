import { useState } from 'react';
import { Modal, Button } from 'antd';
import { FaUserCircle, FaMoneyBill, FaClipboardList, FaStar, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigator=useNavigate();
  
  const showLogoutModal = () => {
    setIsModalOpen(true);
  };

  
  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    if (typeof onLogout === 'function') {
      onLogout();
    }
   // navigator("/home")
  };

  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="border border-[rgb(121,237,129)] rounded-lg p-5 shadow-md w-64 bg-white">
      <p className="text-gray-600">Xin chào,</p>
      <h2 className="text-lg font-bold text-green-700">Tran Viet Nhan</h2>
      <hr className="my-2 border-[rgb(121,237,129)]" />
      <ul className="space-y-4">
        <li className="flex items-center text-orange-600 font-semibold">
          <FaUserCircle className="mr-2" /> Thông tin cá nhân
        </li>
        <li className="flex items-center text-green-700 cursor-pointer hover:text-green-500">
          <FaMoneyBill className="mr-2" /> Danh sách voucher
        </li>
        <li className="flex items-center text-green-700 cursor-pointer hover:text-green-500">
          <FaClipboardList className="mr-2" /> Danh sách đơn hàng
        </li>
        <li className="flex items-center text-green-700 cursor-pointer hover:text-green-500">
          <FaStar className="mr-2" /> Hạng thành viên
        </li>
        <li className="flex items-center text-green-700 cursor-pointer hover:text-green-500">
          <FaEnvelope className="mr-2" /> Gửi Ý Kiến Cho Comem
        </li>
        <li
          className="flex items-center text-green-700 cursor-pointer hover:text-red-500"
          onClick={showLogoutModal} // Hiển thị modal xác nhận
        >
          <FaSignOutAlt className="mr-2" /> Đăng xuất
        </li>
      </ul>

     
      <Modal
        title="Xác nhận đăng xuất"
        open={isModalOpen}
        onOk={handleConfirmLogout}
        onCancel={handleCancel}
        okText="Đăng xuất"
        cancelText="Hủy"
        okButtonProps={{ danger: true }} 
      >
        <p>Bạn có chắc chắn muốn đăng xuất không?</p>
      </Modal>
    </div>
  );
};

export default UserMenu;
