# Contract: Administrator (User Management & Article Monitoring)
Versi: 1.0 | Pemilik: Data Master | Status: Disetujui

---

## 1. GET /admin/users
Menampilkan daftar seluruh pengguna untuk Administrator.

### Hak Akses
Wajib login dengan role `Admin` (Middleware `EnsureRole:Admin`). Non-admin ditolak (403).

### Response Sukses (Inertia Props 200)
```json
{
  "users": {
    "data": [
      {
        "id": 1,
        "name": "Administrator",
        "email": "admin@example.com",
        "role": "Admin",
        "created_at": "2026-11-10T08:00:00Z",
        "posts_count": 0
      }
    ],
    "total": 1
  }
}
```

---

## 2. GET /admin/posts & GET /admin/posts/export
Monitoring seluruh artikel dalam sistem (read-only) dan ekspor ke Excel.

### Hak Akses
Wajib role `Admin`.

### Response Sukses (Inertia Props 200)
Menampilkan seluruh artikel (Draft dan Published) dari seluruh pengguna dengan informasi penulis (`user.name`).

- `GET /admin/posts/export`: Mengunduh seluruh artikel sistem dalam format XLSX.

---

## 3. GET /admin/users/{user}/posts & GET /admin/users/{user}/posts/export
Monitoring artikel per pengguna tertentu (read-only) dan ekspor per pengguna.

### Hak Akses
Wajib role `Admin`.

### Response Sukses (Inertia Props 200)
Menampilkan daftar artikel milik user tertentu.
- `GET /admin/users/{user}/posts/export`: Mengunduh artikel milik user tertentu dalam format XLSX.

