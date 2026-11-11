/**
 * Mock data untuk Member Dashboard
 * Digunakan sebagai data default / preview mandiri tanpa backend,
 * dan dapat digantikan secara otomatis jika data props dari Laravel/Inertia tersedia.
 */

export const mockMember = {
    id: 1,
    name: 'Budi Santoso',
    email: 'user@example.com',
    avatar: null,
    role: 'Member',
};

export const mockPosts = [
    {
        id: 1,
        title: 'Membangun Arsitektur Bersih dengan Laravel 13',
        slug: 'membangun-arsitektur-bersih-dengan-laravel-13',
        category: 'Teknologi',
        excerpt: 'Panduan terstruktur mengadopsi Clean Architecture dan Feature-First.',
        content: '# Membangun Arsitektur Bersih dengan Laravel 13\n\nClean Architecture memisahkan tanggung jawab...',
        cover_image: null,
        is_published: true,
        published_at: '2026-11-10T08:00:00Z',
        created_at: '2026-11-10T07:30:00Z',
        formatted_date: '10 Nov 2026',
    },
    {
        id: 2,
        title: 'Tips Produktivitas Menulis Konten Digital Setiap Hari',
        slug: 'tips-produktivitas-menulis-konten-digital-setiap-hari',
        category: 'Gaya Hidup',
        excerpt: 'Strategi mengelola ide, waktu, dan konsistensi menulis tanpa burnout.',
        content: '# Tips Produktivitas Menulis...\n\nKonsistensi adalah kunci utama...',
        cover_image: null,
        is_published: true,
        published_at: '2026-11-09T14:15:00Z',
        created_at: '2026-11-09T14:00:00Z',
        formatted_date: '09 Nov 2026',
    },
    {
        id: 3,
        title: 'Panduan Praktis Desain Antarmuka Dark Mode Modern',
        slug: 'panduan-praktis-desain-antarmuka-dark-mode-modern',
        category: 'Desain',
        excerpt: 'Prinsip pemilihan kontras, hierarki visual, dan sudut membulat yang nyaman di mata.',
        content: '# Panduan Praktis Desain Antarmuka Dark Mode...\n\nDark mode bukan sekadar latar hitam...',
        cover_image: null,
        is_published: true,
        published_at: '2026-11-08T10:00:00Z',
        created_at: '2026-11-08T09:45:00Z',
        formatted_date: '08 Nov 2026',
    },
    {
        id: 4,
        title: 'Mengenal Pemanfaatan AI Generatif dalam Platform CMS',
        slug: 'mengenal-pemanfaatan-ai-generatif-dalam-platform-cms',
        category: 'Teknologi',
        excerpt: 'Eksplorasi integrasi OpenAI API untuk menghasilkan draf artikel instan.',
        content: '# Mengenal Pemanfaatan AI...\n\nDraf artikel awal dapat dibantu oleh AI...',
        cover_image: null,
        is_published: false,
        published_at: null,
        created_at: '2026-11-07T16:20:00Z',
        formatted_date: '07 Nov 2026',
    },
    {
        id: 5,
        title: 'Strategi Pengelolaan Waktu untuk Software Engineer',
        slug: 'strategi-pengelolaan-waktu-untuk-software-engineer',
        category: 'Karir',
        excerpt: 'Teknik time-blocking dan eliminasi distraksi selama coding sesi mendalam.',
        content: '# Strategi Pengelolaan Waktu...\n\nFokus mendalam sangat berharga...',
        cover_image: null,
        is_published: false,
        published_at: null,
        created_at: '2026-11-06T11:00:00Z',
        formatted_date: '06 Nov 2026',
    },
];

export const mockStats = {
    total: 5,
    published: 3,
    draft: 2,
};
