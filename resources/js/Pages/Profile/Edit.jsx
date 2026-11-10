import { Head, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { User, Mail, Lock, CheckCircle2, Loader2 } from 'lucide-react';

export default function Edit({ user }) {
    // Profile info form
    const profileForm = useForm({
        name: user.name || '',
        email: user.email || '',
    });

    // Password change form
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        profileForm.put('/profile');
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.put('/profile/password', {
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <AppLayout>
            <Head title="Pengaturan Profil" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-[#14122B]">Pengaturan Akun & Profil</h1>
                    <p className="text-xs text-[#6B6A80] mt-1">Perbarui data identitas pribadi dan amankan kata sandi akun Anda.</p>
                </div>

                {/* Profile Information Form */}
                <div className="bg-white rounded-2xl border border-[#E8E7F0] shadow-sm p-6 sm:p-8">
                    <h2 className="text-base font-bold text-[#14122B] mb-1">Informasi Profil</h2>
                    <p className="text-xs text-[#6B6A80] mb-6">Nama Anda akan ditampilkan pada setiap artikel yang dipublikasikan.</p>

                    <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-lg">
                        <div>
                            <label className="block text-xs font-bold text-[#14122B] mb-1">Nama Lengkap</label>
                            <div className="relative">
                                <User className="w-4 h-4 text-[#A3A2B5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    required
                                    value={profileForm.data.name}
                                    onChange={(e) => profileForm.setData('name', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E7F0] text-sm focus:outline-none focus:border-[#5B4FE9]"
                                />
                            </div>
                            {profileForm.errors.name && (
                                <p className="mt-1 text-xs text-red-600">{profileForm.errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#14122B] mb-1">Alamat Email</label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-[#A3A2B5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    required
                                    value={profileForm.data.email}
                                    onChange={(e) => profileForm.setData('email', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E7F0] text-sm focus:outline-none focus:border-[#5B4FE9]"
                                />
                            </div>
                            {profileForm.errors.email && (
                                <p className="mt-1 text-xs text-red-600">{profileForm.errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#14122B] mb-1">Peran Akun</label>
                            <input
                                type="text"
                                disabled
                                value={user.role}
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E8E7F0] bg-[#FAFAFD] text-sm text-[#A3A2B5]"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={profileForm.processing}
                                className="px-5 py-2.5 rounded-xl bg-[#5B4FE9] hover:bg-[#4A3FD1] text-white text-xs font-bold transition disabled:opacity-50 cursor-pointer shadow-sm"
                            >
                                {profileForm.processing ? 'Menyimpan...' : 'Simpan Profil'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Password Update Form */}
                <div className="bg-white rounded-2xl border border-[#E8E7F0] shadow-sm p-6 sm:p-8">
                    <h2 className="text-base font-bold text-[#14122B] mb-1">Ubah Kata Sandi</h2>
                    <p className="text-xs text-[#6B6A80] mb-6">Pastikan akun Anda menggunakan kata sandi yang panjang dan acak demi keamanan.</p>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
                        <div>
                            <label className="block text-xs font-bold text-[#14122B] mb-1">Kata Sandi Saat Ini</label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-[#A3A2B5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="password"
                                    required
                                    value={passwordForm.data.current_password}
                                    onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E7F0] text-sm focus:outline-none focus:border-[#5B4FE9]"
                                />
                            </div>
                            {passwordForm.errors.current_password && (
                                <p className="mt-1 text-xs text-red-600">{passwordForm.errors.current_password}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#14122B] mb-1">Kata Sandi Baru</label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-[#A3A2B5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="password"
                                    required
                                    value={passwordForm.data.password}
                                    onChange={(e) => passwordForm.setData('password', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E7F0] text-sm focus:outline-none focus:border-[#5B4FE9]"
                                />
                            </div>
                            {passwordForm.errors.password && (
                                <p className="mt-1 text-xs text-red-600">{passwordForm.errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#14122B] mb-1">Konfirmasi Kata Sandi Baru</label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-[#A3A2B5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="password"
                                    required
                                    value={passwordForm.data.password_confirmation}
                                    onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E7F0] text-sm focus:outline-none focus:border-[#5B4FE9]"
                                />
                            </div>
                            {passwordForm.errors.password_confirmation && (
                                <p className="mt-1 text-xs text-red-600">{passwordForm.errors.password_confirmation}</p>
                            )}
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={passwordForm.processing}
                                className="px-5 py-2.5 rounded-xl bg-[#5B4FE9] hover:bg-[#4A3FD1] text-white text-xs font-bold transition disabled:opacity-50 cursor-pointer shadow-sm"
                            >
                                {passwordForm.processing ? 'Menyimpan...' : 'Perbarui Kata Sandi'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

