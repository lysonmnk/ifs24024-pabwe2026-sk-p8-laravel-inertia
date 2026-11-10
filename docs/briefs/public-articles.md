# DESIGN BRIEF: Pengalaman Membaca Publik (Homepage, Galeri & Pembaca Artikel)
Versi: 1.0 | Pemilik: Designer | Status: Disetujui

## 1. Ringkasan
- Tujuan layar: Memberikan pengalaman membaca yang nyaman dan leluasa bagi pembaca umum (Guest) untuk menelusuri, mencari, memfilter berdasarkan kategori, dan membaca artikel yang telah dipublikasikan.
- Pengguna dan role: Guest (utama), Member, Admin.
- Task backlog terkait: TASK-004, TASK-005, TASK-006 (FR-001, FR-002, FR-003, FR-004, FR-005).
- Halaman:
  - `/` (Beranda & Galeri Artikel Terbaru)
  - `/articles` (Katalog Artikel Lengkap dengan Search & Filter)
  - `/articles/{slug}` (Pembaca Artikel Lengkap)

## 2. User Flow
- **Eksplorasi & Membaca:**
  1. Pengunjung masuk ke `/` -> melihat Hero Section dengan perkenalan platform.
  2. Melihat daftar artikel unggulan / terbaru.
  3. Memilih salah satu kategori (Teknologi, Pendidikan, Gaya Hidup, Bisnis, Opini, Umum) -> filter langsung aktif di `/articles`.
  4. Mengetik kata kunci pada kotak pencarian -> sistem menampilkan hasil relevan.
  5. Mengklik artikel -> membuka `/articles/{slug}`.
  6. Artikel dirender dalam tata letak leluasa (*full-width reading*) menggunakan TOAST UI Viewer.
  7. Di akhir artikel terdapat kartu ajakan (Call to Action) untuk login / mendaftar sebagai penulis serta Editorial Footer.

## 3. Layout per Breakpoint
| Breakpoint | Susunan area |
|---|---|
| Desktop (>=1280px) | Sticky Top Navbar di bagian atas. Konten utama rata tengah maksimal 1120px untuk galeri, dan 840px untuk pembaca artikel agar kenyamanan mata terjaga (*optimal reading measure*). Tanpa sidebar. Footer editorial di bagian bawah. |
| Tablet (768-1279px) | Grid artikel 2 kolom, padding sisi 24px, navbar sticky. |
| Mobile (<768px) | Grid artikel 1 kolom, search bar kompak, navigasi kategori berupa bar horizontal yang dapat digeser (*scrollable chips*), cover image responsif. |

## 4. Daftar Komponen
| Area | Komponen | Data yang ditampilkan | Sumber data |
|---|---|---|---|
| Navbar | Sticky Top Navbar | Logo Blog, Link Beranda, Link Artikel, Tombol Masuk & Daftar | Statis & Auth State |
| Hero | Hero Banner | Tagline platform, penjelasan singkat, tombol CTA | Statis |
| Filter & Search | Filter Bar | Input pencarian kata kunci, Tombol Chip Kategori | Query string URL (`q`, `category`) |
| Listing | Article Card | Cover image, Kategori (Badge), Judul, Excerpt, Nama Penulis, Tanggal Publikasi | Props `articles.data` |
| Pagination | Pagination Bar | Nomor halaman, Tombol Sebelumnya / Berikutnya | Props `articles.links` |
| Detail | Article Reader | Judul Besar, Meta Penulis & Tanggal, Gambar Sampul Besar, Konten Markdown (TOAST UI Viewer) | Props `article` |
| Footer | Editorial Footer | Informasi lisensi, tautan platform, dan hak cipta | Statis |

## 5. State per Komponen/Halaman
| Komponen | Default | Loading | Kosong | Error |
|---|---|---|---|---|
| Daftar Artikel | Menampilkan kartu artikel | Skeleton shimmer kartu artikel | "Belum ada artikel ditemukan. Coba ubah kata kunci pencarian." | "Gagal memuat artikel. Silakan coba lagi." |
| Pembaca Artikel | Konten Markdown ter-render sempurna | Skeleton pembaca (judul, meta, blok paragraf) | - | Halaman 404 jika slug tidak ada atau status Draft |

## 6. Interaksi
| Elemen | Aksi user | Respons sistem | Catatan |
|---|---|---|---|
| Input Pencarian | Ketik teks | Debounced search (300ms) atau tekan Enter -> perbarui daftar artikel via Inertia router visit | URL tersinkronisasi `?q=...` |
| Chip Kategori | Klik kategori | Toggle aktif/nonaktif kategori, filter daftar artikel | URL tersinkronisasi `?category=...` |
| Kartu Artikel | Klik | Navigasi ke `/articles/{slug}` tanpa refresh penuh (*Inertia Link*) | Halus dan cepat |

## 7. Teks UI Final
| Elemen | Teks |
|---|---|
| Brand | Blog |
| Tagline | Ruang Membaca & Berbagi Pemikiran |
| Search Placeholder | Cari artikel berdasarkan judul atau konten... |
| Kategori Semua | Semua Kategori |
| Tombol Baca | Baca Selengkapnya |
| Status Kosong | Tidak ada artikel yang cocok dengan pencarian Anda. |

## 8. Aksesibilitas
- Gambar sampul memiliki atribut `alt` deskriptif (menggunakan judul artikel).
- Hierarki heading semantik: `h1` untuk judul artikel, `h2`-`h4` di dalam konten Markdown.
- Kontras warna teks pada background putih memenuhi rasio WCAG AA minimal 4.5:1.

## 9. Kebutuhan Data (untuk Data Master)
- `GET /` -> 6 artikel published terbaru.
- `GET /articles` -> paginated list artikel dengan search query `q` dan filter `category`.
- `GET /articles/{slug}` -> detail artikel lengkap dengan relasi `user` (hanya jika `is_published = true`).

## 10. Kriteria Selesai Desain
- [x] Tata letak leluasa (*full-width reading*) tanpa sidebar diterapkan
- [x] Sticky Top Navbar dan Editorial Footer terdefinisi
- [x] Kompatibilitas dengan TOAST UI Viewer disiapkan

