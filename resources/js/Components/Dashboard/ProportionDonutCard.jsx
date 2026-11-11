export default function ProportionDonutCard({ published = 0, draft = 0 }) {
    const total = published + draft;
    const publishedPercentage = total > 0 ? Math.round((published / total) * 100) : 0;
    const draftPercentage = total > 0 ? 100 - publishedPercentage : 0;

    // SVG Circular calculations
    const size = 160;
    const strokeWidth = 18;
    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (publishedPercentage / 100) * circumference;

    return (
        <article 
            aria-label="Kartu Proporsi Artikel" 
            className="bg-[#333B5E] text-white p-6 rounded-[20px] flex flex-col justify-between"
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white">
                    Proporsi Artikel
                </h2>
                <span className="text-xs text-[#A9B0CC] font-medium">
                    {total} Total
                </span>
            </div>

            {/* Donut Chart Container */}
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
                {/* SVG Donut */}
                <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                    <svg
                        className="w-40 h-40 -rotate-90 transform"
                        viewBox={`0 0 ${size} ${size}`}
                        aria-hidden="true"
                    >
                        {/* Background track (Draft) */}
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            stroke="#3A4366"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                        />
                        {/* Foreground circle (Published) */}
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            stroke="#5873E0"
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            fill="transparent"
                            className="transition-all duration-700 ease-out"
                        />
                    </svg>

                    {/* Tengah Donut: Persentase */}
                    <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-extrabold text-white tracking-tight leading-none">
                            {publishedPercentage}%
                        </span>
                        <span className="text-[11px] font-medium text-[#A9B0CC] uppercase tracking-wider mt-1">
                            Published
                        </span>
                    </div>
                </div>

                {/* Ringkasan Teks & Legenda (Aksesibel) */}
                <div className="space-y-3 w-full sm:w-auto">
                    {/* Screen reader summary */}
                    <p className="sr-only">
                        Ringkasan proporsi artikel: {published} Published ({publishedPercentage} persen), {draft} Draft ({draftPercentage} persen).
                    </p>

                    <div className="flex items-center gap-3">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#5873E0] shrink-0" aria-hidden="true" />
                        <div>
                            <p className="text-sm font-semibold text-white">Published</p>
                            <p className="text-xs text-[#A9B0CC]">{published} artikel ({publishedPercentage}%)</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#3A4366] border border-white/20 shrink-0" aria-hidden="true" />
                        <div>
                            <p className="text-sm font-semibold text-white">Draft</p>
                            <p className="text-xs text-[#A9B0CC]">{draft} artikel ({draftPercentage}%)</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
