const express = require("express");
const router = express.Router();
const { getMenuItems } = require("../controllers/menuController");
const { getProducts } = require("../controllers/productController");

// Route GET menu
router.get("/menu", getMenuItems);

// Route GET products
router.get("/products", getProducts);

module.exports = router;
