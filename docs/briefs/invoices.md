# DESIGN BRIEF: Halaman Invoices (contoh terisi, berdasarkan desain acuan)
Versi: 1.0 | Pemilik: Designer | Status: Draft

## 1. Ringkasan
- Tujuan layar: memantau dan mengelola semua invoice dalam satu tempat.
- Pengguna dan role: Owner, Finance.
- Halaman asal -> tujuan: Overview -> Invoices -> (Buat invoice | Detail invoice)

## 2. User Flow
Buka Invoices -> lihat KPI -> filter/cari -> pilih invoice di daftar -> lihat detail di kanan -> Payout / salin link / jadwalkan.
Alternatif: tidak ada invoice -> empty state -> "Buat invoice pertamamu".

## 3. Layout per Breakpoint
| Breakpoint | Susunan |
|---|---|
| Desktop | Top Bar -> Page Header -> 4 KPI Card (1 baris) -> Filter Bar -> Dark Panel (Tabs; Daftar 4 kolom + Detail 8 kolom) |
| Tablet | KPI 2x2 -> Filter Bar (membungkus) -> Daftar di atas, Detail di bawah/drawer |
| Mobile | KPI scroll horizontal -> Filter jadi tombol "Filter" membuka sheet -> Daftar penuh -> Detail halaman baru |

## 4. Daftar Komponen
| Area | Komponen | Data | Sumber |
|---|---|---|---|
| Header | Page Header + Primary "Create an invoice" + Icon filter | - | - |
| KPI 1 | KPI Card "Overdue" | total overdue, tren % | summary.overdue_total, overdue_change_pct |
| KPI 2 | Chart Card "Due within next month" (batang Jul-Des) | total, tren %, nilai per bulan | summary.due_next_month, monthly[] |
| KPI 3 | Chart Card "Average time to get paid" (garis) | rata-rata hari, selisih hari | summary.avg_days_to_pay |
| KPI 4 | KPI Card "Available for Instant Payout" + Payment Method Card + Dark button | saldo, metode bayar | summary.payout_balance, payout_methods[] |
| Filter | Filter Bar (Customer, Status, rentang tanggal, cari nomor) + badge jumlah filter aktif | | query params |
| Tabs | Tabs pill: All Invoices, Draft (3), Unpaid (5) | jumlah per tab | counts{} |
| Daftar | List Item (gelap) | avatar, nomor, sisa hari, status, nominal | invoices[] |
| Detail | Detail Panel + Line Item Card + Stat Row + tombol Light "Payout now" | nomor, status, perusahaan, customer, item, subtotal, total, sisa tagihan | invoice{} |

## 5. State
| Komponen | Loading | Kosong | Error |
|---|---|---|---|
| KPI Card | Skeleton angka + grafik | "Belum ada data" | "Gagal memuat. Coba lagi" |
| Daftar | 5 skeleton item | "Belum ada invoice. Buat invoice pertamamu" + tombol | Error state + "Coba lagi" |
| Detail | Skeleton panel | "Pilih invoice untuk melihat detail" | Error state |
| Payout | Tombol loading + disabled | Disabled + tooltip "Tidak ada saldo" | Toast error + alasan |

## 6. Interaksi
| Elemen | Aksi | Respons |
|---|---|---|
| Item daftar | Klik | Item aktif (latar primary), detail di kanan diperbarui tanpa reload |
| Tab | Klik | Daftar difilter, counter diperbarui, URL ikut berubah |
| Filter | Ubah | Daftar dan KPI diperbarui, badge "Active filters" berubah |
| Payout now | Klik | Modal konfirmasi (nominal + metode) -> proses -> toast sukses |
| Ikon link | Klik | Salin link invoice, toast "Link disalin" |
| Add Item | Klik | Form tambah item (hanya status Draft/Unsent) |

## 7. Teks UI Final
| Elemen | Teks |
|---|---|
| Judul | Invoices |
| Subjudul | Kelola dan pantau semua invoice di satu tempat. |
| Tombol utama | Buat invoice |
| Search placeholder | Cari nomor invoice |
| Kosong | Belum ada invoice. Buat invoice pertamamu. |
| Sukses payout | Payout berhasil diproses. |
| Error payout | Payout gagal. Periksa metode pembayaran lalu coba lagi. |

## 8. Aksesibilitas
- Urutan Tab: Header -> KPI -> Filter -> Tabs -> Daftar -> Detail.
- Daftar memakai role="listbox", item terpilih aria-selected.
- Grafik punya ringkasan teks; tren tidak hanya dengan warna (ada panah + teks).

## 10. Kebutuhan Data
Uang dalam satuan sen (integer) + kode mata uang; tanggal ISO 8601; status enum: draft, unsent, viewed, paid, overdue.

## 11. Pertanyaan Terbuka
- Metode payout apa saja yang didukung?
- Apakah invoice bisa dikirim ulang dari panel detail?
- Mata uang tunggal atau multi-currency?

