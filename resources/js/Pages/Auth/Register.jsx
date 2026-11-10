import { Head, Link, useForm } from '@inertiajs/react';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-[#F1F0F7] flex flex-col justify-center items-center px-4 py-12">
            <Head title="Daftar Akun Penulis" />

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block text-3xl font-bold tracking-tight text-[#14122B]">
                        Blog<span className="text-[#5B4FE9]">.</span>
                    </Link>
                    <p className="mt-2 text-sm text-[#6B6A80]">
                        Bergabunglah dan mulai publikasikan karya Anda.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(20,18,43,0.06)] border border-[#E8E7F0] p-8">
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[#14122B] mb-1.5" htmlFor="name">
                                Nama Lengkap
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A3A2B5]">
                                    <User className="h-5 w-5" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E7F0] text-sm focus:outline-none focus:border-[#5B4FE9] focus:ring-2 focus:ring-[#5B4FE9]/20 transition"
                                    placeholder="Nama Lengkap Anda"
                                    required
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#14122B] mb-1.5" htmlFor="email">
                                Alamat Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A3A2B5]">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E7F0] text-sm focus:outline-none focus:border-[#5B4FE9] focus:ring-2 focus:ring-[#5B4FE9]/20 transition"
                                    placeholder="nama@contoh.com"
                                    required
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#14122B] mb-1.5" htmlFor="password">
                                Kata Sandi
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A3A2B5]">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E7F0] text-sm focus:outline-none focus:border-[#5B4FE9] focus:ring-2 focus:ring-[#5B4FE9]/20 transition"
                                    placeholder="Minimal 8 karakter"
                                    required
                                />
                            </div>
                            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#14122B] mb-1.5" htmlFor="password_confirmation">
                                Konfirmasi Kata Sandi
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A3A2B5]">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E7F0] text-sm focus:outline-none focus:border-[#5B4FE9] focus:ring-2 focus:ring-[#5B4FE9]/20 transition"
                                    placeholder="Ulangi kata sandi"
                                    required
                                />
                            </div>
                            {errors.password_confirmation && (
                                <p className="mt-1 text-xs text-red-600">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full mt-2 py-3 px-4 rounded-xl bg-[#5B4FE9] hover:bg-[#4A3FD1] text-white font-medium text-sm flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-sm"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Mendaftarkan...</span>
                                </>
                            ) : (
                                <>
                                    <span>Daftar Akun</span>
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-[#E8E7F0] text-center text-sm text-[#6B6A80]">
                        Sudah punya akun?{' '}
                        <Link href="/login" className="text-[#5B4FE9] font-medium hover:underline">
                            Masuk sekarang
                        </Link>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-[#A3A2B5]">
                    <Link href="/" className="hover:text-[#6B6A80] transition">
                        &larr; Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}

