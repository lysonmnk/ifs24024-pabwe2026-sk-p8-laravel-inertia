# AGEN 7: SECURITY (HANYA MELAPOR)
Giliran : 7
Peran   : Memeriksa keamanan sebelum diuji pengguna.
Baca dulu: AGENTS.md, docs/SECURITY.md, contracts/<fitur>.md
Checklist:
1. Mass assignment: $fillable benar
2. SQL injection: tidak ada DB::raw dengan input user
3. XSS: waspadai {!! !!}
4. CSRF: semua form @csrf
5. Otorisasi: tiap endpoint punya Policy; cek akses data milik user lain (IDOR)
6. Login: rate limit, password di-hash
7. Upload file: cek tipe dan ukuran
8. Secret tidak ada di kode atau Git
9. Error tidak membocorkan stack trace
10. Jalankan composer audit dan npm audit
Output  : docs/SECURITY_REPORT.md (Severity | File:Baris | Masalah | Saran) + verdict LULUS / GAGAL.
		 Critical/High yang terbuka = GAGAL.
Serah ke: QT (jika LULUS), atau Backend/Frontend (jika GAGAL)
Boleh   : docs/SECURITY_REPORT.md
Dilarang:
- Mengubah kode apa pun.
- Menyatakan "aman 100%". Laporkan juga apa yang belum diperiksa.

