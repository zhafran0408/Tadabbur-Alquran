import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSurahDetail, addBookmark, setLastRead, setQari, setViewMode } from "../features/quranSlice";
import { SkeletonAyat } from "../components/Skeleton";

const Detail = () => {
  const { nomor } = useParams();
  const dispatch = useDispatch();
  const { detailSurah, loading, darkMode, selectedQari, viewMode, bookmark, lastRead } = useSelector((state) => state.quran);
  
  const [showQariModal, setShowQariModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [clickedBtn, setClickedBtn] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => { 
    if(nomor) dispatch(getSurahDetail(nomor));
    window.scrollTo(0,0);
    setIsPlaying(false);
  }, [dispatch, nomor]);

  if (loading || !detailSurah) return <SkeletonAyat />;

  const qariList = [
    { id: "01", name: "Al-Afasy" },
    { id: "02", name: "Al-Ghamidi" },
    { id: "03", name: "Al-Muaiqly" },
    { id: "04", name: "Al-Hudaifi" },
    { id: "05", name: "Mishary Rashid" },
    { id: "06", name: "As-Sudais" }
  ];

  const currentQari = qariList.find(q => q.id === selectedQari);

  const toggleFullAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const triggerAnim = (type, id) => {
    setClickedBtn(`${type}-${id}`);
    setTimeout(() => setClickedBtn(null), 300);
  };

  // --- FUNGSI SHARE AYAT ---
  const handleShare = (a) => {
    const text = `"${a.teksIndonesia}"\n\n(QS. ${detailSurah.namaLatin}: Ayat ${a.nomorAyat})\n\nBaca & Tadabburi di: ${window.location.origin}/surah/${detailSurah.nomor}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Tadabbur - ${detailSurah.namaLatin}`,
        text: text,
        url: window.location.href,
      }).catch((err) => console.log(err));
    } else {
      navigator.clipboard.writeText(text);
      alert("Ayat berhasil disalin!");
    }
    triggerAnim('share', a.nomorAyat);
  };

  return (
    <div className={`min-h-screen pb-44 transition-all duration-500 ${darkMode ? "dark bg-slate-950 text-white" : "bg-slate-50 text-slate-900"}`}>
      
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl z-[60] py-3 px-4 border-b dark:border-white/5 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl active:scale-90 transition-all">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
          </Link>

          <div className="flex flex-col items-center justify-center text-center overflow-hidden px-2">
            <h2 className="font-black uppercase text-[12px] md:text-sm tracking-[0.2em] text-emerald-600 leading-none truncate w-full">
              {detailSurah.namaLatin}
            </h2>
            <span className="block text-[9px] md:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight mt-1 truncate w-full">
              {detailSurah.arti}
            </span>
          </div>

          <div className="flex bg-slate-200/50 dark:bg-slate-800 p-1 rounded-xl border dark:border-white/5">
            <button onClick={() => dispatch(setViewMode("full"))} className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${viewMode === 'full' ? 'bg-white dark:bg-slate-700 shadow text-emerald-600' : 'text-slate-400'}`}>Full</button>
            <button onClick={() => dispatch(setViewMode("arabic"))} className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${viewMode === 'arabic' ? 'bg-white dark:bg-slate-700 shadow text-emerald-600' : 'text-slate-400'}`}>Arab</button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 md:px-0 pt-28">
        <div className="space-y-4 md:space-y-6">
          {detailSurah.ayat.map(a => {
            const isBookmarked = bookmark.find(b => b.surahNomor === detailSurah.nomor && b.ayatNomor === a.nomorAyat);
            const isLastRead = lastRead?.surahNomor === detailSurah.nomor && lastRead?.ayatNomor === a.nomorAyat;

            return (
              <div key={a.nomorAyat} className={`bg-white dark:bg-slate-900 p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-sm border transition-all ${isLastRead ? 'border-orange-500/50 ring-1 ring-orange-500/20' : 'border-slate-50 dark:border-white/5'}`}>
                
                <div className="flex justify-between items-center mb-8 bg-slate-50 dark:bg-white/5 p-3 rounded-2xl">
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-black transition-colors ${isLastRead ? 'bg-orange-500 text-white' : 'bg-slate-900 text-white'}`}>
                    {a.nomorAyat}
                  </span>
                  
                  <div className="flex gap-1 md:gap-2">
                    {/* Share Ayat */}
                    <button onClick={() => handleShare(a)} className={`p-2.5 rounded-xl transition-all ${clickedBtn === `share-${a.nomorAyat}` ? 'scale-125 text-blue-500' : 'text-slate-400 hover:text-emerald-500'}`}>
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6L15.316 7.342m0 0a3 3 0 110 5.316m0-5.316a3 3 0 110-5.316m0 5.316l-6.632 3.316" /></svg>
                    </button>

                    <button onClick={() => { new Audio(a.audio[selectedQari]).play(); triggerAnim('play', a.nomorAyat); }} className={`p-2.5 rounded-xl transition-all ${clickedBtn === `play-${a.nomorAyat}` ? 'scale-125 text-emerald-500' : 'text-slate-400'}`}>
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                    </button>

                    <button 
                      onClick={() => { 
                        dispatch(addBookmark({
                          surahNomor: detailSurah.nomor, 
                          surahName: detailSurah.namaLatin, 
                          ayatNomor: a.nomorAyat, 
                          teksArab: a.teksArab,
                          teksIndo: a.teksIndonesia
                        })); 
                        triggerAnim('fav', a.nomorAyat); 
                      }} 
                      className={`p-2.5 rounded-xl transition-all ${isBookmarked ? 'text-blue-500' : 'text-slate-300'}`}
                    >
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                    </button>

                    <button 
                      onClick={() => { dispatch(setLastRead({surahNomor: detailSurah.nomor, surahName: detailSurah.namaLatin, ayatNomor: a.nomorAyat})); triggerAnim('read', a.nomorAyat); }} 
                      className={`p-2.5 rounded-xl transition-all ${isLastRead ? 'text-orange-500 scale-110' : 'text-slate-300'}`}
                    >
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill={isLastRead ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </button>
                  </div>
                </div>

                <p className={`font-serif text-right transition-all duration-700 ${viewMode === 'arabic' ? 'text-4xl md:text-6xl leading-[5rem] md:leading-[7rem]' : 'text-3xl md:text-5xl leading-[4rem] md:leading-[6rem] mb-10'}`} dir="rtl">{a.teksArab}</p>
                
                {viewMode === 'full' && (
                  <div className="space-y-4 border-t border-slate-50 dark:border-white/5 pt-8 animate-fadeIn">
                    <p className="text-emerald-600 font-bold text-[11px] md:text-sm italic leading-relaxed">{a.teksLatin}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[13px] md:text-base leading-relaxed">{a.teksIndonesia}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl z-[70]">
        <div className="bg-slate-900/95 backdrop-blur-2xl p-4 rounded-[3rem] shadow-2xl border border-white/10 flex items-center justify-between">
          <button onClick={() => setShowQariModal(!showQariModal)} className="flex items-center gap-3 bg-white/10 p-2 pr-4 rounded-full active:scale-95 transition-all">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div className="text-left">
              <p className="text-[7px] text-white/40 font-black uppercase tracking-widest">Selected Imam</p>
              <p className="text-[10px] text-white font-black uppercase">{currentQari.name}</p>
            </div>
          </button>

          <div className="flex items-center gap-4">
            <audio ref={audioRef} key={selectedQari} src={detailSurah.audioFull[selectedQari]} onEnded={() => setIsPlaying(false)} />
            <button onClick={toggleFullAudio} className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-white text-slate-900' : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40'}`}>
               {isPlaying ? (
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
               ) : (
                 <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               )}
            </button>
          </div>
        </div>

        {showQariModal && (
          <div className="absolute bottom-24 left-0 w-full bg-white dark:bg-slate-900 rounded-[3rem] p-6 shadow-2xl border dark:border-white/5 animate-in slide-in-from-bottom-5">
            <div className="flex justify-between items-center mb-6 px-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Select Imam</p>
              <button onClick={() => setShowQariModal(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full"><svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {qariList.map(q => (
                <button key={q.id} onClick={() => { dispatch(setQari(q.id)); setShowQariModal(false); setIsPlaying(false); }} className={`flex items-center gap-3 p-4 rounded-[2rem] transition-all border-2 ${selectedQari === q.id ? 'bg-emerald-500/10 border-emerald-500' : 'bg-slate-50 dark:bg-white/5 border-transparent'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedQari === q.id ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg></div>
                  <p className={`text-[10px] font-black uppercase tracking-tighter ${selectedQari === q.id ? 'text-emerald-600' : 'text-slate-500'}`}>{q.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
