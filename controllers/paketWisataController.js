const PaketWisata = require('../models/paketWisata');

// Get all PaketWisata
exports.getAllPaketWisata = async (req, res) => {
    try {
        const paketWisata = await PaketWisata.find();
        res.json(paketWisata);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get PaketWisata by auto-increment ID
exports.getPaketWisataByAutoIncrementId = async (req, res) => {
    try {
        const paketWisata = await PaketWisata.findOne({ paketwisata_id: req.params.id });
        if (!paketWisata) {
            return res.status(404).json({ msg: 'Paket Wisata not found' });
        }
        res.json(paketWisata);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// Create new PaketWisata
exports.createPaketWisata = async (req, res) => {
    try {
        const newPaketWisata = new PaketWisata(req.body);
        const paketWisata = await newPaketWisata.save();
        res.json(paketWisata);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update PaketWisata
exports.updatePaketWisata = async (req, res) => {
    try {
        const paketWisata = await PaketWisata.findOneAndUpdate(
            { paketWisata_id: req.params.id }, // Filter berdasarkan paketWisata_id
            req.body, // Data yang akan diupdate
            { new: true } // Opsi untuk mengembalikan dokumen yang sudah diupdate
        );
        res.json(paketWisata);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// Delete PaketWisata
exports.deletePaketWisata = async (req, res) => {
    try {
        const paketWisata = await PaketWisata.findOneAndDelete({ paketwisata_id: req.params.id });
        if (!paketWisata) {
            return res.status(404).json({ msg: 'Paket Wisata not found' });
        }
        res.json({ msg: 'Paket Wisata deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

