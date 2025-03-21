const fs = require("fs");
const path = require("path");

exports.getProducts = (req, res) => {
  const filePath = path.join(__dirname, "../data/product.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi đọc dữ liệu" });
    }
    try {
      const products = JSON.parse(data);
      res.json(products);
    } catch (parseError) {
      return res.status(500).json({ error: "Lỗi parse JSON", details: parseError.message });
    }
  });
};

exports.getProductById = (req, res) => {
  const filePath = path.join(__dirname, "../data/product.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi đọc dữ liệu" });
    }
    try {
      const products = JSON.parse(data);
      // Chuyển req.params.id sang Number nếu id được lưu dưới dạng số
      const product = products.find((p) => p.id === Number(req.params.id));
      if (!product) {
        return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
      }
      res.json(product);
    } catch (parseError) {
      return res.status(500).json({ error: "Lỗi parse JSON", details: parseError.message });
    }
  });
};

exports.getNewProducts = (req, res) => {
  const filePath = path.join(__dirname, "../data/product.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi đọc dữ liệu" });
    }
    try {
      const products = JSON.parse(data);
      const newProducts = products.filter((p) => p.isNew);
      res.json(newProducts);
    } catch (parseError) {
      return res.status(500).json({ error: "Lỗi parse JSON", details: parseError.message });
    }
  });
};

exports.getBestSellingProducts = (req, res) => {
  const filePath = path.join(__dirname, "../data/product.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi đọc dữ liệu", details: err.message });
    }
    try {
      const products = JSON.parse(data);
      if (!Array.isArray(products)) {
        return res.status(500).json({ error: "Dữ liệu không hợp lệ, không phải là mảng" });
      }
      const bestSellingProducts = products
        .filter((p) => typeof p.soldQuantity === "number" && p.soldQuantity > 100)
        .slice(0, 8);
      res.json(bestSellingProducts);
    } catch (parseError) {
      return res.status(500).json({ error: "Lỗi parse JSON", details: parseError.message });
    }
  });
};
