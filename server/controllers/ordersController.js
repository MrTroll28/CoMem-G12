const fs = require("fs");
const path = require("path");

const ordersFilePath = path.join(__dirname, "../data/orders.json");
const productsFilePath = path.join(__dirname, "../data/product.json");
const usersFilePath = path.join(__dirname, "../data/user.json");

// Đảm bảo file orders.json tồn tại, nếu không thì tạo file rỗng
const initializeOrdersFile = () => {
  if (!fs.existsSync(ordersFilePath)) {
    fs.writeFileSync(ordersFilePath, JSON.stringify([], null, 2));
  }
};

// Lấy danh sách tất cả đơn hàng
exports.getOrders = (req, res) => {
  initializeOrdersFile();
  fs.readFile(ordersFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi đọc dữ liệu" });
    }
    try {
      const orders = JSON.parse(data);
      res.json(orders);
    } catch (parseError) {
      return res.status(500).json({ error: "Lỗi parse JSON", details: parseError.message });
    }
  });
};

// Lấy đơn hàng theo ID
exports.getOrderById = (req, res) => {
  initializeOrdersFile();
  fs.readFile(ordersFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi đọc dữ liệu" });
    }
    try {
      const orders = JSON.parse(data);
      const order = orders.find((o) => o.orderId === req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Không tìm thấy đơn hàng" });
      }
      res.json(order);
    } catch (parseError) {
      return res.status(500).json({ error: "Lỗi parse JSON", details: parseError.message });
    }
  });
};

// Tạo đơn hàng mới
exports.createOrder = (req, res) => {
  const { userId, products, voucherId } = req.body;

  if (!userId || !products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: "Vui lòng cung cấp userId và danh sách sản phẩm" });
  }

  initializeOrdersFile();

  // Đọc file users.json và products.json
  fs.readFile(usersFilePath, "utf8", (err, userData) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi đọc dữ liệu người dùng" });
    }
    fs.readFile(productsFilePath, "utf8", (err, productData) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi đọc dữ liệu sản phẩm" });
      }
      try {
        const users = JSON.parse(userData);
        const productsList = JSON.parse(productData);
        const orders = JSON.parse(fs.readFileSync(ordersFilePath, "utf8"));

        // Kiểm tra userId
        const user = users.find((u) => u.id == userId);
        if (!user) {
          return res.status(404).json({ error: "Không tìm thấy người dùng" });
        }

        // Kiểm tra sản phẩm và tính tổng tiền
        let totalAmount = 0;
        const orderProducts = products.map((item) => {
          const product = productsList.find((p) => p.id === item.productId);
          if (!product) {
            throw new Error(`Sản phẩm với ID ${item.productId} không tồn tại`);
          }
          if (!item.quantity || item.quantity <= 0) {
            throw new Error(`Số lượng sản phẩm ${product.name} không hợp lệ`);
          }
          const subtotal = product.priceNow * item.quantity;
          totalAmount += subtotal;
          return {
            productId: product.id,
            name: product.name,
            priceNow: product.priceNow,
            quantity: item.quantity,
            subtotal,
            image: product.image,
          };
        });

        // Tạo đơn hàng mới
        const newOrder = {
          orderId: `ORD${String(orders.length + 1).padStart(3, "0")}`,
          user: {
            id: user.id,
            fullName: user.fullName,
            phone: user.phone,
            email: user.email,
          },
          products: orderProducts,
          totalAmount,
          orderDate: new Date().toISOString().split("T")[0],
          status: "pending",
        };

        // Lưu đơn hàng vào file
        orders.push(newOrder);
        fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (err) => {
          if (err) {
            return res.status(500).json({ error: "Lỗi lưu dữ liệu đơn hàng" });
          }
          res.status(201).json({ success: true, message: "Tạo đơn hàng thành công", order: newOrder });
        });
      } catch (error) {
        return res.status(400).json({ error: "Lỗi xử lý đơn hàng", details: error.message });
      }
    });
  });
};

// Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = (req, res) => {
  const { status } = req.body;
  const validStatuses = ["pending", "shipped", "delivered", "cancelled"];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: "Trạng thái không hợp lệ" });
  }

  initializeOrdersFile();
  fs.readFile(ordersFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi đọc dữ liệu" });
    }
    try {
      const orders = JSON.parse(data);
      const orderIndex = orders.findIndex((o) => o.orderId === req.params.id);
      if (orderIndex === -1) {
        return res.status(404).json({ error: "Không tìm thấy đơn hàng" });
      }

      orders[orderIndex].status = status;
      fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: "Lỗi lưu dữ liệu" });
        }
        res.json({ success: true, message: "Cập nhật trạng thái thành công", order: orders[orderIndex] });
      });
    } catch (parseError) {
      return res.status(500).json({ error: "Lỗi parse JSON", details: parseError.message });
    }
  });
};