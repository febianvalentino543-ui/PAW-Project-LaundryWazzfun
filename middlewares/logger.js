const fs = require('fs');
const path = require('path');

// Folder logs ada di root proyek (sejajar dengan folder middlewares)
const logDir = path.join(__dirname, '..', 'logs');
const logFile = path.join(logDir, 'logger.md');

// Buat folder logs jika belum ada
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logger = (req, res, next) => {
    const log = `- ${new Date().toISOString()} | ${req.method} ${req.originalUrl}\n`;
    fs.appendFile(logFile, log, (err) => {
        if (err) console.error('Gagal menulis log:', err);
    });
    next();
};

module.exports = logger;