const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://nguyenoke123:IQa5djRcBGdjw7uc@cluster0.q6xo4nm.mongodb.net/g12?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Dừng server nếu kết nối thất bại
  }
};

module.exports = connectDB;
