import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { 
    Plus, 
    Sparkles, 
    Download, 
    Upload, 
    MoreVertical, 
    Eye, 
    Edit2, 
    Trash2, 
    CheckCircle, 
    Clock, 
    FileText, 
    Search, 
    X, 
    Loader2, 
    Image as ImageIcon 
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export default function PostIndex({ posts, stats, categories, filters }) {
    const [search, setSearch] = useState(filters?.q || '');
    const [activeKebab, setActiveKebab] = useState(null);

    // Full Screen Post Modal state (Create / Edit)
    const [modalOpen, setModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    // AI Modal state
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResults, setAiResults] = useState([]);
    const [aiForm, setAiForm] = useState({
        topic: '',
        category: categories?.[0] || 'Teknologi',
        count: 2,
    });

    // Import Modal state
    const [importModalOpen, setImportModalOpen] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [importing, setImporting] = useState(false);

    // Floating status state
    const [floatingStatus, setFloatingStatus] = useState(null);

    // Toast UI Editor instance
    const editorContainerRef = useRef(null);
    const editorInstanceRef = useRef(null);

    // Post Form
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        category: categories?.[0] || 'Teknologi',
        excerpt: '',
        content: '',
        is_published: false,
    });

    // Initialize or destroy Toast UI Editor inside Fullscreen modal
    useEffect(() => {
        if (modalOpen && editorContainerRef.current) {
            editorContainerRef.current.innerHTML = '';
            editorInstanceRef.current = new Editor({
                el: editorContainerRef.current,
                height: '420px',
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
    }, [modalOpen]);

    const openCreateModal = () => {
        setEditingPost(null);
        reset();
        setData({
            title: '',
            category: categories?.[0] || 'Teknologi',
            excerpt: '',
            content: '',
            is_published: false,
        });
        setModalOpen(true);
    };

    const openEditModal = (p) => {
        setEditingPost(p);
        setData({
            title: p.title,
            category: p.category,
            excerpt: p.excerpt || '',
            content: p.content || '',
            is_published: Boolean(p.is_published),
        });
        setModalOpen(true);
        setActiveKebab(null);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/dashboard/posts', { q: search }, { preserveState: true });
    };

    const handleFormSubmit = (e, shouldPublish = false) => {
        e.preventDefault();
        const markdownContent = editorInstanceRef.current ? editorInstanceRef.current.getMarkdown() : data.content;

        setFloatingStatus('Memproses tindakan...');
        const payload = {
            ...data,
            content: markdownContent,
            is_published: shouldPublish,
        };

        if (editingPost) {
            router.put(`/dashboard/posts/${editingPost.id}`, payload, {
                onSuccess: () => {
                    setModalOpen(false);
                    setFloatingStatus(null);
                },
                onError: () => setFloatingStatus(null),
            });
        } else {
            router.post('/dashboard/posts', payload, {
                onSuccess: () => {
                    setModalOpen(false);
                    setFloatingStatus(null);
                },
                onError: () => setFloatingStatus(null),
            });
        }
    };

    const handleTogglePublish = (p) => {
        setFloatingStatus('Memproses tindakan...');
        router.patch(`/dashboard/posts/${p.id}/publish`, {}, {
            preserveScroll: true,
            onFinish: () => setFloatingStatus(null),
        });
    };

    const handleDelete = (p) => {
        if (confirm(`Apakah Anda yakin ingin menghapus artikel "${p.title}"? Tindakan ini tidak dapat dibatalkan.`)) {
            setFloatingStatus('Memproses tindakan...');
            router.delete(`/dashboard/posts/${p.id}`, {
                preserveScroll: true,
                onFinish: () => {
                    setFloatingStatus(null);
                    setActiveKebab(null);
                },
            });
        }
    };

    // AI Generate
    const handleGenerateAi = async (e) => {
        e.preventDefault();
        setAiLoading(true);
        setFloatingStatus('Memproses tindakan AI...');
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
        } catch (err) {
            alert('Gagal menghasilkan artikel AI. Silakan coba lagi.');
        } finally {
            setAiLoading(false);
            setFloatingStatus(null);
        }
    };

    const handleSaveAiBatch = () => {
        setFloatingStatus('Memproses penyimpanan draf AI...');
        router.post('/dashboard/posts/ai-save', { posts: aiResults }, {
            onSuccess: () => {
                setAiModalOpen(false);
                setAiResults([]);
                setFloatingStatus(null);
            },
            onError: () => setFloatingStatus(null),
        });
    };

    // Excel Import
    const handleImportSubmit = (e) => {
        e.preventDefault();
        if (!importFile) return;

        setImporting(true);
        setFloatingStatus('Memproses impor Excel...');
        const formData = new FormData();
        formData.append('file', importFile);

        router.post('/dashboard/posts/import', formData, {
            onSuccess: () => {
                setImportModalOpen(false);
                setImportFile(null);
                setImporting(false);
                setFloatingStatus(null);
            },
            onError: () => {
                setImporting(false);
                setFloatingStatus(null);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Dashboard Pengelolaan Artikel" />

            {/* Floating Status Pill */}
            {floatingStatus && (
                <div className="fixed bottom-6 right-6 z-50 bg-[#14122B] text-white px-5 py-3 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2.5 animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin text-[#5B4FE9]" />
                    <span>{floatingStatus}</span>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14122B]">Dashboard Artikel</h1>
                        <p className="mt-1 text-sm text-[#6B6A80]">
                            Kelola karya tulis Anda, perbarui draf, dan gunakan teknologi AI generator.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5B4FE9] hover:bg-[#4A3FD1] text-white text-xs font-semibold shadow-sm transition cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Tulis Artikel</span>
                        </button>

                        <button
                            onClick={() => setAiModalOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E8E7F0] hover:bg-[#F4F3FF] text-[#5B4FE9] text-xs font-semibold shadow-sm transition cursor-pointer"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>AI Generator</span>
                        </button>

                        <a
                            href="/dashboard/posts/export"
                            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-[#E8E7F0] hover:bg-[#F4F3FF] text-[#6B6A80] hover:text-[#14122B] text-xs font-medium transition"
                            title="Ekspor ke Excel"
                        >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Ekspor</span>
                        </a>

                        <button
                            onClick={() => setImportModalOpen(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-[#E8E7F0] hover:bg-[#F4F3FF] text-[#6B6A80] hover:text-[#14122B] text-xs font-medium transition cursor-pointer"
                            title="Impor dari Excel"
                        >
                            <Upload className="w-4 h-4" />
                            <span className="hidden sm:inline">Impor</span>
                        </button>
                    </div>
                </div>

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                    <div className="bg-white rounded-2xl p-5 border border-[#E8E7F0] shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-[#6B6A80]">Total Artikel</p>
                            <p className="text-3xl font-extrabold text-[#14122B] mt-1">{stats?.total_posts || 0}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#E9E7FD] text-[#5B4FE9] flex items-center justify-center">
                            <FileText className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-[#E8E7F0] shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-[#6B6A80]">Total Selesai (Published)</p>
                            <p className="text-3xl font-extrabold text-emerald-600 mt-1">{stats?.total_published || 0}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-[#E8E7F0] shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-[#6B6A80]">Belum Selesai (Draft)</p>
                            <p className="text-3xl font-extrabold text-amber-600 mt-1">{stats?.total_draft || 0}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                            <Clock className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Search Bar for Member Posts */}
                <div className="bg-white rounded-2xl p-4 border border-[#E8E7F0] shadow-sm mb-6 flex items-center justify-between">
                    <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
                        <Search className="w-4 h-4 text-[#A3A2B5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari artikel saya..."
                            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#E8E7F0] focus:outline-none focus:border-[#5B4FE9] transition"
                        />
                    </form>
                    <span className="text-xs text-[#A3A2B5]">{posts?.total || 0} artikel ditemukan</span>
                </div>

                {/* List View Table */}
                <div className="bg-white rounded-2xl border border-[#E8E7F0] shadow-sm overflow-hidden">
                    {posts?.data?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-[#14122B]">
                                <thead className="bg-[#FAFAFD] border-b border-[#E8E7F0] text-xs font-bold text-[#6B6A80] uppercase tracking-wider">
                                    <tr>
                                        <th className="py-3.5 px-6">Artikel</th>
                                        <th className="py-3.5 px-4">Kategori</th>
                                        <th className="py-3.5 px-4">Status & Publikasi</th>
                                        <th className="py-3.5 px-4">Tanggal Buat</th>
                                        <th className="py-3.5 px-6 text-right">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E8E7F0]">
                                    {posts.data.map((postItem) => (
                                        <tr key={postItem.id} className="hover:bg-[#F4F3FF]/40 transition group">
                                            {/* Column: Title & Excerpt */}
                                            <td className="py-4 px-6 max-w-sm">
                                                <div className="flex items-center gap-3">
                                                    {postItem.cover_image_path ? (
                                                        <img
                                                            src={`/storage/${postItem.cover_image_path}`}
                                                            alt=""
                                                            className="w-12 h-12 rounded-lg object-cover border border-[#E8E7F0] shrink-0"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-[#E9E7FD] text-[#5B4FE9] flex items-center justify-center shrink-0">
                                                            <FileText className="w-5 h-5 opacity-50" />
                                                        </div>
                                                    )}
                                                    <div className="min-w-0">
                                                        <Link
                                                            href={`/dashboard/posts/${postItem.id}`}
                                                            className="font-bold text-[#14122B] group-hover:text-[#5B4FE9] transition line-clamp-1"
                                                        >
                                                            {postItem.title}
                                                        </Link>
                                                        <p className="text-xs text-[#6B6A80] line-clamp-1 mt-0.5">
                                                            {postItem.excerpt || 'Tidak ada ringkasan...'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Column: Category */}
                                            <td className="py-4 px-4 whitespace-nowrap">
                                                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F1F0F7] text-[#6B6A80]">
                                                    {postItem.category}
                                                </span>
                                            </td>

                                            {/* Column: Status & Toggle Quick Action */}
                                            <td className="py-4 px-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                            postItem.is_published
                                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                                                        }`}
                                                    >
                                                        {postItem.is_published ? 'Published' : 'Draft'}
                                                    </span>

                                                    {/* Quick Toggle Button */}
                                                    <button
                                                        onClick={() => handleTogglePublish(postItem)}
                                                        className="text-[11px] font-medium text-[#5B4FE9] hover:underline cursor-pointer"
                                                        title="Beralih status publikasi"
                                                    >
                                                        {postItem.is_published ? 'Tarik Draf' : 'Terbitkan'}
                                                    </button>
                                                </div>
                                            </td>

                                            {/* Column: Date */}
                                            <td className="py-4 px-4 whitespace-nowrap text-xs text-[#A3A2B5]">
                                                {new Date(postItem.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </td>

                                            {/* Column: Kebab Action Menu */}
                                            <td className="py-4 px-6 text-right whitespace-nowrap relative">
                                                <div className="inline-block text-left">
                                                    <button
                                                        onClick={() =>
                                                            setActiveKebab(activeKebab === postItem.id ? null : postItem.id)
                                                        }
                                                        className="p-1.5 rounded-lg text-[#6B6A80] hover:text-[#14122B] hover:bg-[#E8E7F0] transition cursor-pointer"
                                                    >
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>

                                                    {activeKebab === postItem.id && (
                                                        <div className="absolute right-6 top-10 w-36 bg-white rounded-xl shadow-lg border border-[#E8E7F0] py-1.5 z-20">
                                                            <Link
                                                                href={`/dashboard/posts/${postItem.id}`}
                                                                className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#14122B] hover:bg-[#F4F3FF] hover:text-[#5B4FE9]"
                                                            >
                                                                <Eye className="w-3.5 h-3.5" />
                                                                <span>Detail</span>
                                                            </Link>
                                                            <button
                                                                onClick={() => openEditModal(postItem)}
                                                                className="w-full text-left flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#14122B] hover:bg-[#F4F3FF] hover:text-[#5B4FE9] cursor-pointer"
                                                            >
                                                                <Edit2 className="w-3.5 h-3.5" />
                                                                <span>Ubah</span>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(postItem)}
                                                                className="w-full text-left flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 cursor-pointer"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                                <span>Hapus</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="py-16 text-center">
                            <FileText className="w-12 h-12 text-[#A3A2B5] mx-auto mb-3 opacity-40" />
                            <h3 className="text-base font-bold text-[#14122B]">Belum ada artikel</h3>
                            <p className="text-xs text-[#6B6A80] mt-1 max-w-sm mx-auto">
                                Anda belum memiliki artikel. Mulai buat artikel pertama Anda sekarang atau gunakan AI Generator.
                            </p>
                            <button
                                onClick={openCreateModal}
                                className="mt-4 px-4 py-2 rounded-xl bg-[#5B4FE9] text-white text-xs font-semibold hover:bg-[#4A3FD1] transition cursor-pointer"
                            >
                                Tulis Artikel Baru
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* FULL SCREEN MODAL: Create & Edit Post */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-between overflow-hidden">
                    {/* Contrasting Header */}
                    <div className="bg-[#14122B] text-white px-6 py-4 flex items-center justify-between shadow-md shrink-0">
                        <div>
                            <h2 className="text-lg font-bold">
                                {editingPost ? 'Ubah Artikel' : 'Tulis Artikel Baru'}
                            </h2>
                            <p className="text-xs text-[#A9A8C4]">
                                Tampilan editor penuh untuk kenyamanan menulis konten Markdown.
                            </p>
                        </div>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="p-2 rounded-full hover:bg-white/10 text-white transition cursor-pointer"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Modal Body Form */}
                    <div className="flex-1 bg-white overflow-y-auto p-6 sm:p-10 max-w-5xl mx-auto w-full">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-[#14122B] mb-1.5">Judul Artikel</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Masukkan judul artikel yang menarik..."
                                    className="w-full text-lg font-bold px-4 py-3 rounded-xl border border-[#E8E7F0] focus:outline-none focus:border-[#5B4FE9] focus:ring-2 focus:ring-[#5B4FE9]/20 transition"
                                />
                                {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#14122B] mb-1.5">Kategori</label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E7F0] text-sm focus:outline-none focus:border-[#5B4FE9] transition"
                                    >
                                        {categories?.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#14122B] mb-1.5">Ringkasan (Excerpt)</label>
                                    <input
                                        type="text"
                                        value={data.excerpt}
                                        onChange={(e) => setData('excerpt', e.target.value)}
                                        placeholder="Ringkasan 1-2 kalimat (opsional)..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E7F0] text-sm focus:outline-none focus:border-[#5B4FE9] transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#14122B] mb-1.5">
                                    Konten Artikel (TOAST UI Editor - Markdown)
                                </label>
                                <div ref={editorContainerRef} className="rounded-xl border border-[#E8E7F0] overflow-hidden" />
                                {errors.content && <p className="mt-1 text-xs text-red-600">{errors.content}</p>}
                            </div>
                        </form>
                    </div>

                    {/* Contrasting Footer with Actions on the Right */}
                    <div className="bg-[#14122B] border-t border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
                        <button
                            type="button"
                            onClick={() => setModalOpen(false)}
                            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#A9A8C4] hover:text-white transition cursor-pointer"
                        >
                            Batal
                        </button>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                disabled={processing}
                                onClick={(e) => handleFormSubmit(e, false)}
                                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition cursor-pointer"
                            >
                                Simpan sebagai Draf
                            </button>

                            <button
                                type="button"
                                disabled={processing}
                                onClick={(e) => handleFormSubmit(e, true)}
                                className="px-6 py-2.5 rounded-xl bg-[#5B4FE9] hover:bg-[#4A3FD1] text-white text-xs font-bold shadow-md transition cursor-pointer"
                            >
                                Publikasikan Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* AI GENERATOR MODAL */}
            {aiModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#E8E7F0] max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-[#E8E7F0]">
                            <div className="flex items-center gap-2 text-[#5B4FE9]">
                                <Sparkles className="w-5 h-5" />
                                <h3 className="text-base font-bold text-[#14122B]">AI Article Generator (OpenAI)</h3>
                            </div>
                            <button
                                onClick={() => {
                                    setAiModalOpen(false);
                                    setAiResults([]);
                                }}
                                className="p-1 rounded-lg text-[#A3A2B5] hover:text-[#14122B]"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {aiResults.length === 0 ? (
                            <form onSubmit={handleGenerateAi} className="mt-5 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#14122B] mb-1">Topik Artikel</label>
                                    <input
                                        type="text"
                                        required
                                        value={aiForm.topic}
                                        onChange={(e) => setAiForm({ ...aiForm, topic: e.target.value })}
                                        placeholder="Contoh: Mengapa Clean Architecture penting untuk software modern"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7F0] text-sm focus:outline-none focus:border-[#5B4FE9]"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#14122B] mb-1">Kategori</label>
                                        <select
                                            value={aiForm.category}
                                            onChange={(e) => setAiForm({ ...aiForm, category: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7F0] text-sm focus:outline-none focus:border-[#5B4FE9]"
                                        >
                                            {categories?.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-[#14122B] mb-1">
                                            Jumlah Artikel (type="number")
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="5"
                                            required
                                            value={aiForm.count}
                                            onChange={(e) => setAiForm({ ...aiForm, count: Number(e.target.value) })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7F0] text-sm focus:outline-none focus:border-[#5B4FE9]"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setAiModalOpen(false)}
                                        className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6B6A80] hover:bg-[#F1F0F7]"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={aiLoading}
                                        className="px-5 py-2 rounded-xl bg-[#5B4FE9] hover:bg-[#4A3FD1] text-white text-xs font-bold flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                        <span>Generate Draf Artikel</span>
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="mt-5 space-y-4">
                                <p className="text-xs text-[#6B6A80]">
                                    Berhasil menghasilkan {aiResults.length} draf artikel. Periksa hasil sebelum menyimpannya ke draf:
                                </p>
                                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                                    {aiResults.map((item, idx) => (
                                        <div key={idx} className="p-3.5 rounded-xl border border-[#E8E7F0] bg-[#FAFAFD]">
                                            <p className="font-bold text-sm text-[#14122B]">{item.title}</p>
                                            <p className="text-xs text-[#6B6A80] mt-1 line-clamp-2">{item.excerpt}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-4 flex justify-end gap-2 border-t border-[#E8E7F0]">
                                    <button
                                        type="button"
                                        onClick={() => setAiResults([])}
                                        className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6B6A80] hover:bg-[#F1F0F7]"
                                    >
                                        Ulangi
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSaveAiBatch}
                                        className="px-5 py-2 rounded-xl bg-[#5B4FE9] hover:bg-[#4A3FD1] text-white text-xs font-bold"
                                    >
                                        Simpan Semua Batch sebagai Draf
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* EXCEL IMPORT MODAL */}
            {importModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E8E7F0]">
                        <div className="flex items-center justify-between pb-3 border-b border-[#E8E7F0]">
                            <h3 className="text-base font-bold text-[#14122B]">Impor Artikel dari Excel</h3>
                            <button onClick={() => setImportModalOpen(false)} className="p-1 text-[#A3A2B5] hover:text-[#14122B]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleImportSubmit} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-[#14122B] mb-2">Pilih Berkas Excel (.xlsx, .xls)</label>
                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    required
                                    onChange={(e) => setImportFile(e.target.files[0])}
                                    className="w-full text-xs text-[#6B6A80] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#E9E7FD] file:text-[#5B4FE9] hover:file:bg-[#F4F3FF] cursor-pointer"
                                />
                            </div>

                            <p className="text-[11px] text-[#A3A2B5] leading-relaxed">
                                Pastikan berkas Excel memiliki baris header dengan kolom Judul/Title dan Konten/Content. Artikel akan diimpor sebagai Draf milik Anda.
                            </p>

                            <div className="pt-3 flex justify-end gap-2 border-t border-[#E8E7F0]">
                                <button
                                    type="button"
                                    onClick={() => setImportModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6B6A80] hover:bg-[#F1F0F7]"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={importing}
                                    className="px-5 py-2 rounded-xl bg-[#5B4FE9] hover:bg-[#4A3FD1] text-white text-xs font-bold flex items-center gap-2"
                                >
                                    {importing && <Loader2 className="w-4 h-4 animate-spin" />}
                                    <span>Mulai Impor</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

