# DESIGN SYSTEM
Gaya: Modern fintech dashboard. Bersih, lega, kartu membulat, kontras kuat antara area terang dan area gelap, satu warna aksen (ungu).

## 1. Prinsip Visual
1. Satu aksen: ungu dipakai untuk aksi utama dan item aktif. Jangan tambah warna aksen lain.
2. Hierarki lewat ukuran dan berat font, bukan lewat warna-warni.
3. Angka penting (uang, total) selalu paling besar dan tebal dalam kartu.
4. Lega: spacing besar, tidak menumpuk elemen.
5. Sudut membulat konsisten di seluruh aplikasi.
6. Area gelap dipakai untuk fokus utama (daftar + detail), area terang untuk ringkasan.

## 2. Warna
### Brand
| Token | Hex | Kegunaan |
|---|---|---|
| primary-500 | #5B4FE9 | Tombol utama, tab/menu aktif, grafik |
| primary-600 | #4A3FD1 | Hover tombol utama |
| primary-700 | #3B31B0 | Active/pressed |
| primary-100 | #E9E7FD | Latar chip, badge ringan |
| primary-50  | #F4F3FF | Latar hover item terang |
| primary-panel | #5B54C8 | Panel detail berwarna (gradien ke #4B44B0) |

### Netral (terang)
| Token | Hex | Kegunaan |
|---|---|---|
| bg-page | #F1F0F7 | Latar luar halaman |
| bg-canvas | #FAFAFD | Kanvas utama (kontainer besar) |
| surface | #FFFFFF | Kartu, input, dropdown |
| border | #E8E7F0 | Garis pembatas, outline input |
| text-primary | #14122B | Judul, angka utama |
| text-secondary | #6B6A80 | Teks pendukung, subjudul |
| text-muted | #A3A2B5 | Placeholder, label kecil |

### Netral (gelap)
| Token | Hex | Kegunaan |
|---|---|---|
| dark-900 | #14132A | Panel gelap besar, navbar pill |
| dark-800 | #1E1D38 | Baris item di panel gelap |
| dark-700 | #2A2947 | Hover item di panel gelap |
| text-on-dark | #FFFFFF | Teks utama di area gelap |
| text-on-dark-muted | #A9A8C4 | Teks pendukung di area gelap |

### Semantik
| Token | Hex | Kegunaan |
|---|---|---|
| success | #16A34A | Berhasil, dibayar, tren baik |
| warning | #F59E0B | Peringatan, jatuh tempo dekat |
| danger | #E5484D | Error, overdue, tren buruk |
| info | #3B82F6 | Informasi netral |
Aturan: tiap warna semantik punya versi latar ringan (10-12% opasitas) untuk badge.

### Status Invoice (badge)
| Status | Latar | Teks |
|---|---|---|
| Draft | #ECECF3 | #6B6A80 |
| Unsent | #2A2947 (di gelap) / #ECECF3 (terang) | #FFFFFF / #14122B |
| Viewed | #E9E7FD | #5B4FE9 |
| Paid | #DCFCE7 | #15803D |
| Overdue | #FEE2E2 | #B91C1C |
| Unpaid | #5B4FE9 | #FFFFFF |

## 3. Tipografi
Font: Inter (fallback: system-ui, sans-serif). Angka uang memakai `font-variant-numeric: tabular-nums`.
| Gaya | Ukuran/Line-height | Berat | Kegunaan |
|---|---|---|---|
| Display | 40/48 | 700 | Judul halaman ("Invoices") |
| H1 | 32/40 | 700 | Angka KPI besar |
| H2 | 24/32 | 600 | Judul section |
| H3 | 20/28 | 600 | Judul kartu/panel |
| Body-L | 16/24 | 500 | Isi utama |
| Body | 14/20 | 400 | Teks umum, isi tabel/daftar |
| Small | 12/16 | 500 | Label, badge, caption |
Aturan: maksimal 3 ukuran berbeda dalam satu kartu. Simbol mata uang ($) lebih kecil dan lebih redup dari angkanya.

## 4. Spacing (kelipatan 8px)
| Token | Nilai | Pakai untuk |
|---|---|---|
| space-1 | 4px | Jarak ikon-teks (pengecualian) |
| space-2 | 8px | Jarak elemen rapat |
| space-3 | 16px | Padding kartu kecil, gap antar elemen |
| space-4 | 24px | Padding kartu standar |
| space-5 | 32px | Gap antar kartu, padding panel besar |
| space-6 | 48px | Jarak antar section |
| space-7 | 64px | Jarak besar |
Dilarang memakai nilai di luar tabel ini.

## 5. Radius
| Token | Nilai | Pakai untuk |
|---|---|---|
| radius-sm | 8px | Badge kecil, chip |
| radius-md | 12px | Input, tombol kecil |
| radius-lg | 16px | Kartu, item daftar |
| radius-xl | 24px | Kartu besar, kontainer utama |
| radius-2xl | 32px | Panel gelap besar |
| radius-full | 9999px | Tombol pill, avatar, navbar, tab |

## 6. Elevasi (bayangan lembut)
| Token | Nilai | Pakai untuk |
|---|---|---|
| shadow-card | 0 1px 2px rgba(20,18,43,.04), 0 8px 24px rgba(20,18,43,.06) | Kartu |
| shadow-pop | 0 12px 32px rgba(20,18,43,.12) | Dropdown, modal |
| shadow-focus | 0 0 0 3px rgba(91,79,233,.35) | Ring fokus |
Aturan: area gelap tidak memakai bayangan, cukup beda warna latar.

## 7. Grid dan Layout
- Lebar maksimum konten: 1440px, margin tengah.
- Desktop (>=1280px): 12 kolom, gap 24px.
- Tablet (768-1279px): 8 kolom, gap 16px.
- Mobile (<768px): 4 kolom, gap 16px, padding sisi 16px.
- KPI cards: 4 kolom desktop, 2 kolom tablet, 1 kolom mobile (scroll horizontal opsional).
- Panel utama (daftar + detail): 4 : 8 kolom desktop; di mobile jadi satu kolom, detail membuka sebagai halaman/drawer.

## 8. Ikon
- Set: Lucide (outline), ukuran 16 / 20 / 24px, stroke 1.75px.
- Warna ikon mengikuti teks; ikon status memakai warna semantik.
- Ikon dalam tombol bulat: wadah 40x40px, radius-full, latar surface, border 1px.

## 9. Motion
| Interaksi | Durasi | Easing |
|---|---|---|
| Hover/focus | 150ms | ease-out |
| Buka dropdown/tooltip | 200ms | ease-out |
| Modal/drawer | 250ms | cubic-bezier(.2,.8,.2,1) |
| Ganti tab/konten | 200ms | ease-in-out |
| Angka KPI naik/turun | 600ms | ease-out |
Hormati `prefers-reduced-motion`: matikan animasi non-esensial.

## 10. Tailwind Token (tailwind.config.js)
```js
theme: { extend: {
  colors: {
    primary: { 50:'#F4F3FF',100:'#E9E7FD',500:'#5B4FE9',600:'#4A3FD1',700:'#3B31B0' },
    dark: { 900:'#14132A', 800:'#1E1D38', 700:'#2A2947' },
    ink: { DEFAULT:'#14122B', 2:'#6B6A80', 3:'#A3A2B5' },
    page:'#F1F0F7', canvas:'#FAFAFD', line:'#E8E7F0',
    success:'#16A34A', warning:'#F59E0B', danger:'#E5484D', info:'#3B82F6'
  },
  fontFamily: { sans: ['Inter','system-ui','sans-serif'] },
  borderRadius: { sm:'8px', md:'12px', lg:'16px', xl:'24px', '2xl':'32px' },
  boxShadow: {
    card:'0 1px 2px rgba(20,18,43,.04), 0 8px 24px rgba(20,18,43,.06)',
    pop:'0 12px 32px rgba(20,18,43,.12)',
    focus:'0 0 0 3px rgba(91,79,233,.35)'
  }
}}
```
