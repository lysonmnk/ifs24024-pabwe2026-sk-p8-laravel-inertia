<?php

namespace Tests\Feature;

use App\Features\Ai\Contracts\AiClientInterface;
use App\Features\Ai\DTO\GeneratedPostItem;
use App\Features\Ai\Services\OpenAiPostGeneratorService;
use App\Features\Post\Enums\PostCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class AiGenerationTest extends TestCase
{
    use RefreshDatabase;

    public function test_member_can_generate_articles_via_ai(): void
    {
        $member = User::factory()->create(['role' => 'Member']);

        $response = $this->actingAs($member)->postJson('/dashboard/posts/ai-generate', [
            'topic' => 'Kecerdasan Buatan dalam Pendidikan',
            'category' => PostCategory::Pendidikan->value,
            'count' => 2,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['title', 'category', 'excerpt', 'content'],
            ],
        ]);
        $this->assertCount(2, $response->json('data'));
    }

    public function test_ai_generator_validates_input_bounds(): void
    {
        $member = User::factory()->create(['role' => 'Member']);

        $response = $this->actingAs($member)->postJson('/dashboard/posts/ai-generate', [
            'topic' => 'AI',
            'category' => 'InvalidCategory',
            'count' => 10, // exceeds max 5
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['topic', 'category', 'count']);
    }

    public function test_member_can_save_ai_generated_batch_articles(): void
    {
        $member = User::factory()->create(['role' => 'Member']);

        $response = $this->actingAs($member)->post('/dashboard/posts/ai-save', [
            'posts' => [
                [
                    'title' => 'Draf AI 1',
                    'category' => PostCategory::Teknologi->value,
                    'excerpt' => 'Ringkasan Draf 1',
                    'content' => '# Konten Draf 1',
                ],
                [
                    'title' => 'Draf AI 2',
                    'category' => PostCategory::Bisnis->value,
                    'excerpt' => 'Ringkasan Draf 2',
                    'content' => '# Konten Draf 2',
                ],
            ],
        ]);

        $response->assertRedirect(route('dashboard.posts.index'));

        $this->assertDatabaseHas('posts', [
            'user_id' => $member->id,
            'title' => 'Draf AI 1',
            'is_published' => false,
        ]);

        $this->assertDatabaseHas('posts', [
            'user_id' => $member->id,
            'title' => 'Draf AI 2',
            'is_published' => false,
        ]);
    }

    public function test_openai_service_handles_successful_api_response(): void
    {
        Http::fake([
            'https://api.openai.com/v1/chat/completions' => Http::response([
                'choices' => [
                    [
                        'message' => [
                            'content' => json_encode([
                                [
                                    'title' => 'Judul dari OpenAI Mock',
                                    'category' => 'Teknologi',
                                    'excerpt' => 'Ringkasan dari API OpenAI',
                                    'content' => '# Konten Sukses API',
                                ],
                            ]),
                        ],
                    ],
                ],
            ], 200),
        ]);

        config(['services.openai.api_key' => 'valid-mock-api-key']);

        $service = new OpenAiPostGeneratorService;
        $results = $service->generateArticles('Topik Uji', 'Teknologi', 1);

        $this->assertCount(1, $results);
        $this->assertSame('Judul dari OpenAI Mock', $results[0]->title);
    }

    public function test_openai_service_handles_api_exception_with_fallback(): void
    {
        Http::fake([
            'https://api.openai.com/v1/chat/completions' => Http::response('Server Error', 500),
        ]);

        config(['services.openai.api_key' => 'valid-mock-api-key']);

        $service = new OpenAiPostGeneratorService;
        $results = $service->generateArticles('Topik Fallback', 'Teknologi', 1);

        $this->assertCount(1, $results);
        $this->assertStringContainsString('Topik Fallback', $results[0]->title);
    }
}

