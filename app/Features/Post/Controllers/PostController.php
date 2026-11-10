<?php

namespace App\Features\Post\Controllers;

use App\Features\Ai\Contracts\AiClientInterface;
use App\Features\Post\Contracts\PostRepositoryInterface;
use App\Features\Post\Enums\PostCategory;
use App\Features\Post\Models\Post;
use App\Features\Post\Services\PostExcelService;
use App\Features\Post\Services\PostService;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PostController extends Controller
{
    public function __construct(
        protected PostRepositoryInterface $postRepository,
        protected PostService $postService,
        protected PostExcelService $excelService,
    ) {}

    public function index(Request $request): Response
    {
        $search = $request->query('q');
        $user = $request->user();

        $posts = $this->postRepository->getForUserPaginated($user->id, $search, 10);
        $stats = $this->postRepository->getStatsForUser($user->id);

        return Inertia::render('Post/Index', [
            'posts' => $posts,
            'stats' => $stats,
            'categories' => PostCategory::values(),
            'filters' => [
                'q' => $search ?? '',
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', Rule::in(PostCategory::values())],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'is_published' => ['nullable', 'boolean'],
        ], [
            'title.required' => 'Judul artikel wajib diisi.',
            'category.required' => 'Kategori artikel wajib dipilih.',
            'content.required' => 'Konten artikel wajib diisi.',
        ]);

        $this->postService->createPost($request->user(), $validated);

        return redirect()->route('dashboard.posts.index')->with('success', 'Artikel berhasil disimpan.');
    }

    public function show(Post $post): Response
    {
        return Inertia::render('Post/Show', [
            'post' => $post->load('user:id,name'),
        ]);
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', Rule::in(PostCategory::values())],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'is_published' => ['nullable', 'boolean'],
        ], [
            'title.required' => 'Judul artikel wajib diisi.',
            'category.required' => 'Kategori artikel wajib dipilih.',
            'content.required' => 'Konten artikel wajib diisi.',
        ]);

        $this->postService->updatePost($post, $validated);

        return redirect()->route('dashboard.posts.index')->with('success', 'Artikel berhasil diperbarui.');
    }

    public function destroy(Post $post): RedirectResponse
    {
        $this->postService->deletePost($post);

        return redirect()->route('dashboard.posts.index')->with('success', 'Artikel berhasil dihapus.');
    }

    public function togglePublish(Post $post): RedirectResponse
    {
        $this->postService->togglePublish($post);
        $message = $post->is_published ? 'Artikel berhasil dipublikasikan.' : 'Artikel ditarik kembali menjadi draf.';

        return back()->with('success', $message);
    }

    public function uploadCover(Request $request, Post $post): RedirectResponse
    {
        $request->validate([
            'cover' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ], [
            'cover.required' => 'Pilih berkas gambar sampul terlebih dahulu.',
            'cover.image' => 'Berkas harus berupa gambar.',
            'cover.mimes' => 'Format gambar yang didukung adalah JPEG, PNG, JPG, atau WEBP.',
            'cover.max' => 'Ukuran gambar maksimal 2MB.',
        ]);

        $this->postService->uploadCover($post, $request->file('cover'));

        return back()->with('success', 'Foto sampul berhasil diunggah.');
    }

    public function deleteCover(Post $post): RedirectResponse
    {
        $this->postService->deleteCover($post);

        return back()->with('success', 'Foto sampul berhasil dihapus.');
    }

    public function export(Request $request): StreamedResponse
    {
        $posts = $this->postRepository->getAllForExport($request->user()->id);

        return $this->excelService->export($posts, 'artikel-saya-'.now()->format('Ymd-His').'.xlsx');
    }

    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:xlsx,xls', 'max:10240'],
        ], [
            'file.required' => 'Pilih berkas Excel terlebih dahulu.',
            'file.mimes' => 'Format berkas harus berupa Excel (.xlsx atau .xls).',
            'file.max' => 'Ukuran berkas maksimal 10MB.',
        ]);

        $result = $this->excelService->import($request->user(), $request->file('file'));

        if ($result['imported'] === 0 && ! empty($result['errors'])) {
            return back()->with('error', 'Gagal mengimpor artikel: '.implode(' ', $result['errors']));
        }

        $message = "Berhasil mengimpor {$result['imported']} artikel.";
        if ($result['failed'] > 0) {
            $message .= " {$result['failed']} baris dilewati karena format tidak lengkap.";
        }

        return back()->with('success', $message);
    }

    public function generateAi(Request $request, AiClientInterface $aiClient): JsonResponse
    {
        $validated = $request->validate([
            'topic' => ['required', 'string', 'min:3', 'max:255'],
            'category' => ['required', Rule::in(PostCategory::values())],
            'count' => ['required', 'integer', 'min:1', 'max:5'],
        ], [
            'topic.required' => 'Topik artikel wajib diisi.',
            'category.required' => 'Kategori artikel wajib dipilih.',
            'count.required' => 'Jumlah artikel wajib ditentukan.',
            'count.min' => 'Jumlah artikel minimal 1.',
            'count.max' => 'Jumlah artikel maksimal 5.',
        ]);

        $articles = $aiClient->generateArticles(
            $validated['topic'],
            $validated['category'],
            (int) $validated['count']
        );

        return response()->json([
            'data' => array_map(fn ($item) => $item->toArray(), $articles),
        ]);
    }

    public function saveAi(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'posts' => ['required', 'array', 'min:1'],
            'posts.*.title' => ['required', 'string', 'max:255'],
            'posts.*.category' => ['required', Rule::in(PostCategory::values())],
            'posts.*.excerpt' => ['nullable', 'string'],
            'posts.*.content' => ['required', 'string'],
        ]);

        $count = 0;
        foreach ($validated['posts'] as $postData) {
            $this->postService->createPost($request->user(), [
                'title' => $postData['title'],
                'category' => $postData['category'],
                'excerpt' => $postData['excerpt'] ?? null,
                'content' => $postData['content'],
                'is_published' => false,
            ]);
            $count++;
        }

        return redirect()->route('dashboard.posts.index')->with('success', "Berhasil menyimpan {$count} artikel draf hasil AI.");
    }
}

