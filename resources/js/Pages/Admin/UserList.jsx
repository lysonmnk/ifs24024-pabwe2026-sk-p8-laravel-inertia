import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { Users, Search, BookOpen, Shield, User as UserIcon } from 'lucide-react';
import { useState } from 'react';

export default function UserList({ users, filters }) {
    const [search, setSearch] = useState(filters?.q || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/users', { q: search }, { preserveState: true });
    };

    return (
        <AppLayout>
            <Head title="Kelola Pengguna (Admin)" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9E7FD] text-[#5B4FE9] text-xs font-bold mb-2">
                            <Shield className="w-3.5 h-3.5" />
                            <span>Panel Administrator</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14122B]">Manajemen Pengguna</h1>
                        <p className="mt-1 text-sm text-[#6B6A80]">
                            Pantau seluruh pengguna terdaftar, peran, serta karya artikel mereka.
                        </p>
                    </div>

                    <form onSubmit={handleSearch} className="max-w-md w-full relative">
                        <Search className="w-4 h-4 text-[#52506B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            aria-label="Cari pengguna berdasarkan nama atau email"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari pengguna berdasarkan nama atau email..."
                            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-[#E8E7F0] focus:outline-none focus:border-[#5B4FE9] transition"
                        />
                    </form>
                </div>

                <div className="bg-white rounded-2xl border border-[#E8E7F0] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-[#14122B]">
                            <thead className="bg-[#FAFAFD] border-b border-[#E8E7F0] text-xs font-bold text-[#6B6A80] uppercase tracking-wider">
                                <tr>
                                    <th className="py-3.5 px-6">Pengguna</th>
                                    <th className="py-3.5 px-4">Peran (Role)</th>
                                    <th className="py-3.5 px-4">Jumlah Artikel</th>
                                    <th className="py-3.5 px-4">Terdaftar Sejak</th>
                                    <th className="py-3.5 px-6 text-right">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E8E7F0]">
                                {users?.data?.map((u) => (
                                    <tr key={u.id} className="hover:bg-[#F4F3FF]/40 transition">
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-[#E9E7FD] text-[#5B4FE9] flex items-center justify-center font-bold text-xs shrink-0">
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#14122B]">{u.name}</p>
                                                    <p className="text-xs text-[#52506B] font-medium">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                    u.role === 'Admin'
                                                        ? 'bg-purple-100 text-[#5B4FE9]'
                                                        : 'bg-slate-100 text-slate-700'
                                                }`}
                                            >
                                                {u.role}
                                            </span>
                                        </td>

                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <span className="font-semibold text-xs text-[#14122B]">
                                                {u.posts_count || 0} artikel
                                            </span>
                                        </td>

                                        <td className="py-4 px-4 whitespace-nowrap text-xs text-[#52506B] font-medium">
                                            {new Date(u.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </td>

                                        <td className="py-4 px-6 text-right whitespace-nowrap">
                                            <Link
                                                href={`/admin/users/${u.id}/posts`}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4F3FF] hover:bg-[#E9E7FD] text-xs font-semibold text-[#5B4FE9] transition"
                                            >
                                                <BookOpen className="w-3.5 h-3.5" />
                                                <span>Monitoring Artikel</span>
                                            </Link>
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

