<?php

namespace Database\Seeders;

use App\Features\Post\Enums\PostCategory;
use App\Features\Post\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('password123'),
                'role' => 'Admin',
            ]
        );

        $member = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Budi Santoso',
                'password' => Hash::make('password123'),
                'role' => 'Member',
            ]
        );

        // Seed sample published posts
        $samplePosts = [
            [
                'title' => 'Membangun Arsitektur Bersih dengan Laravel 13',
                'category' => PostCategory::Teknologi->value,
                'excerpt' => 'Panduan terstruktur mengadopsi Clean Architecture dan pendekatan Feature-First dalam pengembangan proyek Laravel skala enterprise.',
                'content' => "# Membangun Arsitektur Bersih dengan Laravel 13\n\nClean Architecture memisahkan tanggung jawab kode menjadi lapisan-lapisan yang independen...\n\n## Keuntungan Feature-First\n- Struktur lebih terorganisir per domain bisnis.\n- Kemudahan pengujian unit dan integrasi.\n- Pemeliharaan kode jangka panjang yang lebih aman.",
                'is_published' => true,
                'published_at' => now(),
            ],
            [
                'title' => 'Strategi Produktivitas untuk Penulis Digital',
                'category' => PostCategory::GayaHidup->value,
                'excerpt' => 'Tips mengelola waktu, menyusun draf konten secara konsisten, dan menjaga alur ide tetap mengalir setiap hari.',
                'content' => "# Strategi Produktivitas untuk Penulis Digital\n\nKonsistensi adalah kunci utama dalam publikasi tulisan daring...\n\n### 3 Kebiasaan Efektif\n1. Menulis draf tanpa mengedit terlebih dahulu.\n2. Menggunakan bantuan kecerdasan buatan untuk merangsang ide.\n3. Menetapkan target harian yang realistis.",
                'is_published' => true,
                'published_at' => now()->subDay(),
            ],
        ];

        foreach ($samplePosts as $postData) {
            Post::firstOrCreate(
                ['slug' => Str::slug($postData['title'])],
                [
                    'user_id' => $member->id,
                    'title' => $postData['title'],
                    'category' => $postData['category'],
                    'excerpt' => $postData['excerpt'],
                    'content' => $postData['content'],
                    'cover_image_path' => null,
                    'is_published' => $postData['is_published'],
                    'published_at' => $postData['published_at'],
                ]
            );
        }
    }
}
