# Debug Playbook
Alur: Gejala -> Reproduksi -> Bukti -> Lapisan -> Hipotesis -> Tes gagal -> Perbaikan minimal -> Verifikasi
| Lapisan | Tempat Mencari |
|---|---|
| Backend | storage/logs/laravel.log, php artisan tinker |
| Routing | php artisan route:list |
| Database | query log, status migration |
| Frontend | konsol browser, tab Network |
| Config | .env, php artisan config:clear |
Error umum: 419 = CSRF/sesi habis | 500 setelah deploy = cache config/permission storage | 403 = Policy menolak | 422 tak terduga = validasi tidak sesuai kontrak | Class not found = composer dump-autoload
Aturan: tidak menebak, satu perubahan satu pengecekan, hapus dd() sebelum commit, tiap bug punya tes regresi.

