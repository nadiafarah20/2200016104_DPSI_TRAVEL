const Pelanggan = require('../models/pelanggan');

// Get all Pelanggan (Admin only)
exports.getAllPelanggan = async (req, res) => {
    try {
        const pelanggan = await Pelanggan.find();
        res.json(pelanggan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get Pelanggan by auto-increment ID (User and Admin)
exports.getPelangganByAutoIncrementId = async (req, res) => {
    try {
        const pelanggan = await Pelanggan.findOne({ pelanggan_id: req.params.id });
        if (!pelanggan) {
            return res.status(404).json({ msg: 'Pelanggan not found' });
        }
        res.json(pelanggan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Create new Pelanggan (User)
exports.createPelanggan = async (req, res) => {
    try {
        const newPelanggan = new Pelanggan(req.body);
        const pelanggan = await newPelanggan.save();
        res.json(pelanggan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update Pelanggan (Admin only)
exports.updatePelanggan = async (req, res) => {
    try {
        const pelanggan = await Pelanggan.findOneAndUpdate(
            { pelanggan_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!pelanggan) {
            return res.status(404).json({ msg: 'Pelanggan not found' });
        }
        res.json(pelanggan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete Pelanggan (Admin only)
exports.deletePelanggan = async (req, res) => {
    try {
        const pelanggan = await Pelanggan.findOneAndDelete({ pelanggan_id: req.params.id });
        if (!pelanggan) {
            return res.status(404).json({ msg: 'Pelanggan not found' });
        }
        res.json({ msg: 'Pelanggan removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
