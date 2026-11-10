# Contract: Autentikasi Pengguna (Auth)
Versi: 1.0 | Pemilik: Data Master | Status: Disetujui

---

## 1. POST /login
Autentikasi pengguna (Member atau Admin).

### Endpoint
`POST /login` | Auth: Guest | Rate limit: 5/menit per IP+email

### Request Form Data
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Validasi
| Field | Aturan | Pesan Error |
|---|---|---|
| `email` | required, email, max:255 | Email wajib diisi dan harus berupa email yang valid. |
| `password` | required, min:8 | Kata sandi wajib diisi minimal 8 karakter. |

### Response Sukses (Redirect 302 / Inertia)
- Member: Redirect ke `/dashboard/posts` dengan session cookie terpasang.
- Admin: Redirect ke `/admin/users` dengan session cookie terpasang.

### Response Error
- **422 Unprocessable Entity:**
```json
{
  "message": "Data yang diberikan tidak valid.",
  "errors": {
    "email": ["Email atau kata sandi yang Anda masukkan salah."]
  }
}
```
- **429 Too Many Requests:**
```json
{
  "message": "Terlalu banyak percobaan masuk. Silakan coba lagi dalam beberapa menit."
}
```

---

## 2. POST /register
Pendaftaran akun baru (otomatis role Member).

### Endpoint
`POST /register` | Auth: Guest

### Request Form Data
```json
{
  "name": "Budi Santoso",
  "email": "budi@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

### Validasi
| Field | Aturan | Pesan Error |
|---|---|---|
| `name` | required, string, max:255 | Nama wajib diisi maksimal 255 karakter. |
| `email` | required, email, max:255, unique:users,email | Email wajib diisi, valid, dan belum digunakan. |
| `password` | required, min:8, confirmed | Kata sandi wajib diisi minimal 8 karakter dan cocok dengan konfirmasi. |

### Response Sukses (Redirect 302 / Inertia)
- Akun tersimpan dengan role `Member`.
- Otomatis login atau redirect ke `/dashboard/posts`.

### Response Error
- **422 Unprocessable Entity:**
```json
{
  "message": "Data yang diberikan tidak valid.",
  "errors": {
    "email": ["Email sudah digunakan."],
    "password": ["Konfirmasi kata sandi tidak cocok."]
  }
}
```

---

## 3. POST /logout
Keluar dari sesi saat ini.

### Endpoint
`POST /logout` | Auth: Authenticated (Member / Admin)

### Response Sukses (Redirect 302)
- Session di-invalidate dan token CSRF di-regenerate.
- Redirect ke `/`.

### Response Error
- **401 Unauthorized:** Pengguna belum login.

