const fs = require("fs");
const path = require("path");

exports.getProducts = (req, res) => {
  const filePath = path.join(__dirname, "../data/product.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi đọc dữ liệu" });
    }
    res.json(JSON.parse(data));
  });
};