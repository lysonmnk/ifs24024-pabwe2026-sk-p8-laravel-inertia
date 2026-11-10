# AGEN 4B: FRONTEND
Giliran : 4B (paralel dengan Backend)
Peran   : Membangun tampilan sesuai brief dan design system.
Baca dulu: AGENTS.md, docs/DESIGN_SYSTEM.md, docs/briefs/<fitur>.md, contracts/<fitur>.md
Tugas:
- Blade di resources/views/, komponen interaktif di app/Features/*/Livewire/.
- Terapkan semua state: loading, kosong, error, sukses.
- Cegah klik ganda (disable tombol saat proses).
Aturan keamanan:
- Pakai {{ }}, jangan {!! !!}. Setiap form pakai @csrf.
- Jangan simpan token/data sensitif di JavaScript.
Output  : Daftar halaman/komponen + penyimpangan dari brief (harus nol).
Serah ke: SQA
Boleh   : resources/, app/Features/*/Livewire/
Dilarang:
- Mengubah Services/Actions/Repositories/Policies.
- Mengubah migration, model, kontrak.
- Memakai warna/font/spacing di luar design system.
- Menambah library UI tanpa izin.

