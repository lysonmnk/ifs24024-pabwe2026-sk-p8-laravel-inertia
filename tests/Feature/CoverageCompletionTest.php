<?php

namespace Tests\Feature;

use App\Features\Ai\Services\OpenAiPostGeneratorService;
use App\Features\Post\Contracts\PostRepositoryInterface;
use App\Features\Post\Models\Post;
use App\Features\Post\Services\PostExcelService;
use App\Features\Post\Services\PostService;
use App\Http\Middleware\EnsurePostOwnership;
use App\Http\Middleware\EnsureRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class CoverageCompletionTest extends TestCase
{
    use RefreshDatabase;

    public function test_post_repository_get_for_user_paginated_with_search(): void
    {
        $user = User::factory()->create();
        Post::factory()->create([
            'user_id' => $user->id,
            'title' => 'Pencarian Khusus User',
            'excerpt' => 'Deskripsi ringkas',
        ]);

        /** @var PostRepositoryInterface $repo */
        $repo = app(PostRepositoryInterface::class);
        $paginated = $repo->getForUserPaginated($user->id, 'Pencarian Khusus');

        $this->assertCount(1, $paginated->items());
    }

    public function test_post_service_slug_collision_and_delete_cover(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        /** @var PostService $service */
        $service = app(PostService::class);

        // Generate first post
        $post1 = $service->createPost($user, [
            'title' => 'Judul Sama',
            'category' => 'Teknologi',
            'content' => 'Konten 1',
        ]);

        // Generate second post with same title to trigger while loop in slug generator
        $post2 = $service->createPost($user, [
            'title' => 'Judul Sama',
            'category' => 'Teknologi',
            'content' => 'Konten 2',
        ]);

        $this->assertNotEquals($post1->slug, $post2->slug);
        $this->assertStringContainsString('judul-sama-1', $post2->slug);

        // Upload first cover
        $file1 = UploadedFile::fake()->image('test_cover1.jpg');
        $service->uploadCover($post1, $file1);
        $this->assertNotNull($post1->fresh()->cover_image_path);

        // Upload second cover to trigger deletion of existing cover (line 93)
        $file2 = UploadedFile::fake()->image('test_cover2.jpg');
        $service->uploadCover($post1, $file2);
        $this->assertNotNull($post1->fresh()->cover_image_path);

        // Delete cover
        $service->deleteCover($post1);
        $this->assertNull($post1->fresh()->cover_image_path);
    }

    public function test_post_excel_service_edge_cases(): void
    {
        $user = User::factory()->create();
        /** @var PostExcelService $excelService */
        $excelService = app(PostExcelService::class);

        // 1. Empty spreadsheet
        $emptySheet = new Spreadsheet;
        $tempEmpty = tempnam(sys_get_temp_dir(), 'empty_').'.xlsx';
        (new Xlsx($emptySheet))->save($tempEmpty);

        $emptyFile = new UploadedFile($tempEmpty, 'empty.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', null, true);
        $resEmpty = $excelService->import($user, $emptyFile);

        $this->assertSame(0, $resEmpty['imported']);
        $this->assertNotEmpty($resEmpty['errors']);
        @unlink($tempEmpty);

        // 2. Spreadsheet with missing required fields (empty title or content) & invalid category
        $spreadsheet = new Spreadsheet;
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setCellValue('A1', 'Title');
        $sheet->setCellValue('B1', 'Content');
        $sheet->setCellValue('C1', 'Category');

        $sheet->setCellValue('A2', 'Artikel Kategori Asing');
        $sheet->setCellValue('B2', 'Konten artikel kategori tidak dikenal');
        $sheet->setCellValue('C2', 'KategoriTidakValid');

        $sheet->setCellValue('A3', '');
        $sheet->setCellValue('B3', 'Konten Saja');

        $tempPath = tempnam(sys_get_temp_dir(), 'cases_').'.xlsx';
        (new Xlsx($spreadsheet))->save($tempPath);

        $file = new UploadedFile($tempPath, 'cases.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', null, true);
        $res = $excelService->import($user, $file);

        $this->assertSame(1, $res['imported']);
        $this->assertSame(1, $res['failed']);
        @unlink($tempPath);

        // Check fallback to 'Umum'
        $importedPost = Post::where('title', 'Artikel Kategori Asing')->first();
        $this->assertNotNull($importedPost);
        $this->assertSame('Umum', $importedPost->category->value);

        // 3. Fallback header columns (lines 97-100) & Slug collision on import (lines 129-130)
        // Create an existing post with the same title
        Post::factory()->create(['title' => 'Judul Standar Kolom', 'slug' => 'judul-standar-kolom']);

        $fallbackSpreadsheet = new Spreadsheet;
        $fbSheet = $fallbackSpreadsheet->getActiveSheet();
        // Headers without 'judul' or 'content'
        $fbSheet->setCellValue('A1', 'Col0');
        $fbSheet->setCellValue('B1', 'Col1');
        $fbSheet->setCellValue('C1', 'Col2');
        $fbSheet->setCellValue('D1', 'Col3');
        $fbSheet->setCellValue('E1', 'Col4');
        $fbSheet->setCellValue('F1', 'Col5');
        $fbSheet->setCellValue('G1', 'Col6');

        // Row 2 data using indices 2 (title), 4 (category), 5 (excerpt), 6 (content)
        $fbSheet->setCellValue('A2', '101');
        $fbSheet->setCellValue('B2', 'Penulis A');
        $fbSheet->setCellValue('C2', 'Judul Standar Kolom');
        $fbSheet->setCellValue('D2', 'Extra');
        $fbSheet->setCellValue('E2', 'Bisnis');
        $fbSheet->setCellValue('F2', 'Ringkasan Eksekutif');
        $fbSheet->setCellValue('G2', '# Konten Lengkap');

        $tempFallback = tempnam(sys_get_temp_dir(), 'fallback_').'.xlsx';
        (new Xlsx($fallbackSpreadsheet))->save($tempFallback);

        $fbFile = new UploadedFile($tempFallback, 'fallback.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', null, true);
        $resFb = $excelService->import($user, $fbFile);

        $this->assertSame(1, $resFb['imported']);
        $importedCollision = Post::where('slug', 'judul-standar-kolom-1')->first();
        $this->assertNotNull($importedCollision);
        @unlink($tempFallback);

        // 4. Test export stream download callback (lines 59-60)
        $exportResponse = $excelService->export(Post::all(), 'test-export.xlsx');
        ob_start();
        $exportResponse->sendContent();
        $content = ob_get_clean();
        $this->assertNotEmpty($content);
    }

    public function test_post_controller_import_failed_branches(): void
    {
        $member = User::factory()->create(['role' => 'Member']);

        // Empty file triggering error flash
        $emptySheet = new Spreadsheet;
        $tempPath = tempnam(sys_get_temp_dir(), 'ctrl_').'.xlsx';
        (new Xlsx($emptySheet))->save($tempPath);

        $file = new UploadedFile($tempPath, 'empty.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', null, true);

        $response = $this->actingAs($member)->post('/dashboard/posts/import', [
            'file' => $file,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('error');
        @unlink($tempPath);

        // Mixed import (1 success, 1 failed line) to cover line 154
        $mixedSheet = new Spreadsheet;
        $mSheet = $mixedSheet->getActiveSheet();
        $mSheet->setCellValue('A1', 'Judul');
        $mSheet->setCellValue('B1', 'Konten');
        $mSheet->setCellValue('A2', 'Judul Sukses');
        $mSheet->setCellValue('B2', 'Konten Sukses');
        $mSheet->setCellValue('A3', ''); // Empty title
        $mSheet->setCellValue('B3', 'Konten Tanpa Judul');

        $tempMixed = tempnam(sys_get_temp_dir(), 'mixed_').'.xlsx';
        (new Xlsx($mixedSheet))->save($tempMixed);

        $mixedFile = new UploadedFile($tempMixed, 'mixed.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', null, true);

        $mixedResponse = $this->actingAs($member)->post('/dashboard/posts/import', [
            'file' => $mixedFile,
        ]);

        $mixedResponse->assertRedirect();
        $mixedResponse->assertSessionHas('success', fn ($msg) => str_contains($msg, 'dilewati karena format tidak lengkap'));
        @unlink($tempMixed);
    }

    public function test_middleware_direct_calls(): void
    {
        // EnsureRole unauthenticated direct call
        $roleMiddleware = new EnsureRole;
        $reqNoUser = Request::create('/test');
        $redirectResponse = $roleMiddleware->handle($reqNoUser, fn () => new Response, 'Admin');
        $this->assertTrue($redirectResponse->isRedirect());

        // EnsurePostOwnership with string/numeric route parameter via temporary route
        Route::middleware(['web', EnsurePostOwnership::class])->get('/_test_ownership/{post}', function () {
            return response('OK');
        });

        $owner = User::factory()->create();
        $other = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $owner->id]);

        $this->actingAs($owner)->get("/_test_ownership/{$post->id}")->assertOk();
        $this->actingAs($other)->get("/_test_ownership/{$post->id}")->assertForbidden();
    }

    public function test_openai_generator_invalid_json_fallback(): void
    {
        Http::fake([
            'https://api.openai.com/v1/chat/completions' => Http::response([
                'choices' => [
                    [
                        'message' => [
                            'content' => 'Bukan JSON valid',
                        ],
                    ],
                ],
            ], 200),
        ]);

        config(['services.openai.api_key' => 'valid-mock-key']);

        $service = new OpenAiPostGeneratorService;
        $results = $service->generateArticles('Topik Invalid JSON', 'Teknologi', 1);

        $this->assertCount(1, $results);
        $this->assertStringContainsString('Topik Invalid JSON', $results[0]->title);
    }

    public function test_openai_generator_exception_catch_block(): void
    {
        Http::fake([
            'https://api.openai.com/v1/chat/completions' => function () {
                throw new \RuntimeException('Simulated connection failure');
            },
        ]);

        config(['services.openai.api_key' => 'valid-mock-key']);

        $service = new OpenAiPostGeneratorService;
        $results = $service->generateArticles('Topik Error Catch', 'Teknologi', 1);

        $this->assertCount(1, $results);
        $this->assertStringContainsString('Topik Error Catch', $results[0]->title);
    }
}
