<?php

namespace Tests\Feature;

use App\Features\Post\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_member_cannot_access_admin_routes(): void
    {
        $member = User::factory()->create(['role' => 'Member']);

        $this->actingAs($member)->get('/admin/users')->assertStatus(403);
        $this->actingAs($member)->get('/admin/posts')->assertStatus(403);
        $this->actingAs($member)->get('/admin/posts/export')->assertStatus(403);
    }

    public function test_guest_is_redirected_to_login_when_accessing_admin(): void
    {
        $this->get('/admin/users')->assertRedirect('/login');
    }

    public function test_admin_can_view_users_list_and_search(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        User::factory()->create(['name' => 'John Doe', 'email' => 'john@example.com']);

        $response = $this->actingAs($admin)->get('/admin/users?q=John');

        $response->assertStatus(200);
    }

    public function test_admin_can_view_all_posts_monitoring_and_search(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $member = User::factory()->create();

        Post::factory()->create([
            'user_id' => $member->id,
            'title' => 'Monitoring Artikel Test',
        ]);

        $response = $this->actingAs($admin)->get('/admin/posts?q=Monitoring');

        $response->assertStatus(200);
    }

    public function test_admin_can_export_all_posts_to_excel(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        Post::factory()->count(2)->create();

        $response = $this->actingAs($admin)->get('/admin/posts/export');

        $response->assertStatus(200);
        $this->assertTrue($response->headers->get('content-type') === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }

    public function test_admin_can_view_user_posts_and_export(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $member = User::factory()->create();

        Post::factory()->create(['user_id' => $member->id, 'title' => 'Artikel Spesifik User']);

        $viewResponse = $this->actingAs($admin)->get("/admin/users/{$member->id}/posts");
        $viewResponse->assertStatus(200);

        $exportResponse = $this->actingAs($admin)->get("/admin/users/{$member->id}/posts/export");
        $exportResponse->assertStatus(200);
        $this->assertTrue($exportResponse->headers->get('content-type') === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
}

