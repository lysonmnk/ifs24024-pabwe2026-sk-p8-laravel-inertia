# BACKLOG PROYEK BLOG MULTI-TIER

**Pemilik:** PM (Project Manager)  
**Dokumen Acuan:** `docs/PRD.md`, `README.md`, `docs/ARCHITECTURE.md`  
**Status:** Selesai (Semua Task Done & Terverifikasi)

---

## 1. Ringkasan Prioritas
- **P0 (Wajib / MVP):** Pondasi sistem, Autentikasi & RBAC, Manajemen Artikel (CRUD & Publikasi), Public Reading Experience (Gallery, Detail, Filter/Search), Markdown Editor & Viewer, Testing 100% Coverage. [SELESAI]
- **P1 (Penting):** Cover Image Management, Profile Management, Excel Import/Export, AI Article Generator, Admin User Management & Monitoring. [SELESAI]
- **P2 (Pengembangan Lanjutan):** Optimasi performa lanjutan, caching, dan polish UX. [SELESAI]

---

## 2. Tabel Backlog Utama

| ID | Fitur | Prioritas | Acceptance Criteria (Given / When / Then) | Agen | Status |
|---|---|---|---|---|---|
| TASK-000 | Inisialisasi Proyek & Scaffolding (Laravel 13, Inertia React, Tailwind, PostgreSQL) | P0 | **Given** repositori baru, **When** dependency di-install dan environment dikonfigurasi, **Then** aplikasi Laravel 13 berjalan dengan Inertia React dan koneksi database PostgreSQL siap digunakan. | DevOps, Data Master | Done |
| TASK-001 | Autentikasi Pengguna: Registrasi Akun (FR-006) | P0 | **Given** data registrasi (nama, email, password valid), **When** form registrasi disubmit, **Then** akun baru dibuat dengan role Member, password di-hash, dan diarahkan ke login/dashboard. | Designer, Data Master, Backend, Frontend, SQA | Done |
| TASK-002 | Autentikasi Pengguna: Login & Logout (FR-007, FR-008) | P0 | **Given** kredensial valid pada form dengan ID login-username, login-password, login-submit, **When** login disubmit, **Then** sesi dibuat dan diarahkan sesuai role (Member ke dashboard, Admin ke admin area). **Given** user login, **When** tombol logout ditekan, **Then** sesi dihapus dan diarahkan ke publik. | Designer, Data Master, Backend, Frontend, SQA | Done |
| TASK-003 | Role-Based Access Control (RBAC) & Ownership Middleware | P0 | **Given** request ke rute terproteksi, **When** middleware `EnsureRole` dan `EnsurePostOwnership` memeriksa user, **Then** akses hanya diizinkan bila role dan kepemilikan artikel sesuai; request yang melanggar ditolak (403). | Data Master, Backend, SQA | Done |
| TASK-004 | Halaman Utama Publik / Homepage (FR-001) | P0 | **Given** pengunjung mengakses `/`, **When** halaman dimuat, **Then** Sticky Navbar, Hero Section, artikel Published terbaru, daftar kategori, dan Editorial Footer tampil responsif tanpa sidebar. | Designer, Backend, Frontend, SQA | Done |
| TASK-005 | Galeri Artikel Publik, Pencarian & Filter Kategori (FR-002, FR-003, FR-004) | P0 | **Given** pengunjung mengakses `/articles` dengan parameter pencarian dan kategori, **When** query diproses, **Then** hanya artikel Published yang sesuai ditampilkan lengkap dengan pagination; draft tidak boleh muncul. | Designer, Data Master, Backend, Frontend, SQA | Done |
| TASK-006 | Pembaca Artikel Publik & Markdown Viewer (FR-005) | P0 | **Given** pengunjung mengakses `/articles/{slug}`, **When** artikel Published ditemukan, **Then** konten Markdown dirender dengan TOAST UI Viewer secara aman (sanitasi XSS), cover image tampil jika ada, serta tombol kembali berfungsi. Draft mengembalikan 404 untuk Guest. | Designer, Backend, Frontend, SQA | Done |
| TASK-007 | Member Dashboard & Statistik Artikel (FR-009) | P0 | **Given** Member terautentikasi mengakses `/dashboard/posts`, **When** halaman dimuat, **Then** ringkasan metrik (Total Artikel, Total Selesai, Belum Selesai) tampil akurat hanya untuk artikel milik Member tersebut. | Designer, Backend, Frontend, SQA | Done |
| TASK-008 | Manajemen Artikel Member: CRUD (FR-010) | P0 | **Given** Member di dashboard, **When** menambah/mengedit/menghapus artikel miliknya, **Then** validasi input terpenuhi, slug unik dibuat otomatis, dialog konfirmasi muncul sebelum hapus, dan data berhasil diperbarui dengan list view responsif (bukan card view). | Designer, Data Master, Backend, Frontend, SQA | Done |
| TASK-009 | Manajemen Publikasi Artikel (Toggle Draft/Published) (FR-011) | P0 | **Given** Member memiliki artikel di list view, **When** tombol toggle status diklik, **Then** status beralih antara Draft dan Published, `published_at` terisi pada publikasi pertama, dan feedback status langsung terbarui. | Designer, Backend, Frontend, SQA | Done |
| TASK-010 | Integrasi TOAST UI Markdown Editor (FR-013) | P0 | **Given** form Tambah/Ubah artikel (tampilan Full Screen Modal), **When** penulis mengetik teks berformat Markdown, **Then** editor menyediakan toolbar lengkap (bold, italic, heading, link, list, image preview) dan tersimpan dalam format Markdown asli. | Designer, Frontend, SQA | Done |
| TASK-011 | Pengelolaan Foto Sampul / Cover Image (FR-012) | P1 | **Given** Member mengunggah berkas gambar pada artikel, **When** berkas divalidasi (tipe mime, ukuran maks), **Then** berkas tersimpan di storage publik, lokasi disimpan di database, preview tampil, dan file lama terhapus saat diganti/dihapus. | Designer, Backend, Frontend, SQA | Done |
| TASK-012 | Pengelolaan Profil Penulis (FR-017) | P1 | **Given** user mengakses `/profile`, **When** mengubah nama/email/password, **Then** verifikasi password lama diterapkan, keunikan email dijaga, dan feedback keberhasilan ditampilkan. | Designer, Backend, Frontend, SQA | Done |
| TASK-013 | Ekspor & Impor Artikel via Excel (FR-015, FR-016) | P1 | **Given** Member mengakses fitur Excel, **When** memilih ekspor, **Then** berkas XLSX artikel miliknya terunduh. **When** mengunggah berkas Excel valid untuk impor, **Then** artikel tersimpan sebagai draf milik Member dengan slug unik dan validasi baris. | Designer, Data Master, Backend, Frontend, SQA | Done |
| TASK-014 | Generator Artikel Instan AI via OpenAI API (FR-014) | P1 | **Given** Member memasukkan topik, kategori, dan jumlah draf di AI Generator, **When** tombol generate ditekan, **Then** backend memanggil OpenAI API, hasil draf Markdown ditampilkan untuk direview, dan Member dapat menyimpan batch draf artikel ke database. | Designer, Backend, Frontend, SQA | Done |
| TASK-015 | Pengelolaan Pengguna oleh Administrator (FR-018) | P1 | **Given** Admin mengakses `/admin/users`, **When** halaman dimuat, **Then** seluruh pengguna terdaftar ditampilkan dengan kemampuan pencarian dan link menuju monitoring artikel per pengguna. Non-admin dilarang mengakses (403). | Designer, Backend, Frontend, SQA | Done |
| TASK-016 | Monitoring Seluruh Artikel & Ekspor Admin (FR-019, FR-020) | P1 | **Given** Admin mengakses `/admin/posts` atau `/admin/users/{user}/posts`, **When** data ditampilkan, **Then** bersifat read-only untuk seluruh artikel (Draft & Published), serta tersedia tombol ekspor seluruh artikel atau per pengguna ke XLSX. | Designer, Backend, Frontend, SQA | Done |
| TASK-017 | Pengujian Mutu Otomatis & Coverage 100% (DoD) | P0 | **Given** seluruh implementasi fitur di `app/`, **When** pengujian dijalankan via `php artisan test --coverage --min=100` dan `composer audit`, **Then** seluruh tes lulus (55 tests), cakupan kode direktori `app/` mencapai 100.0%, dan 0 kerentanan keamanan dependensi. | SQA, Code Reviewer, Security | Done |

---

## 3. Rencana Eksekusi Berdasarkan Urutan Giliran
1. **Fase Fondasi (TASK-000):** Inisialisasi struktur proyek Laravel 13, dependensi Composer & NPM, konfigurasi PostgreSQL `.env`, dan verifikasi build. [SELESAI]
2. **Fase Autentikasi & RBAC (TASK-001 - TASK-003):** Design brief auth -> Kontrak API Auth -> Model User & Migration -> Backend Actions/Controllers -> Frontend React/Inertia -> Feature Test. [SELESAI]
3. **Fase Fitur Utama Artikel & Publik (TASK-004 - TASK-010):** Design brief artikel -> Kontrak API Post -> Migration tabel `posts` & Model -> Controller/Services/Repositories -> UI React (TOAST UI Editor/Viewer) -> Test. [SELESAI]
4. **Fase Fitur Lanjutan (TASK-011 - TASK-016):** Cover image, Profile, Excel PhpSpreadsheet, AI OpenAI Generator, Admin Monitoring. [SELESAI]
5. **Fase Verifikasi & Rilis (TASK-017):** SQA (100% test coverage), Code Reviewer verdict (DISETUJUI), Security audit (LULUS), QT end-user test (SIAP RILIS), DevOps & Docs Writer. [SELESAI]
