# Wazzfun Laundry: Week 7 (Pembuatan Frontend)
 
**Pertemuan:** 7, Integrasi Frontend, REST API, dan Middleware Logger
 
## 1. Tujuan Tugas
 
- Membuat halaman frontend yang dapat diakses melalui browser pada alamat lokal.
- Memastikan halaman tampil dengan benar ketika development server dijalankan.
- Menyiapkan tampilan sederhana yang dapat dikembangkan di tahap selanjutnya.
  
## 2. Teknologi yang Digunakan
 
| Komponen | Teknologi |
|---|---|
| Backend / Server | Node.js + Express.js |
| View Engine | EJS |
| Styling | CSS (`style.css`, `pegawai.css`, `owner.css`) |
| Arsitektur | MVC (Model-View-Controller) |
 
## 3. Struktur Folder
 
```
Praktikum/
├── config/            # Konfigurasi aplikasi (port, nama toko, koneksi database)
├── controllers/       # Pengatur alur request dan response
├── logs/              # Hasil pencatatan request (logger.md)
├── middlewares/       # Middleware aplikasi (logger)
├── models/            # Model data
├── routes/            # Definisi routing halaman dan endpoint
├── utils/             # Fungsi bantuan
├── views/             # Template EJS dan aset frontend
│   ├── Assets/        #   Gambar (logo.png)
│   ├── css/           #   style.css, pegawai.css, owner.css
│   ├── Index.ejs      #   Halaman Pelanggan (beranda)
│   ├── pegawai.ejs    #   Halaman Portal Pegawai
│   └── owner.ejs      #   Halaman Owner Dashboard
├── app.js             # Entry point aplikasi
└── package.json       # Informasi project dan dependencies
```
 
## 4. Halaman Frontend
 
| Halaman | Route | File View | Fungsi |
|---|---|---|---|
| Pelanggan | `/` | `views/Index.ejs` | Beranda, cek status cucian, daftar harga, dan form pesanan baru |
| Portal Pegawai | `/pegawai` | `views/pegawai.ejs` | Memantau dan mengelola pesanan yang masuk |
| Owner Dashboard | `/owner` | `views/owner.ejs` | Ringkasan statistik untuk pemilik usaha |

 
## 5. Event Handling di Frontend
 
Form pesanan memiliki validasi **real-time** menggunakan JavaScript (`addEventListener`).
 
| Input | Aturan | Event |
|---|---|---|
| Nama pelanggan | Minimal 3 karakter | `input` |
| Nomor WhatsApp | Hanya angka, minimal 10 digit | `input` |
| Pilih paket | Mengambil harga satuan dan menghitung total | `change` |
| Berat / jumlah | Minimal bernilai 1, menghitung total | `input` |
| Submit form | Diblokir jika data belum valid | `submit` |
 
Pesan peringatan tampil di bawah kolom terkait dan border input berubah merah saat data tidak valid. **Estimasi Total Biaya** diperbarui otomatis setiap paket atau berat berubah.

 
## 6. Hasil / Screenshot
 
### Halaman Pelanggan :
<img width="3000" height="1876" alt="image" src="https://github.com/user-attachments/assets/542bcf61-d11b-445b-b7b1-62c2d4c7b574" />

### Portal Pegawai :
<img width="3000" height="1876" alt="image" src="https://github.com/user-attachments/assets/2eee891a-8c0d-46e2-911e-96898017bcd0" />


### Owner Dashboard :
<img width="3000" height="1876" alt="image" src="https://github.com/user-attachments/assets/301ea0fe-c221-4f78-a32a-072a4a124731" />

