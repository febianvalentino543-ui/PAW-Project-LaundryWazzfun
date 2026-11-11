const { Sequelize } = require('sequelize');

// Inisialisasi Sequelize dengan koneksi PostgreSQL
// Sesuaikan nama database, username, dan password dengan pengaturan di pgAdmin kamu
const sequelize = new Sequelize('WzLaundry', 'postgres', '141414', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // Set true jika ingin melihat query SQL di terminal saat debugging
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Test koneksi database
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Koneksi ke database PostgreSQL (pgAdmin) berhasil tersambung!');
    } catch (error) {
        console.error('❌ Gagal terhubung ke database:', error);
    }
}

testConnection();

module.exports = sequelize;