import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { ArrowLeft, Download, Eye, FileText, User } from 'lucide-react';

export default function UserPostList({ targetUser, posts, filters }) {
    return (
        <AppLayout>
            <Head title={`Artikel oleh ${targetUser.name}`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <Link
                        href="/admin/users"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B6A80] hover:text-[#5B4FE9] transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Manajemen Pengguna</span>
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-8 h-8 rounded-full bg-[#E9E7FD] text-[#5B4FE9] flex items-center justify-center font-bold text-xs">
                                {targetUser.name.charAt(0)}
                            </span>
                            <h1 className="text-2xl font-extrabold text-[#14122B]">Artikel oleh {targetUser.name}</h1>
                        </div>
                        <p className="text-xs text-[#6B6A80]">
                            {targetUser.email} &bull; Peran: <span className="font-semibold">{targetUser.role}</span> &bull; Total {posts?.total || 0} artikel
                        </p>
                    </div>

                    <a
                        href={`/admin/users/${targetUser.id}/posts/export`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5B4FE9] hover:bg-[#4A3FD1] text-white text-xs font-semibold shadow-sm transition"
                    >
                        <Download className="w-4 h-4" />
                        <span>Ekspor Artikel Pengguna Ini</span>
                    </a>
                </div>

                <div className="bg-white rounded-2xl border border-[#E8E7F0] shadow-sm overflow-hidden">
                    {posts?.data?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-[#14122B]">
                                <thead className="bg-[#FAFAFD] border-b border-[#E8E7F0] text-xs font-bold text-[#6B6A80] uppercase tracking-wider">
                                    <tr>
                                        <th className="py-3.5 px-6">Artikel</th>
                                        <th className="py-3.5 px-4">Kategori</th>
                                        <th className="py-3.5 px-4">Status</th>
                                        <th className="py-3.5 px-4">Tanggal Buat</th>
                                        <th className="py-3.5 px-6 text-right">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E8E7F0]">
                                    {posts.data.map((p) => (
                                        <tr key={p.id} className="hover:bg-[#F4F3FF]/40 transition">
                                            <td className="py-4 px-6 max-w-sm">
                                                <p className="font-bold text-[#14122B] line-clamp-1">{p.title}</p>
                                                <p className="text-xs text-[#52506B] font-mono font-medium">/{p.slug}</p>
                                            </td>

                                            <td className="py-4 px-4 whitespace-nowrap">
                                                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F1F0F7] text-[#52506B]">
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

                                            <td className="py-4 px-4 whitespace-nowrap text-xs text-[#52506B] font-medium">
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
                                                    <span className="text-xs text-[#52506B] italic font-medium">Draf Penulis</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="py-16 text-center">
                            <FileText className="w-12 h-12 text-[#52506B] mx-auto mb-3 opacity-40" />
                            <h3 className="text-base font-bold text-[#14122B]">Pengguna ini belum memiliki artikel</h3>
                            <p className="text-xs text-[#6B6A80] mt-1">
                                Belum ada karya tulis yang dibuat oleh {targetUser.name}.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

