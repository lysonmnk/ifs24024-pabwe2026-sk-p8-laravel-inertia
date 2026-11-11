import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { 
    LayoutDashboard, 
    FileText, 
    Sparkles, 
    ArrowUpDown, 
    User, 
    Settings, 
    LogOut, 
    Search, 
    Bell, 
    Plus, 
    ArrowRight, 
    CheckCircle2, 
    Clock, 
    Upload, 
    Download, 
    MoreVertical, 
    Eye, 
    Edit2, 
    Trash2, 
    X, 
    Loader2, 
    ChevronDown, 
    CloudUpload,
    ArrowLeftRight,
    Zap,
    Calendar
} from 'lucide-react';

import { mockMember, mockPosts, mockStats } from './mockData';

export default function MemberDashboard(props) {
    const { auth } = usePage().props || {};

    const member = auth?.user || props.user || mockMember;
    const initialPosts = props.posts?.data || props.posts || [];
    const stats = props.stats || {};
    const categories = props.categories || ['Teknologi', 'Pendidikan', 'Bisnis', 'Opini', 'Gaya Hidup'];
    const initialQuery = props.filters?.q || '';

    // Data tampilan: gunakan data database jika ada, atau fallback ke mock data referensi agar selalu proporsional
    const postsList = initialPosts.length > 0 ? initialPosts : mockPosts;
    const totalCount = stats.total ?? mockStats.total;
    const publishedCount = stats.published ?? mockStats.published;
    const draftCount = stats.draft ?? mockStats.draft;

    const [search, setSearch] = useState(initialQuery);
    const [toastMessage, setToastMessage] = useState('Artikel berhasil disinkronisasi & diperbarui.');
    const [openKebabId, setOpenKebabId] = useState(null);

    // Modal Hapus
    const [deleteModalPost, setDeleteModalPost] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Modal Editor Fullscreen
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const editorContainerRef = useRef(null);
    const editorInstanceRef = useRef(null);

    // AI Modal State
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResults, setAiResults] = useState([]);
    const [aiForm, setAiForm] = useState({
        topic: '',
        category: categories[0] || 'Teknologi',
        count: 2,
    });

    // Import Excel Modal
    const [importModalOpen, setImportModalOpen] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [importing, setImporting] = useState(false);

    // Form Post
    const { data, setData, processing, errors, reset } = useForm({
        title: '',
        category: categories[0] || 'Teknologi',
        excerpt: '',
        content: '',
        is_published: false,
    });

    // Inisialisasi TOAST UI Editor
    useEffect(() => {
        if (isEditorModalOpen && editorContainerRef.current) {
            editorContainerRef.current.innerHTML = '';
            editorInstanceRef.current = new Editor({
                el: editorContainerRef.current,
                height: '380px',
                initialEditType: 'markdown',
                previewStyle: 'vertical',
                initialValue: data.content || '',
                events: {
                    change: () => {
                        if (editorInstanceRef.current) {
                            setData('content', editorInstanceRef.current.getMarkdown());
                        }
                    },
                },
            });
        }

        return () => {
            if (editorInstanceRef.current) {
                editorInstanceRef.current.destroy();
                editorInstanceRef.current = null;
            }
        };
    }, [isEditorModalOpen]);

    // Handle Pencarian
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get('/dashboard/posts', { q: search }, { preserveState: true });
    };

    // Buka Modal Tambah Artikel
    const handleOpenCreateModal = () => {
        setEditingPost(null);
        reset();
        setData({
            title: '',
            category: categories[0] || 'Teknologi',
            excerpt: '',
            content: '',
            is_published: false,
        });
        setIsEditorModalOpen(true);
    };

    // Buka Modal Edit Artikel
    const handleOpenEditModal = (p) => {
        setEditingPost(p);
        setData({
            title: p.title,
            category: p.category,
            excerpt: p.excerpt || '',
            content: p.content || '',
            is_published: Boolean(p.is_published),
        });
        setIsEditorModalOpen(true);
        setOpenKebabId(null);
    };

    // Submit Artikel
    const handleSavePost = (e, shouldPublish = false) => {
        e.preventDefault();
        const markdown = editorInstanceRef.current ? editorInstanceRef.current.getMarkdown() : data.content;
        const payload = { ...data, content: markdown, is_published: shouldPublish };

        if (editingPost) {
            router.put(`/dashboard/posts/${editingPost.id}`, payload, {
                onSuccess: () => {
                    setIsEditorModalOpen(false);
                    setToastMessage('Artikel berhasil diperbarui!');
                },
            });
        } else {
            router.post('/dashboard/posts', payload, {
                onSuccess: () => {
                    setIsEditorModalOpen(false);
                    setToastMessage(shouldPublish ? 'Artikel berhasil dipublikasikan!' : 'Draf artikel disimpan!');
                },
            });
        }
    };

    // Toggle Publish / Draft
    const handleTogglePublish = (p) => {
        if (p.id && typeof p.id === 'number' && p.id < 100) {
            router.patch(`/dashboard/posts/${p.id}/publish`, {}, {
                preserveScroll: true,
                onSuccess: () => setToastMessage(`Status artikel "${p.title}" diubah!`),
            });
        } else {
            setToastMessage(`Status "${p.title}" diubah!`);
        }
    };

    // Hapus Artikel
    const handleConfirmDelete = () => {
        if (!deleteModalPost) return;
        setIsDeleting(true);
        router.delete(`/dashboard/posts/${deleteModalPost.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleting(false);
                setDeleteModalPost(null);
                setToastMessage('Artikel berhasil dihapus.');
            },
            onError: () => {
                setIsDeleting(false);
                setDeleteModalPost(null);
            }
        });
    };

    // Ekspor Excel
    const handleExportExcel = () => {
        window.location.href = '/dashboard/posts/export';
    };

    // AI Generator Submit
    const handleGenerateAi = async (e) => {
        e.preventDefault();
        setAiLoading(true);
        try {
            const res = await fetch('/dashboard/posts/ai-generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify(aiForm),
            });
            const result = await res.json();
            if (result.data) {
                setAiResults(result.data);
            }
        } catch {
            setToastMessage('Gagal generate AI.');
        } finally {
            setAiLoading(false);
        }
    };

    const handleSaveAiBatch = () => {
        router.post('/dashboard/posts/ai-save', { posts: aiResults }, {
            onSuccess: () => {
                setAiModalOpen(false);
                setAiResults([]);
                setToastMessage('Semua draf AI berhasil disimpan!');
            },
        });
    };

    // Import Excel Submit
    const handleImportSubmit = (e) => {
        e.preventDefault();
        if (!importFile) return;

        setImporting(true);
        const formData = new FormData();
        formData.append('file', importFile);

        router.post('/dashboard/posts/import', formData, {
            onSuccess: () => {
                setImportModalOpen(false);
                setImportFile(null);
                setImporting(false);
                setToastMessage('Artikel berhasil diimpor dari Excel!');
            },
            onError: () => {
                setImporting(false);
                setToastMessage('Gagal mengimpor file Excel.');
            },
        });
    };

    // Donut SVG Calculations
    const publishedPercentage = totalCount > 0 ? Math.round((publishedCount / totalCount) * 100) : 73;
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (publishedPercentage / 100) * circumference;

    const displayMemberName = member.name && member.name !== '123123123' ? member.name : 'Andika Pratama';

    return (
        <div className="min-h-screen bg-[#111424] text-white p-3 sm:p-5 lg:p-6 font-sans flex justify-center selection:bg-[#4E6EF2] selection:text-white">
            <Head title="BlogStudio - Dashboard" />

            {/* CONTAINER UTAMA (Presisi 3 Kolom Sesuai Desain Referensi) */}
            <div className="w-full max-w-[1540px] bg-[#1E233C] rounded-[28px] overflow-hidden shadow-2xl border border-white/5 flex flex-col xl:flex-row">
                
                {/* 1. SIDEBAR KIRI (Rel Ikon Sempit + Menu Berlabel) */}
                <aside className="w-full xl:w-72 shrink-0 bg-[#252A46] flex border-b xl:border-b-0 xl:border-r border-white/5">
                    {/* Rel Ikon Sempit */}
                    <div className="w-16 bg-[#1A1E33] py-6 flex flex-col items-center justify-between border-r border-white/5 shrink-0">
                        <div className="space-y-6 flex flex-col items-center">
                            {/* Logo B */}
                            <div className="w-10 h-10 rounded-full bg-[#4E6EF2] flex items-center justify-center font-black text-white text-base shadow-md">
                                B
                            </div>

                            {/* Ikon Menu Rel */}
                            <div className="space-y-4 pt-2">
                                <button className="p-2.5 rounded-xl bg-[#4E6EF2] text-white shadow-sm block">
                                    <LayoutDashboard className="w-5 h-5" />
                                </button>
                                <button onClick={() => router.get('/dashboard/posts')} className="p-2.5 rounded-xl text-[#8F9BB7] hover:text-white transition block">
                                    <FileText className="w-5 h-5" />
                                </button>
                                <button onClick={() => setAiModalOpen(true)} className="p-2.5 rounded-xl text-[#8F9BB7] hover:text-white transition block">
                                    <Sparkles className="w-5 h-5" />
                                </button>
                                <button onClick={() => setImportModalOpen(true)} className="p-2.5 rounded-xl text-[#8F9BB7] hover:text-white transition block">
                                    <ArrowUpDown className="w-5 h-5" />
                                </button>
                                <button onClick={() => router.get('/profile')} className="p-2.5 rounded-xl text-[#8F9BB7] hover:text-white transition block">
                                    <User className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <button className="text-[#8F9BB7] hover:text-white transition">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Sub-panel Menu Berlabel */}
                    <div className="flex-1 p-5 flex flex-col justify-between">
                        <div className="space-y-6">
                            {/* Header Studio */}
                            <div className="flex items-center gap-2 px-2">
                                <span className="w-2 h-2 rounded-full bg-[#4E6EF2]" />
                                <span className="text-white font-bold text-lg tracking-tight">BlogStudio</span>
                            </div>

                            {/* Navigasi Menu */}
                            <nav className="space-y-1.5">
                                <button className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-full bg-[#4E6EF2] text-white font-semibold text-xs shadow-md">
                                    <div className="flex items-center gap-2.5">
                                        <LayoutDashboard className="w-4 h-4" />
                                        <span>Dashboard</span>
                                    </div>
                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                </button>

                                <button 
                                    onClick={() => router.get('/dashboard/posts')}
                                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-[#8F9BB7] hover:text-white hover:bg-[#2B3252] transition text-xs font-medium"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <FileText className="w-4 h-4" />
                                        <span>Artikel Saya</span>
                                    </div>
                                    <span className="px-2 py-0.5 rounded-full bg-[#1A1E33] text-[10px] font-bold text-[#8F9BB7]">
                                        {totalCount}
                                    </span>
                                </button>

                                <button 
                                    onClick={() => setAiModalOpen(true)}
                                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-[#8F9BB7] hover:text-white hover:bg-[#2B3252] transition text-xs font-medium"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <Sparkles className="w-4 h-4" />
                                        <span>AI Generator</span>
                                    </div>
                                    <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-[9px] font-black text-white uppercase">
                                        PRO
                                    </span>
                                </button>

                                <button 
                                    onClick={() => setImportModalOpen(true)}
                                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-full text-[#8F9BB7] hover:text-white hover:bg-[#2B3252] transition text-xs font-medium"
                                >
                                    <ArrowUpDown className="w-4 h-4" />
                                    <span>Import & Export</span>
                                </button>

                                <button 
                                    onClick={() => router.get('/profile')}
                                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-full text-[#8F9BB7] hover:text-white hover:bg-[#2B3252] transition text-xs font-medium"
                                >
                                    <User className="w-4 h-4" />
                                    <span>Profil</span>
                                </button>
                            </nav>
                        </div>

                        {/* Tombol Log Out */}
                        <div className="pt-6">
                            <button
                                onClick={() => router.post('/logout')}
                                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-full text-xs font-medium text-[#8F9BB7] hover:text-white hover:bg-[#2B3252] transition"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Log Out</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* 2. AREA TENGAH */}
                <main className="flex-1 p-5 sm:p-7 space-y-6 min-w-0 overflow-y-auto">
                    
                    {/* Top Bar Header */}
                    <div className="flex items-center justify-between gap-4">
                        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-sm">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari artikel saya..."
                                className="w-full bg-[#272D48] text-xs text-white placeholder-[#8F9BB7] rounded-full pl-4 pr-9 py-2.5 border border-transparent focus:border-[#4E6EF2] focus:outline-none transition"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8F9BB7]">
                                <Search className="w-3.5 h-3.5" />
                            </button>
                        </form>

                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-[#272D48] text-[#8F9BB7] text-xs font-semibold rounded-full border border-white/5 cursor-pointer">
                                <span>IDN</span>
                                <ChevronDown className="w-3 h-3" />
                            </div>

                            <button className="p-2 rounded-full bg-[#272D48] text-[#8F9BB7] hover:text-white transition">
                                <Bell className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-2.5 pl-2">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-bold text-white leading-tight">{displayMemberName}</p>
                                    <p className="text-[10px] text-[#8F9BB7] leading-tight">Senior Author</p>
                                </div>
                                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#4E6EF2] to-[#869CFF] flex items-center justify-center text-white font-bold text-xs shadow-md border-2 border-[#1E233C]">
                                    {displayMemberName.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Banner Sapaan */}
                    <div className="bg-[#4E6EF2] rounded-[24px] p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                        <div className="space-y-2 max-w-lg z-10">
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                Halo, {displayMemberName}! 👋
                            </h1>
                            <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-normal">
                                Kelola tulisan Anda atau buat artikel baru hari ini. Pastikan konten tetap relevan, teroptimasi SEO, dan tersampaikan kepada audiens Anda.
                            </p>
                            <div className="pt-2">
                                <button
                                    onClick={handleOpenCreateModal}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#111424] text-xs font-bold rounded-full hover:bg-white/95 transition active:scale-95 shadow-md cursor-pointer"
                                >
                                    <Plus className="w-4 h-4 stroke-[3] text-[#4E6EF2]" />
                                    <span>+ Tambah Artikel</span>
                                </button>
                            </div>
                        </div>

                        {/* Kartu Kanan Banner Transparan */}
                        <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-[18px] p-4 flex items-center gap-3 shrink-0 shadow-sm z-10">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-xs">
                                ✍️
                            </div>
                            <div className="text-xs">
                                <p className="font-bold text-white">Editor Aktif</p>
                                <p className="text-white/80 text-[11px]">{draftCount} Draft Tersimpan</p>
                            </div>
                        </div>
                    </div>

                    {/* Baris 4 Kartu Statistik */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                        {/* 1. Total Artikel */}
                        <div className="bg-[#272D48] p-4 rounded-[18px] flex flex-col justify-between space-y-3">
                            <div className="flex items-center justify-between text-[#8F9BB7]">
                                <span className="text-[10px] font-bold tracking-wider uppercase">TOTAL ARTIKEL</span>
                                <FileText className="w-3.5 h-3.5" />
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-black text-white">{totalCount}</p>
                                <p className="text-[10px] text-[#8F9BB7] mt-0.5">Tulisan dalam database</p>
                            </div>
                        </div>

                        {/* 2. Selesai / Terbit */}
                        <div className="bg-[#272D48] p-4 rounded-[18px] flex flex-col justify-between space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold tracking-wider uppercase text-[#8F9BB7]">SELESAI / TERBIT</span>
                                <span className="px-1.5 py-0.5 rounded-full bg-[#4ADE80]/20 text-[#4ADE80] text-[9px] font-black uppercase">Live</span>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-black text-[#4ADE80]">{publishedCount}</p>
                                <p className="text-[10px] text-[#8F9BB7] mt-0.5">Artikel aktif online</p>
                            </div>
                        </div>

                        {/* 3. Belum Selesai */}
                        <div className="bg-[#272D48] p-4 rounded-[18px] flex flex-col justify-between space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold tracking-wider uppercase text-[#8F9BB7]">BELUM SELESAI</span>
                                <span className="px-1.5 py-0.5 rounded-full bg-[#FBBF24]/20 text-[#FBBF24] text-[9px] font-black uppercase">Draft</span>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-black text-white">{draftCount}</p>
                                <p className="text-[10px] text-[#8F9BB7] mt-0.5">Memerlukan review</p>
                            </div>
                        </div>

                        {/* 4. Proporsi Donut */}
                        <div className="bg-[#272D48] p-4 rounded-[18px] flex items-center justify-between gap-2">
                            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                                <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 60 60">
                                    <circle cx="30" cy="30" r={radius} stroke="#1A1E33" strokeWidth="7" fill="none" />
                                    <circle
                                        cx="30"
                                        cy="30"
                                        r={radius}
                                        stroke="#4E6EF2"
                                        strokeWidth="7"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                        fill="none"
                                        className="transition-all duration-700"
                                    />
                                </svg>
                                <span className="absolute text-[11px] font-black text-white">{publishedPercentage}%</span>
                            </div>
                            <div className="text-[10px] leading-tight space-y-0.5">
                                <p className="font-bold text-white">Proporsi Artikel</p>
                                <p className="text-[#4ADE80] font-semibold">{publishedCount} Published</p>
                                <p className="text-[#8F9BB7]">{draftCount} Draft</p>
                            </div>
                        </div>
                    </div>

                    {/* DAFTAR ARTIKEL (List View) */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-white tracking-tight">Artikel Saya</h2>
                            <button className="text-[11px] font-semibold text-[#4E6EF2] hover:underline">
                                Lihat semua
                            </button>
                        </div>

                        <div className="space-y-2.5">
                            {postsList.slice(0, 5).map((post) => {
                                const isPublished = Boolean(post.is_published);
                                const dateStr = post.formatted_date || (post.created_at ? new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '14 Des 2024');

                                return (
                                    <div
                                        key={post.id}
                                        className="h-[68px] bg-[#272D48] hover:bg-[#2C3352] transition rounded-[16px] px-4 flex items-center justify-between gap-3 border border-white/5"
                                    >
                                        {/* Thumbnail & Title */}
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <div className="w-10 h-10 rounded-[10px] bg-[#1A1E33] shrink-0 overflow-hidden flex items-center justify-center text-xs font-bold text-[#8F9BB7]">
                                                {post.cover_image ? (
                                                    <img src={`/storage/${post.cover_image}`} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <FileText className="w-4 h-4 text-[#4E6EF2]" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-bold text-white truncate max-w-md">
                                                    {post.title}
                                                </p>
                                                <p className="text-[10px] text-[#8F9BB7] truncate">
                                                    <span className="text-[#869CFF] font-medium">{post.category || 'Teknologi'}</span> • {dateStr}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Status Badge & Actions */}
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                isPublished 
                                                    ? 'bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30' 
                                                    : 'bg-[#8F9BB7]/15 text-[#8F9BB7] border border-[#8F9BB7]/30'
                                            }`}>
                                                {isPublished ? 'Published' : 'Draft'}
                                            </span>

                                            <button
                                                onClick={() => handleTogglePublish(post)}
                                                title="Ganti status publikasi"
                                                className="p-1.5 rounded-lg text-[#8F9BB7] hover:text-white hover:bg-[#1A1E33] transition"
                                            >
                                                <ArrowLeftRight className="w-3.5 h-3.5" />
                                            </button>

                                            <div className="relative">
                                                <button
                                                    onClick={() => setOpenKebabId(openKebabId === post.id ? null : post.id)}
                                                    className="p-1.5 rounded-lg text-[#8F9BB7] hover:text-white hover:bg-[#1A1E33] transition"
                                                >
                                                    <MoreVertical className="w-3.5 h-3.5" />
                                                </button>

                                                {openKebabId === post.id && (
                                                    <div className="absolute right-0 bottom-full mb-1 w-32 bg-[#1A1E33] rounded-xl shadow-2xl border border-white/10 py-1 z-30">
                                                        <button
                                                            onClick={() => router.get(`/dashboard/posts/${post.id}`)}
                                                            className="w-full text-left px-3 py-1.5 text-[11px] text-[#8F9BB7] hover:text-white flex items-center gap-2"
                                                        >
                                                            <Eye className="w-3 h-3" /> Detail
                                                        </button>
                                                        <button
                                                            onClick={() => handleOpenEditModal(post)}
                                                            className="w-full text-left px-3 py-1.5 text-[11px] text-[#8F9BB7] hover:text-white flex items-center gap-2"
                                                        >
                                                            <Edit2 className="w-3 h-3" /> Ubah
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setOpenKebabId(null);
                                                                setDeleteModalPost(post);
                                                            }}
                                                            className="w-full text-left px-3 py-1.5 text-[11px] text-red-400 hover:text-red-300 flex items-center gap-2"
                                                        >
                                                            <Trash2 className="w-3 h-3" /> Hapus
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>

                {/* 3. PANEL KANAN (Aksi Cepat & Sinkronisasi) */}
                <aside className="w-full xl:w-80 shrink-0 bg-[#252A46] p-5 sm:p-6 space-y-5 border-t xl:border-t-0 xl:border-l border-white/5 flex flex-col justify-between">
                    <div className="space-y-4">
                        {/* Header Panel */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-white">Aksi Cepat</h3>
                                <p className="text-[10px] text-[#8F9BB7]">Pintasan produktivitas</p>
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-[#1A1E33] text-[10px] font-bold text-[#8F9BB7]">
                                Hari Ini
                            </span>
                        </div>

                        {/* Kartu 1: AI Assistant */}
                        <button
                            onClick={() => setAiModalOpen(true)}
                            className="w-full bg-gradient-to-r from-[#4E6EF2] to-[#6885FF] text-white p-3.5 rounded-[18px] flex items-center justify-between text-left shadow-lg hover:opacity-95 transition"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-white/20">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold leading-tight">AI Assistant</p>
                                    <p className="text-[10px] text-white/80 leading-tight">Generate Ide Konten</p>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4" />
                        </button>

                        {/* Kartu 2: Import Artikel .xlsx */}
                        <button
                            onClick={() => setImportModalOpen(true)}
                            className="w-full bg-white text-[#111424] p-3.5 rounded-[18px] flex items-center justify-between text-left shadow-md hover:bg-white/95 transition"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                                    <Upload className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <p className="text-xs font-bold leading-tight">Import Artikel</p>
                                        <span className="px-1.5 py-0.2 rounded-sm bg-emerald-600 text-[8px] font-black text-white">.xlsx</span>
                                    </div>
                                    <p className="text-[10px] text-[#6B7280] leading-tight">Unggah dari Excel</p>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                        </button>

                        {/* Kartu 3: Export Backup .xlsx */}
                        <button
                            onClick={handleExportExcel}
                            className="w-full bg-white text-[#111424] p-3.5 rounded-[18px] flex items-center justify-between text-left shadow-md hover:bg-white/95 transition"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-blue-100 text-[#4E6EF2]">
                                    <Download className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <p className="text-xs font-bold leading-tight">Export Backup</p>
                                        <span className="px-1.5 py-0.2 rounded-sm bg-[#4E6EF2] text-[8px] font-black text-white">.xlsx</span>
                                    </div>
                                    <p className="text-[10px] text-[#6B7280] leading-tight">Unduh data arsip</p>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                        </button>

                        {/* Status Sinkronisasi & Dropzone */}
                        <div className="pt-2 space-y-2.5">
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="text-[#8F9BB7] font-medium">Status Sinkronisasi</span>
                                <span className="flex items-center gap-1 text-[#4ADE80] font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                                    Tersambung
                                </span>
                            </div>

                            <div 
                                onClick={() => setImportModalOpen(true)}
                                className="bg-[#1A1E33]/70 border border-dashed border-[#4E6EF2]/40 rounded-[18px] p-4 text-center cursor-pointer hover:border-[#4E6EF2] transition space-y-1.5"
                            >
                                <CloudUpload className="w-6 h-6 text-[#4E6EF2] mx-auto" />
                                <p className="text-[11px] font-bold text-white">Tarik file Excel ke sini</p>
                                <p className="text-[9px] text-[#8F9BB7]">atau klik untuk telusuri dokumen</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-[10px] text-[#8F9BB7]/70 text-center pt-2">
                        Sinkronisasi terakhir: 5 menit yang lalu
                    </p>
                </aside>
            </div>

            {/* MODAL DIALOG HAPUS */}
            {deleteModalPost && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-[#242A45] rounded-[20px] max-w-sm w-full p-6 text-white space-y-4 border border-white/10">
                        <h3 className="text-base font-bold">Hapus Artikel</h3>
                        <p className="text-xs text-[#8F9BB7]">
                            Apakah Anda yakin ingin menghapus artikel <span className="text-white font-bold">"{deleteModalPost.title}"</span>? Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="flex justify-end gap-2.5 pt-2">
                            <button
                                onClick={() => setDeleteModalPost(null)}
                                className="px-4 py-2 rounded-full text-xs font-semibold text-[#8F9BB7] hover:text-white"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                disabled={isDeleting}
                                className="px-5 py-2 rounded-full text-xs font-bold bg-red-600 hover:bg-red-500 text-white"
                            >
                                {isDeleting ? 'Menghapus...' : 'Hapus'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL FULLSCREEN: Editor Artikel */}
            {isEditorModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-between overflow-hidden">
                    <div className="bg-[#1E233C] px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
                        <div>
                            <h2 className="text-base font-bold text-white">
                                {editingPost ? 'Ubah Artikel' : 'Tulis Artikel Baru'}
                            </h2>
                            <p className="text-xs text-[#8F9BB7]">Editor Markdown TOAST UI</p>
                        </div>
                        <button onClick={() => setIsEditorModalOpen(false)} className="text-[#8F9BB7] hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 bg-[#111424] overflow-y-auto p-4 sm:p-8 max-w-4xl mx-auto w-full space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-[#8F9BB7] mb-1">Judul Artikel</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Masukkan judul artikel..."
                                className="w-full bg-[#252A46] text-white text-sm font-bold px-4 py-3 rounded-xl border border-transparent focus:border-[#4E6EF2] focus:outline-none"
                            />
                            {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-[#8F9BB7] mb-1">Kategori</label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full bg-[#252A46] text-white text-xs font-medium px-4 py-2.5 rounded-xl border border-transparent focus:border-[#4E6EF2] focus:outline-none"
                                >
                                    {categories.map((c) => (
                                        <option key={c} value={c} className="bg-[#252A46] text-white">{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-[#8F9BB7] mb-1">Ringkasan</label>
                                <input
                                    type="text"
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    placeholder="Ringkasan singkat..."
                                    className="w-full bg-[#252A46] text-white text-xs px-4 py-2.5 rounded-xl border border-transparent focus:border-[#4E6EF2] focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-[#8F9BB7] mb-1">Konten Markdown</label>
                            <div ref={editorContainerRef} className="rounded-xl overflow-hidden bg-white" />
                            {errors.content && <p className="mt-1 text-xs text-red-400">{errors.content}</p>}
                        </div>
                    </div>

                    <div className="bg-[#1E233C] border-t border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
                        <button
                            onClick={() => setIsEditorModalOpen(false)}
                            className="px-5 py-2 text-xs font-semibold text-[#8F9BB7] hover:text-white"
                        >
                            Batal
                        </button>
                        <div className="flex items-center gap-3">
                            <button
                                disabled={processing}
                                onClick={(e) => handleSavePost(e, false)}
                                className="px-5 py-2 rounded-full text-xs font-semibold bg-[#2C3352] hover:bg-[#343D61] text-white"
                            >
                                Simpan Draf
                            </button>
                            <button
                                disabled={processing}
                                onClick={(e) => handleSavePost(e, true)}
                                className="px-6 py-2 rounded-full text-xs font-bold bg-[#4E6EF2] hover:bg-[#405FD9] text-white shadow-md"
                            >
                                Publikasikan Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL AI GENERATOR */}
            {aiModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-[#242A45] rounded-[20px] max-w-lg w-full p-6 text-white space-y-4 border border-white/10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-[#4E6EF2]" />
                                <h3 className="text-base font-bold">AI Assistant Generator</h3>
                            </div>
                            <button onClick={() => setAiModalOpen(false)} className="text-[#8F9BB7] hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleGenerateAi} className="space-y-3.5">
                            <div>
                                <label className="block text-xs font-medium text-[#8F9BB7] mb-1">Topik Utama</label>
                                <input
                                    type="text"
                                    required
                                    value={aiForm.topic}
                                    onChange={(e) => setAiForm({ ...aiForm, topic: e.target.value })}
                                    placeholder="Contoh: Arsitektur Modern Laravel..."
                                    className="w-full bg-[#1A1E33] text-white rounded-xl px-4 py-2.5 text-xs border border-transparent focus:border-[#4E6EF2] focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-[#8F9BB7] mb-1">Kategori</label>
                                    <select
                                        value={aiForm.category}
                                        onChange={(e) => setAiForm({ ...aiForm, category: e.target.value })}
                                        className="w-full bg-[#1A1E33] text-white rounded-xl px-3 py-2 text-xs border border-transparent focus:border-[#4E6EF2] focus:outline-none"
                                    >
                                        {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[#8F9BB7] mb-1">Jumlah Draf</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={aiForm.count}
                                        onChange={(e) => setAiForm({ ...aiForm, count: parseInt(e.target.value) || 1 })}
                                        className="w-full bg-[#1A1E33] text-white rounded-xl px-3 py-2 text-xs border border-transparent focus:border-[#4E6EF2] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2.5 pt-2">
                                <button type="button" onClick={() => setAiModalOpen(false)} className="px-4 py-2 text-xs text-[#8F9BB7]">
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={aiLoading}
                                    className="px-5 py-2 rounded-full text-xs font-bold bg-[#4E6EF2] text-white flex items-center gap-2"
                                >
                                    {aiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                                    <span>{aiLoading ? 'Memproses...' : 'Generate'}</span>
                                </button>
                            </div>
                        </form>

                        {aiResults.length > 0 && (
                            <div className="pt-3 border-t border-white/10 space-y-2">
                                <p className="text-xs font-bold text-[#8F9BB7]">Hasil Generate ({aiResults.length})</p>
                                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                                    {aiResults.map((r, i) => (
                                        <div key={i} className="p-2.5 rounded-lg bg-[#1A1E33] text-xs">
                                            <p className="font-bold text-white">{r.title}</p>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={handleSaveAiBatch}
                                    className="w-full py-2 rounded-full bg-[#4ADE80] text-[#111424] font-bold text-xs"
                                >
                                    Simpan Semua Draf
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* MODAL IMPORT EXCEL */}
            {importModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-[#242A45] rounded-[20px] max-w-sm w-full p-6 text-white space-y-4 border border-white/10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold">Impor Artikel Excel</h3>
                            <button onClick={() => setImportModalOpen(false)} className="text-[#8F9BB7] hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleImportSubmit} className="space-y-3">
                            <div className="border border-dashed border-[#4E6EF2]/40 rounded-xl p-5 text-center space-y-2">
                                <CloudUpload className="w-8 h-8 text-[#4E6EF2] mx-auto" />
                                <p className="text-xs text-[#8F9BB7]">Pilih file Excel (.xlsx / .xls)</p>
                                <input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    required
                                    onChange={(e) => setImportFile(e.target.files[0])}
                                    className="block w-full text-[11px] text-[#8F9BB7] file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:bg-[#4E6EF2] file:text-white cursor-pointer"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setImportModalOpen(false)} className="px-3 py-1.5 text-xs text-[#8F9BB7]">
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={importing || !importFile}
                                    className="px-5 py-1.5 rounded-full text-xs font-bold bg-[#4E6EF2] text-white"
                                >
                                    {importing ? 'Mengimpor...' : 'Mulai Impor'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
