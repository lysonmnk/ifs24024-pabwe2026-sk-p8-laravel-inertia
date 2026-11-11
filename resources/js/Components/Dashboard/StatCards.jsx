import { FileText, CheckCircle2, Clock } from 'lucide-react';

export default function StatCards({ stats = { total: 0, published: 0, draft: 0 } }) {
    const cards = [
        {
            id: 'total',
            title: 'Total Artikel',
            value: stats.total,
            icon: FileText,
            ariaLabel: `Total artikel: ${stats.total}`,
        },
        {
            id: 'published',
            title: 'Selesai',
            value: stats.published,
            icon: CheckCircle2,
            ariaLabel: `Artikel selesai dipublikasikan: ${stats.published}`,
        },
        {
            id: 'draft',
            title: 'Belum Selesai',
            value: stats.draft,
            icon: Clock,
            ariaLabel: `Artikel draf belum selesai: ${stats.draft}`,
        },
    ];

    return (
        <section aria-label="Statistik Artikel" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <article
                        key={card.id}
                        aria-label={card.ariaLabel}
                        className="bg-[#333B5E] text-white p-6 rounded-[20px] flex items-start justify-between transition-transform hover:-translate-y-0.5"
                    >
                        <div className="space-y-2">
                            <h2 className="text-xs font-medium uppercase tracking-wider text-[#A9B0CC]">
                                {card.title}
                            </h2>
                            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                {card.value}
                            </p>
                        </div>
                        <div 
                            aria-hidden="true"
                            className="p-3 rounded-full bg-[#3A4366] text-[#5873E0] shrink-0"
                        >
                            <Icon className="w-5 h-5" />
                        </div>
                    </article>
                );
            })}
        </section>
    );
}
