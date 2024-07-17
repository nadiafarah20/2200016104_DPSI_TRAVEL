const express = require('express');
const connectDB = require('./config/db');

const pelangganRoutes = require('./routes/pelanggan');
const paketWisataRoutes = require('./routes/paketWisata');
const metodePembayaranRoutes = require('./routes/metodePembayaran');
const reservasiRoutes = require('./routes/reservasi');
const pembayaranRoutes = require('./routes/pembayaran');
const userRoutes = require('./routes/userRoutes'); 

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/pelanggan', pelangganRoutes);
app.use('/api/paketWisata', paketWisataRoutes);
app.use('/api/metodePembayaran', metodePembayaranRoutes);
app.use('/api/reservasi', reservasiRoutes);
app.use('/api/pembayaran', pembayaranRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


module.exports = app;
