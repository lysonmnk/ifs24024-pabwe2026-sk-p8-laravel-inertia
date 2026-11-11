import { 
    MoreVertical, 
    FileText, 
    Eye, 
    Edit2, 
    Trash2, 
    RefreshCw, 
    SearchX, 
    Plus,
    AlertCircle
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function ArticleList({
    posts = [],
    isSearchActive = false,
    onResetSearch,
    onAddArticle,
    onTogglePublish,
    onEditArticle,
    onDeleteRequest,
    onViewDetail,
    errorMessage,
    onRetry,
    showAll,
    setShowAll,
}) {
    const [openKebabId, setOpenKebabId] = useState(null);
    const dropdownRef = useRef(null);

    // Tutup kebab menu jika klik di luar
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenKebabId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const displayedPosts = showAll ? posts : posts.slice(0, 5);

    // 1. STATE: Error
    if (errorMessage) {
        return (
            <div className="bg-[#333B5E] p-8 rounded-[20px] text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#FBBF24]/20 text-[#FBBF24] flex items-center justify-center">
                    <AlertCircle className="w-6 h-6" />
                </div>
                <p className="text-white font-semibold text-base">{errorMessage}</p>
                <button
                    type="button"
                    onClick={onRetry}
                    className="px-6 py-2.5 rounded-full bg-[#5873E0] hover:bg-[#4762cf] text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#5873E0] min-h-[44px]"
                >
                    Coba lagi
                </button>
            </div>
        );
    }

    // 2. STATE: Hasil Pencarian Kosong
    if (posts.length === 0 && isSearchActive) {
        return (
            <div className="bg-[#333B5E] p-8 rounded-[20px] text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#3A4366] text-[#A9B0CC] flex items-center justify-center">
                    <SearchX className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                    <p className="text-white font-semibold text-base">Artikel tidak ditemukan.</p>
                    <p className="text-xs text-[#A9B0CC]">Coba gunakan kata kunci pencarian yang lain.</p>
                </div>
                <button
                    type="button"
                    onClick={onResetSearch}
                    className="px-6 py-2.5 rounded-full bg-[#3A4366] hover:bg-[#434d75] text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#5873E0] min-h-[44px]"
                >
                    Reset pencarian
                </button>
            </div>
        );
    }

    // 3. STATE: Kosong Belum Ada Artikel
    if (posts.length === 0) {
        return (
            <div className="bg-[#333B5E] p-10 rounded-[20px] text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#3A4366] text-[#5873E0] flex items-center justify-center">
                    <FileText className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                    <p className="text-white font-bold text-base">Belum ada artikel.</p>
                    <p className="text-xs text-[#A9B0CC]">Tulis artikel pertamamu dan publikasikan ke pembaca.</p>
                </div>
                <button
                    type="button"
                    onClick={onAddArticle}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5873E0] hover:bg-[#4762cf] text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#5873E0] min-h-[44px]"
                >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Artikel</span>
                </button>
            </div>
        );
    }

    // 4. DAFTAR ARTIKEL (List View)
    return (
        <section aria-label="Daftar Artikel Saya" className="space-y-4">
            {/* Header Daftar */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white tracking-tight">
                    Artikel Saya
                </h2>
                {posts.length > 5 && (
                    <button
                        type="button"
                        onClick={() => setShowAll(!showAll)}
                        aria-label={showAll ? 'Tampilkan lebih sedikit artikel' : 'Lihat semua artikel'}
                        className="text-xs font-semibold text-[#A9B0CC] hover:text-white px-3 py-1.5 rounded-full hover:bg-[#333B5E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5873E0] min-h-[36px]"
                    >
                        {showAll ? 'Tampilkan sedikit' : 'Lihat semua'}
                    </button>
                )}
            </div>

            {/* List Rows */}
            <div className="space-y-3" ref={dropdownRef}>
                {displayedPosts.map((post) => {
                    const isPublished = Boolean(post.is_published);
                    const formattedDate = post.formatted_date || (post.created_at ? new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-');

                    return (
                        <article
                            key={post.id}
                            className="min-h-[72px] bg-[#333B5E] hover:bg-[#384166] transition-colors rounded-[16px] px-4 py-3 sm:py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative"
                        >
                            {/* Kiri: Cover Thumbnail + Judul & Info */}
                            <div className="flex items-center gap-3.5 min-w-0 flex-1">
                                {/* Thumbnail Cover */}
                                <div className="w-12 h-12 rounded-[10px] bg-[#3A4366] overflow-hidden shrink-0 flex items-center justify-center border border-white/10">
                                    {post.cover_image ? (
                                        <img
                                            src={post.cover_image.startsWith('http') ? post.cover_image : `/storage/${post.cover_image}`}
                                            alt={`Sampul ${post.title}`}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <FileText className="w-5 h-5 text-[#A9B0CC]" aria-hidden="true" />
                                    )}
                                </div>

                                {/* Judul, Kategori & Tanggal */}
                                <div className="min-w-0 space-y-0.5">
                                    <h3 className="text-sm font-bold text-white truncate hover:text-[#5873E0] transition-colors">
                                        <button 
                                            type="button" 
                                            onClick={() => onViewDetail && onViewDetail(post)} 
                                            className="text-left truncate w-full focus:outline-none focus:underline"
                                        >
                                            {post.title}
                                        </button>
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-[#A9B0CC]">
                                        <span className="font-medium text-[#A9B0CC]">
                                            {post.category || 'Umum'}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-[#A9B0CC]/40" />
                                        <span>{formattedDate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Kanan: Badge Status + Tombol Cepat + Kebab Menu */}
                            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-white/5">
                                {/* Badge Status (Wajib ada teks!) */}
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide inline-flex items-center gap-1.5 ${
                                        isPublished
                                            ? 'bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30'
                                            : 'bg-[#A9B0CC]/15 text-[#A9B0CC] border border-[#A9B0CC]/30'
                                    }`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-[#4ADE80]' : 'bg-[#A9B0CC]'}`} />
                                    {isPublished ? 'Published' : 'Draft'}
                                </span>

                                {/* Tombol Cepat Ubah Status */}
                                <button
                                    type="button"
                                    onClick={() => onTogglePublish(post)}
                                    aria-label={isPublished ? `Ubah "${post.title}" menjadi draft` : `Publikasikan "${post.title}"`}
                                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#3A4366] hover:bg-[#434d75] text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#5873E0] min-h-[36px]"
                                >
                                    {isPublished ? 'Jadikan Draft' : 'Publish'}
                                </button>

                                {/* Kebab Menu Trigger */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setOpenKebabId(openKebabId === post.id ? null : post.id)}
                                        aria-label={`Menu tindakan untuk ${post.title}`}
                                        aria-expanded={openKebabId === post.id}
                                        className="p-2 rounded-full text-[#A9B0CC] hover:text-white hover:bg-[#3A4366] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5873E0] min-h-[40px] min-w-[40px] flex items-center justify-center"
                                    >
                                        <MoreVertical className="w-5 h-5" />
                                    </button>

                                    {/* Kebab Dropdown Menu */}
                                    {openKebabId === post.id && (
                                        <div 
                                            role="menu"
                                            className="absolute right-0 bottom-full sm:bottom-auto sm:top-full mb-1 sm:mb-0 sm:mt-1 w-40 bg-[#3A4366] rounded-[16px] shadow-2xl border border-white/10 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100"
                                        >
                                            <button
                                                type="button"
                                                role="menuitem"
                                                onClick={() => {
                                                    setOpenKebabId(null);
                                                    if (onViewDetail) onViewDetail(post);
                                                }}
                                                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#A9B0CC] hover:text-white hover:bg-[#333B5E] min-h-[36px] text-left"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span>Detail</span>
                                            </button>
                                            <button
                                                type="button"
                                                role="menuitem"
                                                onClick={() => {
                                                    setOpenKebabId(null);
                                                    if (onEditArticle) onEditArticle(post);
                                                }}
                                                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#A9B0CC] hover:text-white hover:bg-[#333B5E] min-h-[36px] text-left"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                <span>Ubah</span>
                                            </button>
                                            <button
                                                type="button"
                                                role="menuitem"
                                                onClick={() => {
                                                    setOpenKebabId(null);
                                                    if (onDeleteRequest) onDeleteRequest(post);
                                                }}
                                                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-[#333B5E] min-h-[36px] text-left"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span>Hapus</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
