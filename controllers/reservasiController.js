const Reservasi = require('../models/reservasi');
const Pelanggan = require('../models/pelanggan');
const PaketWisata = require('../models/paketWisata');

// Get all Reservasi (User and Admin)
exports.getAllReservasi = async (req, res) => {
    try {
        const reservasi = await Reservasi.find().populate('id_pelanggan').populate('id_paketWisata');
        res.json(reservasi);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get Reservasi by auto-increment ID (User and Admin)
exports.getReservasiByAutoIncrementId = async (req, res) => {
    try {
        const reservasi = await Reservasi.findOne({ reservasi_id: req.params.id })
            .populate('id_pelanggan')
            .populate('id_paketWisata');
        if (!reservasi) {
            return res.status(404).json({ msg: 'Reservasi not found' });
        }
        res.json(reservasi);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Create new Reservasi (User)
exports.createReservasi = async (req, res) => {
    try {
        const { id_pelanggan, id_paketWisata, tgl_keberangkatan, jumlah_orang, status_pembayaran } = req.body;

        // Find pelanggan and paketWisata by auto-increment ID
        const pelanggan = await Pelanggan.findOne({ pelanggan_id: id_pelanggan });
        const paketWisata = await PaketWisata.findOne({ paketWisata_id: id_paketWisata });

        if (!pelanggan) {
            return res.status(404).json({ msg: 'Pelanggan not found' });
        }
        if (!paketWisata) {
            return res.status(404).json({ msg: 'Paket Wisata not found' });
        }

        const newReservasi = new Reservasi({
            id_pelanggan: pelanggan._id,
            id_paketWisata: paketWisata._id,
            tgl_keberangkatan,
            jumlah_orang,
            status_pembayaran
        });

        const reservasi = await newReservasi.save();
        res.json(reservasi);
    } catch (err) {
        console.error(`Error creating reservasi: ${err.message}`);
        res.status(500).send('Server Error');
    }
};

// Update Reservasi (Admin only)
exports.updateReservasi = async (req, res) => {
    try {
        const { id_pelanggan, id_paketWisata, tgl_keberangkatan, jumlah_orang, status_pembayaran } = req.body;

        // Find pelanggan and paketWisata by auto-increment ID
        const pelanggan = await Pelanggan.findOne({ pelanggan_id: id_pelanggan });
        const paketWisata = await PaketWisata.findOne({ paketWisata_id: id_paketWisata });

        if (!pelanggan) {
            return res.status(404).json({ msg: 'Pelanggan not found' });
        }
        if (!paketWisata) {
            return res.status(404).json({ msg: 'Paket Wisata not found' });
        }

        const filter = { reservasi_id: req.params.id };
        const updateFields = {
            id_pelanggan: pelanggan._id,
            id_paketWisata: paketWisata._id,
            tgl_keberangkatan,
            jumlah_orang,
            status_pembayaran
        };

        const reservasi = await Reservasi.findOneAndUpdate(filter, updateFields, { new: true });
        res.json(reservasi);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// Delete Reservasi (Admin only)
exports.deleteReservasi = async (req, res) => {
    try {
        const filter = { reservasi_id: req.params.id };
        await Reservasi.findOneAndDelete(filter);
        res.json({ msg: 'Reservasi deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

