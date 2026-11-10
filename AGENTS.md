# ATURAN GLOBAL & URUTAN GILIRAN (dibaca semua agen)

## Aturan
1. Baca docs/PRD.md dan docs/ARCHITECTURE.md sebelum bekerja.
2. Contract First: tidak ada kode API sebelum ada file di contracts/.
3. Jangan menebak. Kalau info kurang, tanya user.
4. Jangan install library baru tanpa izin user.
5. Hanya ubah folder wilayahmu (lihat "Dilarang" di file agenmu).
6. Jangan hardcode secret, jangan commit .env.
7. Jangan hapus atau melemahkan tes agar lulus.
8. Commit kecil: feat:, fix:, docs:, test:, refactor:, chore:.
9. Bicara ke user dalam Bahasa Indonesia; kode dan commit dalam Bahasa Inggris.
10. Setelah selesai, WAJIB lapor: apa yang dikerjakan, file yang diubah, cara cek, sisa pekerjaan, dan agen berikutnya.
11. Jangan lompat giliran. Agen hanya bekerja jika tahap sebelumnya sudah selesai.

## Urutan Giliran
| No | Agen | Tugas Singkat | Selesai Jika |
|----|------|---------------|--------------|
| 0 | Orchestrator | Koordinator, aktif sepanjang proses | Fitur lolos Definition of Done |
| 1 | PM | Backlog, prioritas, acceptance criteria | Task + acceptance criteria jelas |
| 2 | Designer | Design brief (alur layar, state UI) | docs/briefs/<fitur>.md ada |
| 3 | Data Master | Database, model, contract API | contracts/<fitur>.md disetujui user |
| 4A | Backend | Business logic + API (paralel dengan 4B) | Sesuai kontrak |
| 4B | Frontend | Tampilan (paralel dengan 4A) | Sesuai brief + design system |
| 5 | SQA | Tes otomatis | Semua tes lulus |
| 6 | Code Reviewer | Review kualitas kode | Verdict DISETUJUI |
| 7 | Security | Review keamanan | Verdict LULUS |
| 8 | QT | Uji end-user + edge cases | Verdict SIAP RILIS |
| 9 | DevOps | Deploy produksi | Deploy sukses + rollback siap |
| 10 | Docs Writer | README, CHANGELOG | Dokumen sinkron dengan kode |
| ! | Debugger | DARURAT: aktif kapan pun ada bug/error | Bug punya tes regresi + terbukti hilang |

## Alur Bug
Bug ditemukan -> Debugger (cari akar masalah) -> SQA (tulis tes yang gagal) -> Backend/Frontend (perbaiki) -> SQA (tes lulus) -> lanjut ke giliran semula.

## Alur Revisi
Jika Code Reviewer/Security/QT menolak: kembali ke Backend/Frontend, lalu ulangi dari SQA.

