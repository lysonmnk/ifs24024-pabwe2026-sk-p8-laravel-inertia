# Architecture

## System Overview
Browser (React + Inertia.js) -> Laravel 13 (Controller -> Service/Action -> Repository) -> PostgreSQL

## Tech Stack (TERKUNCI)
- **Backend:** Laravel 13 (PHP 8.3+)
- **Frontend:** React + Inertia.js + Tailwind CSS
- **Database:** PostgreSQL (`pgsql`)
- **Testing:** PHPUnit / Pest / Laravel Testing (Target Coverage `app/`: 100.0%)
- **Code Quality:** Laravel Pint, `composer audit` (0 vulnerabilities)
- **Integrasi Tambahan:**
  - Markdown: TOAST UI Editor & Viewer (`@toast-ui/editor`)
  - Excel: `PhpOffice/PhpSpreadsheet`
  - AI: OpenAI API Client

> Menambah library di luar daftar ini wajib izin user dan dicatat di `docs/DECISIONS.md`.

## Struktur Folder (Feature-First & Clean Architecture)

```text
app/
├── Features/
│   ├── Admin/
│   │   ├── Controllers/AdminUserController.php
│   │   └── Services/AdminUserService.php
│   ├── Ai/
│   │   ├── Contracts/AiClientInterface.php
│   │   ├── DTO/GeneratedPostItem.php
│   │   └── Services/OpenAiPostGeneratorService.php
│   ├── Auth/
│   │   ├── Actions/{LoginUserAction, RegisterUserAction}.php
│   │   └── Controllers/AuthController.php
│   ├── Post/
│   │   ├── Contracts/PostRepositoryInterface.php
│   │   ├── Controllers/{AdminPostController, PostController, PublicPostController}.php
│   │   ├── Enums/PostCategory.php
│   │   ├── Models/Post.php
│   │   ├── Policies/PostPolicy.php
│   │   ├── Repositories/PostRepository.php
│   │   └── Services/{PostExcelService, PostService}.php
│   └── Profile/
│       ├── Controllers/ProfileController.php
│       └── Services/ProfileService.php
├── Http/Middleware/
│   ├── EnsurePostOwnership.php
│   ├── EnsureRole.php
│   └── HandleInertiaRequests.php
├── Models/User.php
└── Providers/AppServiceProvider.php

resources/
├── css/app.css
├── js/
│   ├── app.jsx
│   ├── Layouts/AppLayout.jsx
│   └── Pages/
│       ├── Admin/{PostList, UserList, UserPostList}.jsx
│       ├── Auth/{Login, Register}.jsx
│       ├── Post/{Index, Show}.jsx
│       ├── Profile/Edit.jsx
│       └── Public/{PostIndex, PostShow}.jsx
└── views/app.blade.php
```

## Data Flow
Request -> Middleware (Auth/Role/Ownership) -> FormRequest -> Controller -> Service / Action -> Repository -> PostgreSQL -> Inertia Response (React Props) / JSON / File Download sesuai kontrak.
