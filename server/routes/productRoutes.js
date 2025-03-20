const express = require("express");
const router = express.Router();
const { getProducts } = require("../controllers/productController");
const { getProductById } = require("../controllers/productController");
const { getNewProducts } = require("../controllers/productController");
const { getBestSellingProducts } = require("../controllers/productController");

// Route GET product
router.get("/", getProducts);
router.get("/new", getNewProducts);
router.get("/best-selling", getBestSellingProducts);
router.get("/:id", getProductById);

module.exports = router;
