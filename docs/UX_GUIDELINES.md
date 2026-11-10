# PANDUAN UX

## 1. Prinsip
1. Jelas: satu halaman = satu tujuan utama, satu tombol primer.
2. Ringkasan dulu, detail kemudian: KPI di atas, daftar di tengah, detail di samping.
3. Selalu beri umpan balik: setiap aksi punya respons visual (loading, toast, perubahan state).
4. Cegah error lebih baik daripada menampilkannya: validasi saat mengetik, konfirmasi untuk aksi berisiko.
5. Konsisten: pola yang sama untuk hal yang sama di seluruh aplikasi.
6. Hemat langkah: aksi paling sering dipakai maksimal 2 klik.

## 2. Pola Halaman Standar (Dashboard + Daftar + Detail)
1. Page Header (judul, subjudul, aksi utama)
2. Baris KPI (3-4 kartu)
3. Filter Bar
4. Dark Panel: Tabs -> Daftar (kiri) + Detail (kanan)
Item terpilih di daftar otomatis menampilkan detail di kanan tanpa pindah halaman (Livewire).

## 3. Pola Interaksi
| Situasi | Perilaku |
|---|---|
| Memuat data | Skeleton sesuai bentuk konten, bukan spinner layar penuh |
| Daftar kosong | Empty state + tombol aksi pertama (contoh: "Buat invoice pertamamu") |
| Hasil filter kosong | Pesan "Tidak ada hasil" + tombol "Reset filter" |
| Aksi berhasil | Toast sukses + data diperbarui di tempat |
| Aksi gagal | Toast/inline error dengan penjelasan dan jalan keluar ("Coba lagi") |
| Aksi destruktif | Modal konfirmasi menyebut apa yang akan hilang |
| Aksi keuangan (Payout) | Konfirmasi dengan ringkasan nominal + metode, tombol dinonaktifkan saat proses (cegah klik ganda) |
| Form panjang | Simpan draf otomatis, tampilkan "Tersimpan" |
| Sesi habis | Arahkan ke login, kembalikan ke halaman semula setelah login |

## 3a. Tulisan UI (microcopy)
- Bahasa Indonesia, nada ramah dan lugas, kalimat aktif.
- Tombol berupa kata kerja: "Buat invoice", "Kirim", "Bayar sekarang".
- Pesan error = apa yang salah + cara memperbaikinya. Contoh: "Email tidak valid. Gunakan format nama@contoh.com."
- Angka uang: pemisah ribuan sesuai locale, selalu tampilkan mata uang.
- Tanggal: format konsisten di seluruh aplikasi (contoh: 10 Nov 2026).

## 4. Responsif
| Breakpoint | Perilaku |
|---|---|
| Mobile (<768) | Nav Pill menjadi bottom bar/menu hamburger; KPI 1 kolom; daftar penuh layar, detail membuka halaman baru; tabel diubah jadi kartu |
| Tablet (768-1279) | KPI 2 kolom; daftar dan detail bertumpuk atau drawer |
| Desktop (>=1280) | Layout penuh seperti desain acuan |
Area sentuh minimal 44x44px.

## 5. Aksesibilitas (WCAG AA)
- Kontras teks minimal 4.5:1 (teks besar 3:1). Perhatikan teks putih di atas ungu muda dan abu di atas gelap.
- Warna tidak boleh jadi satu-satunya penanda (status selalu ada teks/ikon).
- Semua elemen interaktif bisa dijangkau keyboard (Tab) dengan fokus terlihat.
- Input punya label terhubung; ikon tanpa teks punya aria-label.
- Grafik punya ringkasan teks atau tabel alternatif.
- Ukuran teks bisa diperbesar 200% tanpa layout rusak.

## 6. Performa Persepsi
- Konten di atas lipatan tampil < 2 detik.
- Gambar ilustrasi: lazy-load, beri width/height tetap (cegah layout bergeser).
- Aksi < 100ms terasa instan, > 1 detik tampilkan indikator.

