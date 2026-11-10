<div align="center">

# Blog

**Platform publikasi artikel multi-tier berbasis Clean Architecture & Feature-First**

![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?style=flat-square&logo=laravel&logoColor=white)
![Inertia.js](https://img.shields.io/badge/Inertia.js-9553E9?style=flat-square&logo=inertia&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?style=flat-square)
![Composer Audit](https://img.shields.io/badge/composer%20audit-0%20vulnerabilities-brightgreen?style=flat-square)

</div>

---

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Fitur Utama](#fitur-utama)
- [Arsitektur Akses (Multi-Tier)](#arsitektur-akses-multi-tier)
- [Teknologi](#teknologi)
- [Struktur Folder](#struktur-folder)
- [Skema Database](#skema-database)
- [Daftar Rute](#daftar-rute)
- [Instalasi](#instalasi)
- [Konfigurasi Lingkungan](#konfigurasi-lingkungan)
- [Pengujian & Kualitas Kode](#pengujian--kualitas-kode)
- [Panduan UX](#panduan-ux)
- [Penamaan Repositori](#penamaan-repositori)
- [Lisensi](#lisensi)

---

## Tentang Proyek

**Blog** adalah platform publikasi artikel dengan tiga tingkatan akses: pembaca umum, penulis (anggota), dan administrator. Pembaca dapat menelusuri dan membaca artikel tanpa perlu masuk, penulis mengelola karya mereka melalui dashboard pribadi, sedangkan admin memantau seluruh aktivitas sistem.

Kode diorganisasi menggunakan pendekatan **Feature-First** yang dipadukan dengan prinsip **Clean Architecture**: setiap fitur memiliki controller, service, repository, contract, dan modelnya sendiri sehingga mudah dipelihara, diuji, dan dikembangkan.

## Fitur Utama

### Pembaca Umum (Guest)
- Galeri artikel publik dengan pencarian berdasarkan judul atau konten
- Filter berdasarkan kategori
- Pembaca artikel dengan render Markdown (TOAST UI Viewer) dan gambar sampul
- Tata letak membaca leluasa (full-width) dengan Sticky Top Navbar, tanpa sidebar
- Akses cepat ke halaman Login dan Register dari navbar, hero banner, akhir artikel, dan footer editorial

### Penulis (Member)
- CRUD artikel milik sendiri dengan editor Markdown (TOAST UI Editor)
- Pengaturan status Draf atau Terpublikasi dengan satu klik
- Unggah dan hapus foto sampul
- Ekspor artikel pribadi ke Excel dan impor artikel dari Excel
- Generator artikel instan berbasis OpenAI, dengan simpan batch hasil AI
- Ringkasan statistik: Total Artikel, Total Selesai, dan Belum Selesai
- Pengelolaan profil

### Administrator
- Pengelolaan daftar pengguna
- Pemantauan seluruh artikel sistem (read-only)
- Pemantauan artikel per pengguna
- Ekspor seluruh artikel sistem atau artikel per pengguna ke Excel

## Arsitektur Akses (Multi-Tier)

| Tingkatan | Akses URL | Hak Akses |
|---|---|---|
| Umum (Publik) | `/`, `/articles`, `/articles/{slug}`, `/login`, `/register` | Tanpa login |
| Anggota (Penulis) | `/dashboard/posts`, `/dashboard/posts/{post}` | Wajib login |
| Admin | `/admin/users`, `/admin/posts`, `/admin/users/{user}/posts` | Wajib login dengan role Admin |

## Teknologi

| Lapisan | Teknologi |
|---|---|
| Backend | Laravel 13 (PHP) |
| Frontend | React + Inertia.js |
| Basis Data | PostgreSQL |
| Excel | PhpOffice/PhpSpreadsheet |
| AI | OpenAI API |
| Editor & Viewer Markdown | TOAST UI Editor (`@toast-ui/editor`) |

## Struktur Folder

```text
app/
├── Features/
│   ├── Admin/
│   │   ├── Controllers/AdminUserController.php
│   │   └── Services/AdminUserService.php
│   ├── Ai/
│   │   ├── Contracts/AiClientInterface.php
│   │   ├── DTO/GeneratedPostItem.php
│   │   └── Services/OpenAiPostGeneratorService.php
│   ├── Auth/
│   │   ├── Actions/{LoginUserAction, RegisterUserAction}.php
│   │   └── Controllers/AuthController.php
│   ├── Post/
│   │   ├── Contracts/PostRepositoryInterface.php
│   │   ├── Controllers/{AdminPostController, PostController, PublicPostController}.php
│   │   ├── Enums/PostCategory.php
│   │   ├── Models/Post.php
│   │   ├── Policies/PostPolicy.php
│   │   ├── Repositories/PostRepository.php
│   │   └── Services/{PostExcelService, PostService}.php
│   └── Profile/
│       ├── Controllers/ProfileController.php
│       └── Services/ProfileService.php
├── Http/Middleware/
│   ├── EnsurePostOwnership.php
│   ├── EnsureRole.php
│   └── HandleInertiaRequests.php
├── Models/User.php
└── Providers/AppServiceProvider.php

resources/
├── css/app.css
├── js/
│   ├── app.jsx
│   ├── Layouts/AppLayout.jsx
│   └── Pages/
│       ├── Admin/{PostList, UserList, UserPostList}.jsx
│       ├── Auth/{Login, Register}.jsx
│       ├── Post/{Index, Show}.jsx
│       ├── Profile/Edit.jsx
│       └── Public/{PostIndex, PostShow}.jsx
└── views/app.blade.php
```

## Skema Database

Model: `App\Features\Post\Models\Post` dengan relasi `belongsTo(User::class)`.

**Tabel `posts`**

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint (PK) | Primary key auto increment |
| `user_id` | foreignId | Relasi ke `users.id` (cascade delete) |
| `title` | string | Judul postingan |
| `slug` | string (unique) | URL slug unik artikel |
| `category` | string | Kategori artikel |
| `excerpt` | text (nullable) | Ringkasan artikel (1-2 kalimat) |
| `content` | longText | Isi artikel (Markdown / teks) |
| `cover_image_path` | string (nullable) | Lokasi berkas gambar sampul |
| `is_published` | boolean | `true` terpublikasi, `false` draf |
| `published_at` | timestamp (nullable) | Waktu publikasi |
| `created_at`, `updated_at` | timestamp | Penanda waktu |

**Enum `PostCategory`**

| Nilai | Deskripsi |
|---|---|
| `Teknologi` | Teknologi & Koding |
| `Pendidikan` | Pendidikan & Tutorial |
| `Gaya Hidup` | Gaya Hidup & Produktivitas |
| `Bisnis` | Bisnis & Karir |
| `Opini` | Opini & Pemikiran |
| `Umum` | Umum |

## Daftar Rute

| Method | URI | Hak Akses | Keterangan |
|---|---|---|---|
| GET | `/` | Publik | Beranda galeri artikel |
| GET | `/articles` | Publik | Daftar artikel + pencarian + filter |
| GET | `/articles/{slug}` | Publik | Pembaca artikel (Markdown) |
| GET | `/login`, `/register` | Guest | Halaman autentikasi |
| POST | `/login`, `/register` | Guest | Proses autentikasi |
| POST | `/logout` | Authenticated | Keluar dari sesi |
| GET | `/dashboard/posts` | Member | Daftar artikel sendiri |
| POST | `/dashboard/posts` | Member | Simpan artikel baru |
| GET | `/dashboard/posts/{post}` | Member | Detail artikel |
| PUT | `/dashboard/posts/{post}` | Member | Perbarui artikel |
| DELETE | `/dashboard/posts/{post}` | Member | Hapus artikel |
| PATCH | `/dashboard/posts/{post}/publish` | Member | Toggle Draft dan Published |
| POST | `/dashboard/posts/{post}/cover` | Member | Unggah foto sampul |
| DELETE | `/dashboard/posts/{post}/cover` | Member | Hapus foto sampul |
| GET | `/dashboard/posts/export` | Member | Ekspor artikel sendiri ke Excel |
| POST | `/dashboard/posts/import` | Member | Impor artikel dari Excel |
| POST | `/dashboard/posts/ai-generate` | Member | Hasilkan draf artikel via OpenAI |
| POST | `/dashboard/posts/ai-save` | Member | Simpan batch artikel hasil AI |
| GET | `/profile` | Authenticated | Edit profil penulis |
| GET | `/admin/users` | Admin | Kelola pengguna |
| GET | `/admin/users/{user}/posts` | Admin | Monitoring artikel per pengguna (read-only) |
| GET | `/admin/users/{user}/posts/export` | Admin | Ekspor artikel pengguna ke Excel |
| GET | `/admin/posts` | Admin | Monitoring seluruh artikel |
| GET | `/admin/posts/export` | Admin | Ekspor seluruh artikel ke Excel |

## Instalasi

### Prasyarat

- PHP sesuai kebutuhan Laravel 13 beserta ekstensi `pdo_pgsql`
- Composer
- Node.js dan npm
- PostgreSQL
- Kunci API OpenAI

### Langkah-langkah

```bash
# 1. Klona repositori
git clone https://github.com/{username}/{username}-pabwe2026-sk-p8-laravel-inertia.git
cd {username}-pabwe2026-sk-p8-laravel-inertia

# 2. Pasang dependensi
composer install
npm install

# 3. Buat basis data
psql -U postgres -c "CREATE DATABASE pabwe_p8_blog;"

# 4. Siapkan environment
cp .env.example .env
php artisan key:generate

# 5. Migrasi basis data dan tautan storage
php artisan migrate
php artisan storage:link

# 6. Jalankan aplikasi
npm run dev
php artisan serve
```

Aplikasi dapat diakses di `http://127.0.0.1:8000`.

## Konfigurasi Lingkungan

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=pabwe_p8_blog
DB_USERNAME=postgres
DB_PASSWORD=postgres

OPENAI_API_KEY=isi-dengan-kunci-api-anda
```

> Jangan pernah memasukkan kunci API atau kredensial produksi ke dalam repositori. Gunakan environment variable pada server deploy.

## Pengujian & Kualitas Kode

Standar mutu proyek ini:

| Kriteria | Target |
|---|---|
| Unit dan Feature test | Seluruhnya lulus |
| Code coverage direktori `app/` | 100.0% tanpa notice atau warning |
| `composer audit` | 0 security vulnerabilities |
| Struktur `storage/` | Seluruh subdirektori dipertahankan di git |

```bash
# Jalankan seluruh pengujian
php artisan test

# Jalankan dengan pengukuran coverage (butuh Xdebug atau PCOV)
php artisan test --coverage --min=100

# Audit keamanan dependensi
composer audit
```

Seluruh subdirektori `storage/` (misalnya `storage/framework/views`) dipertahankan di git menggunakan `.gitignore` berisi `*` dan `!.gitignore`, sehingga pipeline CI berjalan tanpa kendala pada perintah `view:clear`.

Form login memiliki ID tetap untuk keperluan pengujian: `login-username`, `login-password`, dan `login-submit`.

## Panduan UX

- **Halaman publik** menggunakan Sticky Top Navbar, tata letak membaca leluasa, dan footer editorial, tanpa sidebar.
- **Daftar artikel penulis** berbentuk list view yang ringkas dan responsif, bukan card.
- **Menu tindakan kebab** pada setiap baris: Detail (primary), Ubah (primary), dan Hapus (merah), ditambah tombol cepat toggle status.
- **Modal Tambah dan Ubah** berukuran full screen, dengan tombol aksi di kanan footer serta warna latar header dan footer yang kontras.
- **AI Generator** memakai input angka (`type="number"`) dengan validasi batas nilai.
- **Indikator loading**: top progress bar, floating status pill ("Memproses tindakan..."), dan spinner pada tombol aksi.
- **Interaktivitas**: kursor berubah menjadi pointer pada seluruh tombol dan menu.

## Penamaan Repositori

```text
{username}-pabwe2026-sk-p8-laravel-inertia
```

Contoh: `abdullah_ubaid-pabwe2026-sk-p8-laravel-inertia`

## Lisensi

Proyek ini dibuat untuk keperluan studi kasus mata kuliah Pemrograman Aplikasi Web 2026. Silakan sesuaikan lisensi sesuai kebutuhan Anda.

---

<div align="center">

Dibangun dengan Laravel, Inertia.js, dan React.

</div>
