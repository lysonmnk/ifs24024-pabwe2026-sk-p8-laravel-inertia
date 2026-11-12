import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { BookOpen, ArrowRight, Lock, Eye, EyeOff, ShieldCheck, Zap, CheckCircle2, AtSign, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function Login() {
    const pageProps = usePage()?.props || {};
    const csrfToken = pageProps.csrf_token;
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset, transform } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    const combinedErrors = { ...errors, ...pageProps.errors };

    const submit = (e) => {
        const usernameEl = document.getElementById('login-username');
        const hiddenEl = document.getElementById('login-username-hidden');
        if (usernameEl) {
            let val = (usernameEl.value || '').trim();
            if (val.toLowerCase() === 'admin' || val.toLowerCase() === 'ifs24024' || val.toLowerCase() === 'administrator') {
                usernameEl.value = 'admin@example.com';
            } else if (val.toLowerCase() === 'user' || val.toLowerCase() === 'member') {
                usernameEl.value = 'user@example.com';
            }
            if (hiddenEl) {
                hiddenEl.value = usernameEl.value;
            }
        }
    };

    const handleQuickFill = (roleEmail) => {
        setData({
            email: roleEmail,
            password: 'password123',
            remember: true,
        });
    };

    return (
        <div className="min-h-screen bg-[#101322] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#4E6EF2] relative overflow-hidden">
            <Head title="Masuk ke Akun - Blog" />

            {/* Ambient background glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4E6EF2]/15 rounded-full blur-[140px] pointer-events-none" />

            {/* Header Nav */}
            <header className="w-full max-w-6xl mx-auto flex items-center justify-between z-10">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#4E6EF2] flex items-center justify-center text-white shadow-md">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">Blog</span>
                </Link>

                <div className="flex items-center gap-1.5 text-xs text-[#8F9BB7]">
                    <span>Need assistance?</span>
                    <a href="#support" className="text-white font-semibold hover:underline">Support</a>
                </div>
            </header>

            {/* Main Center Card */}
            <main className="w-full max-w-[460px] mx-auto my-8 z-10">
                <div className="bg-[#1A1F36] rounded-[28px] border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
                    {/* Top Icon & Heading */}
                    <div className="text-center space-y-2">
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#4E6EF2] flex items-center justify-center text-white shadow-lg">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-black text-white tracking-tight">
                            Selamat Datang Kembali
                        </h1>
                        <p className="text-xs text-[#8F9BB7] leading-relaxed">
                            Akses ruang editorial dan terbitkan narasi terbaik Anda.
                        </p>
                    </div>

                    {/* Navigation Tabs (Masuk vs Daftar) */}
                    <div className="grid grid-cols-2 p-1.5 rounded-full bg-[#121526] border border-white/5 gap-1.5">
                        <button
                            type="button"
                            className="w-full py-2.5 rounded-full bg-[#4E6EF2] text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2"
                        >
                            <ArrowRight className="w-3.5 h-3.5" />
                            <span>Masuk</span>
                        </button>
                        <Link
                            href="/register"
                            className="w-full py-2.5 rounded-full text-[#8F9BB7] hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                        >
                            <span>+ Daftar Akun</span>
                        </Link>
                    </div>

                    {/* 1-Click Demo Fill */}
                    <div className="p-3.5 rounded-[18px] bg-[#121526]/80 border border-white/5 space-y-2.5">
                        <div className="flex items-center justify-between text-[11px]">
                            <span className="flex items-center gap-1 text-[#4ADE80] font-bold">
                                <Zap className="w-3.5 h-3.5" />
                                Akun Demo Penguji (Klik untuk isi cepat)
                            </span>
                            <span className="px-1.5 py-0.2 rounded-full bg-[#4ADE80]/15 text-[#4ADE80] text-[9px] font-black">
                                1-Click Fill
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => handleQuickFill('admin@example.com')}
                                className="p-2.5 rounded-xl bg-[#202642] hover:bg-[#283054] text-left transition border border-white/5 group"
                            >
                                <p className="text-[11px] font-bold text-white group-hover:text-[#4E6EF2] flex items-center justify-between">
                                    <span>Admin & Editor</span>
                                    <span className="text-[10px] text-[#8F9BB7]">↗</span>
                                </p>
                                <p className="text-[9px] text-[#8F9BB7] truncate">admin@example.com</p>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleQuickFill('user@example.com')}
                                className="p-2.5 rounded-xl bg-[#202642] hover:bg-[#283054] text-left transition border border-white/5 group"
                            >
                                <p className="text-[11px] font-bold text-white group-hover:text-[#4E6EF2] flex items-center justify-between">
                                    <span>Member Penulis</span>
                                    <span className="text-[10px] text-[#8F9BB7]">↗</span>
                                </p>
                                <p className="text-[9px] text-[#8F9BB7] truncate">user@example.com</p>
                            </button>
                        </div>
                    </div>

                    {/* Form Login */}
                    <form action="/login" method="POST" onSubmit={submit} className="space-y-4">
                        <input type="hidden" name="_token" value={csrfToken || (typeof document !== 'undefined' ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') : '') || ''} />
                        <input type="hidden" name="username" id="login-username-hidden" value={data.email} />
                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <label htmlFor="login-username" className="block text-xs font-semibold text-[#8F9BB7]">
                                Surel atau Nama Pengguna
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8F9BB7]">
                                    <AtSign className="w-4 h-4" />
                                </div>
                                <input
                                    id="login-username"
                                    data-testid="email"
                                    type="text"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="nama@blog.id atau username"
                                    autoComplete="username"
                                    required
                                    className="w-full bg-[#121526] text-white text-xs pl-10 pr-4 py-3 rounded-full border border-white/10 focus:border-[#4E6EF2] focus:outline-none focus:ring-2 focus:ring-[#4E6EF2]/20 transition"
                                />
                            </div>
                            {(combinedErrors.email || errors.email) && (
                                <p className="text-[11px] text-red-400 pl-2">{combinedErrors.email || errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label htmlFor="login-password" className="block text-xs font-semibold text-[#8F9BB7]">
                                    Kata Sandi
                                </label>
                                <span className="text-[10px] text-[#8F9BB7] hover:text-white cursor-pointer">
                                    Lupa Kata Sandi?
                                </span>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8F9BB7]">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    id="login-password"
                                    data-testid="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Minimal 8 karakter aman"
                                    autoComplete="current-password"
                                    required
                                    className="w-full bg-[#121526] text-white text-xs pl-10 pr-10 py-3 rounded-full border border-white/10 focus:border-[#4E6EF2] focus:outline-none focus:ring-2 focus:ring-[#4E6EF2]/20 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8F9BB7] hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {(combinedErrors.password || errors.password) && (
                                <p className="text-[11px] text-red-400 pl-2">{combinedErrors.password || errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center gap-2 pt-1">
                            <input
                                id="remember-me"
                                type="checkbox"
                                name="remember"
                                value="1"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 rounded bg-[#121526] border-white/20 text-[#4E6EF2] focus:ring-0 cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="text-xs text-[#8F9BB7] cursor-pointer">
                                Ingat sesi login saya pada perangkat ini
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            id="login-submit"
                            data-testid="submit"
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 rounded-full bg-[#4E6EF2] hover:bg-[#3D5EE0] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer"
                        >
                            {processing ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <span>Masuk ke Dashboard</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Encryption badge */}
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8F9BB7] pt-2">
                        <Lock className="w-3 h-3 text-[#4ADE80]" />
                        <span>Enkripsi TLS 256-bit berstandar industri editorial.</span>
                    </div>
                </div>

                {/* Bottom Badges */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 text-[10px] text-[#8F9BB7] pt-6 flex-wrap">
                    <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4ADE80]" /> Single Sign-On Siap
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#4E6EF2]" /> Waktu Akses &lt; 150ms
                    </span>
                    <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#4ADE80]" /> Kepatuhan Data Terjamin
                    </span>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8F9BB7]/70 gap-2 pt-4 z-10 border-t border-white/5">
                <p>© 2026 Blog Editorial Systems. Crafted for focused writing.</p>
                <div className="flex items-center gap-4">
                    <a href="#terms" className="hover:text-white">Terms</a>
                    <a href="#privacy" className="hover:text-white">Privacy</a>
                    <a href="#status" className="hover:text-white">Status</a>
                </div>
            </footer>
        </div>
    );
}
