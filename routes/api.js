const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();

const chatRoutes = require('./chat.routes');
router.use('/chat', chatRoutes);

router.get('/status', apiController.status);
router.get('/pesanan', apiController.pesanan);

module.exports = router;