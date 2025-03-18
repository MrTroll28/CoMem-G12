const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const filePath = path.join(__dirname, "../data/user.json");

// lấy danh sách người dùng
exports.getUsers = (req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Lỗi đọc dữ liệu" });
        }
        const users = JSON.parse(data || "[]");
        res.json(users);
    });
};

//  đăng ký người dùng
exports.addUser = (req, res) => {
    const { fullName, phone, email, password } = req.body;

    if (!fullName || !phone || !email || !password) {
        return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ thông tin." });
    }

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Lỗi đọc dữ liệu" });
        }

        let users = JSON.parse(data || "[]");

        if (users.some(user => user.email === email)) {
            return res.status(400).json({ success: false, message: "Email đã tồn tại." });
        }

        const newUser = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            fullName,
            phone,
            email,
            password
        };

        users.push(newUser);

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Lỗi lưu dữ liệu" });
            }
            res.status(201).json({ success: true, message: "Đăng ký thành công!", user: newUser });
        });
    });
};

// lấy thông tin đăng nhập
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Vui lòng nhập email và mật khẩu." });
    }

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Lỗi đọc dữ liệu" });
        }

        const users = JSON.parse(data || "[]");
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            return res.status(401).json({ success: false, message: "Email hoặc mật khẩu không đúng." });
        }

        res.json({ success: true, message: "Đăng nhập thành công!", user });
    });
};

// quên mk

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pharmahome.help@gmail.com", 
      pass: "cxtl ydcr pidu nugy", 
    },
  });
  
  // Lưu trữ mã xác nhận tạm thời


  //gửi mã xn email
  let verificationCodes = {};
  
  exports.sendVerificationCode = (req, res) => {
    const { email } = req.body;
  
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Lỗi đọc dữ liệu" });
      }
  
      const users = JSON.parse(data || "[]");
      const user = users.find((u) => u.email === email);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "Email không tồn tại." });
      }
  
     
      const code = Math.floor(100000 + Math.random() * 900000);
      verificationCodes[email] = code;
  
     
      const mailOptions = {
        from: "Nhan dui de",
        to: email,
        subject: "Mã xác nhận khôi phục mật khẩu",
        text: `Mã xác nhận của bạn là: ${code}`,
      };
  
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          return res.status(500).json({ success: false, message: "Lỗi gửi email" });
        }
        res.json({ success: true, message: "Mã xác nhận đã được gửi." });
      });
    });
  };


  // match mxn
  exports.verifyCode = (req, res) => {
    const { email, code } = req.body;
  
    if (verificationCodes[email] && verificationCodes[email] === parseInt(code)) {
      res.json({ success: true, message: "Mã xác nhận hợp lệ!" });
    } else {
      res.status(400).json({ success: false, message: "Mã xác nhận không đúng." });
    }
  };


  // cập nhật mk mới 

  exports.resetPassword = (req, res) => {
    const { email, newPassword } = req.body;
  
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Lỗi đọc dữ liệu" });
      }
  
      let users = JSON.parse(data || "[]");
      const userIndex = users.findIndex((u) => u.email === email);
  
      if (userIndex === -1) {
        return res.status(404).json({ success: false, message: "Email không tồn tại." });
      }
  
      users[userIndex].password = newPassword; // Cập nhật mật khẩu mới
  
      fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ success: false, message: "Lỗi lưu dữ liệu" });
        }
  
        // Xóa mã xác nhận sau khi đặt lại mật khẩu
        delete verificationCodes[email];
  
        res.json({ success: true, message: "Mật khẩu đã được đặt lại thành công!" });
      });
    });
  };
