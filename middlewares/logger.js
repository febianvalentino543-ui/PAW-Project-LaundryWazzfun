const fs = require('fs');
const path = require('path');
const config = require('../config');

const logPath = path.join(config.logDir, config.logFile);

// Siapkan folder dan header tabel Markdown sekali saja saat server menyala
fs.mkdirSync(config.logDir, { recursive: true });
if (!fs.existsSync(logPath)) {
  fs.writeFileSync(
    logPath,
    '# Log Request - Wazzfun Laundry\n\n' +
      '| Waktu | Method | URL | Status | Durasi | IP |\n' +
      '|---|---|---|---|---|---|\n'
  );
}

// Karakter "|" harus di-escape agar tabel Markdown tidak rusak
const aman = (teks) => String(teks).replace(/\|/g, '%7C');

module.exports = (req, res, next) => {
  const mulai = process.hrtime.bigint();

  // Catat setelah respons selesai supaya status code dan durasi sudah diketahui
  res.on('finish', () => {
    const durasiMs = Number(process.hrtime.bigint() - mulai) / 1e6;
    const baris =
      `| ${new Date().toISOString()} | ${req.method} | ${aman(req.originalUrl)} ` +
      `| ${res.statusCode} | ${durasiMs.toFixed(1)} ms | ${aman(req.ip)} |\n`;

    fs.appendFile(logPath, baris, (err) => {
      if (err) console.error('Gagal menulis log:', err.message);
    });
  });

  next();
};