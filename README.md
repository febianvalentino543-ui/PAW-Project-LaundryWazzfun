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

# Wazzfun Laundry: Week 8 (Integrasi Database Connection)

## 1. Pengujian CRUD dengan Postman
 
Endpoint REST API diuji menggunakan **Postman** untuk memastikan setiap operasi CRUD benar-benar memengaruhi data di database PostgreSQL. Resource yang dipakai adalah **`pesanan`** (tema laundry), sebagai pengganti contoh `produk` pada soal.
 
### 1.1 Persiapan
 
1. Jalankan server: `node app.js`. Pastikan terminal menampilkan koneksi database berhasil.
2. Buka Postman, lalu buat **Collection** baru bernama `Wazzfun Laundry API`.
3. Buat variabel collection `baseUrl` dengan nilai `http://localhost:3000`, supaya URL pada tiap request cukup ditulis `{{baseUrl}}/api/pesanan`.
4. Untuk request **POST** dan **PUT**, pilih tab **Body**, lalu **raw**, lalu **JSON**. Postman akan menambahkan header `Content-Type: application/json` secara otomatis.
   
### 1.2 Daftar Endpoint
 
| Operasi | Method | URL | Body | Keterangan |
|---|---|---|---|---|
| Create | `POST` | `/api/pesanan` | JSON | Menambah pesanan baru |
| Read (semua) | `GET` | `/api/pesanan` | - | Mengambil seluruh pesanan |
| Read (detail) | `GET` | `/api/pesanan/:id` | - | Mengambil satu pesanan berdasarkan ID |
| Update | `PUT` | `/api/pesanan/:id/status` | JSON | Memperbarui status pesanan |
| Delete | `DELETE` | `/api/pesanan/:id` | - | Menghapus pesanan berdasarkan ID |
 

### 1.3 Verifikasi di Database (pgAdmin)
 
Setelah tiap operasi, pastikan perubahannya benar-benar tersimpan di database:
 
```sql
SELECT * FROM pesanan_laundry ORDER BY id DESC;
```
 
| Setelah operasi | Yang harus terlihat di pgAdmin |
|---|---|
| POST | Baris baru muncul |
| PUT | Nilai kolom `status` berubah |
| DELETE | Baris hilang |
 
### 1.4 Hasil Pengujian

#### GET semua :
<img width="3000" height="1876" alt="image" src="https://github.com/user-attachments/assets/65477240-d903-4db9-9a6b-b7e8b1a31d05" />

#### POST pesanan :
<img width="3000" height="1874" alt="image" src="https://github.com/user-attachments/assets/65717b8f-9dd4-49a8-a19b-4f4fe902f2a4" />

<img width="3000" height="1876" alt="image" src="https://github.com/user-attachments/assets/dc4b7d6e-f4bb-41e0-b41f-73cda54fac2c" />

#### DELETE pesanan :
<img width="3000" height="1876" alt="image" src="https://github.com/user-attachments/assets/02fd2893-64b4-4d52-8433-bea586cf13f2" />

<img width="3000" height="1876" alt="image" src="https://github.com/user-attachments/assets/cfcd033b-306e-466c-a909-9535cbab5ecb" />
