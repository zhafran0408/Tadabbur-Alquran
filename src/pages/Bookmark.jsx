import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleDarkMode } from "../features/quranSlice";

const Bookmark = () => {
  const dispatch = useDispatch();
  const { bookmark, darkMode } = useSelector((state) => state.quran);

  return (
    <div className={`min-h-screen pb-40 transition-all duration-700 ${darkMode ? "dark bg-[#0b1120] text-white" : "bg-[#f4f7f6] text-slate-900"}`}>
      
      {/* --- HEADER --- */}
      <header className="bg-emerald-600 dark:bg-emerald-950 pt-20 pb-36 px-6 rounded-b-[50px] text-center text-white shadow-2xl relative overflow-hidden">
        <h1 className="text-5xl font-black uppercase tracking-tighter">Favorites</h1>
        <p className="text-emerald-100/60 font-bold text-[10px] mt-2 uppercase tracking-[0.4em]">Saved Ayahs Collection</p>
      </header>

      {/* --- CONTENT --- */}
      <main className="container mx-auto max-w-4xl px-6 -mt-16 relative z-20 space-y-4">
        {bookmark.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 p-20 rounded-[3.5rem] text-center shadow-xl border border-white dark:border-slate-700/50">
            <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">Collection is Empty</p>
          </div>
        ) : (
          bookmark.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] shadow-lg border border-white dark:border-slate-700/50 flex flex-col gap-6 hover:scale-[1.01] transition-transform">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl text-[9px] font-black uppercase tracking-wider">
                  {item.surahName} | Ayat {item.ayatNomor}
                </span>
                <Link to={`/surat/${item.surahNomor}`} className="text-emerald-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group">
                  Baca Full Surat
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7"/></svg>
                </Link>
              </div>
              
              <div className="space-y-4">
                <p className="text-3xl md:text-5xl font-serif text-slate-800 dark:text-white text-right leading-tight" dir="rtl">
                  {item.teksArab}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic border-l-4 border-emerald-500/20 pl-5">
                  "{item.teksIndo}"
                </p>
              </div>
            </div>
          ))
        )}
      </main>

      {/* --- FIXED NAVIGATION (Sama persis kayak Home) --- */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[85%] max-w-[280px] bg-white/80 dark:bg-slate-900/90 backdrop-blur-3xl p-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex justify-around items-center z-[100] border border-white/20">
          {/* Tombol Dark Mode dengan Ikon Identik */}
          <button onClick={() => dispatch(toggleDarkMode())} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all">
            {darkMode ? (
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c.132 0 .263 0 .393.007a9 9 0 009.592 9.592A9 9 0 1112 3z"/></svg>
            ) : (
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" /></svg>
            )}
          </button>
          
          <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-700"></div>
          
          {/* Tombol Kembali ke Home */}
          <Link to="/" className="p-4 bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-500/40 active:scale-75 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
      </div>
    </div>
  );
};

export default Bookmark;