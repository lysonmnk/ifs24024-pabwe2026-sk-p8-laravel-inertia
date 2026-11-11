<?php

namespace App\Features\Post\Controllers;

use App\Features\Post\Contracts\PostRepositoryInterface;
use App\Features\Post\Enums\PostCategory;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicPostController extends Controller
{
    public function __construct(
        protected PostRepositoryInterface $postRepository
    ) {}

    public function index(Request $request): Response
    {
        $search = $request->query('q');
        $category = $request->query('category');

        $articles = $this->postRepository->getPublishedPaginated($search, $category, 9);

        return Inertia::render('Public/PostIndex', [
            'articles' => $articles,
            'categories' => PostCategory::values(),
            'filters' => [
                'q' => $search ?? '',
                'category' => $category ?? '',
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $article = $this->postRepository->findPublishedBySlug($slug);

        if (! $article) {
            abort(404, 'Artikel tidak ditemukan atau belum dipublikasikan.');
        }

        return Inertia::render('Public/PostShow', [
            'article' => $article,
        ]);
    }
}
