const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucherController');

// Sử dụng controller để xử lý request
router.use('/', voucherController);

module.exports = router;
