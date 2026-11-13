require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GEMINI_API_KEY) {
  console.warn(
    "⚠️  GEMINI_API_KEY belum diset di .env, fitur chat bakal error",
  );
}

// API key HANYA dibaca dari .env di server
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Bersihkan spasi, titik koma, dan tanda kutip yang tidak sengaja terbawa dari .env
const bersihkan = (teks) => String(teks).trim().replace(/^["']|["'];?$|;$/g, "");

// Model utama (default: gemini-3.8-flash)
const MODEL_NAME = bersihkan(process.env.GEMINI_MODEL || "gemini-3.8-flash");

// Model cadangan, dicoba berurutan kalau model utama sibuk (503) / kena limit (429) / tidak ditemukan (404).
// Model 2.5 sengaja TIDAK dipakai: sejak 18 Sep 2026 Google membatasi akses 2.5 hanya untuk akun yang sudah pernah memakainya.
// Bisa diubah lewat .env: GEMINI_FALLBACK_MODELS=gemini-3.5-flash-lite,gemini-3.6-flash
const FALLBACK_MODELS = (process.env.GEMINI_FALLBACK_MODELS || "gemini-3.5-flash-lite,gemini-3.6-flash")
  .split(",")
  .map(bersihkan)
  .filter((m) => m && m !== MODEL_NAME);

// Batas waktu tunggu PER model (milidetik). Total terburuk harus < 40 detik (batas frontend).
const TIMEOUT_MS = Number(process.env.GEMINI_TIMEOUT_MS) || 12000;

console.log("MODEL_NAME:", MODEL_NAME, "| FALLBACK:", FALLBACK_MODELS.join(", ") || "-");

module.exports = { genAI, MODEL_NAME, FALLBACK_MODELS, TIMEOUT_MS };