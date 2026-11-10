# Standar Keamanan
- Password min 8 karakter (disarankan 12), di-hash, tidak pernah dilog.
- Login rate limit 5 percobaan/menit per IP+email.
- Pesan error login tidak membedakan email salah vs password salah.
- Setiap endpoint dicek Policy; cegah akses data milik user lain.
- Input divalidasi FormRequest; output Blade pakai {{ }}.
- Upload: whitelist tipe, batas ukuran, nama file di-generate ulang.
- .env tidak masuk Git; produksi APP_DEBUG=false dan HTTPS.
- composer audit dan npm audit di CI; High/Critical wajib diperbaiki sebelum rilis.
- Role: <admin, user, ...> beserta hak aksesnya.

