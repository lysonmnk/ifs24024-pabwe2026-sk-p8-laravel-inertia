# Contract: Fitur Artikel (Public & Member Posts)
Versi: 1.0 | Pemilik: Data Master | Status: Disetujui

---

## 1. GET / & GET /articles
Menampilkan daftar artikel berstatus `Published` untuk publik.

### Request Query Parameters
| Parameter | Tipe | Keterangan |
|---|---|---|
| `q` | string (opsional) | Pencarian kata kunci pada judul atau isi artikel |
| `category` | string (opsional) | Filter kategori (Teknologi, Pendidikan, Gaya Hidup, Bisnis, Opini, Umum) |
| `page` | integer (opsional) | Halaman pagination (default 1) |

### Response Sukses (Inertia Props 200)
```json
{
  "articles": {
    "data": [
      {
        "id": 1,
        "title": "Pengenalan Inertia.js dan React",
        "slug": "pengenalan-inertia-js-dan-react",
        "category": "Teknologi",
        "excerpt": "Panduan ringkas membangun SPA dengan Laravel dan React.",
        "cover_image_path": "storage/covers/sample.jpg",
        "is_published": true,
        "published_at": "2026-11-10T10:00:00Z",
        "user": {
          "id": 2,
          "name": "Budi Santoso"
        }
      }
    ],
    "current_page": 1,
    "last_page": 1,
    "total": 1
  },
  "filters": {
    "q": "",
    "category": ""
  }
}
```

---

## 2. GET /articles/{slug}
Menampilkan detail satu artikel published.

### Response Sukses (Inertia Props 200)
```json
{
  "article": {
    "id": 1,
    "title": "Pengenalan Inertia.js dan React",
    "slug": "pengenalan-inertia-js-dan-react",
    "category": "Teknologi",
    "excerpt": "Ringkasan...",
    "content": "# Konten Markdown...",
    "cover_image_path": "storage/covers/sample.jpg",
    "is_published": true,
    "published_at": "2026-11-10T10:00:00Z",
    "user": {
      "id": 2,
      "name": "Budi Santoso"
    }
  }
}
```

### Response Error
- **404 Not Found:** Artikel tidak ditemukan atau `is_published = false`.

---

## 3. GET /dashboard/posts
Daftar artikel milik Member yang login beserta metrik statistik.

### Response Sukses (Inertia Props 200)
```json
{
  "posts": {
    "data": [
      {
        "id": 1,
        "title": "Draf Artikel Baru",
        "slug": "draf-artikel-baru",
        "category": "Teknologi",
        "excerpt": "Ringkasan singkat...",
        "cover_image_path": null,
        "is_published": false,
        "published_at": null,
        "created_at": "2026-11-10T11:00:00Z"
      }
    ],
    "total": 1
  },
  "stats": {
    "total_posts": 1,
    "total_published": 0,
    "total_draft": 1
  }
}
```

---

## 4. POST /dashboard/posts & PUT /dashboard/posts/{post}
Menyimpan dan memperbarui artikel milik Member.

### Request Body
```json
{
  "title": "Judul Artikel",
  "category": "Teknologi",
  "excerpt": "Ringkasan opsional",
  "content": "# Konten Markdown lengkap",
  "is_published": false
}
```

### Validasi
| Field | Aturan | Pesan Error |
|---|---|---|
| `title` | required, string, max:255 | Judul artikel wajib diisi maksimal 255 karakter. |
| `category` | required, in:Teknologi,Pendidikan,Gaya Hidup,Bisnis,Opini,Umum | Kategori harus dipilih dari opsi yang valid. |
| `excerpt` | nullable, string, max:500 | Ringkasan maksimal 500 karakter. |
| `content` | required, string | Isi artikel Markdown wajib diisi. |
| `is_published` | boolean | Status publikasi harus bernilai benar atau salah. |

### Response Sukses (302 Redirect)
Redirect ke `/dashboard/posts` dengan flash message sukses.

### Response Error
- **403 Forbidden:** Post bukan milik Member yang sedang login.
- **422 Unprocessable Entity:** Validasi gagal.

---

## 5. DELETE /dashboard/posts/{post}
Menghapus artikel milik Member.

### Response Sukses (302 Redirect)
Redirect ke `/dashboard/posts` dengan pesan flash sukses.

### Response Error
- **403 Forbidden:** Jika post bukan milik user.
- **404 Not Found:** Post tidak ditemukan.

---

## 6. PATCH /dashboard/posts/{post}/publish
Toggle status Draft <-> Published satu klik.

### Response Sukses (302 Redirect)
- Jika beralih ke Published: `is_published = true`, `published_at` terisi waktu saat ini jika sebelumnya null.
- Jika beralih ke Draft: `is_published = false`.

---

## 7. POST & DELETE /dashboard/posts/{post}/cover
Mengunggah dan menghapus cover image.

### Validasi Unggah
- `cover`: required, image, mimes:jpeg,png,jpg,webp, max:2048 (2MB).

### Response Sukses (302 Redirect)
Cover disimpan di storage publik `storage/covers/` dan path diperbarui pada record `posts`.

---

## 8. GET & POST /dashboard/posts/export & /dashboard/posts/import
Ekspor & Impor artikel via Excel.

- `GET /dashboard/posts/export`: Download file binary `.xlsx` berisi kolom: ID, Title, Slug, Category, Excerpt, Content, Status, Published At, Created At, Updated At.
- `POST /dashboard/posts/import`: Form-data `file` (mimes:xlsx,xls, max:10240). Validasi baris per baris, buat slug unik, simpan sebagai draft milik Member.

---

## 9. POST /dashboard/posts/ai-generate & /dashboard/posts/ai-save
Generator Artikel AI menggunakan OpenAI API.

### POST /dashboard/posts/ai-generate Request
```json
{
  "topic": "Masa Depan AI dalam Pengembangan Web",
  "category": "Teknologi",
  "count": 2
}
```
Validasi:
- `topic`: required, string, min:5, max:255.
- `category`: required, in:Teknologi,Pendidikan,Gaya Hidup,Bisnis,Opini,Umum.
- `count`: required, integer, min:1, max:5.

Response: Array artikel draf `{ title, excerpt, content, category }`.

### POST /dashboard/posts/ai-save Request
```json
{
  "posts": [
    {
      "title": "Judul Draf 1",
      "category": "Teknologi",
      "excerpt": "Ringkasan",
      "content": "# Konten"
    }
  ]
}
```
Response: 302 Redirect dengan pesan sukses dan artikel disimpan sebagai Draft.

