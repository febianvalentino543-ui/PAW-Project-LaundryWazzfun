const express = require('express');
const router = express.Router();
const laundryController = require('../controllers/laundryController');

// ==========================================
// A. RUTE HALAMAN VIEWS (EJS)
// ==========================================
router.get('/', (req, res) => {
    res.render('index', {
        namaToko: 'Wazzfun Laundry',
        judul: 'Wazzfun Laundry | Beranda & Self-Service'
    });
});

router.get('/pegawai', async (req, res) => {
    try {
        const Pesanan = require('../models/pesanan');
        const daftarPesanan = await Pesanan.findAll({ order: [['createdAt', 'DESC']] });

        res.render('pegawai', {
            namaToko: 'Wazzfun Laundry',
            judul: 'Portal Pegawai - Wazzfun Laundry',
            pesanan: daftarPesanan
        });
    } catch (err) {
        console.error('Gagal memuat halaman pegawai:', err);
        res.render('pegawai', {
            namaToko: 'Wazzfun Laundry',
            judul: 'Portal Pegawai',
            pesanan: []
        });
    }
});

router.get('/owner', async (req, res) => {
    try {
        const Pesanan = require('../models/pesanan');
        const total = await Pesanan.count();

        res.render('owner', {
            judul: 'Dashboard Owner - Wazzfun Laundry',
            stats: {
                totalPesanan: total,
                avgResponBot: '< 2 Detik',
                totalEskalasi: 2
            }
        });
    } catch (err) {
        console.error(err);
        res.render('owner', { judul: 'Dashboard Owner', stats: { totalPesanan: 0 } });
    }
});


// ==========================================
// B. ENDPOINT REST API CRUD (Sesuai Modul)
// ==========================================
router.get('/api/pesanan', laundryController.getAllPesanan);             // READ (All)
router.get('/api/pesanan/:id', laundryController.getPesananById);       // READ (Detail by ID)
router.post('/api/pesanan', laundryController.createPesanan);           // CREATE
router.put('/api/pesanan/:id/status', laundryController.updateStatusPesanan); // UPDATE STATUS
router.delete('/api/pesanan/:id', laundryController.deletePesanan);     // DELETE

module.exports = router;