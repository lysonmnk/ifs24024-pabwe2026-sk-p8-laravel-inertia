import { Sparkles, Upload, Download } from 'lucide-react';

export default function QuickActionsCard({ onOpenAi, onOpenImport, onExportExcel }) {
    const actions = [
        {
            id: 'ai',
            label: 'AI Generator',
            description: 'Buat draf artikel instan dengan bantuan AI',
            icon: Sparkles,
            onClick: onOpenAi,
        },
        {
            id: 'import',
            label: 'Import Excel',
            description: 'Unggah file Excel untuk tambah banyak artikel',
            icon: Upload,
            onClick: onOpenImport,
        },
        {
            id: 'export',
            label: 'Export Excel',
            description: 'Unduh seluruh artikel ke format XLSX',
            icon: Download,
            onClick: onExportExcel,
        },
    ];

    return (
        <aside 
            aria-label="Panel Aksi Cepat" 
            className="bg-[#333B5E] text-white p-6 rounded-[20px] space-y-5 h-fit"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white">
                    Aksi Cepat
                </h2>
                <span className="text-xs text-[#A9B0CC] font-medium">
                    Fitur
                </span>
            </div>

            <div className="space-y-3">
                {actions.map((act) => {
                    const Icon = act.icon;
                    return (
                        <button
                            key={act.id}
                            type="button"
                            onClick={act.onClick}
                            aria-label={act.label}
                            className="w-full text-left p-4 rounded-[16px] bg-[#3A4366] hover:bg-[#434d75] transition-all duration-200 group flex items-start gap-3.5 focus:outline-none focus:ring-2 focus:ring-[#5873E0] min-h-[44px]"
                        >
                            <div 
                                aria-hidden="true"
                                className="p-2.5 rounded-full bg-[#5873E0]/20 text-[#5873E0] group-hover:bg-[#5873E0] group-hover:text-white transition-colors shrink-0"
                            >
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="space-y-0.5 min-w-0">
                                <p className="text-sm font-semibold text-white group-hover:text-white truncate">
                                    {act.label}
                                </p>
                                <p className="text-xs text-[#A9B0CC] leading-relaxed line-clamp-2">
                                    {act.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}
