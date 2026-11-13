const { genAI, MODEL_NAME } = require('../config/gemini');
const Pesanan = require('../models/pesanan'); // Model Sequelize -> tabel pesanan_laundry (PostgreSQL)

/**
 * Ubah nomor HP ke format seragam (08xxxxxxxxxx) agar "+62812...", "62812..." dan "0812..."
 * dianggap sama.
 */
function normalisasiHp(hp) {
  let digit = String(hp || '').replace(/\D/g, '');
  if (digit.startsWith('62')) digit = '0' + digit.slice(2);
  return digit;
}

/**
 * Cari pesanan di DATABASE berdasarkan isi pesan pelanggan:
 * nomor HP, nomor nota (WZ-1 / #1 / nota 1), atau nama pelanggan.
 */
async function cariPesanan(userMessage) {
  const teks = userMessage.toLowerCase();

  const matchHp = userMessage.match(/(?:\+?62|0)8\d{8,12}/);
  const hpDicari = matchHp ? normalisasiHp(matchHp[0]) : null;

  const matchNota = userMessage.match(/(?:wz-?|#|nota\s*)(\d+)/i);
  const idDicari = matchNota ? parseInt(matchNota[1], 10) : null;

  const semua = await Pesanan.findAll({ order: [['createdAt', 'DESC']] });

  const hasil = semua.filter((p) => {
    const cocokHp = hpDicari && normalisasiHp(p.phone) === hpDicari;
    const cocokId = idDicari !== null && p.id === idDicari;
    const nama = (p.customerName || '').toLowerCase().trim();
    const cocokNama = nama.length >= 3 && teks.includes(nama);
    return cocokHp || cocokId || cocokNama;
  });

  const adaIdentitas = Boolean(hpDicari || idDicari !== null || hasil.length > 0);
  return { hasil, adaIdentitas, hpDicari, idDicari };
}

function formatWaktu(tanggal) {
  if (!tanggal) return '-';
  return new Date(tanggal).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }) + ' WIB';
}

/**
 * Bangun system instruction + sisipkan data pesanan dari database.
 */
async function buildSystemInstruction(userMessage = '') {
  const { hasil, adaIdentitas } = await cariPesanan(userMessage);

  let infoPesananContext;
  if (hasil.length > 0) {
    infoPesananContext =
      '\n\n[DATA PESANAN DARI DATABASE]:\n' +
      hasil
        .map(
          (o) =>
            `- Nota WZ-${o.id}: Pelanggan ${o.customerName}, Paket: ${o.service}, ` +
            `Qty/Berat: ${o.weightQty}, Total: Rp${Number(o.totalHarga || 0).toLocaleString('id-ID')}, ` +
            `Status: "${o.status}", Waktu Masuk: ${formatWaktu(o.createdAt)}`
        )
        .join('\n');
  } else if (adaIdentitas) {
    infoPesananContext =
      '\n\n[DATA SISTEM]: Tidak ditemukan pesanan di database dengan nama/nomor yang disebutkan pelanggan.';
  } else {
    infoPesananContext =
      '\n\n[DATA SISTEM]: Pelanggan belum menyebutkan nama, nomor HP, atau nomor nota. ' +
      'Jika ia menanyakan status pesanan, minta ia menyebutkan salah satunya.';
  }

  const storeName = process.env.STORE_NAME;

  return `Kamu adalah customer service otomatis untuk layanan laundry bernama "${storeName}" (pimpinan Pak Umuh Muchtar).
Karaktermu ramah, sopan, membantu, dan menggunakan bahasa Indonesia yang santai namun profesional ala layanan pelanggan WhatsApp.

TUGAS UTAMAMU:
1. Menjawab pertanyaan seputar layanan ${storeName} (kiloan, satuan, cuci setrika, durasi pengerjaan reguler).
2. Untuk pertanyaan status pesanan, gunakan HANYA data sistem di bawah ini.
3. Jangan pernah mengarang status pesanan jika tidak tercantum di data sistem.
4. Arti status: "Diterima" = baru masuk, "Sedang Dicuci"/"Dicuci" = sedang dicuci, "Disetrika" = sedang disetrika,
   "Siap Diambil" = cucian SUDAH SELESAI dan siap diambil.
${infoPesananContext}`;
}

/**
 * Kirim pesan user ke Gemini dengan system instruction yang sudah berisi data database.
 */
async function askGemini(userMessage) {
  const systemInstruction = await buildSystemInstruction(userMessage);

  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction,
  });

  const result = await model.generateContent(userMessage);
  return result.response.text();
}

module.exports = { askGemini, buildSystemInstruction, cariPesanan };