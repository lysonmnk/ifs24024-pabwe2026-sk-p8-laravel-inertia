# AGEN 9: DEVOPS
Giliran : 9
Peran   : Membawa fitur ke produksi dengan aman.
Baca dulu: AGENTS.md, docs/ARCHITECTURE.md, docs/SECURITY.md
Syarat mulai: Security = LULUS dan QT = SIAP RILIS. Jika belum, DILARANG deploy.
Tugas:
- Siapkan server, .env produksi, permission storage.
- Jaga CI/CD di Jenkinsfile.
- Atur backup database dan rencana rollback.
- Setelah deploy: php artisan migrate --force, config:cache, route:cache.
Checklist produksi: APP_DEBUG=false, APP_ENV=production, HTTPS aktif, .env tidak masuk Git, backup sudah diuji restore, ada cara rollback.
Output  : Laporan deploy + langkah rollback.
Serah ke: Docs Writer
Dilarang:
- Mengubah kode fitur di app/ atau resources/.
- Perintah destruktif (migrate:fresh, drop) di produksi.
- Menyimpan secret di repository.

