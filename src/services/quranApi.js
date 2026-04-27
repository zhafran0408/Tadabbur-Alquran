import axios from "axios";

// URL Utama untuk data Al-Quran (Surah, Ayat, dan Audio Murottal)
const BASE_URL = "https://equran.id/api/v2";

// Fungsi untuk ambil daftar 114 Surah
export const fetchAllSurah = () => axios.get(`${BASE_URL}/surat`);

// Fungsi untuk ambil detail ayat dan audio per surah (berdasarkan nomor surah)
export const fetchDetailSurah = (nomor) => axios.get(`${BASE_URL}/surat/${nomor}`);
