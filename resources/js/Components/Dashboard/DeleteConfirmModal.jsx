import { AlertTriangle, X } from 'lucide-react';
import { useEffect } from 'react';

export default function DeleteConfirmModal({ isOpen, post, onConfirm, onCancel, isProcessing }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen && !isProcessing) {
                onCancel();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isProcessing, onCancel]);

    if (!isOpen || !post) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-desc"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
        >
            <div className="bg-[#333B5E] text-white w-full max-w-md rounded-[20px] p-6 shadow-2xl border border-white/10 space-y-5">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-[#FBBF24]/20 text-[#FBBF24]" aria-hidden="true">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <h3 id="delete-dialog-title" className="text-lg font-bold text-white">
                            Hapus Artikel
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isProcessing}
                        aria-label="Tutup dialog"
                        className="text-[#A9B0CC] hover:text-white p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5873E0] min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <p id="delete-dialog-desc" className="text-sm text-[#A9B0CC] leading-relaxed">
                    Apakah Anda yakin ingin menghapus artikel <span className="font-semibold text-white">"{post.title}"</span>? Tindakan ini permanen dan tidak dapat dibatalkan.
                </p>

                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isProcessing}
                        className="px-5 py-2.5 rounded-full text-sm font-semibold text-[#A9B0CC] hover:text-white hover:bg-[#3A4366] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5873E0] min-h-[44px]"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={() => onConfirm(post)}
                        disabled={isProcessing}
                        className="px-5 py-2.5 rounded-full text-sm font-semibold bg-red-600 hover:bg-red-500 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 min-h-[44px] flex items-center gap-2 disabled:opacity-50"
                    >
                        {isProcessing ? 'Menghapus...' : 'Hapus Artikel'}
                    </button>
                </div>
            </div>
        </div>
    );
}
