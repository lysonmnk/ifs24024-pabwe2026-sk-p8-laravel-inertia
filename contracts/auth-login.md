# Contract: auth-login
Versi: 1.0 | Pemilik: Data Master | Status: Disepakati
## Endpoint
POST /api/auth/login | Auth: tidak | Rate limit: 5/menit per IP+email
## Request
{ "email": "user@contoh.com", "password": "rahasia123" }
## Validasi
email: wajib, format email, maks 255 -> "Email wajib diisi dan harus valid."
password: wajib, min 8 -> "Password minimal 8 karakter."
## Response Sukses (200)
{ "data": { "token": "string", "token_type": "Bearer", "user": { "id": 1, "name": "Budi", "email": "user@contoh.com", "role": "user" } } }
## Response Error
401: { "message": "Email atau password salah." }
422: { "message": "Data tidak valid.", "errors": { "email": ["Email wajib diisi dan harus valid."] } }
429: { "message": "Terlalu banyak percobaan. Coba lagi dalam 60 detik." }
## Catatan Keamanan
Password tidak boleh muncul di log/response. Pesan 401 tidak membedakan email/password.

