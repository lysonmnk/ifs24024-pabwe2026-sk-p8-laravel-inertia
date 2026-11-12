import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { 
    BookOpen, 
    LayoutDashboard, 
    Users, 
    LogOut, 
    User, 
    Menu, 
    X, 
    CheckCircle2, 
    AlertCircle 
} from 'lucide-react';

export default function AppLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F1F0F7] flex flex-col font-sans text-[#14122B]">
            {/* Top Bar / Sticky Navbar */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E7F0] shadow-sm transition">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Brand Logo */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-[#14122B]">
                            <span className="w-8 h-8 rounded-lg bg-[#5B4FE9] text-white flex items-center justify-center font-black text-lg shadow-sm">B</span>
                            <span>Blog<span className="text-[#5B4FE9]">.</span></span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            <Link
                                href="/"
                                className="px-3.5 py-2 rounded-full text-sm font-medium text-[#6B6A80] hover:text-[#14122B] hover:bg-[#F4F3FF] transition"
                            >
                                Beranda
                            </Link>
                            <Link
                                href="/articles"
                                className="px-3.5 py-2 rounded-full text-sm font-medium text-[#6B6A80] hover:text-[#14122B] hover:bg-[#F4F3FF] transition"
                            >
                                Jelajah Artikel
                            </Link>
                        </nav>
                    </div>

                    {/* Right Action / Auth Menu */}
                    <div className="hidden md:flex items-center gap-3">
                        {auth.user ? (
                            <div className="flex items-center gap-3">
                                {auth.user.role === 'Admin' ? (
                                    <>
                                        <Link
                                            href="/admin/users"
                                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium text-[#6B6A80] hover:text-[#14122B] hover:bg-[#F4F3FF] transition"
                                        >
                                            <Users className="w-4 h-4 text-[#5B4FE9]" />
                                            <span>Kelola User</span>
                                        </Link>
                                        <Link
                                            href="/admin/posts"
                                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium text-[#6B6A80] hover:text-[#14122B] hover:bg-[#F4F3FF] transition"
                                        >
                                            <BookOpen className="w-4 h-4 text-[#5B4FE9]" />
                                            <span>Monitoring Post</span>
                                        </Link>
                                    </>
                                ) : (
                                    <Link
                                        href="/dashboard/posts"
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium text-[#6B6A80] hover:text-[#14122B] hover:bg-[#F4F3FF] transition"
                                    >
                                        <LayoutDashboard className="w-4 h-4 text-[#5B4FE9]" />
                                        <span>Dashboard Penulis</span>
                                    </Link>
                                )}

                                <Link
                                    href="/profile"
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium text-[#6B6A80] hover:text-[#14122B] hover:bg-[#F4F3FF] transition"
                                >
                                    <User className="w-4 h-4 text-[#52506B]" />
                                    <span>{auth.user.name}</span>
                                </Link>

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    aria-label="Keluar dari akun"
                                    className="p-2 rounded-full text-[#6B6A80] hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                                    title="Keluar"
                                >
                                    <LogOut className="w-4 h-4" />
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-[#14122B] hover:text-[#5B4FE9] transition"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 rounded-full bg-[#3557EC] hover:bg-[#2A4BD9] text-white text-sm font-medium transition shadow-sm"
                                >
                                    Daftar Penulis
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex md:hidden items-center">
                        <button
                            type="button"
                            aria-label="Buka menu navigasi"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg text-[#6B6A80] hover:text-[#14122B] hover:bg-[#F4F3FF]"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-[#E8E7F0] bg-white px-4 pt-3 pb-6 space-y-3">
                        <Link
                            href="/"
                            className="block px-3 py-2 rounded-lg text-sm font-medium text-[#6B6A80] hover:bg-[#F4F3FF]"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/articles"
                            className="block px-3 py-2 rounded-lg text-sm font-medium text-[#6B6A80] hover:bg-[#F4F3FF]"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Jelajah Artikel
                        </Link>

                        {auth.user ? (
                            <div className="pt-3 border-t border-[#E8E7F0] space-y-2">
                                {auth.user.role === 'Admin' ? (
                                    <>
                                        <Link
                                            href="/admin/users"
                                            className="block px-3 py-2 rounded-lg text-sm font-medium text-[#6B6A80] hover:bg-[#F4F3FF]"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Kelola Pengguna (Admin)
                                        </Link>
                                        <Link
                                            href="/admin/posts"
                                            className="block px-3 py-2 rounded-lg text-sm font-medium text-[#6B6A80] hover:bg-[#F4F3FF]"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Monitoring Artikel (Admin)
                                        </Link>
                                    </>
                                ) : (
                                    <Link
                                        href="/dashboard/posts"
                                        className="block px-3 py-2 rounded-lg text-sm font-medium text-[#6B6A80] hover:bg-[#F4F3FF]"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Dashboard Penulis
                                    </Link>
                                )}
                                <Link
                                    href="/profile"
                                    className="block px-3 py-2 rounded-lg text-sm font-medium text-[#6B6A80] hover:bg-[#F4F3FF]"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Profil ({auth.user.name})
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                    Keluar
                                </Link>
                            </div>
                        ) : (
                            <div className="pt-3 border-t border-[#E8E7F0] flex flex-col gap-2">
                                <Link
                                    href="/login"
                                    className="w-full py-2.5 text-center text-sm font-medium text-[#14122B] border border-[#E8E7F0] rounded-xl hover:bg-[#FAFAFD]"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="w-full py-2.5 text-center text-sm font-medium text-white bg-[#5B4FE9] rounded-xl hover:bg-[#4A3FD1]"
                                >
                                    Daftar Penulis
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </header>

            {/* Flash Messages */}
            {flash?.success && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>{flash.success}</span>
                    </div>
                </div>
            )}
            {flash?.error && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-3 shadow-sm">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                        <span>{flash.error}</span>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 w-full">
                {children}
            </main>

            {/* Editorial Footer */}
            <footer className="bg-white border-t border-[#E8E7F0] mt-16 py-12 text-sm text-[#6B6A80]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-[#3557EC] text-white flex items-center justify-center font-bold text-xs">B</span>
                        <span className="font-semibold text-[#14122B]">Blog Platform</span>
                        <span className="text-xs text-[#52506B] font-medium">v1.0 &bull; Clean Architecture</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-xs text-[#52506B] font-medium">
                        <Link href="/" className="hover:text-[#14122B] transition">Beranda</Link>
                        <Link href="/articles" className="hover:text-[#14122B] transition">Artikel Publik</Link>
                        <Link href="/login" className="hover:text-[#14122B] transition">Masuk</Link>
                        <Link href="/register" className="hover:text-[#14122B] transition">Daftar</Link>
                    </div>

                    <div className="text-xs text-[#52506B] font-medium">
                        &copy; {new Date().getFullYear()} Blog. Dikembangkan untuk Praktikum PABWE.
                    </div>
                </div>
            </footer>
        </div>
    );
}

