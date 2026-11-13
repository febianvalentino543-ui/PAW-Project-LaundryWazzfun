require('dotenv').config(); // WAJIB di baris paling atas agar .env terbaca

// ... sisa kode app.js kamu
const express = require('express');
const path = require('path');
const config = require('./config/config');
const logger = require('./middlewares/logger');
const routes = require('./routes');

const app = express();

// 1. Set View Engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. Middleware untuk Parsing JSON dan URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Pasang Static Files (CSS, Gambar, dll dari folder public/views/assets)
app.use(express.static(path.join(__dirname, 'public')));
// Jika file CSS dan asset berada di dalam folder views, bisa juga di-mapping:
app.use(express.static(path.join(__dirname, 'views')));

// 4. Pasang Custom Logger Middleware (mencatat request ke logs/logger.md)
app.use(logger);

// 5. Pasang Routing Utama Aplikasi
app.use('/', routes);

const sequelize = require('./config/database');

// Sinkronisasi model database
sequelize.sync({ alter: true }) // alter: true akan menyesuaikan tabel jika ada perubahan kolom
    .then(() => {
        console.log('✅ Database PostgreSQL berhasil disinkronkan (Sequelize)');
    })
    .catch(err => {
        console.error('❌ Gagal sinkronisasi database:', err);
    });

// 6. Jalankan Server
app.listen(config.port, () => {
  console.log(`==================================================`);
  console.log(`🚀 Server ${config.appName} sedang berjalan!`);
  console.log(`🔗 Akses web di: http://localhost:${config.port}`);
  console.log(`==================================================`);
});