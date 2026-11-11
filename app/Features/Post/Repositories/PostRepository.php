<?php

namespace App\Features\Post\Repositories;

use App\Features\Post\Contracts\PostRepositoryInterface;
use App\Features\Post\Models\Post;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class PostRepository implements PostRepositoryInterface
{
    public function getPublishedPaginated(?string $search = null, ?string $category = null, int $perPage = 9): LengthAwarePaginator
    {
        return Post::query()
            ->with('user:id,name')
            ->where('is_published', true)
            ->when($search, function (Builder $query, string $search) {
                $query->where(function (Builder $q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->when($category, function (Builder $query, string $category) {
                $query->where('category', $category);
            })
            ->latest('published_at')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function findPublishedBySlug(string $slug): ?Post
    {
        return Post::query()
            ->with('user:id,name')
            ->where('is_published', true)
            ->where('slug', $slug)
            ->first();
    }

    public function getForUserPaginated(int $userId, ?string $search = null, int $perPage = 10): LengthAwarePaginator
    {
        return Post::query()
            ->where('user_id', $userId)
            ->when($search, function (Builder $query, string $search) {
                $query->where(function (Builder $q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%");
                });
            })
            ->latest('id')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function getStatsForUser(int $userId): array
    {
        $total = Post::where('user_id', $userId)->count();
        $published = Post::where('user_id', $userId)->where('is_published', true)->count();

        return [
            'total_posts' => $total,
            'total_published' => $published,
            'total_draft' => $total - $published,
        ];
    }

    public function create(array $data): Post
    {
        return Post::create($data);
    }

    public function update(Post $post, array $data): bool
    {
        return $post->update($data);
    }

    public function delete(Post $post): bool
    {
        return $post->delete();
    }

    public function getAllForExport(?int $userId = null): Collection
    {
        return Post::query()
            ->with('user:id,name,email')
            ->when($userId, fn (Builder $q) => $q->where('user_id', $userId))
            ->latest('id')
            ->get();
    }

    public function getAllPaginatedForAdmin(?int $userId = null, ?string $search = null, int $perPage = 15): LengthAwarePaginator
    {
        return Post::query()
            ->with('user:id,name,email')
            ->when($userId, fn (Builder $q) => $q->where('user_id', $userId))
            ->when($search, function (Builder $query, string $search) {
                $query->where(function (Builder $q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhereHas('user', function (Builder $userQuery) use ($search) {
                            $userQuery->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                        });
                });
            })
            ->latest('id')
            ->paginate($perPage)
            ->withQueryString();
    }
}
