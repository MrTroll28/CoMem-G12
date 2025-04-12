const express = require('express');
const router = express.Router();

const vouchers = require('../data/voucher.json');


router.get('/', (req, res) => {
    res.json(vouchers);
});

module.exports = router;
