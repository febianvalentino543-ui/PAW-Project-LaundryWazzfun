const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();

router.get('/status', apiController.status);
router.get('/pesanan', apiController.pesanan);

module.exports = router;