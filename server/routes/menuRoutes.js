const express = require("express");
const router = express.Router();
const { getMenuItems } = require("../controllers/menuController");

// Route GET menu
router.get("/menu", getMenuItems);

module.exports = router;
