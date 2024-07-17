const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const pembayaranSchema = new mongoose.Schema({
    pembayaran_id: { type: Number, unique: true }, // Auto-incremented field
    id_reservasi: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservasi', required: true },
    id_metodePembayaran: { type: mongoose.Schema.Types.ObjectId, ref: 'MetodePembayaran', required: true },
    nominal_pembayaran: { type: Number, required: true },
    status_pembayaran: { type: String, required: true },
    tanggal_pembayaran: { type: Date, default: Date.now }
});

// Add auto-incrementing field for pelanggan_id
pembayaranSchema.plugin(AutoIncrement, { inc_field: 'pembayaran_id' });

const Pembayaran = mongoose.model('Pembayaran', pembayaranSchema);

module.exports = Pembayaran;
