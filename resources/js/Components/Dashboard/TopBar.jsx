import { Search, Menu } from 'lucide-react';

export default function TopBar({ search, setSearch, onSearchSubmit, member, onOpenMobileMenu }) {
    return (
        <header className="flex items-center justify-between gap-4 pb-6">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-3 md:hidden">
                <button
                    type="button"
                    onClick={onOpenMobileMenu}
                    aria-label="Buka menu navigasi"
                    className="p-2.5 rounded-full bg-[#333B5E] text-[#A9B0CC] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#5873E0] min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <span className="text-white font-bold text-lg">Blog.</span>
            </div>

            {/* Kolom Pencarian Artikel Pribadi (Search Icon di Kanan) */}
            <form onSubmit={onSearchSubmit} className="relative flex-1 max-w-md">
                <label htmlFor="dashboard-search" className="sr-only">
                    Cari artikel pribadi
                </label>
                <input
                    id="dashboard-search"
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari artikel saya..."
                    className="w-full bg-[#333B5E] text-white placeholder-[#A9B0CC] text-sm rounded-full pl-5 pr-11 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5873E0] border border-transparent transition-all min-h-[44px]"
                />
                <button
                    type="submit"
                    aria-label="Kirim pencarian"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-[#A9B0CC] hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#5873E0] min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
                >
                    <Search className="w-4 h-4" />
                </button>
            </form>

            {/* Avatar & Nama Pengguna */}
            <div className="flex items-center gap-3 shrink-0">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-white leading-tight">
                        {member?.name || 'Member'}
                    </p>
                    <p className="text-xs text-[#A9B0CC] leading-tight">
                        Penulis Konten
                    </p>
                </div>
                <div 
                    aria-label={`Avatar pengguna ${member?.name || 'Member'}`}
                    className="w-10 h-10 rounded-full bg-[#5873E0] text-white font-semibold flex items-center justify-center border-2 border-[#333B5E] shadow-sm select-none"
                >
                    {member?.name ? member.name.charAt(0).toUpperCase() : 'M'}
                </div>
            </div>
        </header>
    );
}
