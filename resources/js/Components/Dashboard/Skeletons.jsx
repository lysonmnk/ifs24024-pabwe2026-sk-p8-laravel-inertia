export function DashboardSkeleton() {
    return (
        <div aria-label="Memuat data dashboard..." className="space-y-6 animate-pulse">
            {/* Banner Skeleton */}
            <div className="h-36 bg-[#333B5E] rounded-[20px]" />

            {/* Stat Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="h-28 bg-[#333B5E] rounded-[20px]" />
                <div className="h-28 bg-[#333B5E] rounded-[20px]" />
                <div className="h-28 bg-[#333B5E] rounded-[20px]" />
            </div>

            {/* Donut Card Skeleton */}
            <div className="h-56 bg-[#333B5E] rounded-[20px]" />

            {/* Article Rows Skeleton */}
            <div className="space-y-3">
                <div className="h-8 w-40 bg-[#333B5E] rounded-full" />
                <div className="h-[72px] bg-[#333B5E] rounded-[16px]" />
                <div className="h-[72px] bg-[#333B5E] rounded-[16px]" />
                <div className="h-[72px] bg-[#333B5E] rounded-[16px]" />
            </div>
        </div>
    );
}

export function ArticleListSkeleton() {
    return (
        <div className="space-y-3 animate-pulse" aria-label="Memuat daftar artikel...">
            {[1, 2, 3].map((n) => (
                <div key={n} className="h-[72px] bg-[#3A4366] rounded-[16px] w-full" />
            ))}
        </div>
    );
}
