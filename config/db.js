const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
try {
    await mongoose.connect(MONGODB_URI); // Hapus opsi yang didepresiasi
    console.log('MongoDB Connected');
} catch (error) {
    console.error('Connection error:', error.message);
    process.exit(1);
}
};

module.exports = connectDB;
