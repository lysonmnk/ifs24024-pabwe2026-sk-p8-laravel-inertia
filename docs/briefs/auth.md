# DESIGN BRIEF: Autentikasi Pengguna (Login & Register)
Versi: 1.0 | Pemilik: Designer | Status: Disetujui

## 1. Ringkasan
- Tujuan layar: Memungkinkan Guest mendaftar sebagai Member, serta pengguna yang sudah terdaftar masuk ke sistem (Member diarahkan ke Dashboard Penulis, Admin diarahkan ke Admin Area).
- Pengguna dan role: Guest (mendaftar & login), Member & Admin (login).
- Task backlog terkait: TASK-001, TASK-002 (FR-006, FR-007, FR-008).
- Halaman asal -> tujuan:
  - Homepage / Navbar -> `/login` -> Dashboard (`/dashboard/posts` atau `/admin/users`).
  - `/login` -> `/register` -> `/login` (setelah sukses registrasi).

## 2. User Flow
- **Alur Login:**
  1. Pengguna membuka `/login`.
  2. Mengisi input ID `login-username` (email) dan `login-password`.
  3. Menekan tombol `login-submit`.
  4. Sistem memvalidasi input -> jika berhasil, sesi disimpan dan user diredirect sesuai role.
  5. Jika gagal, error ditampilkan tanpa menyebutkan apakah email atau password yang salah.
- **Alur Register:**
  1. Pengguna membuka `/register`.
  2. Mengisi nama, email, password, dan konfirmasi password.
  3. Menekan tombol "Daftar Akun".
  4. Sistem memvalidasi data dan membuat akun Member baru.
  5. Pengguna menerima notifikasi sukses dan diarahkan ke login.

## 3. Layout per Breakpoint
| Breakpoint | Susunan area |
|---|---|
| Desktop (>=1280px) | Layout kartu terpusat (*centered card*) di atas latar belakang netral lembut, lebar kartu 480px, logo di bagian atas, formulir di tengah, link alternatif di bawah. |
| Tablet (768-1279px) | Kartu terpusat, padding 24px, lebar 440px. |
| Mobile (<768px) | Lebar penuh dengan margin sisi 16px, tombol aksi berukuran minimal 48px tinggi. |

## 4. Daftar Komponen
| Area | Komponen | Data yang ditampilkan | Sumber data |
|---|---|---|---|
| Header Kartu | Brand Logo & Title | "Masuk ke Akun Anda" / "Daftar Akun Penulis" | Statis |
| Form Login | Input `email` (ID: `login-username`) | Placeholder "nama@contoh.com" | State form |
| Form Login | Input `password` (ID: `login-password`) | Placeholder "••••••••" | State form |
| Form Login | Button Submit (ID: `login-submit`) | Label "Masuk" + Spinner saat proses | State loading |
| Form Register | Input `name`, `email`, `password`, `password_confirmation` | Label jelas + pesan bantuan | State form |
| Footer Kartu | Link navigasi | "Belum punya akun? Daftar" / "Sudah punya akun? Masuk" | Rute Inertia |

## 5. State per Komponen/Halaman
| Komponen | Default | Loading | Error | Sukses | Disabled |
|---|---|---|---|---|---|
| Form Login | Input kosong atau prefill email | Tombol disabled + spinner, input read-only | Border merah pada input, alert "Email atau kata sandi tidak valid." | Redirect ke halaman tujuan | Tombol disabled jika input wajib kosong |
| Form Register | Input kosong | Tombol disabled + status "Memproses pendaftaran..." | Pesan error validasi inline di bawah input terkait | Toast sukses + redirect ke login | Tombol disabled saat submit berlangsung |

## 6. Interaksi
| Elemen | Aksi user | Respons sistem | Catatan |
|---|---|---|---|
| `login-submit` | Klik | Tampilkan spinner, nonaktifkan tombol, kirim POST ke `/login` | Mencegah double submit |
| Input Password | Ketik | Validasi panjang minimal secara dinamis | Minimal 8 karakter |
| Tombol Logout | Klik | Kirim POST ke `/logout`, hapus sesi, redirect ke `/` | Di Navbar/Top bar |

## 7. Teks UI Final
| Elemen | Teks |
|---|---|
| Judul Login | Masuk ke Akun |
| Subjudul Login | Masukkan email dan kata sandi Anda untuk melanjutkan. |
| Tombol Submit Login | Masuk |
| Judul Register | Buat Akun Penulis |
| Subjudul Register | Bergabunglah dengan platform publikasi dan bagikan pemikiran Anda. |
| Tombol Submit Register | Daftar Sekarang |
| Pesan Error Login | Email atau kata sandi yang Anda masukkan salah. |
| Pesan Sukses Register | Akun berhasil dibuat! Silakan masuk dengan kredensial Anda. |

## 8. Validasi Form
| Field | Aturan | Pesan Error | Kapan divalidasi |
|---|---|---|---|
| `email` | Wajib, format email valid | Email wajib diisi dengan format yang benar. | Blur & submit |
| `password` | Wajib, minimal 8 karakter | Kata sandi minimal 8 karakter. | Blur & submit |
| `name` (register) | Wajib, string maks 255 | Nama lengkap wajib diisi. | Blur & submit |
| `password_confirmation` | Wajib, identik dengan password | Konfirmasi kata sandi tidak cocok. | Ketik & submit |

## 9. Aksesibilitas
- Urutan Tab logis: Logo -> Input Email -> Input Password -> Tombol Submit -> Link Register.
- Input ID wajib: `login-username`, `login-password`, `login-submit` untuk kebutuhan pengujian otomatis.
- Warna teks memenuhi kontras WCAG AA (>= 4.5:1).

## 10. Kebutuhan Data (untuk Data Master)
- Endpoint: `POST /login`, `POST /register`, `POST /logout`.
- Field user: `id`, `name`, `email`, `role` (enum: 'Member', 'Admin').

## 11. Pertanyaan Terbuka
- Tidak ada. Spesifikasi ID elemen dan perilaku sudah disepakati di PRD & README.

## 12. Kriteria Selesai Desain
- [x] Semua bagian terisi
- [x] ID pengujian `login-username`, `login-password`, `login-submit` tercantum
- [x] UI Checklist diverifikasi

