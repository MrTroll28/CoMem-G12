import React from "react";
import Info from "./User/Info";
import UserMenu from "./User/UserMenu";

const MembershipCard = () => {
  return (
    <div className="flex justify-center items-center h-100"> 
            <UserMenu/>
            <div className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white max-w-md ml-40">
      <h3 className="text-lg font-semibold text-gray-600">Hạng thành viên</h3>
      <div className="mt-2">
        <p className="text-gray-700">
          <span className="font-semibold">Tên KH:</span> <span className="font-bold">Tran Viet Nhan</span>
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">SDT:</span> 0818831546
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Sinh nhật:</span> <span className="text-blue-500">[Nhập ngày sinh để nhận ưu đãi]</span>
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Điểm:</span> 0 điểm
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Hạng thành viên:</span> <span className="font-bold">Hạng Bạc</span>
        </p>
        <div className="w-full bg-gray-200 h-2 rounded mt-2">
          <div className="bg-gray-400 h-2 rounded" style={{ width: "10%" }}></div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MembershipCard;
