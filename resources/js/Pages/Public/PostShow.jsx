import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { ArrowLeft, Calendar, User, Tag, Share2, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

export default function PostShow({ article }) {
    const viewerRef = useRef(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (viewerRef.current && article?.content) {
            viewerRef.current.innerHTML = '';
            new Viewer({
                el: viewerRef.current,
                initialValue: article.content,
            });
        }
    }, [article?.content]);

    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        }
    };

    return (
        <AppLayout>
            <Head title={article.title} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Back Link */}
                <div className="mb-6">
                    <Link
                        href="/articles"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B6A80] hover:text-[#5B4FE9] transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Galeri Artikel</span>
                    </Link>
                </div>

                {/* Article Header */}
                <header className="mb-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E9E7FD] text-[#5B4FE9]">
                            {article.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-[#6B6A80]">
                            <Calendar className="w-3.5 h-3.5 text-[#52506B]" />
                            <span>
                                {article.published_at
                                    ? new Date(article.published_at).toLocaleDateString('id-ID', {
                                          day: 'numeric',
                                          month: 'long',
                                          year: 'numeric',
                                      })
                                    : '-'}
                            </span>
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14122B] tracking-tight leading-tight">
                        {article.title}
                    </h1>

                    {article.excerpt && (
                        <p className="mt-4 text-base sm:text-lg text-[#6B6A80] leading-relaxed italic border-l-4 border-[#3557EC] pl-4 bg-white/50 py-2 rounded-r-xl">
                            {article.excerpt}
                        </p>
                    )}

                    <div className="mt-6 pt-4 border-t border-[#E8E7F0] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#3557EC] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                                {article.user?.name ? article.user.name.charAt(0) : 'U'}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#14122B]">{article.user?.name || 'Penulis Blog'}</p>
                                <p className="text-xs text-[#52506B]">Kontributor Terverifikasi</p>
                            </div>
                        </div>

                        <button
                            onClick={handleShare}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E7F0] bg-white hover:bg-[#F4F3FF] text-xs font-medium text-[#6B6A80] hover:text-[#3557EC] transition cursor-pointer"
                        >
                            <Share2 className="w-3.5 h-3.5" />
                            <span>{copied ? 'Tautan Disalin!' : 'Bagikan'}</span>
                        </button>
                    </div>
                </header>

                {/* Cover Image */}
                {article.cover_image_path && (
                    <div className="mb-10 rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(20,18,43,0.08)] border border-[#E8E7F0]">
                        <img
                            src={`/storage/${article.cover_image_path}`}
                            alt={article.title}
                            className="w-full max-h-[480px] object-cover"
                        />
                    </div>
                )}

                {/* Markdown Content (Rendered with TOAST UI Viewer) */}
                <article className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E8E7F0] shadow-sm leading-relaxed text-[#14122B]">
                    <div ref={viewerRef} className="toastui-editor-contents" />
                </article>

                {/* Post Footer Call to Action */}
                <div className="mt-12 bg-gradient-to-r from-[#5B4FE9] to-[#4A3FD1] rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/20 px-3 py-1 rounded-full mb-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Mulai Publikasikan Karyamu</span>
                        </div>
                        <h3 className="text-xl font-bold">Tertarik Menulis Artikel Sendiri?</h3>
                        <p className="text-sm text-white/80 mt-1 max-w-md">
                            Daftar sebagai penulis, nikmati kemudahan Markdown Editor, integrasi AI, serta manajemen draf artikel mandiri.
                        </p>
                    </div>
                    <Link
                        href="/register"
                        className="px-6 py-3 rounded-full bg-white text-[#5B4FE9] font-bold text-sm hover:bg-white/90 transition shadow-sm shrink-0"
                    >
                        Daftar Penulis Gratis
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}

