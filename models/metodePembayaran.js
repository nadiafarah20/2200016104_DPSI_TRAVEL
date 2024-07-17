const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const metodePembayaranSchema = new mongoose.Schema({
    metodePembayaran_id: { type: Number, unique: true }, // Auto-incremented field
    nama_metode: { type: String, required: true },
    provider: { type: String, required: true },
    status: { type: String, enum: ['aktif', 'tidak aktif'], required: true, default: 'active' }
});

// Add auto-incrementing field for metodePembayaran_id
metodePembayaranSchema.plugin(AutoIncrement, { inc_field: 'metodePembayaran_id' });

const MetodePembayaran = mongoose.model('MetodePembayaran', metodePembayaranSchema);

module.exports = MetodePembayaran;
