import { useState, useContext } from 'react';
import { Modal } from 'antd';
import { 
  FaUserCircle, FaMoneyBill, FaClipboardList, 
  FaStar, FaEnvelope, FaSignOutAlt 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'; // Import UserContext

const UserMenu = () => {
  const { currentUser, handleLogout } = useContext(UserContext); // Lấy user từ context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const showLogoutModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    handleLogout(); // Gọi hàm logout từ context
    navigate("/"); 
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="border border-[rgb(121,237,129)] rounded-lg p-5 shadow-md w-64 bg-white">
      <p className="text-gray-600">Xin chào,</p>
      <h2 className="text-lg font-bold text-green-700">
        {currentUser ? currentUser.fullName : "Người dùng"}
      </h2>
      <hr className="my-2 border-[rgb(121,237,129)]" />
      <ul className="space-y-4">
        <li 
          className="flex items-center text-green-700 cursor-pointer hover:text-green-500"
          onClick={() => navigate('/infouser')} 
        >
          <FaUserCircle className="mr-2" /> Thông tin cá nhân
        </li>
        <li 
          className="flex items-center text-green-700 cursor-pointer hover:text-green-500"
          onClick={() => navigate('/vouchers')} 
        >
          <FaMoneyBill className="mr-2" /> Danh sách voucher
        </li>
        <li 
          className="flex items-center text-green-700 cursor-pointer hover:text-green-500"
          onClick={() => navigate('/orders')} 
        >
          <FaClipboardList className="mr-2" /> Danh sách đơn hàng
        </li>
        <li 
          className="flex items-center text-green-700 cursor-pointer hover:text-green-500"
          onClick={() => navigate('/membership')} 
        >
          <FaStar className="mr-2" /> Hạng thành viên
        </li>
        <li 
          className="flex items-center text-green-700 cursor-pointer hover:text-green-500"
          onClick={() => navigate('/feedback')} 
        >
          <FaEnvelope className="mr-2" /> Gửi Ý Kiến Cho Comem
        </li>
        <li
          className="flex items-center text-green-700 cursor-pointer hover:text-red-500"
          onClick={showLogoutModal} 
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
