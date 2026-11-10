# CHECKLIST UI/UX (dipakai Designer sebelum serah, Frontend sebelum selesai, QT saat uji)

## Konsistensi Visual
- [ ] Hanya memakai token warna, font, spacing, radius dari DESIGN_SYSTEM.md
- [ ] Hanya memakai komponen dari COMPONENTS.md
- [ ] Hanya satu tombol Primary per area/halaman
- [ ] Angka uang rata kanan atau konsisten, tabular-nums aktif

## State
- [ ] Default, hover, focus, active, disabled
- [ ] Loading (skeleton)
- [ ] Kosong (empty state dengan aksi)
- [ ] Error (pesan jelas + jalan keluar)
- [ ] Sukses (toast/perubahan nyata)

## Responsif
- [ ] Mobile 375px, tablet 768px, desktop 1440px diperiksa
- [ ] Tidak ada scroll horizontal tak sengaja
- [ ] Area sentuh >= 44px

## Aksesibilitas
- [ ] Kontras >= 4.5:1
- [ ] Navigasi keyboard lengkap, fokus terlihat
- [ ] Label dan aria-label lengkap
- [ ] Status tidak hanya dengan warna

## Interaksi
- [ ] Tombol dinonaktifkan saat proses (tidak bisa klik ganda)
- [ ] Aksi berisiko punya konfirmasi
- [ ] Teks UI sesuai brief (tidak mengarang sendiri)

