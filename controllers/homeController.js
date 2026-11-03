const LaundryModel = require('../models/laundryModel');
const config = require('../config');

// Render Landing Page (index)
exports.index = (req, res) => {
  res.render('index', {
    judul: `${config.appName} - Solusi Cuci Bersih & AI Express`,
    namaToko: config.appName,
    pesanan: LaundryModel.getAll(),
  });
};

// Render Halaman Monitoring Pegawai
exports.pegawai = (req, res) => {
  res.render('pegawai', {
    judul: `Portal Monitoring Pegawai - ${config.appName}`,
    namaToko: config.appName,
    pesanan: LaundryModel.getAll(),
  });
};

// Handle Update Status oleh Pegawai
exports.updateStatus = (req, res) => {
  const { idNota } = req.params;
  const { status } = req.body;
  
  const berhasil = LaundryModel.updateStatus(idNota, status);
  if (berhasil) {
    res.json({ sukses: true, pesan: `Status pesanan ${idNota} berhasil diperbarui ke ${status}` });
  } else {
    res.status(404).json({ sukses: false, pesan: 'Pesanan tidak ditemukan' });
  }
};