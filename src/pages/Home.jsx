import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllSurah, setSearchTerm, toggleDarkMode } from "../features/quranSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { surahList, searchTerm, lastRead, darkMode, bookmark } = useSelector((state) => state.quran || state.getQuran);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { 
    dispatch(getAllSurah()); 
    if (bookmark && bookmark.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % bookmark.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [dispatch, bookmark]);

  const filtered = (surahList || []).filter(s => 
    s.namaLatin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeSaved = bookmark && bookmark[currentIndex];

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? "dark bg-[#0b1120] text-white" : "bg-[#f8fafc] text-slate-900"}`}>
      
      {/* Load Font Amiri untuk Kaligrafi */}
      <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,700;1,700&display=swap" rel="stylesheet" />

      {/* --- FLOATING LAST READ --- */}
      {lastRead && (
        <button 
          onClick={() => navigate(`/surat/${lastRead.surahNomor}`)}
          className={`fixed top-4 right-4 z-[100] flex items-center gap-2 p-1.5 rounded-full shadow-xl transition-all duration-300 ${
            isScrolled ? "bg-orange-500 text-white scale-90" : "bg-white/10 backdrop-blur-lg text-white border border-white/20"
          }`}
        >
          <div className={`flex flex-col items-end leading-none pl-3 ${isScrolled ? 'hidden' : 'block'}`}>
            <span className="text-[7px] font-black uppercase opacity-70 tracking-widest text-white">Lanjut</span>
            <span className="text-[10px] font-bold truncate max-w-[60px] text-white">{lastRead.surahName}</span>
          </div>
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
        </button>
      )}

      {/* --- HERO SECTION --- */}
      <header className="relative bg-[#064e3b] dark:bg-[#022c22] pt-20 pb-40 px-6 rounded-b-[50px] shadow-2xl z-10 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute w-80 h-80 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center w-full">
          <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-[0.2em] mb-8 drop-shadow-lg">
            TADABBUR
          </h1>

          <div className="relative flex items-center justify-center h-32 md:h-44 w-full">
            <div className="absolute w-32 h-32 md:w-44 md:h-44 border border-emerald-300/20 rounded-full animate-[spin_30s_linear_infinite]"></div>
            <div className="relative z-10 flex items-center justify-center w-full">
               <span 
                 className="text-[70px] md:text-[110px] text-white leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] select-none"
                 style={{ fontFamily: "'Amiri', serif", fontStyle: 'italic' }}
               >
                 القرآن
               </span>
            </div>
          </div>

          <div className="mt-8 max-w-[280px] md:max-w-lg">
            <p className="text-emerald-50/60 text-[10px] md:text-xs font-medium italic leading-relaxed tracking-wide">
              "Maka apakah mereka tidak mentadabburi Al-Qur'an ataukah hati mereka terkunci?"
            </p>
            <div className="w-10 h-[1px] bg-emerald-400/30 mx-auto mt-6"></div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 -mt-20 space-y-12 pb-32 relative z-20">
        
        {/* --- SAVED AYAT CARD --- */}
        <div className="relative">
          {activeSaved ? (
            <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-white dark:border-slate-700/50 relative overflow-hidden transition-all duration-500">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                </div>
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Ayat Pilihan</span>
              </div>

              <Link key={currentIndex} to="/bookmark" className="animate-fadeIn block space-y-6">
                <p className="text-right text-4xl md:text-6xl font-serif text-slate-800 dark:text-white leading-snug" dir="rtl">
                  {activeSaved.teksArab}
                </p>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-emerald-500"></span>
                    {activeSaved.surahName} : {activeSaved.ayatNomor}
                  </p>
                  <p className="text-xs md:text-base text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed line-clamp-3">
                    "{activeSaved.teksIndo}"
                  </p>
                </div>
              </Link>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50 dark:bg-slate-900/50">
                <div key={currentIndex} className="h-full bg-emerald-500 animate-progress" />
              </div>
            </div>
          ) : (
            <div className="bg-white/50 dark:bg-slate-800/20 backdrop-blur-sm rounded-[2.5rem] p-12 text-center border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest leading-relaxed">Simpan ayat favoritmu</p>
            </div>
          )}
        </div>

        {/* --- DAFTAR SURAT --- */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
              <h2 className="font-black text-2xl uppercase tracking-tighter text-slate-800 dark:text-white leading-none">Daftar Surat</h2>
            </div>

            <div className="relative group w-full md:w-80">
              <input 
                type="text" 
                placeholder="Cari surat..." 
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="w-full py-4 pl-12 pr-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm font-bold"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((s) => (
              <Link key={s.nomor} to={`/surat/${s.nomor}`} className="bg-white dark:bg-slate-800 p-5 rounded-3xl flex justify-between items-center active:scale-95 transition-all border border-transparent shadow-sm hover:shadow-md group">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center font-black text-xs text-slate-400 group-hover:text-emerald-500">
                    {s.nomor}
                  </div>
                  <div>
                    <p className="font-black uppercase text-[13px] tracking-tight">{s.namaLatin}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{s.arti} • {s.jumlahAyat} Ayat</p>
                  </div>
                </div>
                <p className="text-2xl font-serif text-emerald-600/80 dark:text-emerald-400" dir="rtl">{s.nama}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* --- FOOTER --- */}
        <footer className="pt-10 pb-20 border-t border-slate-200 dark:border-slate-800 text-center space-y-4">
           <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600">Terima kasih telah membaca</span>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400">
                 <span>Didukung oleh</span>
                 <a 
                   href="https://equran.id/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full hover:bg-emerald-500 hover:text-white transition-all"
                 >
                   eQuran.id
                 </a>
              </div>
           </div>
           <p className="text-[10px] text-slate-400 dark:text-slate-600 font-medium">
             © {new Date().getFullYear()} Tadabbur. Dibuat dengan cinta dan niat tulus.
           </p>
        </footer>
      </main>

      {/* --- BOTTOM NAV --- */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[280px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-2 rounded-full shadow-2xl flex justify-around items-center z-[100] border border-white/20">
          <button onClick={() => dispatch(toggleDarkMode())} className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
            {darkMode ? (
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c.132 0 .263 0 .393.007a9 9 0 009.592 9.592A9 9 0 1112 3z"/></svg>
            ) : (
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" /></svg>
            )}
          </button>
          <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-700/50"></div>
          <Link to="/bookmark" className="p-4 bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-500/40">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
          </Link>
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .animate-progress { animation: progress 8s linear forwards; transform-origin: left; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
      `}} />
    </div>
  );
};

export default Home;
