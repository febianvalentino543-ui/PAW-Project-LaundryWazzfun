const { askGemini } = require('../services/gemini.service');
const sendResponse = require('../utils/response');

/**
 * Terjemahkan error Gemini/SDK ke status HTTP + pesan yang ramah untuk pelanggan.
 */
function petakanError(err) {
  const pesan = String(err && err.message ? err.message : err);
  const status = err && err.status;

  if (err && err.name === 'GoogleGenerativeAIAbortError') {
    return { code: 504, message: 'AI terlalu lama merespons, coba lagi sebentar lagi.' };
  }
  if (status === 429) {
    return { code: 429, message: 'AI sedang terlalu sibuk (kuota habis), coba lagi nanti.' };
  }
  if (status === 503) {
    return { code: 503, message: 'Layanan AI sedang overload, coba lagi sebentar lagi.' };
  }
  if (status === 401 || status === 403 || /API key/i.test(pesan)) {
    return { code: 500, message: 'Konfigurasi AI di server bermasalah (API key).' };
  }
  if (status === 404) {
    return { code: 500, message: 'Konfigurasi AI di server bermasalah (model tidak ditemukan).' };
  }
  return { code: 500, message: 'Gagal menghubungi AI, coba lagi nanti' };
}

async function chat(req, res) {
  try {
    const { message } = req.body;

    const reply = await askGemini(message);

    return sendResponse(res, {
      message: 'Berhasil dapat balasan',
      data: { reply },
    });
  } catch (err) {
    // Detail lengkap hanya di terminal server, tidak dikirim ke pelanggan
    console.error('Gemini error:', {
      name: err && err.name,
      status: err && err.status,
      message: err && err.message,
    });

    const { code, message } = petakanError(err);
    return sendResponse(res, { code, success: false, message });
  }
}

module.exports = { chat };