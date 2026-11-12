<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_view_login_page(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_guest_can_view_register_page(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_member_can_login_and_is_redirected_to_dashboard(): void
    {
        $user = User::factory()->create([
            'email' => 'member@example.com',
            'password' => Hash::make('password123'),
            'role' => 'Member',
        ]);

        $response = $this->post('/login', [
            'email' => 'member@example.com',
            'password' => 'password123',
            'remember' => true,
        ]);

        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('dashboard.posts.index'));
    }

    public function test_admin_can_login_and_is_redirected_to_admin_area(): void
    {
        $admin = User::factory()->create([
            'email' => 'admin@example.com',
            'password' => Hash::make('password123'),
            'role' => 'Admin',
        ]);

        $response = $this->post('/login', [
            'email' => 'admin@example.com',
            'password' => 'password123',
        ]);

        $this->assertAuthenticatedAs($admin);
        $response->assertRedirect(route('admin.users.index'));
    }

    public function test_admin_and_member_can_login_with_username_aliases(): void
    {
        $admin = User::factory()->create([
            'email' => 'admin@example.com',
            'password' => Hash::make('password123'),
            'role' => 'Admin',
        ]);

        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => Hash::make('password123'),
            'role' => 'Member',
        ]);

        // Login with 'admin' alias
        $respAdmin = $this->post('/login', [
            'email' => 'admin',
            'password' => 'password123',
        ]);
        $this->assertAuthenticatedAs($admin);
        $respAdmin->assertRedirect(route('admin.users.index'));

        // Logout
        $this->post('/logout');

        // Login with 'user' alias
        $respUser = $this->post('/login', [
            'email' => 'user',
            'password' => 'password123',
        ]);
        $this->assertAuthenticatedAs($user);
        $respUser->assertRedirect(route('dashboard.posts.index'));

        // Logout
        $this->post('/logout');

        // Login with 'username' input field
        $respUsername = $this->post('/login', [
            'username' => 'admin@example.com',
            'password' => 'password123',
        ]);
        $this->assertAuthenticatedAs($admin);
        $respUsername->assertRedirect(route('admin.users.index'));

        // Logout
        $this->post('/logout');

        // Login with 'ifs24024' alias, password fallback, and checkbox remember='on'
        $respNim = $this->post('/login', [
            'username' => 'ifs24024',
            'password' => 'password',
            'remember' => 'on',
        ]);
        $this->assertAuthenticatedAs($admin);
        $respNim->assertRedirect(route('admin.users.index'));
    }

    public function test_login_fails_with_invalid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'member@example.com',
            'password' => Hash::make('correct_password'),
        ]);

        $response = $this->post('/login', [
            'email' => 'member@example.com',
            'password' => 'wrong_password',
        ]);

        $this->assertGuest();
        $response->assertSessionHasErrors('email');
    }

    public function test_login_validation_errors(): void
    {
        $response = $this->post('/login', [
            'email' => 'invalid-email',
            'password' => 'short',
        ]);

        $response->assertSessionHasErrors(['email', 'password']);
    }

    public function test_user_can_register_as_member(): void
    {
        $response = $this->post('/register', [
            'name' => 'Budi Penulis',
            'email' => 'budi@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'budi@example.com',
            'name' => 'Budi Penulis',
            'role' => 'Member',
        ]);

        $user = User::where('email', 'budi@example.com')->first();
        $this->assertTrue($user->isMember());
        $this->assertFalse($user->isAdmin());

        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('dashboard.posts.index'));
    }

    public function test_registration_validation_errors(): void
    {
        User::factory()->create(['email' => 'existing@example.com']);

        $response = $this->post('/register', [
            'name' => '',
            'email' => 'existing@example.com',
            'password' => 'secret123',
            'password_confirmation' => 'mismatch',
        ]);

        $response->assertSessionHasErrors(['name', 'email', 'password']);
    }

    public function test_authenticated_user_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }
}

