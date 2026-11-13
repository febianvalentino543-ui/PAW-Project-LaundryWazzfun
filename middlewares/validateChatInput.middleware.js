const sendResponse = require('../utils/response'); // Sesuaikan path utils response projectmu

const MAX_LENGTH = 500;

function validateChatInput(req, res, next) {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return sendResponse(res, {
      code: 400,
      success: false,
      message: 'message wajib diisi',
    });
  }

  if (message.length > MAX_LENGTH) {
    return sendResponse(res, {
      code: 400,
      success: false,
      message: `Pesan terlalu panjang, maksimal ${MAX_LENGTH} karakter`,
    });
  }

  next();
}

module.exports = validateChatInput;