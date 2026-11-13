require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GEMINI_API_KEY) {
  console.warn(
    "⚠️  GEMINI_API_KEY belum diset di .env, fitur chat bakal error",
  );
}

// API key HANYA dibaca dari .env di server
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Model Gemini yang digunakan (default: gemini-2.5-flash)
const MODEL_NAME = (process.env.GEMINI_MODEL || "gemini-3.8-flash")
  .trim()
  .replace(/;$/, "");

console.log("MODEL_NAME:", MODEL_NAME); // hapus setelah masalah selesai

module.exports = { genAI, MODEL_NAME };