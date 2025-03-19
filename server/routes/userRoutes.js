const express = require("express");
const { getUsers, addUser, loginUser, sendVerificationCode, verifyCode, resetPassword } = require("../controllers/userController"); 

const router = express.Router();

router.get("/", getUsers); 
router.post("/", addUser); 
router.post("/login", loginUser); 
router.post("/forgot-password", sendVerificationCode);
router.post("/verify-code", verifyCode);
router.post("/reset-password", resetPassword);

module.exports = router;
