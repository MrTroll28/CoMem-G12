import React, { useState, useEffect } from "react";
import { Collapse, Card, Row, Col, Image, Typography } from "antd";

const { Title, Text } = Typography;

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  // Lấy dữ liệu đơn hàng từ API và lọc theo user
  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("currentUser"));

      if (!user?.id) {
        setOrders([]);
        setError("Vui lòng đăng nhập để xem đơn hàng.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/orders");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const userOrders = Array.isArray(data)
          ? data.filter((order) => order.user.id == user.id)
          : [];
        setOrders(userOrders);
        setError(null);
      } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error);
        setOrders([]);
        setError("Không thể tải đơn hàng. Vui lòng thử lại sau.");
      }
    };
    fetchOrders();
  }, []);

  const formatCurrency = (amount) => {
    return `${amount.toFixed(2)} USD`;
  };

  const getStatusText = (status) => {
    switch (status) {
      case "delivered":
        return "Đã nhận";
      case "shipped":
        return "Đang giao";
      case "pending":
        return "Đang xử lý";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const collapseItems = orders.map((order) => ({
    key: order.orderId,
    label: (
      <Row
        justify="space-between"
        align="middle"
        style={{
          width: "700px",
          padding: "0 16px",
        }}
      >
        <Col xs={24} sm={8}>
          <Text strong>Mã đơn hàng: {order.orderId}</Text>
        </Col>
        <Col xs={24} sm={8} style={{ textAlign: "center" }}>
          <Text>Trạng thái: {getStatusText(order.status)}</Text>
        </Col>
        <Col xs={24} sm={8} style={{ textAlign: "right" }}>
          <Text strong>Tổng tiền: {formatCurrency(order.totalAmount)}</Text>
        </Col>
      </Row>
    ),
    children: (
      <Card
        style={{
          maxHeight: "450px",
          overflowY: "auto",
          padding: "16px",
        }}
      >
        <Title level={4}>Chi tiết đơn hàng</Title>
        <Text>Ngày đặt hàng: {order.orderDate}</Text>
        <br />
        <Text>
          Khách hàng: {order.user.fullName} ({order.user.email})
        </Text>
        <br />
        <br />
        <Title level={5}>Sản phẩm</Title>
        {order.products.map((product) => (
          <Row
            key={product.productId}
            gutter={[16, 16]}
            style={{ marginBottom: "16px", alignItems: "center" }}
          >
            <Col span={4}>
              <Image
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                style={{ objectFit: "cover" }}
                preview={false}
              />
            </Col>
            <Col span={10}>
              <Text strong>{product.name}</Text>
            </Col>
            <Col span={4}>
              <Text>Giá: {formatCurrency(product.priceNow)}</Text>
            </Col>
            <Col span={3}>
              <Text>Số lượng: {product.quantity}</Text>
            </Col>
            <Col span={3}>
              <Text strong>Tổng phụ: {formatCurrency(product.subtotal)}</Text>
            </Col>
          </Row>
        ))}
      </Card>
    ),
  }));

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Danh sách đơn hàng</Title>
      {error && <Text type="danger">{error}</Text>}
      {orders.length === 0 ? (
        <Text>Chưa có đơn hàng nào.</Text>
      ) : (
        <Collapse accordion items={collapseItems} />
      )}
    </div>
  );
};

export default OrdersTable;