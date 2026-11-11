<?php

namespace App\Features\Post\Controllers;

use App\Features\Post\Contracts\PostRepositoryInterface;
use App\Features\Post\Services\PostExcelService;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AdminPostController extends Controller
{
    public function __construct(
        protected PostRepositoryInterface $postRepository,
        protected PostExcelService $excelService,
    ) {}

    public function index(Request $request): Response
    {
        $search = $request->query('q');
        $posts = $this->postRepository->getAllPaginatedForAdmin(null, $search, 15);

        return Inertia::render('Admin/PostList', [
            'posts' => $posts,
            'filters' => [
                'q' => $search ?? '',
            ],
        ]);
    }

    public function export(): StreamedResponse
    {
        $posts = $this->postRepository->getAllForExport();

        return $this->excelService->export($posts, 'semua-artikel-sistem-'.now()->format('Ymd-His').'.xlsx');
    }

    public function userPosts(User $user, Request $request): Response
    {
        $search = $request->query('q');
        $posts = $this->postRepository->getAllPaginatedForAdmin($user->id, $search, 15);

        return Inertia::render('Admin/UserPostList', [
            'targetUser' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'posts' => $posts,
            'filters' => [
                'q' => $search ?? '',
            ],
        ]);
    }

    public function exportUserPosts(User $user): StreamedResponse
    {
        $posts = $this->postRepository->getAllForExport($user->id);

        return $this->excelService->export($posts, 'artikel-user-'.$user->id.'-'.now()->format('Ymd-His').'.xlsx');
    }
}
