export const SkeletonCard = () => (
  <div className="bg-white dark:bg-slate-900 p-8 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 animate-pulse flex flex-col justify-between h-56 transition-colors">
    <div className="flex justify-between items-start">
      <div className="flex gap-4">
        {/* Nomor Surah */}
        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
        {/* Nama Latin & Arti */}
        <div className="space-y-3">
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-full w-28"></div>
          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-20"></div>
        </div>
      </div>
      {/* Nama Arab */}
      <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl w-16"></div>
    </div>
    
    {/* Bottom Info */}
    <div className="pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
      <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-24"></div>
      <div className="h-3 bg-slate-50 dark:bg-slate-800 rounded-full w-16"></div>
    </div>
  </div>
);

export const SkeletonAyat = () => (
  <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0f1a] animate-pulse transition-colors">
    {/* Header Skeleton */}
    <div className="bg-emerald-600/20 dark:bg-slate-900 h-[350px] rounded-b-[60px] md:rounded-b-[120px] flex items-center justify-center flex-col gap-4">
        <div className="h-16 bg-white/10 rounded-full w-64"></div>
        <div className="h-4 bg-white/5 rounded-full w-40"></div>
    </div>

    {/* Content Skeleton */}
    <div className="container mx-auto max-w-4xl px-6 -mt-16 space-y-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-[4rem] space-y-10 border border-slate-100 dark:border-slate-800 shadow-sm">
          {/* Action Bar Skeleton */}
          <div className="flex justify-between items-center">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
            </div>
          </div>

          {/* Ayat Arab Skeleton */}
          <div className="space-y-4 flex flex-col items-end">
            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full"></div>
            <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl w-3/4"></div>
          </div>

          {/* Latin & Terjemahan Skeleton */}
          <div className="space-y-3 pt-6 border-t border-slate-50 dark:border-slate-800">
            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-full"></div>
            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
