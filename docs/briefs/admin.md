# DESIGN BRIEF: Area Administrator (User Management & Article Monitoring)
Versi: 1.0 | Pemilik: Designer | Status: Disetujui

## 1. Ringkasan
- Tujuan layar: Menyediakan pusat monitoring bagi Administrator untuk memantau seluruh pengguna terdaftar, mengawasi seluruh artikel sistem (read-only), serta mengekspor data artikel ke Excel.
- Pengguna dan role: Administrator (Admin).
- Task backlog terkait: TASK-015, TASK-016 (FR-018, FR-019, FR-020).
- Rute:
  - `/admin/users` (Kelola & Pantau Pengguna)
  - `/admin/posts` (Monitoring Seluruh Artikel Sistem)
  - `/admin/users/{user}/posts` (Monitoring Artikel per Pengguna)

## 2. User Flow
- **Monitoring Pengguna:**
  1. Admin membuka `/admin/users`.
  2. Menampilkan tabel pengguna: ID, Nama, Email, Role (Admin/Member), Tanggal Registrasi, Jumlah Artikel, dan Aksi.
  3. Admin dapat mencari pengguna berdasarkan nama atau email.
  4. Klik "Lihat Artikel" pada pengguna tertentu -> membuka `/admin/users/{user}/posts`.
- **Monitoring Artikel (Read-Only):**
  1. Admin membuka `/admin/posts`.
  2. Menampilkan seluruh artikel (baik status Draft maupun Published) dari seluruh penulis.
  3. Menampilkan kolom: Sampul, Judul Artikel, Penulis, Kategori, Status (Badge), Tanggal Dibuat, Tanggal Terbit.
  4. Admin dapat mengklik tombol "Ekspor Seluruh Artikel" untuk mengunduh file Excel `.xlsx`.
  5. Pada halaman artikel per pengguna, admin dapat mengklik "Ekspor Artikel Pengguna".
  6. **Ketentuan Mutlak:** Halaman monitoring bersifat read-only. Tidak ada tombol atau aksi edit/hapus konten artikel di halaman admin.

## 3. Layout per Breakpoint
| Breakpoint | Susunan area |
|---|---|
| Desktop (>=1280px) | Layout admin dengan Top Bar khusus Admin, Toolbar pencarian & tombol ekspor, serta Data Table yang rapi dan terstruktur. |
| Tablet (768-1279px) | Tabel dengan overflow horizontal terlindungi, filter di bagian atas. |
| Mobile (<768px) | Baris tabel diubah menjadi kartu ringkas (*data cards*), tombol ekspor tetap mudah diakses di bagian atas. |

## 4. Teks UI Final
| Elemen | Teks |
|---|---|
| Judul Users | Manajemen Pengguna |
| Subjudul Users | Pantau seluruh pengguna terdaftar dan aktivitas penulisan mereka. |
| Judul Posts | Monitoring Seluruh Artikel |
| Subjudul Posts | Pemantauan artikel sistem secara read-only. |
| Tombol Ekspor Semua | Ekspor Seluruh Artikel (Excel) |
| Tombol Ekspor Pengguna | Ekspor Artikel Pengguna (Excel) |
| Placeholder Cari User | Cari pengguna berdasarkan nama atau email... |

## 5. Aksesibilitas & Keamanan
- Middleware `EnsureRole:Admin` melindungi seluruh rute `/admin/*`.
- Non-admin atau Guest yang mencoba mengakses akan mendapatkan response 403 Forbidden.
- Semua tombol ekspor memiliki feedback loading saat proses generate file berlangsung.

## 6. Kriteria Selesai Desain
- [x] Fitur read-only ditegaskan tanpa tombol manipulasi konten
- [x] Ekspor seluruh artikel dan ekspor per pengguna terdokumentasi
- [x] Proteksi otorisasi Admin didefinisikan

