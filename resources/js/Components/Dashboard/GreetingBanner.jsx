import { Plus } from 'lucide-react';

export default function GreetingBanner({ memberName = 'Penulis', onAddArticle }) {
    return (
        <section 
            aria-label="Sapaan Member"
            className="w-full bg-[#5873E0] text-white rounded-[20px] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm"
        >
            <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Halo, {memberName}!
                </h1>
                <p className="text-white/85 text-sm sm:text-base max-w-xl font-normal">
                    Kelola seluruh karya tulismu, pantau performa publikasi, dan buat draf baru hari ini.
                </p>
            </div>

            {/* Satu-satunya Tombol Primer di Halaman */}
            <button
                type="button"
                onClick={onAddArticle}
                aria-label="Tambah Artikel Baru"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-[#2B3252] hover:bg-white/95 text-sm font-bold rounded-full transition-transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30 shrink-0 min-h-[44px] shadow-sm cursor-pointer"
            >
                <Plus className="w-5 h-5 text-[#5873E0] stroke-[2.5]" />
                <span>Tambah Artikel</span>
            </button>
        </section>
    );
}
