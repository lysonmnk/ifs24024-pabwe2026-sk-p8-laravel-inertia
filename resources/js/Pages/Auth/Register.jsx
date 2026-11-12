import { Head, Link, useForm } from '@inertiajs/react';
import { BookOpen, ArrowRight, User, Mail, Lock, ShieldCheck, Zap, CheckCircle2, Loader2 } from 'lucide-react';

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
        <div className="min-h-screen bg-[#101322] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#3557EC] relative overflow-hidden">
            <Head title="Daftar Akun Penulis - Blog" />

            {/* Ambient background glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3557EC]/15 rounded-full blur-[140px] pointer-events-none" />

            {/* Header Nav */}
            <header className="w-full max-w-6xl mx-auto flex items-center justify-between z-10">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#3557EC] flex items-center justify-center text-white shadow-md">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">Blog</span>
                </Link>

                <div className="flex items-center gap-1.5 text-xs text-[#CBD5E1]">
                    <span>Sudah punya akun?</span>
                    <Link href="/login" className="text-white font-semibold hover:underline">Masuk</Link>
                </div>
            </header>

            {/* Main Center Card */}
            <main className="w-full max-w-[460px] mx-auto my-8 z-10">
                <div className="bg-[#1A1F36] rounded-[28px] border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
                    <div className="text-center space-y-2">
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#3557EC] flex items-center justify-center text-white shadow-lg">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-black text-white tracking-tight">
                            Mulai Menulis di Blog
                        </h1>
                        <p className="text-xs text-[#CBD5E1] leading-relaxed">
                            Buat akun penulis dan bagikan artikel Anda kepada audiens.
                        </p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="grid grid-cols-2 p-1.5 rounded-full bg-[#121526] border border-white/5 gap-1.5">
                        <Link
                            href="/login"
                            className="w-full py-2.5 rounded-full text-[#CBD5E1] hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                        >
                            <span>Masuk</span>
                        </Link>
                        <button
                            type="button"
                            className="w-full py-2.5 rounded-full bg-[#3557EC] text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2"
                        >
                            <ArrowRight className="w-3.5 h-3.5" />
                            <span>Daftar Akun</span>
                        </button>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label htmlFor="name" className="block text-xs font-semibold text-[#CBD5E1]">
                                Nama Lengkap
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#CBD5E1]">
                                    <User className="w-4 h-4" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Nama Lengkap Anda"
                                    required
                                    className="w-full bg-[#121526] text-white text-xs pl-10 pr-4 py-3 rounded-full border border-white/10 focus:border-[#3557EC] focus:outline-none focus:ring-2 focus:ring-[#3557EC]/20 transition"
                                />
                            </div>
                            {errors.name && <p className="text-xs text-red-400 pl-2">{errors.name}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="email" className="block text-xs font-semibold text-[#CBD5E1]">
                                Alamat Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#CBD5E1]">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="nama@email.com"
                                    required
                                    className="w-full bg-[#121526] text-white text-xs pl-10 pr-4 py-3 rounded-full border border-white/10 focus:border-[#3557EC] focus:outline-none focus:ring-2 focus:ring-[#3557EC]/20 transition"
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-400 pl-2">{errors.email}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="password" className="block text-xs font-semibold text-[#CBD5E1]">
                                Kata Sandi
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#CBD5E1]">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Minimal 8 karakter aman"
                                    required
                                    className="w-full bg-[#121526] text-white text-xs pl-10 pr-4 py-3 rounded-full border border-white/10 focus:border-[#3557EC] focus:outline-none focus:ring-2 focus:ring-[#3557EC]/20 transition"
                                />
                            </div>
                            {errors.password && <p className="text-xs text-red-400 pl-2">{errors.password}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="password_confirmation" className="block text-xs font-semibold text-[#CBD5E1]">
                                Konfirmasi Kata Sandi
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#CBD5E1]">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="Ulangi kata sandi"
                                    required
                                    className="w-full bg-[#121526] text-white text-xs pl-10 pr-4 py-3 rounded-full border border-white/10 focus:border-[#3557EC] focus:outline-none focus:ring-2 focus:ring-[#3557EC]/20 transition"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 rounded-full bg-[#3557EC] hover:bg-[#2A4BD9] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer pt-3"
                        >
                            {processing ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <span>Buat Akun Member</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-[#CBD5E1] pt-2">
                        <Lock className="w-3.5 h-3.5 text-[#4ADE80]" />
                        <span>Enkripsi TLS 256-bit berstandar industri editorial.</span>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs text-[#CBD5E1] pt-6 flex-wrap">
                    <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4ADE80]" /> Single Sign-On Siap
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#7C98F8]" /> Waktu Akses &lt; 150ms
                    </span>
                    <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#4ADE80]" /> Kepatuhan Data Terjamin
                    </span>
                </div>
            </main>

            <footer className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-[#CBD5E1] gap-2 pt-4 z-10 border-t border-white/5">
                <p>© 2026 Blog Editorial Systems. Crafted for focused writing.</p>
                <div className="flex items-center gap-4">
                    <a href="#terms" className="text-[#CBD5E1] hover:text-white">Terms</a>
                    <a href="#privacy" className="text-[#CBD5E1] hover:text-white">Privacy</a>
                    <a href="#status" className="text-[#CBD5E1] hover:text-white">Status</a>
                </div>
            </footer>
        </div>
    );
}
