# Contract: Profil Pengguna (Profile Management)
Versi: 1.0 | Pemilik: Data Master | Status: Disetujui

---

## 1. GET /profile
Menampilkan halaman edit profil pengguna yang sedang login.

### Response Sukses (Inertia Props 200)
```json
{
  "user": {
    "id": 2,
    "name": "Budi Santoso",
    "email": "budi@example.com",
    "role": "Member"
  }
}
```

---

## 2. PUT /profile
Memperbarui nama dan email pengguna.

### Request Body
```json
{
  "name": "Budi Santoso S.Kom",
  "email": "budi.new@example.com"
}
```

### Validasi
| Field | Aturan | Pesan Error |
|---|---|---|
| `name` | required, string, max:255 | Nama wajib diisi maksimal 255 karakter. |
| `email` | required, email, max:255, unique:users,email,{id} | Email harus valid dan unik. |

---

## 3. PUT /profile/password
Mengubah kata sandi pengguna.

### Request Body
```json
{
  "current_password": "passwordLama123",
  "password": "passwordBaru123",
  "password_confirmation": "passwordBaru123"
}
```

### Validasi
| Field | Aturan | Pesan Error |
|---|---|---|
| `current_password` | required, current_password | Kata sandi saat ini tidak sesuai. |
| `password` | required, min:8, confirmed | Kata sandi baru minimal 8 karakter dan harus cocok dengan konfirmasi. |

