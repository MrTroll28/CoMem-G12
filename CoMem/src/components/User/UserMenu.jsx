import { useState, useContext } from 'react';
import { Modal } from 'antd';
import { 
  FaUserCircle, FaMoneyBill, FaClipboardList, 
  FaStar, FaEnvelope, FaSignOutAlt 
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom'; // Thêm useLocation
import { UserContext } from '../../context/UserContext';

const UserMenu = () => {
  const { currentUser, handleLogout } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin URL hiện tại

  const showLogoutModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    handleLogout();
    navigate("/");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Danh sách các mục menu với đường dẫn tương ứng
  const menuItems = [
    { path: '/infouser', label: 'Thông tin cá nhân', icon: <FaUserCircle className="mr-2" /> },
    { path: '/vouchers', label: 'Danh sách voucher', icon: <FaMoneyBill className="mr-2" /> },
    { path: '/orders', label: 'Danh sách đơn hàng', icon: <FaClipboardList className="mr-2" /> },
    { path: '/membership', label: 'Hạng thành viên', icon: <FaStar className="mr-2" /> },
    { path: '/feedback', label: 'Gửi Ý Kiến Cho Comem', icon: <FaEnvelope className="mr-2" /> },
  ];

  return (
    <div className="border border-[rgb(121,237,129)] rounded-lg p-5 shadow-md w-64 bg-white">
      <p className="text-gray-600">Xin chào,</p>
      <h2 className="text-lg font-bold text-green-700">
        {currentUser ? currentUser.fullName : "Người dùng"}
      </h2>
      <hr className="my-2 border-[rgb(121,237,129)]" />
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={`flex items-center cursor-pointer transition-colors ${
              location.pathname === item.path
                ? 'bg-green-500 text-white'
                : 'text-green-700 hover:text-green-500'
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {item.label}
          </li>
        ))}
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