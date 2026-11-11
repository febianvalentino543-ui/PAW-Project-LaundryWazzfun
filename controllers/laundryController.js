const Pesanan = require('../models/pesanan');

// 1. READ: Mengambil seluruh data pesanan (GET /api/pesanan)
exports.getAllPesanan = async (req, res) => {
    try {
        const daftarPesanan = await Pesanan.findAll({ 
            order: [['createdAt', 'DESC']] 
        });
        
        return res.status(200).json({
            sukses: true,
            data: daftarPesanan
        });
    } catch (error) {
        console.error('Error saat mengambil data:', error);
        return res.status(500).json({
            sukses: false,
            pesan: 'Gagal mengambil data dari database.'
        });
    }
};

// 2. READ: Mengambil detail satu data berdasarkan ID (GET /api/pesanan/:id)
exports.getPesananById = async (req, res) => {
    try {
        const { id } = req.params;
        const pesanan = await Pesanan.findByPk(id);

        if (!pesanan) {
            return res.status(404).json({ sukses: false, pesan: 'Pesanan tidak ditemukan' });
        }

        return res.json({ sukses: true, data: pesanan });
    } catch (error) {
        console.error('Error fetching pesanan by id:', error);
        return res.status(500).json({ sukses: false, pesan: 'Gagal mengambil detail pesanan' });
    }
};

// 3. CREATE: Menambahkan data pesanan baru dengan Validasi / Event Handling (POST /api/pesanan)
exports.createPesanan = async (req, res) => {
    try {
        const { customerName, phone, service, weightQty, totalHarga, catatan } = req.body;

        // --- Event Handling & Backend Validation ---
        // Validasi Nama: Minimal 3 karakter
        if (!customerName || customerName.trim().length < 3) {
            return res.status(400).json({ 
                sukses: false, 
                pesan: `Nama pelanggan minimal 3 karakter (sekarang ${customerName ? customerName.trim().length : 0}).` 
            });
        }

        // Validasi Nomor WhatsApp: Minimal 10 digit
        if (!phone || phone.trim().length < 10) {
            return res.status(400).json({ 
                sukses: false, 
                pesan: `Nomor WhatsApp minimal 10 digit (sekarang ${phone ? phone.trim().length : 0} digit).` 
            });
        }

        // Validasi Berat / Jumlah: Minimal bernilai 1
        const beratAngka = parseFloat(weightQty);
        if (isNaN(beratAngka) || beratAngka < 1) {
            return res.status(400).json({ 
                sukses: false, 
                pesan: 'Berat atau jumlah pesanan minimal bernilai 1.' 
            });
        }

        // Validasi Kelengkapan Data Lainnya
        if (!phone || !service || totalHarga === undefined) {
            return res.status(400).json({ 
                sukses: false, 
                pesan: 'Data pesanan tidak lengkap. Mohon isi nomor WhatsApp, layanan, dan total harga.' 
            });
        }

        // --- Proses Simpan ke Database PostgreSQL via Sequelize ---
        const pesananBaru = await Pesanan.create({
            customerName: customerName.trim(),
            phone: phone.trim(),
            service,
            weightQty: weightQty.toString(),
            totalHarga: parseInt(totalHarga),
            catatan: catatan ? catatan.trim() : '',
            status: 'Diterima' // Status awal saat pesanan masuk
        });

        // --- Simulasi Trigger WhatsApp Otomatis ---
        console.log(`[WHATSAPP GATEWAY] Nota #${pesananBaru.id} berhasil dibuat.`);
        console.log(`[WHATSAPP GATEWAY] Mengirim rincian nota ke nomor ${phone}: Total Rp ${parseInt(totalHarga).toLocaleString('id-ID')}`);

        return res.status(201).json({
            sukses: true,
            pesan: 'Pesanan berhasil dibuat dan tersimpan ke database!',
            data: pesananBaru
        });

    } catch (error) {
        console.error('Error saat membuat pesanan:', error);
        return res.status(500).json({ 
            sukses: false, 
            pesan: 'Terjadi kesalahan pada server saat menyimpan data ke database.' 
        });
    }
};

// 4. UPDATE: Memperbarui status pesanan (PUT /api/pesanan/:id/status)
exports.updateStatusPesanan = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const pesanan = await Pesanan.findByPk(id);
        if (!pesanan) {
            return res.status(404).json({ sukses: false, pesan: 'Pesanan tidak ditemukan' });
        }

        pesanan.status = status || pesanan.status;
        await pesanan.save();

        // Jika status berubah menjadi "Siap Diambil", picu notifikasi WA otomatis
        if (status === 'Siap Diambil') {
            console.log(`[WHATSAPP GATEWAY] Pesan otomatis ke ${pesanan.phone}: "Halo ${pesanan.customerName}, cucian #${pesanan.id} sudah Siap Diambil!"`);
        }

        return res.json({
            sukses: true,
            pesan: 'Status pesanan berhasil diperbarui',
            data: pesanan
        });
    } catch (error) {
        console.error('Error updating status:', error);
        return res.status(500).json({ sukses: false, pesan: 'Gagal memperbarui status pesanan' });
    }
};

// 5. DELETE: Menghapus data pesanan dari database (DELETE /api/pesanan/:id)
exports.deletePesanan = async (req, res) => {
    try {
        const { id } = req.params;
        const pesanan = await Pesanan.findByPk(id);

        if (!pesanan) {
            return res.status(404).json({ sukses: false, pesan: 'Pesanan tidak ditemukan' });
        }

        await pesanan.destroy();

        return res.json({
            sukses: true,
            pesan: `Pesanan #${id} berhasil dihapus dari database`
        });
    } catch (error) {
        console.error('Error deleting pesanan:', error);
        return res.status(500).json({ sukses: false, pesan: 'Gagal menghapus pesanan' });
    }
};