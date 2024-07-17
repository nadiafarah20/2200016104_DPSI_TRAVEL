const Pembayaran = require('../models/pembayaran');
const Reservasi = require('../models/reservasi');
const MetodePembayaran = require('../models/metodePembayaran');

// Get all Pembayaran (Admin only)
exports.getAllPembayaran = async (req, res) => {
    try {
        const pembayaran = await Pembayaran.find().populate('id_reservasi').populate('id_metodePembayaran');
        res.json(pembayaran);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get Pembayaran by auto-increment ID (User and Admin)
exports.getPembayaranByAutoIncrementId = async (req, res) => {
    try {
        const pembayaran = await Pembayaran.findOne({ pembayaran_id: req.params.id }).populate('id_reservasi').populate('id_metodePembayaran');
        if (!pembayaran) {
            return res.status(404).json({ msg: 'Pembayaran not found' });
        }
        res.json(pembayaran);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Create new Pembayaran
exports.createPembayaran = async (req, res) => {
    try {
        const { id_reservasi, id_metodePembayaran, nominal_pembayaran, status_pembayaran } = req.body;

        // Find reservasi and metodePembayaran by auto-increment ID
        const reservasi = await Reservasi.findOne({ reservasi_id: id_reservasi });
        const metodePembayaran = await MetodePembayaran.findOne({ metodePembayaran_id: id_metodePembayaran });

        if (!reservasi) {
            return res.status(404).json({ msg: 'Reservasi not found' });
        }
        if (!metodePembayaran) {
            return res.status(404).json({ msg: 'Metode Pembayaran not found' });
        }

        const newPembayaran = new Pembayaran({
            id_reservasi: reservasi._id,
            id_metodePembayaran: metodePembayaran._id,
            nominal_pembayaran,
            status_pembayaran
        });

        const pembayaran = await newPembayaran.save();
        res.json(pembayaran);
    } catch (err) {
        console.error(`Error creating pembayaran: ${err.message}`);
        res.status(500).send('Server Error');
    }
};

// Update Pembayaran (Admin only)
exports.updatePembayaran = async (req, res) => {
    try {
        const pembayaran = await Pembayaran.findOneAndUpdate(
            { pembayaran_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!pembayaran) {
            return res.status(404).json({ msg: 'Pembayaran not found' });
        }
        res.json(pembayaran);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete Pembayaran (Admin only)
exports.deletePembayaran = async (req, res) => {
    try {
        const pembayaran = await Pembayaran.findOneAndDelete({ pembayaran_id: req.params.id });
        if (!pembayaran) {
            return res.status(404).json({ msg: 'Pembayaran not found' });
        }
        res.json({ msg: 'Pembayaran deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
