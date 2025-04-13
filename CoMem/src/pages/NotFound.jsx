import React from "react";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border border-gray-200 p-6 rounded-lg shadow-sm bg-white max-w-md text-center">
        <ExclamationCircleOutlined style={{ fontSize: "64px", color: "#ff4d4f" }} />
        <Title level={2} className="mt-4 text-gray-800">
          404 - Trang không tìm thấy
        </Title>
        <Text className="text-gray-600">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </Text>
        <div className="mt-6">
          <Button type="primary" size="large">
            <Link to="/">Quay lại Trang chủ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;