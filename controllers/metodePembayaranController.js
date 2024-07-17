const MetodePembayaran = require('../models/metodePembayaran');

// Get all MetodePembayaran (User and Admin)
exports.getAllMetodePembayaran = async (req, res) => {
    try {
        const metodePembayaran = await MetodePembayaran.find();
        res.json(metodePembayaran);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get MetodePembayaran by auto-increment ID (User and Admin)
exports.getMetodePembayaranByAutoIncrementId = async (req, res) => {
    try {
        const metodePembayaran = await MetodePembayaran.findOne({ metodePembayaran_id: req.params.id });
        if (!metodePembayaran) {
            return res.status(404).json({ msg: 'Metode Pembayaran not found' });
        }
        res.json(metodePembayaran);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Create new MetodePembayaran (User)
exports.createMetodePembayaran = async (req, res) => {
    try {
        const { nama_metode, provider, status } = req.body;
        const newMetodePembayaran = new MetodePembayaran({
            nama_metode,
            provider,
            status
        });
        const metodePembayaran = await newMetodePembayaran.save();
        res.json(metodePembayaran);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update MetodePembayaran (Admin only)
exports.updateMetodePembayaran = async (req, res) => {
    try {
        const { nama_metode, provider, status } = req.body;
        const metodePembayaran = await MetodePembayaran.findOneAndUpdate(
            { metodePembayaran_id: req.params.id },
            { nama_metode, provider, status },
            { new: true }
        );
        if (!metodePembayaran) {
            return res.status(404).json({ msg: 'Metode Pembayaran not found' });
        }
        res.json(metodePembayaran);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete MetodePembayaran (Admin only)
exports.deleteMetodePembayaran = async (req, res) => {
    try {
        const metodePembayaran = await MetodePembayaran.findOneAndDelete({ metodePembayaran_id: req.params.id });
        if (!metodePembayaran) {
            return res.status(404).json({ msg: 'Metode Pembayaran not found' });
        }
        res.json({ msg: 'Metode Pembayaran deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

