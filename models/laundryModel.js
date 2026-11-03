// Data masih hardcode. Nanti bagian ini diganti query database,
// sementara controller dan route tidak perlu diubah.
const daftarPesanan = [
  {
    id: 'WZ-1001',
    namaPelanggan: 'Bpk. Agus',
    nomorWa: '081234567890',
    paket: 'Express Setrika 24 Jam (1 Hari)',
    catatan: '3kg - Jangan dicampur pakaian putih',
    status: 'Disetrika',
    waktuMasuk: 'Hari ini, 09:00 WIB',
  },
  {
    id: 'WZ-1002',
    namaPelanggan: 'Ibu Siti',
    nomorWa: '081987654321',
    paket: 'Cuci Lipat Kiloan (2 Hari)',
    catatan: '5kg - Tambah Parfum Extra',
    status: 'Dicuci',
    waktuMasuk: 'Hari ini, 10:15 WIB',
  },
  {
    id: 'WZ-1003',
    namaPelanggan: 'Mas Rian',
    nomorWa: '085712344321',
    paket: 'Cuci Satuan Premium',
    catatan: '1 Jas Hitam & 2 Kemeja',
    status: 'Diterima',
    waktuMasuk: 'Hari ini, 11:00 WIB',
  },
];

const LaundryModel = {
  getAll() {
    return daftarPesanan;
  },

  // Fungsi tambahan untuk mendukung update status oleh pegawai di halaman monitoring
  updateStatus(idNota, statusBaru) {
    const pesanan = daftarPesanan.find(item => item.id === idNota);
    if (pesanan) {
      pesanan.status = statusBaru;
      return true;
    }
    return false;
  }
};

module.exports = LaundryModel;