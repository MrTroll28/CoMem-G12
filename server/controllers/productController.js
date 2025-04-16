const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu sản phẩm', details: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: Number(req.params.id) });
    if (!product) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi tìm sản phẩm theo ID', details: err.message });
  }
};

exports.getNewProducts = async (req, res) => {
  try {
    const newProducts = await Product.find({ isNew: true });
    res.json(newProducts);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy sản phẩm mới', details: err.message });
  }
};

exports.getBestSellingProducts = async (req, res) => {
  try {
    const bestSellingProducts = await Product.find({ soldQuantity: { $gt: 100 } }).limit(8);
    res.json(bestSellingProducts);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy sản phẩm bán chạy', details: err.message });
  }
};

exports.getClothingProducts = async (req, res) => {
  try {
    const clothing = await Product.find({ category: 'Clothing' });
    res.json(clothing);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy sản phẩm thời trang', details: err.message });
  }
};

exports.getAccessoriesProducts = async (req, res) => {
  try {
    const accessories = await Product.find({ category: 'Accessories' });
    res.json(accessories);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy phụ kiện', details: err.message });
  }
};
