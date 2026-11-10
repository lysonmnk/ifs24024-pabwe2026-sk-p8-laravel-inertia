# QA Report
Fitur: Sistem Publikasi Blog Multi-Tier (FR-001 s.d. FR-020)  
Tanggal: 2026-11-10  
Penguji: QT (Quality Technician)

| ID | Skenario | Langkah | Diharapkan | Aktual | Status | Severity |
|---|---|---|---|---|---|---|
| TC-001 | Pembaca umum mengakses homepage (FR-001) | Buka URL `/` | Menampilkan daftar artikel yang berstatus published, kategori, dan form pencarian | Sesuai ekspektasi (PostIndex.jsx) | Lulus | - |
| TC-002 | Filter artikel per kategori (FR-002) | Klik tab/pill kategori (Teknologi, Bisnis, Edukasi, dll) di `/` | Daftar artikel terfilter sesuai kategori terpilih | Sesuai ekspektasi | Lulus | - |
| TC-003 | Pencarian artikel publik (FR-003) | Ketik kata kunci pada kolom pencarian di `/` lalu submit | Hanya artikel published dengan judul/ringkasan cocok yang tampil | Sesuai ekspektasi | Lulus | - |
| TC-004 | Membaca detail artikel publik (FR-004) | Klik kartu artikel menuju `/articles/{slug}` | Konten artikel dirender dengan rapi via TOAST UI Viewer | Sesuai ekspektasi (PostShow.jsx) | Lulus | - |
| TC-005 | Proteksi draft artikel publik (FR-004 Edge Case) | Akses URL slug artikel yang statusnya draft sebagai Guest | Muncul response 404 Not Found | Sesuai ekspektasi (404 returned) | Lulus | - |
| TC-006 | Registrasi akun Member baru (FR-005) | Buka `/register`, isi nama, username, email, password konfirmasi | Akun tersimpan dengan role default `Member`, auto-login, redirect ke dashboard | Sesuai ekspektasi | Lulus | - |
| TC-007 | Login sistem (FR-006) | Buka `/login`, isi form dengan elemen ID `login-username`, `login-password`, `login-submit` | Berhasil login, Member ke `/dashboard/posts`, Admin ke `/admin/users` | Sesuai ekspektasi | Lulus | - |
| TC-008 | Logout sistem (FR-007) | Klik tombol Logout di navbar | Sesi berakhir, redirect kembali ke halaman utama publik | Sesuai ekspektasi | Lulus | - |
| TC-009 | Member Dashboard melihat artikel sendiri (FR-008) | Akses `/dashboard/posts` setelah login sebagai Member | Menampilkan daftar artikel milik user login, status pill, jumlah draf/terbit | Sesuai ekspektasi | Lulus | - |
| TC-010 | Pembuatan artikel dengan TOAST UI Editor (FR-009) | Klik "Tulis Artikel Baru", ketik judul, kategori, konten markdown di modal layar penuh | Artikel tersimpan sebagai draf, modal tertutup, daftar terbarui | Sesuai ekspektasi | Lulus | - |
| TC-011 | Pengeditan artikel (FR-010) | Klik edit pada artikel di dashboard, ubah judul/konten, simpan | Perubahan tersimpan, slug terbarui secara bersih | Sesuai ekspektasi | Lulus | - |
| TC-012 | Penghapusan artikel (FR-011) | Klik hapus artikel dan konfirmasi dialog | Artikel terhapus dari basis data beserta cover filenya | Sesuai ekspektasi | Lulus | - |
| TC-013 | Publikasi & unpublish artikel (FR-012) | Klik tombol toggle status pada baris artikel | Status berubah instan (Draft <-> Published), waktu publikasi tercatat | Sesuai ekspektasi | Lulus | - |
| TC-014 | Unggah dan hapus cover image (FR-013) | Unggah file JPG/PNG max 2MB di halaman detail artikel | Gambar tampil sebagai cover artikel publik, tombol hapus menghapus file | Sesuai ekspektasi | Lulus | - |
| TC-015 | AI Article Generator modal & simpan batch (FR-014) | Buka generator AI, ketik topik, pilih kategori dan jumlah draf (1-5), klik generate lalu simpan | OpenAI Service memproses draf atau menggunakan fallback jika offline, batch draf masuk ke dashboard | Sesuai ekspektasi | Lulus | - |
| TC-016 | Ekspor artikel Member ke Excel (FR-015) | Klik tombol "Ekspor Excel" di `/dashboard/posts` | File `.xlsx` terunduh berisi data ID, Judul, Kategori, Konten, Status | Sesuai ekspektasi | Lulus | - |
| TC-017 | Impor artikel Member dari Excel (FR-016) | Unggah file format Excel dengan beberapa baris artikel | Artikel baru masuk ke database berstatus draf, judul duplikat mendapat slug unik | Sesuai ekspektasi | Lulus | - |
| TC-018 | Pembaruan profil & kata sandi (FR-017) | Buka `/profile`, ubah nama/email dan ganti kata sandi dengan verifikasi kata sandi saat ini | Profil dan password terupdate dengan validasi ketat | Sesuai ekspektasi | Lulus | - |
| TC-019 | Admin memantau daftar user (FR-018) | Login Admin, buka `/admin/users` | Menampilkan semua user terdaftar, role badge, jumlah artikel, dan form pencarian user | Sesuai ekspektasi | Lulus | - |
| TC-020 | Admin memantau & ekspor semua artikel sistem (FR-019) | Login Admin, buka `/admin/posts` dan klik "Ekspor Seluruh Artikel" | Menampilkan artikel seluruh penulis dalam sistem beserta unduhan Excel master | Sesuai ekspektasi | Lulus | - |
| TC-021 | Admin melihat & ekspor artikel per user tertentu (FR-020) | Login Admin, buka `/admin/users/{user}/posts` dan unduh Excel | Daftar artikel dan file Excel terfilter khusus milik penulis yang dipilih | Sesuai ekspektasi | Lulus | - |
| TC-022 | Proteksi Akses Lintas Hak & IDOR | Member mencoba akses `/admin/users` atau edit artikel milik member lain | Response 403 Forbidden | Sesuai ekspektasi | Lulus | - |

## Verdict: SIAP RILIS
Semua skenario pengujian fungsional (FR-001 hingga FR-020), pengujian batas otorisasi (IDOR), validasi unggahan file, hingga elemen ID form otomasi telah terverifikasi secara menyeluruh tanpa kendala.
