const express = require("express");
const cors = require("cors");
const menuRoutes = require("./routes/menuRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
