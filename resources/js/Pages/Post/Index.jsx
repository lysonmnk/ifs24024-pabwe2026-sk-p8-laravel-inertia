import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { X, Sparkles, Upload, Download, Loader2, Image as ImageIcon } from 'lucide-react';

// Modular Dashboard Components
import Sidebar from '../../Components/Dashboard/Sidebar';
import TopBar from '../../Components/Dashboard/TopBar';
import GreetingBanner from '../../Components/Dashboard/GreetingBanner';
import StatCards from '../../Components/Dashboard/StatCards';
import ProportionDonutCard from '../../Components/Dashboard/ProportionDonutCard';
import QuickActionsCard from '../../Components/Dashboard/QuickActionsCard';
import ArticleList from '../../Components/Dashboard/ArticleList';
import DeleteConfirmModal from '../../Components/Dashboard/DeleteConfirmModal';
import ToastNotification from '../../Components/Dashboard/ToastNotification';
import { DashboardSkeleton } from '../../Components/Dashboard/Skeletons';

// Mock Data Fallback
import { mockMember, mockPosts, mockStats } from './mockData';

export default function MemberDashboard(props) {
    const { auth } = usePage().props || {};

    // Ambil data dari props Inertia atau fallback ke mockData
    const member = auth?.user || props.user || mockMember;
    const initialPosts = props.posts?.data || props.posts || mockPosts;
    const stats = props.stats || mockStats;
    const categories = props.categories || ['Teknologi', 'Gaya Hidup', 'Desain', 'Karir', 'Umum'];
    const initialQuery = props.filters?.q || '';

    // State Utama
    const [postsList, setPostsList] = useState(initialPosts);
    const [search, setSearch] = useState(initialQuery);
    const [isSearching, setIsSearching] = useState(Boolean(initialQuery));
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);
    const [showAllArticles, setShowAllArticles] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Modal Hapus
    const [deleteModalPost, setDeleteModalPost] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Modal Tambah / Ubah Artikel
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

    // Import Excel Modal State
    const [importModalOpen, setImportModalOpen] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [importing, setImporting] = useState(false);

    // Form Artikel Baru / Ubah
    const { data, setData, processing, errors, reset } = useForm({
        title: '',
        category: categories[0] || 'Teknologi',
        excerpt: '',
        content: '',
        is_published: false,
    });

    // Sinkronisasi data jika props berubah
    useEffect(() => {
        if (props.posts?.data) {
            setPostsList(props.posts.data);
        }
    }, [props.posts]);

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
        if (search.trim() === '') {
            handleResetSearch();
            return;
        }

        setIsSearching(true);
        if (props.posts) {
            router.get('/dashboard/posts', { q: search }, { preserveState: true });
        } else {
            // Mock filter
            const filtered = mockPosts.filter((p) =>
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.category.toLowerCase().includes(search.toLowerCase())
            );
            setPostsList(filtered);
        }
    };

    const handleResetSearch = () => {
        setSearch('');
        setIsSearching(false);
        if (props.posts) {
            router.get('/dashboard/posts', {}, { preserveState: true });
        } else {
            setPostsList(mockPosts);
        }
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

    // Buka Modal Ubah Artikel
    const handleOpenEditModal = (post) => {
        setEditingPost(post);
        setData({
            title: post.title,
            category: post.category,
            excerpt: post.excerpt || '',
            content: post.content || '',
            is_published: Boolean(post.is_published),
        });
        setIsEditorModalOpen(true);
    };

    // Submit Artikel (Draf / Publikasi)
    const handleSavePost = (e, shouldPublish = false) => {
        e.preventDefault();
        const markdown = editorInstanceRef.current ? editorInstanceRef.current.getMarkdown() : data.content;
        const payload = { ...data, content: markdown, is_published: shouldPublish };

        if (props.posts) {
            if (editingPost) {
                router.put(`/dashboard/posts/${editingPost.id}`, payload, {
                    onSuccess: () => {
                        setIsEditorModalOpen(false);
                        setToastMessage('Artikel berhasil diperbarui!');
                    },
                    onError: () => setErrorMessage('Gagal memperbarui artikel.'),
                });
            } else {
                router.post('/dashboard/posts', payload, {
                    onSuccess: () => {
                        setIsEditorModalOpen(false);
                        setToastMessage(shouldPublish ? 'Artikel berhasil dipublikasikan!' : 'Draf artikel berhasil disimpan!');
                    },
                    onError: () => setErrorMessage('Gagal menyimpan artikel.'),
                });
            }
        } else {
            // Mock standalone
            if (editingPost) {
                setPostsList(postsList.map(p => p.id === editingPost.id ? { ...p, ...payload } : p));
                setToastMessage('Artikel berhasil diperbarui (Mock)!');
            } else {
                const newPost = {
                    id: Date.now(),
                    ...payload,
                    formatted_date: 'Hari ini',
                    created_at: new Date().toISOString(),
                };
                setPostsList([newPost, ...postsList]);
                setToastMessage('Artikel berhasil ditambahkan (Mock)!');
            }
            setIsEditorModalOpen(false);
        }
    };

    // Cepat Toggle Publish / Draft
    const handleTogglePublish = (post) => {
        if (props.posts) {
            router.patch(`/dashboard/posts/${post.id}/publish`, {}, {
                preserveScroll: true,
                onSuccess: () => {
                    setToastMessage(`Status "${post.title}" berhasil diubah!`);
                },
            });
        } else {
            // Mock toggle
            setPostsList(postsList.map(p => p.id === post.id ? { ...p, is_published: !p.is_published } : p));
            setToastMessage(`Status artikel berhasil beralih!`);
        }
    };

    // Handle Hapus Artikel dengan Dialog
    const handleConfirmDelete = (post) => {
        setIsDeleting(true);
        if (props.posts) {
            router.delete(`/dashboard/posts/${post.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsDeleting(false);
                    setDeleteModalPost(null);
                    setToastMessage(`Artikel "${post.title}" berhasil dihapus.`);
                },
                onError: () => {
                    setIsDeleting(false);
                    setErrorMessage('Gagal menghapus artikel.');
                },
            });
        } else {
            // Mock delete
            setPostsList(postsList.filter(p => p.id !== post.id));
            setIsDeleting(false);
            setDeleteModalPost(null);
            setToastMessage(`Artikel "${post.title}" berhasil dihapus (Mock).`);
        }
    };

    // Ekspor Excel
    const handleExportExcel = () => {
        if (props.posts) {
            window.location.href = '/dashboard/posts/export';
        } else {
            setToastMessage('Fitur Ekspor Excel terhubung ke endpoint /dashboard/posts/export.');
        }
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
            setToastMessage('Gagal generate AI (periksa koneksi API).');
        } finally {
            setAiLoading(false);
        }
    };

    const handleSaveAiBatch = () => {
        router.post('/dashboard/posts/ai-save', { posts: aiResults }, {
            onSuccess: () => {
                setAiModalOpen(false);
                setAiResults([]);
                setToastMessage('Batch draf AI berhasil disimpan!');
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
                setToastMessage('Data artikel berhasil diimpor dari Excel!');
            },
            onError: () => {
                setImporting(false);
                setToastMessage('Gagal mengimpor file Excel.');
            },
        });
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-[#2B3252] text-white p-3 sm:p-6 lg:p-8 font-sans selection:bg-[#5873E0] selection:text-white">
            <Head title="Member Dashboard - Blog" />

            {/* Notifikasi Toast Sukses / Info */}
            <ToastNotification 
                message={toastMessage} 
                onClose={() => setToastMessage(null)} 
            />

            {/* Dialog Konfirmasi Hapus */}
            <DeleteConfirmModal
                isOpen={Boolean(deleteModalPost)}
                post={deleteModalPost}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteModalPost(null)}
                isProcessing={isDeleting}
            />

            {/* Kontainer Utama Membulat (Radius 28px) */}
            <div className="max-w-[1600px] mx-auto bg-[#2B3252] rounded-[28px] flex flex-col md:flex-row gap-6">
                {/* 1. SIDEBAR KIRI */}
                <Sidebar
                    activeMenu="dashboard"
                    onNavigate={(action) => {
                        if (action === 'open-ai') setAiModalOpen(true);
                        if (action === 'open-import') setImportModalOpen(true);
                    }}
                    onLogout={handleLogout}
                    isMobileOpen={isMobileMenuOpen}
                    setIsMobileOpen={setIsMobileMenuOpen}
                />

                {/* 2. AREA TENGAH */}
                <main className="flex-1 space-y-6 min-w-0">
                    {/* Top Bar: Pencarian & Avatar */}
                    <TopBar
                        search={search}
                        setSearch={setSearch}
                        onSearchSubmit={handleSearchSubmit}
                        member={member}
                        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
                    />

                    {isLoading ? (
                        <DashboardSkeleton />
                    ) : (
                        <>
                            {/* Banner Sapaan (Tombol Primer Satu-satunya) */}
                            <GreetingBanner
                                memberName={member.name}
                                onAddArticle={handleOpenCreateModal}
                            />

                            {/* Baris 3 Kartu Statistik */}
                            <StatCards stats={stats} />

                            {/* Kartu Proporsi Artikel (Donut Chart) */}
                            <ProportionDonutCard
                                published={stats.published}
                                draft={stats.draft}
                            />

                            {/* Daftar Artikel (List View) */}
                            <ArticleList
                                posts={postsList}
                                isSearchActive={isSearching}
                                onResetSearch={handleResetSearch}
                                onAddArticle={handleOpenCreateModal}
                                onTogglePublish={handleTogglePublish}
                                onEditArticle={handleOpenEditModal}
                                onDeleteRequest={(post) => setDeleteModalPost(post)}
                                onViewDetail={(post) => router.get(`/dashboard/posts/${post.id}`)}
                                errorMessage={errorMessage}
                                onRetry={() => {
                                    setErrorMessage(null);
                                    handleResetSearch();
                                }}
                                showAll={showAllArticles}
                                setShowAll={setShowAllArticles}
                            />
                        </>
                    )}
                </main>

                {/* 3. PANEL KANAN (Aksi Cepat) */}
                <div className="w-full xl:w-72 shrink-0">
                    <QuickActionsCard
                        onOpenAi={() => setAiModalOpen(true)}
                        onOpenImport={() => setImportModalOpen(true)}
                        onExportExcel={handleExportExcel}
                    />
                </div>
            </div>

            {/* FULL SCREEN / LARGE MODAL: Tambah & Ubah Artikel */}
            {isEditorModalOpen && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="editor-modal-title"
                    className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex flex-col justify-between overflow-hidden animate-in fade-in duration-150"
                >
                    {/* Modal Header */}
                    <div className="bg-[#333B5E] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
                        <div>
                            <h2 id="editor-modal-title" className="text-lg font-bold text-white">
                                {editingPost ? 'Ubah Artikel' : 'Tulis Artikel Baru'}
                            </h2>
                            <p className="text-xs text-[#A9B0CC]">
                                Editor Markdown TOAST UI dengan tinjauan langsung.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsEditorModalOpen(false)}
                            aria-label="Tutup editor"
                            className="p-2 rounded-full text-[#A9B0CC] hover:text-white hover:bg-[#3A4366] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="flex-1 bg-[#2B3252] overflow-y-auto p-4 sm:p-8 max-w-4xl mx-auto w-full">
                        <form className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#A9B0CC] mb-2">
                                    Judul Artikel
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Masukkan judul artikel yang memikat..."
                                    className="w-full bg-[#333B5E] text-white text-base font-semibold px-4 py-3 rounded-[16px] border border-transparent focus:border-[#5873E0] focus:outline-none focus:ring-2 focus:ring-[#5873E0]/30 transition min-h-[48px]"
                                />
                                {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#A9B0CC] mb-2">
                                        Kategori
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full bg-[#333B5E] text-white text-sm font-medium px-4 py-3 rounded-[16px] border border-transparent focus:border-[#5873E0] focus:outline-none focus:ring-2 focus:ring-[#5873E0]/30 transition min-h-[48px]"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat} className="bg-[#333B5E] text-white">
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#A9B0CC] mb-2">
                                        Ringkasan (Excerpt)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.excerpt}
                                        onChange={(e) => setData('excerpt', e.target.value)}
                                        placeholder="Ringkasan 1-2 kalimat (opsional)..."
                                        className="w-full bg-[#333B5E] text-white text-sm px-4 py-3 rounded-[16px] border border-transparent focus:border-[#5873E0] focus:outline-none focus:ring-2 focus:ring-[#5873E0]/30 transition min-h-[48px]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#A9B0CC] mb-2">
                                    Konten Artikel (Markdown)
                                </label>
                                <div 
                                    ref={editorContainerRef} 
                                    className="rounded-[16px] overflow-hidden border border-white/10 bg-white" 
                                />
                                {errors.content && <p className="mt-1 text-xs text-red-400">{errors.content}</p>}
                            </div>
                        </form>
                    </div>

                    {/* Modal Footer */}
                    <div className="bg-[#333B5E] border-t border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
                        <button
                            type="button"
                            onClick={() => setIsEditorModalOpen(false)}
                            className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#A9B0CC] hover:text-white hover:bg-[#3A4366] transition min-h-[44px]"
                        >
                            Batal
                        </button>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                disabled={processing}
                                onClick={(e) => handleSavePost(e, false)}
                                className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#3A4366] hover:bg-[#434d75] text-white transition min-h-[44px]"
                            >
                                Simpan Draf
                            </button>
                            <button
                                type="button"
                                disabled={processing}
                                onClick={(e) => handleSavePost(e, true)}
                                className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#5873E0] hover:bg-[#4762cf] text-white transition min-h-[44px] shadow-sm"
                            >
                                Publikasikan Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* AI GENERATOR MODAL */}
            {aiModalOpen && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
                >
                    <div className="bg-[#333B5E] rounded-[20px] max-w-2xl w-full p-6 text-white space-y-5 border border-white/10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <Sparkles className="w-5 h-5 text-[#5873E0]" />
                                <h2 className="text-base font-bold">Generator Artikel AI</h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setAiModalOpen(false)}
                                className="text-[#A9B0CC] hover:text-white p-1 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleGenerateAi} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[#A9B0CC] mb-1">Topik Utama</label>
                                <input
                                    type="text"
                                    required
                                    value={aiForm.topic}
                                    onChange={(e) => setAiForm({ ...aiForm, topic: e.target.value })}
                                    placeholder="Contoh: Manfaat Clean Architecture di Laravel"
                                    className="w-full bg-[#2B3252] text-white rounded-[14px] px-4 py-2.5 text-sm border border-transparent focus:border-[#5873E0] focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-[#A9B0CC] mb-1">Kategori</label>
                                    <select
                                        value={aiForm.category}
                                        onChange={(e) => setAiForm({ ...aiForm, category: e.target.value })}
                                        className="w-full bg-[#2B3252] text-white rounded-[14px] px-4 py-2.5 text-sm border border-transparent focus:border-[#5873E0] focus:outline-none"
                                    >
                                        {categories.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[#A9B0CC] mb-1">Jumlah Draf</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={aiForm.count}
                                        onChange={(e) => setAiForm({ ...aiForm, count: parseInt(e.target.value) || 1 })}
                                        className="w-full bg-[#2B3252] text-white rounded-[14px] px-4 py-2.5 text-sm border border-transparent focus:border-[#5873E0] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setAiModalOpen(false)}
                                    className="px-5 py-2 rounded-full text-xs font-semibold text-[#A9B0CC] hover:text-white"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={aiLoading}
                                    className="px-6 py-2 rounded-full text-xs font-bold bg-[#5873E0] hover:bg-[#4762cf] text-white min-h-[40px] flex items-center gap-2"
                                >
                                    {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                    <span>{aiLoading ? 'Memproses AI...' : 'Generate Artikel'}</span>
                                </button>
                            </div>
                        </form>

                        {aiResults.length > 0 && (
                            <div className="border-t border-white/10 pt-4 space-y-3">
                                <h3 className="text-xs font-bold uppercase text-[#A9B0CC]">Hasil Generate AI ({aiResults.length})</h3>
                                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                    {aiResults.map((item, idx) => (
                                        <div key={idx} className="bg-[#2B3252] p-3 rounded-[12px] space-y-1">
                                            <p className="text-sm font-bold text-white">{item.title}</p>
                                            <p className="text-xs text-[#A9B0CC] line-clamp-2">{item.excerpt}</p>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSaveAiBatch}
                                    className="w-full py-2.5 rounded-full bg-[#4ADE80] hover:bg-[#3ec470] text-[#2B3252] font-bold text-xs"
                                >
                                    Simpan Semua Draf AI
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* IMPORT EXCEL MODAL */}
            {importModalOpen && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
                >
                    <div className="bg-[#333B5E] rounded-[20px] max-w-md w-full p-6 text-white space-y-5 border border-white/10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <Upload className="w-5 h-5 text-[#5873E0]" />
                                <h2 className="text-base font-bold">Impor Artikel dari Excel</h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setImportModalOpen(false)}
                                className="text-[#A9B0CC] hover:text-white p-1 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleImportSubmit} className="space-y-4">
                            <div className="border-2 border-dashed border-[#3A4366] rounded-[16px] p-6 text-center space-y-2 hover:border-[#5873E0] transition-colors">
                                <Upload className="w-8 h-8 text-[#A9B0CC] mx-auto" />
                                <p className="text-xs text-[#A9B0CC]">
                                    Pilih file Excel (.xlsx / .xls)
                                </p>
                                <input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    required
                                    onChange={(e) => setImportFile(e.target.files[0])}
                                    className="block w-full text-xs text-[#A9B0CC] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#5873E0] file:text-white cursor-pointer"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setImportModalOpen(false)}
                                    className="px-5 py-2 rounded-full text-xs font-semibold text-[#A9B0CC] hover:text-white"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={importing || !importFile}
                                    className="px-6 py-2 rounded-full text-xs font-bold bg-[#5873E0] hover:bg-[#4762cf] text-white min-h-[40px] flex items-center gap-2 disabled:opacity-50"
                                >
                                    {importing && <Loader2 className="w-4 h-4 animate-spin" />}
                                    <span>{importing ? 'Mengimpor...' : 'Mulai Impor'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
