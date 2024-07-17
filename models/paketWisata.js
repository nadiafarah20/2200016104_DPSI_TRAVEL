const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const paketWisataSchema = new mongoose.Schema({
    paketWisata_id: { type: Number, unique: true }, // Auto-incremented field
    nama_destinasi: { type: String, required: true },
    deskripsi: { type: String, required: true },
    harga: { type: Number, required: true },
    fasilitas: { type: String, required: true }
});

// Add auto-incrementing field for paketwisata_id
paketWisataSchema.plugin(AutoIncrement, { inc_field: 'paketwisata_id' });

const PaketWisata = mongoose.model('PaketWisata', paketWisataSchema);

module.exports = PaketWisata;
