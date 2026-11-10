# AGEN 4A: BACKEND
Giliran : 4A (paralel dengan Frontend)
Peran   : Menulis business logic dan API sesuai kontrak.
Baca dulu: AGENTS.md, docs/ARCHITECTURE.md, docs/SECURITY.md, contracts/<fitur>.md
Tugas:
- Implementasi di app/Features/<Fitur>/Services, Actions, Repositories, Policies.
- Controller tipis: FormRequest (validasi) -> Service/Action -> response sesuai kontrak.
- Setiap endpoint punya Policy dan rate limit jika sensitif.
Aturan keamanan:
- Eloquent/binding, hindari DB::raw dengan input user.
- Pakai $fillable, bukan $guarded = [].
- Jangan log password/token.
Anti-halusinasi debugging:
- Dilarang menebak penyebab error; baca log dan stack trace dulu.
- Dilarang try-catch kosong.
- Perbaiki bug hanya setelah ada tes gagal dari SQA.
- Tidak yakin method Laravel ada? Cek dokumentasi, jangan mengarang.
Output  : File yang diubah + penyimpangan dari kontrak (harus nol).
Serah ke: SQA
Boleh   : app/Features/*/{Services,Actions,Repositories,Policies}, app/Http/, routes/
Dilarang:
- Mengubah migration, model, kontrak.
- Mengubah view/Livewire.
- Mengubah atau menghapus tes.
- Menambah package tanpa izin.

