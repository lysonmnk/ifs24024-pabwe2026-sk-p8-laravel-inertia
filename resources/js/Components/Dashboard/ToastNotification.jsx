import { CheckCircle2, X } from 'lucide-react';
import { useEffect } from 'react';

export default function ToastNotification({ message, onClose }) {
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-[#333B5E] text-white px-5 py-3.5 rounded-full shadow-2xl border border-[#4ADE80]/30 animate-in slide-in-from-top-4 duration-200"
        >
            <div className="p-1 rounded-full bg-[#4ADE80]/20 text-[#4ADE80]" aria-hidden="true">
                <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold">{message}</span>
            <button
                type="button"
                onClick={onClose}
                aria-label="Tutup notifikasi"
                className="text-[#A9B0CC] hover:text-white p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5873E0] min-h-[32px] min-w-[32px] flex items-center justify-center transition-colors ml-1"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
