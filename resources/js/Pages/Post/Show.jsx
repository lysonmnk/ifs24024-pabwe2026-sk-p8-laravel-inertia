import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { ArrowLeft, Calendar, Tag, Image as ImageIcon, Trash2, Upload, CheckCircle2, FileText, Loader2 } from 'lucide-react';
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

    return (
        <AppLayout>
            <Head title={`Detail: ${post.title}`} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-6">
                    <Link
                        href="/dashboard/posts"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B6A80] hover:text-[#5B4FE9] transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Dashboard Artikel</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleTogglePublish}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                                post.is_published
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                        >
                            {post.is_published ? 'Status: Published (Klik untuk Draf)' : 'Status: Draft (Klik untuk Terbitkan)'}
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#E8E7F0] shadow-sm p-6 sm:p-8 mb-8">
                    <div className="flex items-center gap-2 text-xs mb-3">
                        <span className="px-2.5 py-1 rounded-full font-semibold bg-[#E9E7FD] text-[#5B4FE9]">
                            {post.category}
                        </span>
                        <span className="text-[#A3A2B5]">&bull;</span>
                        <span className="text-[#6B6A80]">
                            Dibuat:{' '}
                            {new Date(post.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14122B] tracking-tight">{post.title}</h1>
                    <p className="mt-2 text-xs text-[#A3A2B5] font-mono">Slug: {post.slug}</p>

                    {post.excerpt && (
                        <p className="mt-4 text-sm text-[#6B6A80] italic bg-[#FAFAFD] p-3 rounded-xl border border-[#E8E7F0]">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Cover Image Section */}
                    <div className="mt-6 pt-6 border-t border-[#E8E7F0]">
                        <h3 className="text-xs font-bold text-[#14122B] uppercase tracking-wider mb-3">Foto Sampul Artikel</h3>
                        {post.cover_image_path ? (
                            <div className="space-y-3">
                                <div className="rounded-xl overflow-hidden max-h-72 border border-[#E8E7F0]">
                                    <img
                                        src={`/storage/${post.cover_image_path}`}
                                        alt="Sampul"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button
                                    onClick={handleDeleteCover}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Hapus Foto Sampul</span>
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleUploadCover} className="flex flex-col sm:flex-row items-center gap-3">
                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={(e) => setCoverFile(e.target.files[0])}
                                    className="w-full sm:w-auto text-xs text-[#6B6A80] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#E9E7FD] file:text-[#5B4FE9] cursor-pointer"
                                />
                                <button
                                    type="submit"
                                    disabled={uploading || !coverFile}
                                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#5B4FE9] hover:bg-[#4A3FD1] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition disabled:opacity-50 cursor-pointer"
                                >
                                    {uploading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                    <span>Unggah Sampul</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Rendered Markdown Preview */}
                <div className="bg-white rounded-2xl border border-[#E8E7F0] shadow-sm p-6 sm:p-8">
                    <h3 className="text-xs font-bold text-[#6B6A80] uppercase tracking-wider mb-4 pb-2 border-b border-[#E8E7F0]">
                        Preview Konten Markdown (TOAST UI Viewer)
                    </h3>
                    <div ref={viewerRef} className="toastui-editor-contents" />
                </div>
            </div>
        </AppLayout>
    );
}

