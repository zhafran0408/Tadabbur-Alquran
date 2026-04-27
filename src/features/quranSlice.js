import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk untuk mengambil semua daftar surah
export const getAllSurah = createAsyncThunk("quran/getAllSurah", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("https://equran.id/api/v2/surat");
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Gagal mengambil data surah");
  }
});

// Thunk untuk mengambil detail surah berdasarkan nomor
export const getSurahDetail = createAsyncThunk("quran/getSurahDetail", async (nomor, { rejectWithValue }) => {
  try {
    if (!nomor || nomor === "undefined") return rejectWithValue("Nomor surah tidak valid");
    const res = await axios.get(`https://equran.id/api/v2/surat/${nomor}`);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Gagal mengambil detail surah");
  }
});

const quranSlice = createSlice({
  name: "quran",
  initialState: {
    surahList: [],
    detailSurah: null,
    loading: false,
    error: null,
    searchTerm: "",
    darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
    selectedQari: localStorage.getItem("selectedQari") || "05", // Default: Mishary Rashid
    viewMode: localStorage.getItem("viewMode") || "full", // "full" atau "arabic"
    lastRead: JSON.parse(localStorage.getItem("lastRead")) || null,
    bookmark: JSON.parse(localStorage.getItem("bookmark")) || [],
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
    setQari: (state, action) => {
      state.selectedQari = action.payload;
      localStorage.setItem("selectedQari", action.payload);
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
      localStorage.setItem("viewMode", action.payload);
    },
    setLastRead: (state, action) => {
      state.lastRead = action.payload;
      localStorage.setItem("lastRead", JSON.stringify(action.payload));
    },
    addBookmark: (state, action) => {
      const { surahNomor, nomorAyat } = action.payload;
      const isExist = state.bookmark.find(
        (b) => b.surahNomor === surahNomor && b.nomorAyat === nomorAyat
      );

      if (isExist) {
        // Jika sudah ada, hapus (Toggle Off)
        state.bookmark = state.bookmark.filter(
          (b) => !(b.surahNomor === surahNomor && b.nomorAyat === nomorAyat)
        );
      } else {
        // Jika belum ada, tambah (Toggle On)
        state.bookmark.push(action.payload);
      }
      localStorage.setItem("bookmark", JSON.stringify(state.bookmark));
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Get All Surah
      .addCase(getAllSurah.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSurah.fulfilled, (state, action) => {
        state.loading = false;
        state.surahList = action.payload;
      })
      .addCase(getAllSurah.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle Get Detail Surah
      .addCase(getSurahDetail.pending, (state) => {
        state.loading = true;
        state.detailSurah = null;
        state.error = null;
      })
      .addCase(getSurahDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detailSurah = action.payload;
      })
      .addCase(getSurahDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSearchTerm,
  toggleDarkMode,
  setQari,
  setViewMode,
  setLastRead,
  addBookmark,
} = quranSlice.actions;

export default quranSlice.reducer;