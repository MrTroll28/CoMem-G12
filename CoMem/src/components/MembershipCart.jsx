import React, { useContext } from "react";
import { UserContext } from "../context/UserContext"; // Import UserContext
import { Typography } from "antd";

const { Text } = Typography;

const MembershipCard = () => {
  const { currentUser } = useContext(UserContext); // Lấy currentUser từ context

  
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-100">
        <div className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white max-w-md ml-40">
          <Text type="danger">Vui lòng đăng nhập để xem thông tin thành viên.</Text>
        </div>
      </div>
    );
  }

 
  const { fullName, phone, points = 123, membershipLevel = "Hạng Bạc" } = currentUser;

  return (
    <div className="flex justify-center items-center h-100">
      <div className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white max-w-md ml-40">
        <h3 className="text-lg font-semibold text-gray-600">Hạng thành viên</h3>
        <div className="mt-2">
          <p className="text-gray-700">
            <span className="font-semibold">Tên KH:</span>{" "}
            <span className="font-bold">{fullName || "Chưa có thông tin"}</span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">SDT:</span> {phone || "Chưa có thông tin"}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Điểm:</span> {points} điểm
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Hạng thành viên:</span>{" "}
            <span className="font-bold">{membershipLevel}</span>
          </p>
          <div className="w-full bg-gray-200 h-2 rounded mt-2">
            <div className="bg-gray-400 h-2 rounded" style={{ width: `${Math.min((points / 1000) * 100, 100)}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;