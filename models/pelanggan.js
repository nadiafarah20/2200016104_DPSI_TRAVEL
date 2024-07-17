const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const pelangganSchema = new mongoose.Schema({
    pelanggan_id: { type: Number, unique: true }, // Auto-incremented field
    nama: { type: String, required: true },
    alamat: { type: String, required: true },
    kontak: { type: String, required: true },
    email: { type: String, required: true }
});

// Add auto-incrementing field for pelanggan_id
pelangganSchema.plugin(AutoIncrement, { inc_field: 'pelanggan_id' });

const Pelanggan = mongoose.model('Pelanggan', pelangganSchema);

module.exports = Pelanggan;
