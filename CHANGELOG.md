# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-10

### Added
- Multi-tier CMS Blog Platform built on Laravel 13, Inertia.js (React), and PostgreSQL.
- Feature-First Clean Architecture modular structure (`Auth`, `Post`, `Ai`, `Profile`, `Admin`).
- Role-based Access Control (Guest, Member, Admin) with `EnsureRole` and `EnsurePostOwnership` middlewares.
- Public reading gallery (`/` and `/articles`) with search, category filtering, pagination, and modern hero section.
- Public article detail view with TOAST UI Markdown Viewer (`@toast-ui/editor/dist/toastui-editor-viewer`).
- Member Dashboard (`/dashboard/posts`) with full CRUD operations, article statistics, responsive table view, and floating status pill.
- TOAST UI Markdown Editor (`@toast-ui/editor`) integrated inside Full Screen Modal for writing and editing articles.
- Instant AI Article Generator powered by OpenAI API (`gpt-4o-mini`) with batch draft preview and save.
- Excel Export and Import powered by PhpSpreadsheet (`phpoffice/phpspreadsheet`) with slug collision resolution and category mapping.
- Cover image management with validation, storage link, and automatic cleanup of previous images.
- Administrator management panels:
  - User management (`/admin/users`) with search and role badges.
  - All posts monitoring (`/admin/posts`) with system-wide Excel export.
  - User-specific post monitoring (`/admin/users/{user}/posts`) with filtered Excel export.
- Profile and password management (`/profile`) with current password verification.
- Complete automated test suite (55 tests, 167 assertions) achieving 100.0% code coverage across `app/` (`php artisan test --coverage --min=100`).
- Automated testing compliance IDs on login form (`login-username`, `login-password`, `login-submit`).
- Multi-agent specifications (`AGENTS.md` and `.agents/*.md`) across 13 roles.

