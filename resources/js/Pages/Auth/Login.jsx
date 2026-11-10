import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-[#F1F0F7] flex flex-col justify-center items-center px-4 py-12">
            <Head title="Masuk ke Akun" />

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block text-3xl font-bold tracking-tight text-[#14122B]">
                        Blog<span className="text-[#5B4FE9]">.</span>
                    </Link>
                    <p className="mt-2 text-sm text-[#6B6A80]">
                        Masuk untuk mengelola artikel dan berinteraksi di platform.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(20,18,43,0.06)] border border-[#E8E7F0] p-8">
                    {errors.email && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
                            {errors.email}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-[#14122B] mb-1.5" htmlFor="login-username">
                                Alamat Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A3A2B5]">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    id="login-username"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E7F0] text-sm focus:outline-none focus:border-[#5B4FE9] focus:ring-2 focus:ring-[#5B4FE9]/20 transition"
                                    placeholder="nama@contoh.com"
                                    autoComplete="username"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#14122B] mb-1.5" htmlFor="login-password">
                                Kata Sandi
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A3A2B5]">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    id="login-password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E7F0] text-sm focus:outline-none focus:border-[#5B4FE9] focus:ring-2 focus:ring-[#5B4FE9]/20 transition"
                                    placeholder="Minimal 8 karakter"
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-[#E8E7F0] text-[#5B4FE9] focus:ring-[#5B4FE9]"
                                />
                                <span className="text-[#6B6A80]">Ingat saya</span>
                            </label>
                        </div>

                        <button
                            id="login-submit"
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 px-4 rounded-xl bg-[#5B4FE9] hover:bg-[#4A3FD1] text-white font-medium text-sm flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-sm"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                <>
                                    <span>Masuk</span>
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-[#E8E7F0] text-center text-sm text-[#6B6A80]">
                        Belum memiliki akun?{' '}
                        <Link href="/register" className="text-[#5B4FE9] font-medium hover:underline">
                            Daftar sebagai penulis
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

