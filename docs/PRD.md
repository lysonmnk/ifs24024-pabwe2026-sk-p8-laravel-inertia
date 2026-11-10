# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# BLOG — PLATFORM PUBLIKASI ARTIKEL MULTI-TIER

**Versi Dokumen:** 1.0  
**Status:** Disetujui  
**Jenis Produk:** Web Application  
**Nama Produk:** Blog  
**Kategori:** Content Management System (CMS) / Blogging Platform

---

# 1. PRODUCT OVERVIEW

## 1.1 Deskripsi Produk

Blog merupakan platform publikasi artikel berbasis web yang memungkinkan pengguna untuk membaca, membuat, mengelola, dan memantau artikel secara terstruktur.

Aplikasi ini dirancang menggunakan sistem multi-tier access yang terdiri dari tiga jenis pengguna, yaitu Guest (pembaca umum), Member (penulis), dan Administrator.

Guest dapat mengakses dan membaca seluruh artikel yang telah dipublikasikan tanpa harus melakukan autentikasi. Member memiliki akses untuk membuat, mengedit, menghapus, dan memublikasikan artikel miliknya sendiri melalui dashboard pribadi. Administrator memiliki kewenangan untuk mengelola pengguna serta memantau seluruh artikel yang terdapat di dalam sistem.

Platform ini juga menyediakan fitur tambahan berupa AI Article Generator untuk membantu penulis menghasilkan draf artikel secara otomatis menggunakan OpenAI API, serta fitur import dan export artikel menggunakan format Excel.

Pengembangan aplikasi menggunakan pendekatan Feature-First Architecture yang dikombinasikan dengan prinsip Clean Architecture agar kode program memiliki struktur yang modular, mudah dipelihara, mudah diuji, dan dapat dikembangkan lebih lanjut.

## 1.2 Latar Belakang

Publikasi artikel secara digital membutuhkan sebuah platform yang mampu mempermudah proses pembuatan, pengelolaan, dan penyebaran informasi.

Banyak platform publikasi memiliki fitur pengelolaan konten, tetapi kebutuhan pembaca, penulis, dan administrator sering kali berbeda. Oleh karena itu, dibutuhkan sistem yang memiliki pembagian hak akses yang jelas.

Blog dikembangkan untuk menyediakan satu platform yang mengintegrasikan kebutuhan tersebut dalam satu aplikasi.

Selain pengelolaan artikel secara manual, platform juga menyediakan dukungan kecerdasan buatan untuk membantu proses penulisan serta pengelolaan data artikel melalui file Excel.

## 1.3 Visi Produk

Menjadi platform publikasi artikel yang sederhana, modern, responsif, dan mudah digunakan, dengan sistem pengelolaan konten yang terstruktur serta dukungan teknologi AI.

## 1.4 Tujuan Produk

1. Menyediakan platform publikasi artikel yang dapat diakses secara umum.
2. Mempermudah penulis dalam membuat dan mengelola artikel.
3. Menyediakan sistem autentikasi dan pembagian hak akses berdasarkan role.
4. Memungkinkan administrator memantau pengguna dan seluruh artikel.
5. Mengintegrasikan AI untuk membantu menghasilkan draf artikel.
6. Menyediakan fitur import dan export data artikel melalui Excel.
7. Menerapkan arsitektur perangkat lunak yang modular dan mudah dipelihara.
8. Menjamin keamanan data serta konsistensi informasi di dalam sistem.

## 1.5 Target Pengguna

### A. Guest (Pembaca Umum)

Pengguna yang mengunjungi website tanpa melakukan login.

Kebutuhan:
- Membaca artikel yang telah dipublikasikan.
- Mencari artikel berdasarkan judul atau isi.
- Memfilter artikel berdasarkan kategori.
- Melihat detail artikel.
- Mengakses halaman login dan register.

### B. Member (Penulis)

Pengguna yang telah memiliki akun dan berhasil melakukan login.

Kebutuhan:
- Membuat artikel baru.
- Mengedit artikel milik sendiri.
- Menghapus artikel milik sendiri.
- Mengelola status artikel.
- Mengunggah dan menghapus gambar sampul.
- Menggunakan Markdown Editor.
- Menghasilkan artikel menggunakan AI.
- Mengimpor dan mengekspor artikel melalui Excel.
- Melihat statistik artikel.
- Mengelola profil pribadi.

### C. Administrator

Pengguna dengan hak akses tertinggi dalam sistem.

Kebutuhan:
- Melihat seluruh pengguna.
- Memantau seluruh artikel.
- Melihat artikel berdasarkan pengguna.
- Mengekspor seluruh artikel.
- Mengekspor artikel berdasarkan pengguna.

Administrator memiliki akses monitoring terhadap artikel dan tidak melakukan pengeditan konten artikel melalui fitur administrasi.

---

# 2. PRODUCT SCOPE

## 2.1 Fitur yang Termasuk dalam Pengembangan

Produk mencakup fitur-fitur berikut:

1. Landing Page / Homepage.
2. Public Article Listing.
3. Article Search.
4. Article Category Filter.
5. Article Detail.
6. User Registration.
7. User Login.
8. User Logout.
9. Member Dashboard.
10. Article Management (CRUD).
11. Markdown Editor.
12. Markdown Viewer.
13. Article Publishing Management.
14. Cover Image Management.
15. AI Article Generator.
16. Excel Import.
17. Excel Export.
18. Dashboard Statistics.
19. Profile Management.
20. Admin User Management.
21. Admin Article Monitoring.
22. Role-Based Access Control.
23. Responsive User Interface.
24. Loading State dan Feedback System.

## 2.2 Fitur di Luar Scope

Fitur berikut tidak termasuk dalam kebutuhan utama versi pertama:

- Sistem komentar artikel.
- Sistem like dan dislike.
- Follow antarpenulis.
- Chat antar pengguna.
- Pembayaran atau langganan premium.
- Monetisasi artikel.
- Sistem iklan.
- Aplikasi mobile native.
- Sistem notifikasi real-time.
- Social media integration.

Fitur tersebut dapat dipertimbangkan untuk pengembangan versi berikutnya.

---

# 3. USER ROLES AND PERMISSIONS

Sistem menggunakan Role-Based Access Control (RBAC) untuk mengatur hak akses pengguna.

## 3.1 Guest

Guest tidak perlu melakukan login untuk menggunakan fitur publik.

Hak akses:
- Melihat homepage.
- Melihat daftar artikel.
- Mencari artikel.
- Memfilter artikel.
- Membaca artikel.
- Mengakses login.
- Mengakses register.

Guest tidak diperbolehkan membuat, mengedit, atau menghapus artikel.

## 3.2 Member

Member harus melakukan autentikasi sebelum mengakses dashboard.

Hak akses:
- Mengakses dashboard pribadi.
- Membuat artikel.
- Melihat artikel milik sendiri.
- Mengedit artikel milik sendiri.
- Menghapus artikel milik sendiri.
- Mengubah status artikel.
- Mengunggah cover image.
- Menghapus cover image.
- Menggunakan AI Generator.
- Melakukan import dan export Excel.
- Mengelola profil pribadi.

Member tidak diperbolehkan mengakses atau mengubah artikel milik pengguna lain.

## 3.3 Administrator

Administrator harus melakukan login menggunakan akun dengan role Admin.

Hak akses:
- Mengakses admin dashboard.
- Melihat daftar pengguna.
- Memantau seluruh artikel.
- Melihat artikel berdasarkan pengguna.
- Mengekspor seluruh artikel.
- Mengekspor artikel per pengguna.

Administrator tidak melakukan perubahan isi artikel melalui halaman monitoring.

## 3.4 Permission Matrix

| Fitur | Guest | Member | Admin |
|---|---|---|---|
| Melihat artikel publik | Ya | Ya | Ya |
| Mencari artikel | Ya | Ya | Ya |
| Filter kategori | Ya | Ya | Ya |
| Registrasi | Ya | Tidak | Tidak |
| Login | Ya | Ya | Ya |
| Dashboard pribadi | Tidak | Ya | Tidak |
| Membuat artikel | Tidak | Ya | Tidak |
| Mengedit artikel sendiri | Tidak | Ya | Tidak |
| Menghapus artikel sendiri | Tidak | Ya | Tidak |
| Publish artikel sendiri | Tidak | Ya | Tidak |
| AI Generator | Tidak | Ya | Tidak |
| Import Excel | Tidak | Ya | Tidak |
| Export artikel sendiri | Tidak | Ya | Tidak |
| Mengelola profil | Tidak | Ya | Sesuai kebijakan akun |
| Melihat seluruh pengguna | Tidak | Tidak | Ya |
| Monitoring seluruh artikel | Tidak | Tidak | Ya |
| Export seluruh artikel | Tidak | Tidak | Ya |

---

# 4. FUNCTIONAL REQUIREMENTS

# 4.1 Public Homepage

**ID:** FR-001  
**Prioritas:** High

Sistem harus menyediakan halaman utama yang dapat diakses tanpa login.

Fungsionalitas:
- Menampilkan navbar utama.
- Menampilkan identitas dan logo Blog.
- Menampilkan hero section.
- Menampilkan artikel terbaru yang telah dipublikasikan.
- Menampilkan kategori artikel.
- Menyediakan tombol untuk membaca artikel.
- Menyediakan akses Login dan Register.
- Menampilkan footer editorial.

Acceptance Criteria:
- Pengguna dapat membuka homepage tanpa login.
- Artikel yang ditampilkan hanya artikel berstatus Published.
- Artikel dapat dibuka melalui tombol atau judul artikel.
- Navigasi bekerja dengan benar.
- Tampilan responsif pada desktop, tablet, dan mobile.

# 4.2 Article Listing

**ID:** FR-002  
**Prioritas:** High

Sistem harus menyediakan halaman daftar artikel publik.

Fungsionalitas:
- Menampilkan seluruh artikel Published.
- Menampilkan judul artikel.
- Menampilkan kategori.
- Menampilkan excerpt.
- Menampilkan gambar sampul jika tersedia.
- Menampilkan nama penulis.
- Menampilkan tanggal publikasi.
- Menyediakan pagination.

Acceptance Criteria:
- Artikel Draft tidak ditampilkan.
- Pengguna dapat membuka detail artikel.
- Daftar artikel diperbarui berdasarkan data database.
- Pagination dapat digunakan untuk berpindah halaman.

# 4.3 Article Search

**ID:** FR-003  
**Prioritas:** High

Sistem harus menyediakan pencarian artikel berdasarkan judul atau isi artikel.

Fungsionalitas:
- Input pencarian.
- Pencarian berdasarkan judul.
- Pencarian berdasarkan konten.
- Menampilkan hasil pencarian.
- Menampilkan pesan apabila hasil tidak ditemukan.

Acceptance Criteria:
- Pencarian menghasilkan artikel yang relevan.
- Pencarian tidak menampilkan artikel Draft.
- Pencarian kosong tidak menyebabkan error.
- Input pencarian dapat digunakan bersamaan dengan filter kategori.

# 4.4 Category Filter

**ID:** FR-004  
**Prioritas:** High

Sistem harus menyediakan filter berdasarkan kategori artikel.

Kategori:
1. Teknologi.
2. Pendidikan.
3. Gaya Hidup.
4. Bisnis.
5. Opini.
6. Umum.

Acceptance Criteria:
- Pengguna dapat memilih kategori.
- Sistem hanya menampilkan artikel sesuai kategori.
- Pengguna dapat mengembalikan tampilan ke seluruh kategori.
- Filter dapat digunakan bersama pencarian.

# 4.5 Article Detail

**ID:** FR-005  
**Prioritas:** High

Sistem harus menyediakan halaman detail untuk setiap artikel yang telah dipublikasikan.

Fungsionalitas:
- Menampilkan judul artikel.
- Menampilkan nama penulis.
- Menampilkan kategori.
- Menampilkan tanggal publikasi.
- Menampilkan cover image.
- Menampilkan seluruh konten artikel.
- Merender Markdown menjadi format HTML.
- Menyediakan navigasi kembali ke daftar artikel.

Acceptance Criteria:
- Konten Markdown ditampilkan dengan format yang benar.
- Gambar sampul ditampilkan apabila tersedia.
- Artikel Draft tidak dapat diakses oleh Guest.
- Artikel menggunakan URL slug yang unik.

# 4.6 User Registration

**ID:** FR-006  
**Prioritas:** High

Sistem harus menyediakan fitur registrasi akun baru.

Data yang diperlukan:
- Nama pengguna.
- Email.
- Password.
- Konfirmasi password.

Alur:
1. Pengguna membuka halaman Register.
2. Pengguna mengisi formulir.
3. Sistem melakukan validasi.
4. Sistem memeriksa apakah email sudah digunakan.
5. Password di-hash sebelum disimpan.
6. Sistem membuat akun baru dengan role Member.
7. Pengguna menerima feedback keberhasilan registrasi.

Acceptance Criteria:
- Email harus memiliki format valid.
- Email tidak boleh duplikat.
- Password harus memenuhi ketentuan keamanan.
- Konfirmasi password harus sesuai.
- Akun baru tidak boleh otomatis menjadi Admin.

# 4.7 User Login

**ID:** FR-007  
**Prioritas:** High

Sistem harus menyediakan fitur login.

Input:
- Email atau username sesuai implementasi autentikasi.
- Password.

Alur:
1. Pengguna membuka halaman Login.
2. Pengguna memasukkan kredensial.
3. Sistem memvalidasi input.
4. Sistem memverifikasi kredensial.
5. Sistem membuat sesi autentikasi.
6. Sistem mengarahkan pengguna sesuai role.

Acceptance Criteria:
- Kredensial benar menghasilkan login berhasil.
- Kredensial salah menghasilkan pesan error.
- Password tidak boleh disimpan dalam bentuk plaintext.
- Pengguna yang sudah login tidak perlu login kembali selama sesi masih valid.
- Pengguna diarahkan ke halaman sesuai hak aksesnya.

ID elemen form untuk kebutuhan automated testing:
- login-username
- login-password
- login-submit

# 4.8 User Logout

**ID:** FR-008  
**Prioritas:** High

Sistem harus menyediakan fitur logout.

Acceptance Criteria:
- Pengguna dapat keluar dari sesi.
- Sesi autentikasi harus dihapus.
- Pengguna diarahkan ke halaman publik.
- Halaman yang membutuhkan autentikasi tidak dapat diakses kembali tanpa login.

# 4.9 Member Dashboard

**ID:** FR-009  
**Prioritas:** High

Sistem harus menyediakan dashboard khusus Member.

Informasi yang ditampilkan:

1. Total Artikel.
2. Total Selesai.
3. Belum Selesai.

Dashboard harus menyediakan:
- Ringkasan statistik.
- Navigasi pengelolaan artikel.
- Tombol tambah artikel.
- Fitur pencarian artikel pribadi.
- Fitur pengelolaan status.
- Akses profil.
- Akses import dan export.
- Akses AI Generator.

Acceptance Criteria:
- Dashboard hanya dapat diakses Member yang sudah login.
- Statistik sesuai data artikel milik pengguna.
- Data pengguna lain tidak boleh muncul.
- Dashboard responsif.

# 4.10 Article Management (CRUD)

**ID:** FR-010  
**Prioritas:** Critical

Member harus dapat melakukan pengelolaan artikel miliknya sendiri.

### A. Create Article

Data artikel:
- Title.
- Category.
- Excerpt.
- Content.
- Cover Image.
- Status.

Alur:
1. Member membuka dashboard.
2. Member memilih Tambah Artikel.
3. Sistem menampilkan formulir.
4. Member mengisi data artikel.
5. Member menyimpan artikel.
6. Sistem melakukan validasi.
7. Artikel disimpan ke database.

### B. Read Article

Member dapat melihat daftar dan detail artikel miliknya sendiri, termasuk Draft dan Published.

### C. Update Article

Member dapat mengubah informasi artikel yang dimiliki.

### D. Delete Article

Member dapat menghapus artikel miliknya sendiri.

Sistem harus menampilkan konfirmasi sebelum penghapusan dilakukan.

Acceptance Criteria:
- Artikel harus memiliki judul.
- Kategori harus valid.
- Konten artikel harus tersedia.
- Slug harus unik.
- Member hanya dapat mengelola artikel miliknya.
- Artikel yang dihapus tidak lagi muncul dalam dashboard.
- Sistem memberikan feedback untuk setiap operasi CRUD.

# 4.11 Article Publishing Management

**ID:** FR-011  
**Prioritas:** High

Sistem harus mendukung dua status artikel:

1. Draft.
2. Published.

Fungsionalitas:
- Menyimpan artikel sebagai Draft.
- Mengubah Draft menjadi Published.
- Mengubah Published menjadi Draft.
- Mengelola waktu publikasi.

Acceptance Criteria:
- Draft hanya dapat dilihat oleh pemiliknya dan pihak berwenang.
- Published dapat dilihat oleh Guest.
- Ketika artikel pertama kali dipublikasikan, published_at diisi.
- Ketika artikel ditarik kembali menjadi Draft, artikel tidak lagi tersedia secara publik.

# 4.12 Cover Image Management

**ID:** FR-012  
**Prioritas:** Medium

Member dapat mengunggah dan menghapus gambar sampul artikel.

Fungsionalitas:
- Upload gambar.
- Preview gambar.
- Mengganti gambar.
- Menghapus gambar.

Acceptance Criteria:
- Sistem memvalidasi format file.
- Sistem membatasi ukuran file.
- File disimpan pada storage yang telah dikonfigurasi.
- Database menyimpan lokasi file.
- File lama dibersihkan ketika diganti atau dihapus.

# 4.13 Markdown Editor

**ID:** FR-013  
**Prioritas:** High

Sistem harus menyediakan editor Markdown menggunakan TOAST UI Editor.

Fungsionalitas:
- Menulis konten Markdown.
- Menggunakan heading.
- Menggunakan bold dan italic.
- Membuat daftar.
- Menambahkan link.
- Menambahkan gambar.
- Menampilkan preview konten.

Acceptance Criteria:
- Editor dapat digunakan pada halaman tambah dan edit artikel.
- Konten tersimpan sebagai Markdown.
- Hasil Markdown dapat dirender kembali pada halaman detail artikel.
- Konten yang ditampilkan harus melalui sanitasi untuk mencegah XSS.

# 4.14 AI Article Generator

**ID:** FR-014  
**Prioritas:** High

Sistem harus menyediakan fitur pembuatan draf artikel menggunakan OpenAI API.

Input:
- Topik artikel.
- Kategori.
- Jumlah artikel yang ingin dibuat.
- Parameter tambahan jika diperlukan.

Fungsionalitas:
- Menghasilkan artikel berdasarkan topik.
- Menghasilkan judul.
- Menghasilkan excerpt.
- Menghasilkan konten Markdown.
- Menampilkan hasil sebelum disimpan.
- Memungkinkan penyimpanan beberapa artikel sekaligus.

Alur:
1. Member membuka AI Generator.
2. Member memasukkan topik.
3. Member menentukan jumlah artikel.
4. Member menekan tombol Generate.
5. Backend mengirim permintaan ke OpenAI API.
6. AI menghasilkan draf artikel.
7. Sistem menampilkan hasil.
8. Member memeriksa hasil.
9. Member memilih artikel yang ingin disimpan.
10. Sistem menyimpan artikel sebagai Draft.

Acceptance Criteria:
- API key hanya disimpan di backend.
- Sistem memvalidasi input.
- Sistem menampilkan loading ketika proses berlangsung.
- Sistem menangani kegagalan API.
- Hasil AI tidak langsung dipublikasikan.
- Member dapat memeriksa dan mengedit hasil sebelum publikasi.
- Sistem memiliki batas jumlah artikel yang dapat dihasilkan.
- Kegagalan proses tidak menyebabkan data artikel yang sudah ada hilang.

# 4.15 Excel Export

**ID:** FR-015  
**Prioritas:** Medium

Member dapat mengekspor seluruh artikel miliknya ke Excel.

Kolom export:
- ID.
- Title.
- Slug.
- Category.
- Excerpt.
- Content.
- Status.
- Published At.
- Created At.
- Updated At.

Acceptance Criteria:
- File dapat diunduh dalam format XLSX.
- Data hanya berasal dari akun Member yang sedang login.
- Header kolom harus jelas.
- File dapat dibuka menggunakan Microsoft Excel.

# 4.16 Excel Import

**ID:** FR-016  
**Prioritas:** Medium

Member dapat mengimpor artikel melalui file Excel.

Alur:
1. Member memilih Import.
2. Member mengunggah file Excel.
3. Sistem memvalidasi format file.
4. Sistem memeriksa struktur kolom.
5. Sistem memvalidasi setiap baris.
6. Sistem menyimpan data yang valid.
7. Sistem menampilkan hasil import.

Acceptance Criteria:
- File harus menggunakan format yang didukung.
- Data wajib harus tersedia.
- Slug harus unik.
- Sistem menampilkan kesalahan pada baris yang tidak valid.
- Import tidak boleh mengubah kepemilikan artikel milik pengguna lain.
- Sistem memberikan ringkasan jumlah data berhasil dan gagal diimpor.

# 4.17 Profile Management

**ID:** FR-017  
**Prioritas:** Medium

Member dapat mengelola informasi profil pribadi.

Fungsionalitas:
- Melihat profil.
- Mengubah nama.
- Mengubah email dengan validasi.
- Mengubah password.

Acceptance Criteria:
- Perubahan profil disimpan ke database.
- Email harus unik.
- Password lama harus diverifikasi sebelum perubahan password.
- Sistem memberikan notifikasi keberhasilan atau kegagalan.

# 4.18 Admin User Management

**ID:** FR-018  
**Prioritas:** High

Administrator dapat melihat daftar seluruh pengguna.

Informasi:
- ID pengguna.
- Nama.
- Email.
- Role.
- Tanggal registrasi.

Fungsionalitas:
- Menampilkan seluruh pengguna.
- Mencari pengguna.
- Melihat informasi pengguna.
- Membuka daftar artikel berdasarkan pengguna.

Acceptance Criteria:
- Hanya Admin yang dapat mengakses halaman.
- Data pengguna diambil dari database.
- Member tidak dapat membuka halaman administrasi.

# 4.19 Admin Article Monitoring

**ID:** FR-019  
**Prioritas:** High

Administrator dapat memantau seluruh artikel yang terdapat di dalam sistem.

Informasi:
- Judul artikel.
- Penulis.
- Kategori.
- Status.
- Tanggal dibuat.
- Tanggal publikasi.

Fungsionalitas:
- Melihat seluruh artikel.
- Mencari artikel.
- Melihat artikel berdasarkan pengguna.
- Membuka detail artikel.
- Memantau status artikel.

Acceptance Criteria:
- Admin dapat melihat artikel Draft dan Published.
- Halaman monitoring bersifat read-only.
- Admin tidak dapat mengubah atau menghapus artikel melalui fitur monitoring.

# 4.20 Admin Excel Export

**ID:** FR-020  
**Prioritas:** Medium

Administrator dapat mengekspor:

- Seluruh artikel dalam sistem.
- Seluruh artikel milik pengguna tertentu.

Acceptance Criteria:
- File tersedia dalam format XLSX.
- Data sesuai dengan pilihan export.
- Informasi penulis tetap tercantum.
- Hanya Admin yang dapat menggunakan fitur ini.

---

# 5. USER FLOW

## 5.1 Guest User Flow

1. Pengguna membuka website.
2. Sistem menampilkan Homepage.
3. Pengguna melihat daftar artikel.
4. Pengguna dapat melakukan pencarian.
5. Pengguna dapat memfilter kategori.
6. Pengguna memilih artikel.
7. Sistem menampilkan detail artikel.
8. Pengguna dapat kembali ke daftar artikel.
9. Pengguna dapat melakukan Login atau Register.

## 5.2 Member User Flow

1. Pengguna membuka halaman Login.
2. Pengguna memasukkan kredensial.
3. Sistem memverifikasi akun.
4. Sistem mengarahkan pengguna ke Dashboard.
5. Pengguna melihat statistik artikel.
6. Pengguna memilih menu pengelolaan artikel.
7. Pengguna membuat atau mengedit artikel.
8. Pengguna menyimpan artikel sebagai Draft atau Published.
9. Pengguna dapat menggunakan AI Generator.
10. Pengguna dapat melakukan import dan export Excel.
11. Pengguna dapat mengelola profil.
12. Pengguna melakukan Logout.

## 5.3 Admin User Flow

1. Admin membuka halaman Login.
2. Admin memasukkan kredensial.
3. Sistem memverifikasi role Admin.
4. Sistem mengarahkan Admin ke halaman administrasi.
5. Admin melihat daftar pengguna.
6. Admin memilih pengguna.
7. Sistem menampilkan artikel pengguna.
8. Admin dapat melakukan export.
9. Admin dapat kembali ke daftar seluruh artikel.
10. Admin melakukan Logout.

---

# 6. UI/UX REQUIREMENTS

## 6.1 Design Direction

Aplikasi harus menggunakan desain modern, minimalis, profesional, dan berorientasi pada kenyamanan membaca.

Karakteristik desain:
- Clean interface.
- Minimal visual clutter.
- Typography yang mudah dibaca.
- Konsistensi warna.
- Navigasi sederhana.
- Layout responsif.
- Interaksi yang jelas.
- Feedback visual pada setiap tindakan.

## 6.2 Public Layout

Halaman publik harus menggunakan:
- Sticky Top Navbar.
- Full-width reading layout.
- Hero Section.
- Article Listing.
- Category Navigation.
- Editorial Footer.

Tidak menggunakan sidebar pada halaman pembaca artikel.

## 6.3 Member Dashboard Layout

Dashboard Member harus menyediakan:
- Navigasi utama.
- Statistik artikel.
- Daftar artikel.
- Tombol tambah artikel.
- Menu tindakan artikel.
- Tombol import dan export.
- Akses AI Generator.
- Akses profil.

Daftar artikel menggunakan List View yang ringkas dan responsif, bukan Card View.

Menu tindakan setiap artikel menggunakan kebab menu dengan pilihan:
- Detail.
- Ubah.
- Hapus.

Tersedia juga tombol cepat untuk mengubah status artikel.

## 6.4 Admin Dashboard Layout

Admin Dashboard harus menyediakan:
- Navigasi administrasi.
- Daftar pengguna.
- Daftar seluruh artikel.
- Monitoring artikel per pengguna.
- Tombol export.

## 6.5 Modal dan Form

Modal tambah dan edit artikel menggunakan tampilan Full Screen.

Ketentuan:
- Header memiliki identitas halaman.
- Formulir mudah dibaca.
- Footer memiliki tombol aksi.
- Tombol aksi berada di sebelah kanan footer.
- Validasi ditampilkan dekat input terkait.

## 6.6 Loading and Feedback

Sistem harus menyediakan:
- Top Progress Bar.
- Floating Status Pill.
- Spinner pada tombol aksi.
- Success Notification.
- Error Notification.
- Empty State.
- Confirmation Dialog.

Contoh status:
- Memproses tindakan...
- Artikel berhasil disimpan.
- Artikel berhasil dipublikasikan.
- Gagal menyimpan artikel.
- Tidak ada artikel ditemukan.

Semua tombol dan menu harus memiliki indikator interaksi yang jelas.

---

# 7. NON-FUNCTIONAL REQUIREMENTS

## 7.1 Performance

- Halaman harus dimuat secara efisien.
- Query database harus dioptimalkan.
- Daftar artikel menggunakan pagination.
- Gambar harus dioptimalkan.
- Proses AI dan Excel harus memberikan loading feedback.

## 7.2 Security

- Password disimpan menggunakan hashing.
- Menggunakan CSRF protection.
- Menggunakan validasi input backend.
- Menggunakan middleware autentikasi.
- Menggunakan Role-Based Access Control.
- Menggunakan ownership validation.
- Mencegah SQL Injection.
- Mencegah Cross-Site Scripting (XSS).
- API key OpenAI tidak boleh dikirim ke frontend.
- File upload harus divalidasi.
- Endpoint administratif harus dilindungi.

## 7.3 Reliability

- Sistem harus menangani error secara terstruktur.
- Kegagalan API eksternal tidak boleh merusak data.
- Operasi database penting menggunakan transaksi.
- Data artikel harus konsisten.
- Sistem memberikan pesan kesalahan yang dapat dipahami pengguna.

## 7.4 Maintainability

- Menggunakan Feature-First Architecture.
- Menggunakan prinsip Clean Architecture.
- Memisahkan Controller, Service, Repository, Contract, dan Model.
- Menggunakan dependency injection.
- Menggunakan automated testing.
- Mengikuti standar penulisan kode yang konsisten.

## 7.5 Compatibility

Aplikasi harus mendukung browser modern:
- Google Chrome.
- Microsoft Edge.
- Mozilla Firefox.
- Safari.

Aplikasi harus dapat digunakan pada:
- Desktop.
- Laptop.
- Tablet.
- Smartphone.

---

# 8. DATABASE REQUIREMENTS

## 8.1 Users Table

Tabel users digunakan untuk menyimpan informasi pengguna.

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | bigint | Primary Key |
| name | varchar | Nama pengguna |
| email | varchar | Email unik |
| password | varchar | Password hasil hashing |
| role | varchar | Member atau Admin |
| created_at | timestamp | Waktu pembuatan |
| updated_at | timestamp | Waktu perubahan |

## 8.2 Posts Table

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | bigint | Primary Key |
| user_id | bigint | Foreign Key ke users |
| title | varchar | Judul artikel |
| slug | varchar | URL unik |
| category | varchar | Kategori |
| excerpt | text | Ringkasan artikel |
| content | longText | Isi artikel Markdown |
| cover_image_path | varchar | Lokasi gambar |
| is_published | boolean | Status publikasi |
| published_at | timestamp | Waktu publikasi |
| created_at | timestamp | Waktu dibuat |
| updated_at | timestamp | Waktu diperbarui |

## 8.3 Database Relationship

Relasi:
- Satu User dapat memiliki banyak Post.
- Satu Post hanya dimiliki oleh satu User.
- Post memiliki foreign key user_id.
- Penghapusan User menghapus Post miliknya melalui cascade delete.

## 8.4 Database Constraints

- Email harus unik.
- Slug harus unik.
- user_id harus mengacu pada pengguna yang valid.
- Category harus sesuai kategori yang tersedia (Teknologi, Pendidikan, Gaya Hidup, Bisnis, Opini, Umum).
- is_published hanya menerima nilai boolean.

---

# 9. SYSTEM ARCHITECTURE

## 9.1 Technology Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13 |
| Frontend | React |
| Integration | Inertia.js |
| Database | PostgreSQL |
| API / HTTP | Laravel |
| Markdown Editor | TOAST UI Editor |
| Markdown Viewer | TOAST UI Viewer |
| Excel Processing | PhpSpreadsheet |
| AI Integration | OpenAI API |
| Authentication | Laravel Authentication |
| Testing | PHPUnit / Laravel Testing |
| Dependency Management | Composer / NPM |

## 9.2 Architectural Pattern

Aplikasi menggunakan kombinasi:

**Feature-First Architecture**

Kode dikelompokkan berdasarkan fitur bisnis, seperti:
- Auth.
- Post.
- Admin.
- Ai.
- Profile.

**Clean Architecture**

Setiap fitur memisahkan tanggung jawab:
- Controller: menerima request dan mengembalikan response.
- Service: mengelola business logic.
- Repository: mengelola akses data.
- Contract: mendefinisikan interface.
- Model: merepresentasikan data.

## 9.3 Struktur Folder

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
│   │   └── Repositories/PostRepository.php
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

---

# 10. SUCCESS METRICS & DEFINITION OF DONE

1. **Kelulusan Pengujian:** Unit dan Feature test mencapai kelulusan 100%.
2. **Cakupan Kode (Coverage):** Direktori `app/` mencapai coverage 100.0% tanpa notice atau warning (`php artisan test --coverage --min=100`).
3. **Keamanan Dependensi:** `composer audit` bernilai 0 security vulnerabilities.
4. **Struktur Direktori:** Seluruh subdirektori `storage/` dipertahankan di git menggunakan `.gitignore` berisi `*` dan `!.gitignore`.
5. **Kesesuaian Fitur:** Seluruh 20 Functional Requirements (FR-001 hingga FR-020) terimplementasi sesuai Acceptance Criteria.
