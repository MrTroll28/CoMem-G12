import React, { useEffect, useState } from "react";
import { Button, Divider, Table } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserMenu from "../components/User/UserMenu";
import { Link, useNavigate } from "react-router-dom";

const Voucher = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true;
    
    fetch("http://localhost:5000/api/vouchers")
      .then((response) => response.json())
      .then((data) => {
        console.log("Dữ liệu nhận được từ API:", data);
        if (isMounted) {
          if (Array.isArray(data)) {
            setData(data);
          } else if (data?.vouchers && Array.isArray(data.vouchers)) {
            setData(data.vouchers);
          } else {
            console.error("API trả về dữ liệu không hợp lệ:", data);
            setData([]);
          }
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        setData([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  console.log("Dữ liệu vouchers:", data);

  const columns = [
    { title: "Mã Voucher", dataIndex: "id", key: "id" },
    { title: "Tên Voucher", dataIndex: "name", key: "name" },
    { title: "Giảm Giá", dataIndex: "discount", key: "discount" },
    { title: "Loại Giảm Giá", dataIndex: "discount_type", key: "discount_type" },
    { title: "Giá Trị Đơn Tối Thiểu", dataIndex: "min_order_value", key: "min_order_value" },
    { title: "Ngày Bắt Đầu", dataIndex: "start_date", key: "start_date" },
    { title: "Ngày Kết Thúc", dataIndex: "end_date", key: "end_date" },
    {
      title: "Sử dụng",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleUseVoucher(record)}>
          Sử dụng
        </Button>
      ),
    },
  ];

  const handleUseVoucher = (voucher) => {
    console.log("Voucher được chọn:", voucher);
   navigate("/cart")
  };

  return (
    <div>
      
      <div className="h-[500px] flex items-center justify-start px-6">
        <div className="ml-40">
          <UserMenu />
        </div>
        <div className="ml-20">
          <Divider>Bảng Voucher</Divider>
          <Table columns={columns} dataSource={data} size="small" rowKey="id" />
        </div>
      </div>
      
    </div>
  );
};

export default Voucher;
