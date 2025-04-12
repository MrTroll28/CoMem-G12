const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} = require("../controllers/ordersController");

// Route GET danh sách đơn hàng
router.get("/", getOrders);

// Route GET chi tiết đơn hàng theo ID
router.get("/:id", getOrderById);

// Route POST tạo đơn hàng mới
router.post("/", createOrder);

// Route PUT cập nhật trạng thái đơn hàng
router.put("/:id/status", updateOrderStatus);

module.exports = router;