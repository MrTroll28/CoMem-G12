const express = require("express");
const router = express.Router();
const { getProducts } = require("../controllers/productController");

// Route GET product
router.get("/", getProducts);

module.exports = router;
