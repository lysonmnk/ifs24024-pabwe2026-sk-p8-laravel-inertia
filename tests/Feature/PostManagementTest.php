<?php

namespace Tests\Feature;

use App\Features\Post\Enums\PostCategory;
use App\Features\Post\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Tests\TestCase;

class PostManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_member_dashboard(): void
    {
        $response = $this->get('/dashboard/posts');

        $response->assertRedirect('/login');
    }

    public function test_member_can_view_dashboard_and_their_own_posts(): void
    {
        $member = User::factory()->create(['role' => 'Member']);
        $otherMember = User::factory()->create(['role' => 'Member']);

        Post::factory()->create([
            'user_id' => $member->id,
            'title' => 'Artikel Milik Member',
            'is_published' => true,
        ]);

        Post::factory()->create([
            'user_id' => $otherMember->id,
            'title' => 'Artikel Milik Orang Lain',
            'is_published' => true,
        ]);

        $response = $this->actingAs($member)->get('/dashboard/posts');

        $response->assertStatus(200);
    }

    public function test_member_can_create_new_post(): void
    {
        $member = User::factory()->create(['role' => 'Member']);

        $response = $this->actingAs($member)->post('/dashboard/posts', [
            'title' => 'Mengenal Clean Architecture',
            'category' => PostCategory::Teknologi->value,
            'excerpt' => 'Ringkasan arsitektur',
            'content' => '# Konten Lengkap Markdown',
            'is_published' => true,
        ]);

        $response->assertRedirect(route('dashboard.posts.index'));

        $this->assertDatabaseHas('posts', [
            'user_id' => $member->id,
            'title' => 'Mengenal Clean Architecture',
            'slug' => 'mengenal-clean-architecture',
            'category' => 'Teknologi',
            'is_published' => true,
        ]);
    }

    public function test_member_create_post_validation_error(): void
    {
        $member = User::factory()->create(['role' => 'Member']);

        $response = $this->actingAs($member)->post('/dashboard/posts', [
            'title' => '',
            'category' => 'InvalidCategory',
            'content' => '',
        ]);

        $response->assertSessionHasErrors(['title', 'category', 'content']);
    }

    public function test_member_can_view_their_post_detail(): void
    {
        $member = User::factory()->create(['role' => 'Member']);
        $post = Post::factory()->create(['user_id' => $member->id]);

        $response = $this->actingAs($member)->get("/dashboard/posts/{$post->id}");

        $response->assertStatus(200);
    }

    public function test_member_can_update_their_post(): void
    {
        $member = User::factory()->create(['role' => 'Member']);
        $post = Post::factory()->create([
            'user_id' => $member->id,
            'title' => 'Judul Lama',
        ]);

        $response = $this->actingAs($member)->put("/dashboard/posts/{$post->id}", [
            'title' => 'Judul Baru yang Diperbarui',
            'category' => PostCategory::Pendidikan->value,
            'excerpt' => 'Ringkasan Baru',
            'content' => '# Konten Baru',
            'is_published' => true,
        ]);

        $response->assertRedirect(route('dashboard.posts.index'));

        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'title' => 'Judul Baru yang Diperbarui',
            'slug' => 'judul-baru-yang-diperbarui',
            'category' => 'Pendidikan',
            'is_published' => true,
        ]);
    }

    public function test_member_cannot_update_other_members_post(): void
    {
        $member = User::factory()->create(['role' => 'Member']);
        $otherMember = User::factory()->create(['role' => 'Member']);
        $post = Post::factory()->create(['user_id' => $otherMember->id]);

        $response = $this->actingAs($member)->put("/dashboard/posts/{$post->id}", [
            'title' => 'Mencoba Bajak',
            'category' => PostCategory::Teknologi->value,
            'content' => 'Hacker Content',
        ]);

        $response->assertStatus(403);
    }

    public function test_member_can_delete_their_post(): void
    {
        $member = User::factory()->create(['role' => 'Member']);
        $post = Post::factory()->create(['user_id' => $member->id]);

        $response = $this->actingAs($member)->delete("/dashboard/posts/{$post->id}");

        $response->assertRedirect(route('dashboard.posts.index'));
        $this->assertDatabaseMissing('posts', ['id' => $post->id]);
    }

    public function test_member_cannot_delete_other_members_post(): void
    {
        $member = User::factory()->create(['role' => 'Member']);
        $otherMember = User::factory()->create(['role' => 'Member']);
        $post = Post::factory()->create(['user_id' => $otherMember->id]);

        $response = $this->actingAs($member)->delete("/dashboard/posts/{$post->id}");

        $response->assertStatus(403);
    }

    public function test_member_can_toggle_publish_status(): void
    {
        $member = User::factory()->create(['role' => 'Member']);
        $post = Post::factory()->create([
            'user_id' => $member->id,
            'is_published' => false,
            'published_at' => null,
        ]);

        // Toggle to Published
        $response = $this->actingAs($member)->patch("/dashboard/posts/{$post->id}/publish");
        $response->assertRedirect();

        $post->refresh();
        $this->assertTrue($post->is_published);
        $this->assertNotNull($post->published_at);

        // Toggle back to Draft
        $this->actingAs($member)->patch("/dashboard/posts/{$post->id}/publish");
        $post->refresh();
        $this->assertFalse($post->is_published);
    }

    public function test_member_can_upload_and_delete_cover_image(): void
    {
        Storage::fake('public');
        $member = User::factory()->create(['role' => 'Member']);
        $post = Post::factory()->create(['user_id' => $member->id]);

        $file = UploadedFile::fake()->image('cover.jpg', 640, 480);

        // Upload
        $response = $this->actingAs($member)->post("/dashboard/posts/{$post->id}/cover", [
            'cover' => $file,
        ]);
        $response->assertRedirect();

        $post->refresh();
        $this->assertNotNull($post->cover_image_path);
        Storage::disk('public')->assertExists($post->cover_image_path);

        // Delete
        $deleteResponse = $this->actingAs($member)->delete("/dashboard/posts/{$post->id}/cover");
        $deleteResponse->assertRedirect();

        $post->refresh();
        $this->assertNull($post->cover_image_path);
    }

    public function test_member_can_export_posts_to_excel(): void
    {
        $member = User::factory()->create(['role' => 'Member']);
        Post::factory()->count(3)->create(['user_id' => $member->id]);

        $response = $this->actingAs($member)->get('/dashboard/posts/export');

        $response->assertStatus(200);
        $this->assertTrue($response->headers->get('content-type') === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }

    public function test_member_can_import_posts_from_excel(): void
    {
        $member = User::factory()->create(['role' => 'Member']);

        // Create in-memory excel file
        $spreadsheet = new Spreadsheet;
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setCellValue('A1', 'ID');
        $sheet->setCellValue('B1', 'Penulis');
        $sheet->setCellValue('C1', 'Judul');
        $sheet->setCellValue('D1', 'Slug');
        $sheet->setCellValue('E1', 'Kategori');
        $sheet->setCellValue('F1', 'Excerpt');
        $sheet->setCellValue('G1', 'Konten');

        $sheet->setCellValue('C2', 'Artikel Hasil Impor Excel');
        $sheet->setCellValue('E2', 'Teknologi');
        $sheet->setCellValue('F2', 'Ringkasan impor');
        $sheet->setCellValue('G2', '# Konten Hasil Impor');

        $tempPath = tempnam(sys_get_temp_dir(), 'test_excel_').'.xlsx';
        $writer = new Xlsx($spreadsheet);
        $writer->save($tempPath);

        $uploadedFile = new UploadedFile($tempPath, 'articles.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', null, true);

        $response = $this->actingAs($member)->post('/dashboard/posts/import', [
            'file' => $uploadedFile,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('posts', [
            'user_id' => $member->id,
            'title' => 'Artikel Hasil Impor Excel',
            'is_published' => false,
        ]);

        if (file_exists($tempPath)) {
            @unlink($tempPath);
        }
    }
}

