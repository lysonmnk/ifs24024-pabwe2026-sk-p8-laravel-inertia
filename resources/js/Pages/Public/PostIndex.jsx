import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { Search, Calendar, User, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function PostIndex({ articles, categories, filters }) {
    const [search, setSearch] = useState(filters?.q || '');
    const [selectedCategory, setSelectedCategory] = useState(filters?.category || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/articles', {
            q: search,
            category: selectedCategory,
        }, { preserveState: true });
    };

    const handleCategoryClick = (cat) => {
        const nextCat = selectedCategory === cat ? '' : cat;
        setSelectedCategory(nextCat);
        router.get('/articles', {
            q: search,
            category: nextCat,
        }, { preserveState: true });
    };

    return (
        <AppLayout>
            <Head title="Jelajah Artikel & Gagasan Menarik" />

            {/* Hero Section */}
            <div className="bg-gradient-to-b from-white via-white to-transparent border-b border-[#E8E7F0] pb-16 pt-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E9E7FD] text-[#5B4FE9] text-xs font-semibold mb-6">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Platform Publikasi Artikel Multi-Tier</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#14122B] leading-tight">
                        Wadah Berbagi Gagasan, Pengetahuan, dan Cerita Inspiratif
                    </h1>
                    <p className="mt-4 text-lg text-[#6B6A80] max-w-2xl mx-auto leading-relaxed">
                        Temukan ragam artikel berkualitas dari para penulis terpercaya atau mulai publikasikan tulisan Anda dengan editor Markdown modern.
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto flex items-center relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#52506B]">
                            <Search className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            aria-label="Cari artikel berdasarkan judul atau isi konten"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari artikel berdasarkan judul atau isi konten..."
                            className="w-full pl-11 pr-28 py-3.5 rounded-full bg-white border border-[#E8E7F0] text-sm text-[#14122B] placeholder-[#52506B] shadow-[0_8px_24px_rgba(20,18,43,0.06)] focus:outline-none focus:border-[#5B4FE9] focus:ring-2 focus:ring-[#5B4FE9]/20 transition"
                        />
                        <button
                            type="submit"
                            aria-label="Cari artikel"
                            className="absolute right-2 top-1.5 bottom-1.5 px-5 rounded-full bg-[#3557EC] hover:bg-[#2A4BD9] text-white text-xs font-semibold transition cursor-pointer shadow-sm"
                        >
                            Cari
                        </button>
                    </form>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Category Chips */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
                    <button
                        onClick={() => handleCategoryClick('')}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition shrink-0 cursor-pointer ${
                            !selectedCategory
                                ? 'bg-[#5B4FE9] text-white shadow-sm'
                                : 'bg-white border border-[#E8E7F0] text-[#6B6A80] hover:text-[#14122B]'
                        }`}
                    >
                        Semua Kategori
                    </button>
                    {categories?.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-semibold transition shrink-0 cursor-pointer ${
                                selectedCategory === cat
                                    ? 'bg-[#5B4FE9] text-white shadow-sm'
                                    : 'bg-white border border-[#E8E7F0] text-[#6B6A80] hover:text-[#14122B]'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Article Grid */}
                {articles?.data?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.data.map((article) => (
                            <article
                                key={article.id}
                                className="bg-white rounded-2xl border border-[#E8E7F0] shadow-[0_1px_2px_rgba(20,18,43,0.04),0_8px_24px_rgba(20,18,43,0.06)] hover:shadow-[0_12px_32px_rgba(20,18,43,0.1)] transition flex flex-col overflow-hidden group"
                            >
                                {article.cover_image_path ? (
                                    <div className="h-48 overflow-hidden bg-slate-100">
                                        <img
                                            src={`/storage/${article.cover_image_path}`}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-44 bg-gradient-to-br from-[#F4F3FF] to-[#E9E7FD] flex items-center justify-center text-[#5B4FE9]">
                                        <BookOpen className="w-10 h-10 opacity-40" />
                                    </div>
                                )}

                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E9E7FD] text-[#3557EC]">
                                                {article.category}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-[#52506B]">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>
                                                    {article.published_at
                                                        ? new Date(article.published_at).toLocaleDateString('id-ID', {
                                                              day: 'numeric',
                                                              month: 'short',
                                                              year: 'numeric',
                                                          })
                                                        : '-'}
                                                </span>
                                            </span>
                                        </div>

                                        <h2 className="text-lg font-bold text-[#14122B] group-hover:text-[#3557EC] transition line-clamp-2 leading-snug">
                                            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                                        </h2>

                                        <p className="mt-2 text-xs text-[#6B6A80] line-clamp-3 leading-relaxed">
                                            {article.excerpt || 'Baca selengkapnya untuk menjelajahi isi pembahasan lengkap artikel ini...'}
                                        </p>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-[#E8E7F0] flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2 text-[#6B6A80]">
                                            <div className="w-6 h-6 rounded-full bg-[#E8E7F0] flex items-center justify-center font-bold text-xs text-[#14122B]">
                                                {article.user?.name ? article.user.name.charAt(0) : 'U'}
                                            </div>
                                            <span className="font-medium text-[#14122B]">{article.user?.name || 'Penulis'}</span>
                                        </div>

                                        <Link
                                            href={`/articles/${article.slug}`}
                                            className="inline-flex items-center gap-1 font-semibold text-[#3557EC] hover:text-[#2A4BD9] transition"
                                        >
                                            <span>Baca</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-[#E8E7F0] p-8">
                        <BookOpen className="w-12 h-12 text-[#52506B] mx-auto mb-4 opacity-50" />
                        <h2 className="text-lg font-bold text-[#14122B]">Belum Ada Artikel Ditemukan</h2>
                        <p className="mt-1 text-sm text-[#6B6A80] max-w-md mx-auto">
                            Tidak ada artikel yang cocok dengan filter atau pencarian Anda. Coba reset filter untuk melihat seluruh publikasi.
                        </p>
                        <button
                            onClick={() => {
                                setSearch('');
                                setSelectedCategory('');
                                router.get('/articles');
                            }}
                            className="mt-6 px-4 py-2 rounded-full bg-[#3557EC] text-white text-xs font-semibold hover:bg-[#2A4BD9] transition cursor-pointer"
                        >
                            Reset Filter Pencarian
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {articles?.links && articles.links.length > 3 && (
                    <div className="mt-12 flex justify-center items-center gap-1">
                        {articles.links.map((link, index) => {
                            if (!link.url) {
                                return (
                                    <span
                                        key={index}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className="px-3 py-1.5 rounded-lg text-xs text-[#52506B] opacity-50"
                                    />
                                );
                            }
                            return (
                                <Link
                                    key={index}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                                        link.active
                                            ? 'bg-[#3557EC] text-white'
                                            : 'bg-white border border-[#E8E7F0] text-[#6B6A80] hover:text-[#14122B]'
                                    }`}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

