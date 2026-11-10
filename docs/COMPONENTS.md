# KATALOG KOMPONEN
Frontend dan Designer HANYA boleh memakai komponen di sini. Satu komponen = satu Blade component (resources/views/components/).

## 1. App Shell
| Komponen | Isi dan Aturan |
|---|---|
| Page Container | Kanvas bg-canvas, radius-xl, padding 32px, di atas bg-page |
| Top Bar | Kiri: logo + tagline. Tengah: Nav Pill. Kanan: tombol ikon, notifikasi (titik merah jika ada), pengaturan, avatar. Tinggi 64px |
| Nav Pill | Latar dark-900, radius-full, item teks 14px putih; item aktif = pill primary-500 dengan ikon "+" atau ikon halaman; hover = dark-700 |
| Page Header | Tombol kembali bulat (kiri), Display title, subjudul text-secondary, aksi di kanan (tombol filter ikon + tombol primer) |

## 2. Tombol
| Varian | Tampilan | Dipakai untuk |
|---|---|---|
| Primary | Latar primary-500, teks putih, radius-full, tinggi 48px, ikon opsional di kiri | Aksi utama (Create an invoice) |
| Secondary | Latar surface, border line, teks ink | Aksi sekunder |
| Dark | Latar dark-900, teks putih, radius-full | "Payout now" di kartu terang |
| Light | Latar putih, teks ink, radius-full | Aksi di atas panel berwarna |
| Icon | 40x40, radius-full, latar surface, border line | Filter, salin link, kalender |
| Ghost | Tanpa latar, teks primary-500 | Aksi tersier |
| Destructive | Latar danger, teks putih | Hapus (selalu dengan konfirmasi) |
State wajib: default, hover, focus (shadow-focus), active, disabled (opacity 50%), loading (spinner, klik dinonaktifkan).

## 3. Kartu
| Komponen | Aturan |
|---|---|
| Card | surface, radius-xl, padding 24px, shadow-card |
| KPI Card | Judul kecil (14px, secondary) + ikon status di kanan atas; angka besar (H1); baris tren (ikon panah + persen + "from last month"); visual di bawah (grafik/ilustrasi). Tren naik-baik = success, naik-buruk (overdue) = danger |
| Chart Card | KPI Card dengan grafik batang atau garis. Batang: primary-500 dengan variasi opasitas; batang tertinggi paling pekat. Garis: primary-500 dengan titik, area di bawah gradien tipis |
| Payment Method Card | Daftar kartu kecil (Visa, Stripe, PayPal) dengan 4 digit terakhir. Terpilih = latar primary-500, teks putih, naik 8px. Tidak terpilih = surface, border |
| Dark Panel | dark-900, radius-2xl, padding 32px. Berisi tab di tepi atas dan dua kolom |
| Detail Panel | Gradien primary-panel, radius-xl, teks putih, kartu item di dalamnya latar putih 12% opasitas |
| Line Item Card | Nominal (H3), nama item (14px), ikon panah kanan atas. Kartu "Add Item": garis putus-putus, ikon "+" |

## 4. Navigasi dan Filter
| Komponen | Aturan |
|---|---|
| Tabs (pill) | Kontainer radius-full; tab aktif primary-500 putih dengan counter bulat; tab lain teks biasa + counter |
| Filter Bar | Label "Active filters" + badge angka; Select, Date picker, Search input berjajar, gap 16px |
| Select | Tinggi 48px, radius-full, border line, ikon chevron; panel opsi shadow-pop |
| Date Picker | Tampilan "November 2023" + ikon kalender; popup kalender |
| Search Input | Tinggi 48px, radius-full, ikon cari di kanan, placeholder text-muted |
| Breadcrumb / Back | Tombol bulat dengan ikon panah kiri |

## 5. Daftar dan Data
| Komponen | Aturan |
|---|---|
| List Item (gelap) | Tinggi 72px, radius-lg, latar dark-800; avatar 40px, nomor (INV-1001) tebal, sisa waktu kecil; badge status; nominal di kanan. Terpilih = latar primary-500, badge putih |
| Avatar | 40px (daftar), 32px (kecil), radius-full, foto atau inisial |
| Status Badge | Tinggi 24px, radius-full, 12px, warna sesuai tabel Status Invoice |
| Stat Row | Label kecil (secondary) di atas, nilai tebal di bawah (Sub Total, Total, Balance Due) |
| Delta Indicator | Panah + persen, warna semantik |

## 6. Feedback
| Komponen | Aturan |
|---|---|
| Toast | Kanan atas, radius-lg, ikon + pesan, hilang otomatis 5 detik, bisa ditutup |
| Modal Konfirmasi | Judul, penjelasan dampak, tombol Batal (secondary) + aksi (destructive/primary) |
| Skeleton | Blok abu-abu berdenyut dengan bentuk sama seperti konten asli |
| Empty State | Ilustrasi sederhana + judul + penjelasan satu kalimat + satu tombol aksi |
| Error State | Ikon danger + pesan jelas + tombol "Coba lagi" |
| Inline Error | Di bawah input, 12px, warna danger, ikon kecil |
| Tooltip | dark-900, putih, radius-sm, muncul 200ms |

## 7. Form
| Komponen | Aturan |
|---|---|
| Field | Label di atas (14px, 500), input di bawah, bantuan/error di bawah input |
| Input | Tinggi 48px, radius-md, border line; focus = border primary-500 + shadow-focus; error = border danger |
| Textarea, Checkbox, Radio, Toggle | Warna aktif primary-500, area klik minimal 44x44px |
| Upload | Area putus-putus, ikon, teks "Seret file atau klik", batas tipe dan ukuran ditampilkan |

