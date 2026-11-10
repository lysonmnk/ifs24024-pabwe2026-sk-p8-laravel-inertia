<?php

namespace Tests\Feature;

use App\Features\Post\Enums\PostCategory;
use App\Features\Post\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicPostTest extends TestCase
{
    use RefreshDatabase;

    public function test_homepage_and_articles_listing_display_published_posts_only(): void
    {
        $author = User::factory()->create();

        $publishedPost = Post::factory()->create([
            'user_id' => $author->id,
            'title' => 'Artikel Terpublikasi',
            'category' => PostCategory::Teknologi->value,
            'is_published' => true,
            'published_at' => now(),
        ]);

        $draftPost = Post::factory()->create([
            'user_id' => $author->id,
            'title' => 'Artikel Draf Rahasia',
            'category' => PostCategory::Bisnis->value,
            'is_published' => false,
            'published_at' => null,
        ]);

        $responseHome = $this->get('/');
        $responseHome->assertStatus(200);

        $responseArticles = $this->get('/articles');
        $responseArticles->assertStatus(200);

        // Search query
        $responseSearch = $this->get('/articles?q=Terpublikasi');
        $responseSearch->assertStatus(200);

        // Category filter
        $responseCategory = $this->get('/articles?category=Teknologi');
        $responseCategory->assertStatus(200);
    }

    public function test_public_can_view_published_article_detail(): void
    {
        $author = User::factory()->create();

        $post = Post::factory()->create([
            'user_id' => $author->id,
            'title' => 'Panduan Laravel 13',
            'slug' => 'panduan-laravel-13',
            'content' => '# Isi Panduan Lengkap',
            'is_published' => true,
            'published_at' => now(),
        ]);

        $response = $this->get('/articles/panduan-laravel-13');

        $response->assertStatus(200);
    }

    public function test_public_cannot_view_draft_article_detail(): void
    {
        $author = User::factory()->create();

        $draft = Post::factory()->create([
            'user_id' => $author->id,
            'slug' => 'draft-post-slug',
            'is_published' => false,
        ]);

        $response = $this->get('/articles/draft-post-slug');

        $response->assertStatus(404);
    }

    public function test_non_existent_slug_returns_404(): void
    {
        $response = $this->get('/articles/slug-yang-tidak-ada');

        $response->assertStatus(404);
    }
}

