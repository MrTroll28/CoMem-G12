const fs = require("fs");
const path = require("path");

exports.getMenuItems = (req, res) => {
  const filePath = path.join(__dirname, "../data/menuItems.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi đọc dữ liệu" });
    }
    res.json(JSON.parse(data));
  });
};
