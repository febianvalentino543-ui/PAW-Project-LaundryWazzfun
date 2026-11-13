const express = require('express');
const router = express.Router();
const validateChatInput = require('../middlewares/validateChatInput.middleware');
const { chat } = require('../controllers/chat.controller');

// Endpoint publik POST /api/chat (atau /chat tergantung pendaftaran router utama)
router.post('/', validateChatInput, chat);

module.exports = router;