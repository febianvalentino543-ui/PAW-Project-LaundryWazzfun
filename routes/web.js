const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();

router.get('/', homeController.index);
router.get('/pegawai', homeController.pegawai);
router.put('/api/orders/:idNota/status', homeController.updateStatus);

module.exports = router;