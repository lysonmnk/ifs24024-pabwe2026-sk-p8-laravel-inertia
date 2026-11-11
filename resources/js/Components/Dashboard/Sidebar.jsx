import { LayoutDashboard, FileText, Sparkles, ArrowUpDown, User, LogOut, X, Menu } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Sidebar({ activeMenu = 'dashboard', onNavigate, onLogout, isMobileOpen, setIsMobileOpen }) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard/posts' },
        { id: 'articles', label: 'Artikel Saya', icon: FileText, href: '/dashboard/posts' },
        { id: 'ai', label: 'AI Generator', icon: Sparkles, action: 'open-ai' },
        { id: 'import-export', label: 'Import & Export', icon: ArrowUpDown, action: 'open-import' },
        { id: 'profile', label: 'Profil', icon: User, href: '/profile' },
    ];

    const handleItemClick = (item) => {
        if (setIsMobileOpen) setIsMobileOpen(false);
        if (item.action && onNavigate) {
            onNavigate(item.action);
        }
    };

    return (
        <>
            {/* Desktop & Tablet Sidebar */}
            <aside 
                aria-label="Navigasi Utama" 
                className="hidden md:flex flex-col justify-between bg-[#3A4366] text-[#A9B0CC] transition-all duration-300 w-20 xl:w-64 rounded-[24px] p-4 xl:p-6 shrink-0"
            >
                {/* Bagian Atas: Logo & Menu */}
                <div className="space-y-8">
                    {/* Logo Brand */}
                    <div className="flex items-center gap-3 px-2 xl:px-3">
                        <div className="w-10 h-10 rounded-full bg-[#5873E0] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                            B
                        </div>
                        <span className="hidden xl:inline text-white font-bold text-xl tracking-tight">
                            Blog<span className="text-[#5873E0]">.</span>
                        </span>
                    </div>

                    {/* Nav Menu */}
                    <nav aria-label="Menu Aplikasi" className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeMenu === item.id;

                            const content = (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleItemClick(item)}
                                    aria-label={item.label}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-full transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#5873E0] min-h-[44px] ${
                                        isActive
                                            ? 'bg-[#5873E0] text-white shadow-sm font-semibold relative overflow-hidden pl-4'
                                            : 'text-[#A9B0CC] hover:text-white hover:bg-[#333B5E]'
                                    }`}
                                >
                                    {isActive && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-r-full" />
                                    )}
                                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-[#A9B0CC]'}`} />
                                    <span className="hidden xl:inline truncate">{item.label}</span>
                                </button>
                            );

                            return item.href && !item.action ? (
                                <Link key={item.id} href={item.href} className="block">
                                    {content}
                                </Link>
                            ) : (
                                content
                            );
                        })}
                    </nav>
                </div>

                {/* Bagian Bawah: Tombol Keluar */}
                <div className="pt-6 border-t border-[#333B5E]">
                    <button
                        type="button"
                        onClick={onLogout}
                        aria-label="Keluar dari akun"
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-full text-sm font-medium text-[#A9B0CC] hover:text-white hover:bg-[#333B5E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5873E0] min-h-[44px]"
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        <span className="hidden xl:inline">Keluar</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Drawer Backdrop & Panel */}
            {isMobileOpen && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    aria-label="Menu Navigasi Mobile"
                    className="fixed inset-0 z-50 flex md:hidden bg-black/60 backdrop-blur-xs transition-opacity"
                >
                    <div className="w-72 bg-[#3A4366] text-[#A9B0CC] h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
                        <div className="space-y-6">
                            {/* Mobile Logo & Close */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-[#5873E0] flex items-center justify-center text-white font-bold">
                                        B
                                    </div>
                                    <span className="text-white font-bold text-lg">Blog.</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsMobileOpen(false)}
                                    aria-label="Tutup menu navigasi"
                                    className="p-2 text-[#A9B0CC] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#5873E0] rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Mobile Nav Links */}
                            <nav className="space-y-2">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activeMenu === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => handleItemClick(item)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium min-h-[44px] ${
                                                isActive
                                                    ? 'bg-[#5873E0] text-white font-semibold'
                                                    : 'text-[#A9B0CC] hover:text-white hover:bg-[#333B5E]'
                                            }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span>{item.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Mobile Logout */}
                        <button
                            type="button"
                            onClick={onLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium text-[#A9B0CC] hover:text-white hover:bg-[#333B5E] min-h-[44px]"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Keluar</span>
                        </button>
                    </div>
                    <div className="flex-1" onClick={() => setIsMobileOpen(false)} />
                </div>
            )}
        </>
    );
}
