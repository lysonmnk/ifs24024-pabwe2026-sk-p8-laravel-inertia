import { Head, Link, router } from '@inertiajs/react';
import { 
    ArrowLeft, 
    Calendar, 
    Clock, 
    Tag, 
    Link as LinkIcon, 
    Edit2, 
    Trash2, 
    Upload, 
    CheckCircle2, 
    ShieldCheck, 
    ArrowLeftRight,
    Loader2
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

export default function PostShow({ post }) {
    const viewerRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [coverFile, setCoverFile] = useState(null);

    useEffect(() => {
        if (viewerRef.current && post?.content) {
            viewerRef.current.innerHTML = '';
            new Viewer({
                el: viewerRef.current,
                initialValue: post.content,
            });
        }
    }, [post?.content]);

    const handleUploadCover = (e) => {
        e.preventDefault();
        if (!coverFile) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('cover', coverFile);

        router.post(`/dashboard/posts/${post.id}/cover`, formData, {
            onFinish: () => {
                setUploading(false);
                setCoverFile(null);
            },
        });
    };

    const handleDeleteCover = () => {
        if (confirm('Hapus foto sampul artikel ini?')) {
            router.delete(`/dashboard/posts/${post.id}/cover`);
        }
    };

    const handleTogglePublish = () => {
        router.patch(`/dashboard/posts/${post.id}/publish`);
    };

    const handleDelete = () => {
        if (confirm(`Apakah Anda yakin ingin menghapus artikel "${post.title}"? Tindakan ini permanen.`)) {
            router.delete(`/dashboard/posts/${post.id}`);
        }
    };

    // Estimasi kata & waktu baca
    const wordCount = post?.content ? post.content.split(/\s+/).length : 0;
    const readMinutes = Math.ceil(wordCount / 200) || 1;
    const formattedDate = post?.created_at 
        ? new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB'
        : 'Baru saja';

    return (
        <div className="min-h-screen bg-[#191C2E] text-white p-3 sm:p-6 lg:p-8 font-sans selection:bg-[#4E6EF2] selection:text-white pb-28">
            <Head title={`${post.title} - SmartBlog`} />

            {/* TOP BAR / HEADER */}
            <header className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-6 bg-[#20253E] rounded-[22px] border border-white/5 shadow-xl mb-8">
                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/posts"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#272D48] text-xs font-bold text-[#8F9BB7] hover:text-white transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Dashboard</span>
                    </Link>

                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 ${
                        post.is_published 
                            ? 'bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30'
                            : 'bg-[#8F9BB7]/15 text-[#8F9BB7] border border-[#8F9BB7]/30'
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${post.is_published ? 'bg-[#4ADE80]' : 'bg-[#8F9BB7]'}`} />
                        {post.is_published ? 'PUBLISHED' : 'DRAFT'}
                    </span>

                    <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-[#272D48] text-[10px] font-medium text-[#8F9BB7]">
                        Mode Baca (PK-01)
                    </span>
                </div>

                <div className="flex items-center gap-2.5">
                    <button
                        onClick={handleDelete}
                        className="px-3.5 py-1.5 rounded-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white text-xs font-semibold transition"
                    >
                        Hapus
                    </button>
                    <Link
                        href={`/dashboard/posts`}
                        className="px-4 py-1.5 rounded-full bg-[#4E6EF2] hover:bg-[#3D5EE0] text-white text-xs font-bold transition shadow-sm"
                    >
                        Ubah di Editor
                    </Link>
                </div>
            </header>

            {/* ARTICLE CONTAINER */}
            <main className="max-w-4xl mx-auto space-y-6">
                
                {/* Meta Header */}
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#8F9BB7]">
                        <span className="px-3 py-1 rounded-full bg-[#4E6EF2]/20 text-[#869CFF] font-bold text-xs">
                            {post.category || 'Teknologi'}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formattedDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {wordCount} Kata / {readMinutes} Menit Baca
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                        {post.title}
                    </h1>

                    {/* Slug pill */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#20253E] border border-white/5 text-[11px] text-[#8F9BB7] font-mono">
                        <LinkIcon className="w-3 h-3 text-[#4E6EF2]" />
                        <span>blog / {post.slug}</span>
                    </div>

                    {/* Excerpt Box */}
                    {post.excerpt && (
                        <div className="p-4 sm:p-5 rounded-[18px] bg-[#20253E] border-l-4 border-[#4E6EF2] text-sm text-[#D1D7E8] italic leading-relaxed">
                            "{post.excerpt}"
                        </div>
                    )}
                </div>

                {/* Cover Image Banner */}
                <div className="rounded-[24px] overflow-hidden bg-[#20253E] border border-white/5 p-4 sm:p-6 space-y-4">
                    {post.cover_image_path ? (
                        <div className="relative group rounded-[18px] overflow-hidden">
                            <img
                                src={`/storage/${post.cover_image_path}`}
                                alt={post.title}
                                className="w-full h-72 sm:h-96 object-cover rounded-[18px]"
                            />
                            <button
                                onClick={handleDeleteCover}
                                className="absolute top-4 right-4 p-2 rounded-full bg-red-600 text-white shadow-lg opacity-0 group-hover:opacity-100 transition"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="h-64 sm:h-80 rounded-[18px] bg-[#1C2036] border-2 border-dashed border-[#4E6EF2]/30 flex flex-col items-center justify-center p-6 text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-[#4E6EF2]/20 flex items-center justify-center text-[#4E6EF2]">
                                <Upload className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-white">Tambahkan Foto Sampul (Cover Image)</p>
                                <p className="text-xs text-[#8F9BB7]">Format gambar PNG, JPG, atau WEBP maks 2MB</p>
                            </div>
                            <form onSubmit={handleUploadCover} className="flex items-center gap-2 pt-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={(e) => setCoverFile(e.target.files[0])}
                                    className="text-xs text-[#8F9BB7] file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:bg-[#4E6EF2] file:text-white cursor-pointer"
                                />
                                <button
                                    type="submit"
                                    disabled={uploading || !coverFile}
                                    className="px-4 py-1.5 rounded-full bg-[#4ADE80] text-[#191C2E] text-xs font-bold disabled:opacity-50"
                                >
                                    {uploading ? 'Mengunggah...' : 'Unggah'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                {/* Markdown Reader Body */}
                <article className="bg-[#20253E] rounded-[24px] border border-white/5 p-6 sm:p-10 shadow-xl prose prose-invert max-w-none text-white leading-relaxed">
                    <div ref={viewerRef} className="toastui-viewer-dark" />
                </article>

                {/* Author Footer Card */}
                <div className="bg-[#20253E] rounded-[22px] border border-white/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#4E6EF2] to-[#869CFF] flex items-center justify-center text-white font-bold text-base shadow-md">
                            {post.user?.name ? post.user.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-white">{post.user?.name || 'Andika Pratama'}</p>
                                <span className="px-2 py-0.2 rounded-full bg-[#4ADE80]/15 text-[#4ADE80] text-[9px] font-bold">
                                    Penulis Terverifikasi
                                </span>
                            </div>
                            <p className="text-xs text-[#CBD5E1]">Software Architect & Member Tech Contributor</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-[#CBD5E1] text-right">
                        <div>
                            <p className="font-mono text-[#869CFF]">ID USER: #{post.user_id || '007'}</p>
                            <p>STATUS: {post.is_published ? 'Publik (Live)' : 'Draf Pribadi'}</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* STICKY BOTTOM ACTION BAR */}
            <aside aria-label="Aksi Cepat Artikel" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-3xl bg-[#20253E]/95 backdrop-blur-md rounded-full border border-white/10 px-6 py-3 shadow-2xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                    <span className={`w-2 h-2 rounded-full ${post.is_published ? 'bg-[#4ADE80]' : 'bg-[#FBBF24]'}`} />
                    <span className="text-white font-semibold">
                        {post.is_published ? 'Artikel Aktif di Server Blog' : 'Artikel Masih Berstatus Draf'}
                    </span>
                </div>

                <div className="flex items-center gap-2.5">
                    <button
                        onClick={handleTogglePublish}
                        className="px-4 py-1.5 rounded-full bg-[#272D48] hover:bg-[#32395C] text-[#CBD5E1] hover:text-white text-xs font-semibold transition"
                    >
                        {post.is_published ? 'Kembalikan ke Draf' : 'Terbitkan Sekarang'}
                    </button>
                    <Link
                        href="/dashboard/posts"
                        className="px-5 py-1.5 rounded-full bg-[#3557EC] hover:bg-[#2A4BD9] text-white text-xs font-bold transition shadow-md"
                    >
                        Ubah di Editor TOAST UI
                    </Link>
                </div>
            </aside>
        </div>
    );
}
