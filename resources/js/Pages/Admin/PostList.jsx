import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { BookOpen, Search, Download, Shield, Eye, Calendar, FileText } from 'lucide-react';
import { useState } from 'react';

export default function PostList({ posts, filters }) {
    const [search, setSearch] = useState(filters?.q || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/posts', { q: search }, { preserveState: true });
    };

    return (
        <AppLayout>
            <Head title="Monitoring Seluruh Artikel (Admin)" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9E7FD] text-[#5B4FE9] text-xs font-bold mb-2">
                            <Shield className="w-3.5 h-3.5" />
                            <span>Panel Monitoring Admin</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14122B]">Monitoring Seluruh Artikel</h1>
                        <p className="mt-1 text-sm text-[#6B6A80]">
                            Pemantauan seluruh artikel (read-only) dari seluruh penulis terdaftar.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="w-4 h-4 text-[#A3A2B5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari artikel atau penulis..."
                                className="w-64 pl-9 pr-4 py-2.5 text-xs rounded-xl border border-[#E8E7F0] focus:outline-none focus:border-[#5B4FE9] transition"
                            />
                        </form>

                        <a
                            href="/admin/posts/export"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5B4FE9] hover:bg-[#4A3FD1] text-white text-xs font-semibold shadow-sm transition"
                        >
                            <Download className="w-4 h-4" />
                            <span>Ekspor Seluruh Artikel</span>
                        </a>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#E8E7F0] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-[#14122B]">
                            <thead className="bg-[#FAFAFD] border-b border-[#E8E7F0] text-xs font-bold text-[#6B6A80] uppercase tracking-wider">
                                <tr>
                                    <th className="py-3.5 px-6">Artikel</th>
                                    <th className="py-3.5 px-4">Penulis</th>
                                    <th className="py-3.5 px-4">Kategori</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4">Tanggal Buat</th>
                                    <th className="py-3.5 px-6 text-right">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E8E7F0]">
                                {posts?.data?.map((p) => (
                                    <tr key={p.id} className="hover:bg-[#F4F3FF]/40 transition">
                                        <td className="py-4 px-6 max-w-sm">
                                            <div className="flex items-center gap-3">
                                                {p.cover_image_path ? (
                                                    <img
                                                        src={`/storage/${p.cover_image_path}`}
                                                        alt=""
                                                        className="w-10 h-10 rounded-lg object-cover border border-[#E8E7F0] shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-lg bg-[#E9E7FD] text-[#5B4FE9] flex items-center justify-center shrink-0">
                                                        <FileText className="w-5 h-5 opacity-50" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="font-bold text-[#14122B] line-clamp-1">{p.title}</p>
                                                    <p className="text-xs text-[#A3A2B5] font-mono">/{p.slug}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <p className="font-semibold text-xs text-[#14122B]">{p.user?.name || '-'}</p>
                                            <p className="text-[11px] text-[#A3A2B5]">{p.user?.email || ''}</p>
                                        </td>

                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F1F0F7] text-[#6B6A80]">
                                                {p.category}
                                            </span>
                                        </td>

                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                    p.is_published
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                                                }`}
                                            >
                                                {p.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>

                                        <td className="py-4 px-4 whitespace-nowrap text-xs text-[#A3A2B5]">
                                            {new Date(p.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </td>

                                        <td className="py-4 px-6 text-right whitespace-nowrap">
                                            {p.is_published ? (
                                                <Link
                                                    href={`/articles/${p.slug}`}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F4F3FF] hover:bg-[#E9E7FD] text-xs font-semibold text-[#5B4FE9] transition"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span>Lihat Publik</span>
                                                </Link>
                                            ) : (
                                                <span className="text-xs text-[#A3A2B5] italic">Draf Penulis</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

