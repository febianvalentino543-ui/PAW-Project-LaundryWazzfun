const LaundryModel = require('../models/laundryModel');
const config = require('../config');

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