const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const reservasiSchema = new mongoose.Schema({
    reservasi_id: { type: Number, unique: true }, // Auto-incremented field
    id_pelanggan: { type: mongoose.Schema.Types.ObjectId, ref: 'Pelanggan', required: true },
    paketWisata_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PaketWisata', required: true },
    tgl_keberangkatan: { type: Date, required: true },
    jumlah_orang: { type: Number, required: true },
    status_pembayaran: { type: String, required: true }
});

reservasiSchema.plugin(AutoIncrement, { inc_field: 'reservasi_id' });

const Reservasi = mongoose.model('Reservasi', reservasiSchema);

module.exports = Reservasi;
