const LaundryModel = require('../models/laundryModel');
// Catatan: '../config' mengekspor koneksi database, bukan appName.
// appName ada di config/config.js.
const config = require('../config/config');

exports.status = (req, res) => {
  res.json({
    status: 'ok',
    aplikasi: config.appName,
    uptimeDetik: Math.round(process.uptime()),
    waktuServer: new Date().toISOString(),
  });
};

exports.pesanan = (req, res) => {
  const data = LaundryModel.getAll();
  res.json({
    sukses: true,
    jumlah: data.length,
    data,
  });
};