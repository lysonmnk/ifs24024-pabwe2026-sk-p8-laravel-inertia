# DESIGN BRIEF: Dashboard & Manajemen Artikel Penulis (Member)
Versi: 1.0 | Pemilik: Designer | Status: Disetujui

## 1. Ringkasan
- Tujuan layar: Tempat kerja utama bagi Member untuk mengelola artikel miliknya (membuat, mengubah, menghapus, mengatur status publikasi, mengunggah foto sampul, membuat artikel dengan AI, dan ekspor/impor Excel).
- Pengguna dan role: Member (Penulis).
- Task backlog terkait: TASK-007, TASK-008, TASK-009, TASK-010, TASK-011, TASK-013, TASK-014 (FR-009 s.d. FR-016).
- Rute:
  - `/dashboard/posts` (Daftar Artikel & Dashboard Utama)
  - `/dashboard/posts/{post}` (Detail Artikel Member)

## 2. User Flow
- **Dashboard & List View:**
  1. Member masuk ke `/dashboard/posts`.
  2. Melihat 3 kartu statistik di atas: Total Artikel, Total Selesai (Published), dan Belum Selesai (Draft).
  3. Bar aksi menyediakan: Tombol "+ Tulis Artikel", Tombol "AI Generator", Tombol "Ekspor Excel", dan Tombol "Impor Excel".
  4. Menampilkan tabel / *list view* artikel (bukan card view) dengan kolom: Sampul, Judul & Kategori, Status (Badge), Tanggal, dan Menu Tindakan.
  5. Setiap baris memiliki tombol cepat toggle status (satu klik beralih Draft <-> Published) dan menu kebab (ikon tiga titik vertikal).
- **Pembuatan & Pengeditan Artikel (Full Screen Modal):**
  1. Klik "Tulis Artikel" atau "Ubah" pada menu kebab.
  2. Modal Full Screen terbuka dengan header kontras (Judul Form di kiri, tombol Tutup/Batal di kanan).
  3. Form input: Judul, Slug (dibuat otomatis tapi dapat disesuaikan), Kategori (Dropdown), Excerpt, Unggah Cover Image (preview & hapus), dan TOAST UI Editor untuk konten Markdown.
  4. Footer kontras: Tombol aksi berada di kanan footer ("Simpan Draf", "Publikasikan").
- **AI Article Generator Modal:**
  1. Klik "AI Generator".
  2. Modal terbuka: Input topik artikel, Kategori, Jumlah artikel (`type="number"`, min 1, max 5).
  3. Klik "Generate" -> Tampilkan loading floating status pill ("Memproses tindakan...").
  4. Hasil draf Markdown muncul -> Member dapat memilih dan menyimpan batch artikel sebagai Draf.
- **Excel Import / Export:**
  1. Klik "Ekspor Excel" -> mengunduh berkas `.xlsx`.
  2. Klik "Impor Excel" -> modal upload berkas Excel -> preview ringkasan impor -> simpan draf.

## 3. Layout per Breakpoint
| Breakpoint | Susunan area |
|---|---|
| Desktop (>=1280px) | Layout dashboard bersih: Navbar atas, Bar Statistik 3 kolom, Toolbar Aksi, Tabel List View lengkap dengan menu kebab, Modal Full Screen untuk Create/Edit. |
| Tablet (768-1279px) | Statistik 3 kolom/2 baris, list view dengan scroll horizontal aman, modal full screen. |
| Mobile (<768px) | Statistik tumpuk vertikal / swipe, baris list view menjadi kartu baris kompak (*compact list row*), modal full screen nyaman disentuh. |

## 4. Komponen & UX Sesuai Panduan README
- **List View:** Tampilan daftar ringkas dan responsif, bukan kartu lebar.
- **Menu Tindakan Kebab:** Setiap baris memiliki dropdown tiga titik:
  - Detail (primary action)
  - Ubah (primary action)
  - Hapus (merah / destructive, dengan konfirmasi sebelum eksekusi)
- **Tombol Cepat Toggle Status:** Tombol toggle pill di sebelah badge status untuk ubah Draft <-> Published langsung tanpa buka modal.
- **Modal Tambah dan Ubah:** Tampilan **Full Screen**, header dan footer memiliki warna latar yang kontras, tombol aksi berada di kanan footer.
- **AI Generator:** Input jumlah artikel wajib `type="number"` dengan batas minimal 1 dan maksimal 5.
- **Indikator Loading & Feedback:**
  - Top Progress Bar saat navigasi halaman.
  - Floating Status Pill ("Memproses tindakan...") saat request async berlangsung.
  - Spinner pada tombol aksi saat loading.
  - Kursor berubah menjadi `pointer` pada seluruh tombol, menu, dan elemen interaktif.

## 5. Teks UI Final
| Elemen | Teks |
|---|---|
| Judul Dashboard | Dashboard Artikel |
| Subjudul Dashboard | Kelola karya tulisan, publikasi, dan analisis konten Anda. |
| Stat 1 | Total Artikel |
| Stat 2 | Total Selesai |
| Stat 3 | Belum Selesai |
| Tombol Tambah | Tulis Artikel Baru |
| Tombol AI | AI Generator |
| Tombol Ekspor | Ekspor Excel |
| Tombol Impor | Impor Excel |
| Status Memproses | Memproses tindakan... |
| Sukses Simpan | Artikel berhasil disimpan. |
| Sukses Terbit | Artikel berhasil dipublikasikan. |
| Konfirmasi Hapus | Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan. |

## 6. Aksesibilitas & Keamanan
- Konfirmasi penghapusan eksplisit mencegah aksi tidak disengaja.
- Validasi file upload (gambar sampul maks 2MB, format jpg/jpeg/png/webp; Excel format `.xlsx` atau `.xls`).
- Seluruh form dilindungi CSRF token.

## 7. Kriteria Selesai Desain
- [x] List View ringkas & menu kebab terdefinisi
- [x] Modal Full Screen dengan kontras header & footer dan tombol aksi di kanan footer
- [x] Floating status pill dan top progress bar dispesifikasikan
- [x] AI generator dengan input `type="number"` tercakup

