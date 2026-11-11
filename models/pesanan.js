const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Memanggil konfigurasi sequelize yang sudah dibuat

const Pesanan = sequelize.define('Pesanan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: 'ID Nota otomatis (Auto Increment)'
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Nama lengkap pelanggan'
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Nomor WhatsApp pelanggan untuk notifikasi otomatis'
    },
    service: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Kategori dan jenis paket layanan yang dipilih (misal: Cuci Lipat atau Cuci Setrika)'
    },
    weightQty: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Berat (kg) atau jumlah (pcs) hasil penimbangan pegawai'
    },
    totalHarga: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Total harga hasil kalkulasi'
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Diterima',
        comment: 'Status pengerjaan disesuaikan layanan: Diterima -> Sedang Dicuci -> (Sedang Disetrika - opsional) -> Siap Diambil'
    },
    catatan: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Catatan khusus dari pelanggan'
    }
}, {
    tableName: 'pesanan_laundry', // Nama tabel di database PostgreSQL
    timestamps: true            // Otomatis membuat kolom createdAt dan updatedAt
});

module.exports = Pesanan;