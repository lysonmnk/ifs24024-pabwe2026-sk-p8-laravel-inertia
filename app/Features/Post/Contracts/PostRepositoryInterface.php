<?php

namespace App\Features\Post\Contracts;

use App\Features\Post\Models\Post;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface PostRepositoryInterface
{
    /**
     * Get paginated published posts for public view.
     */
    public function getPublishedPaginated(?string $search = null, ?string $category = null, int $perPage = 9): LengthAwarePaginator;

    /**
     * Find a published post by slug.
     */
    public function findPublishedBySlug(string $slug): ?Post;

    /**
     * Get paginated posts for a specific member.
     */
    public function getForUserPaginated(int $userId, ?string $search = null, int $perPage = 10): LengthAwarePaginator;

    /**
     * Get posts statistics for a member.
     *
     * @return array{total_posts: int, total_published: int, total_draft: int}
     */
    public function getStatsForUser(int $userId): array;

    /**
     * Create a new post.
     *
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): Post;

    /**
     * Update an existing post.
     *
     * @param  array<string, mixed>  $data
     */
    public function update(Post $post, array $data): bool;

    /**
     * Delete a post.
     */
    public function delete(Post $post): bool;

    /**
     * Get all posts for export (admin or user).
     */
    public function getAllForExport(?int $userId = null): Collection;

    /**
     * Get paginated posts for admin monitoring.
     */
    public function getAllPaginatedForAdmin(?int $userId = null, ?string $search = null, int $perPage = 15): LengthAwarePaginator;
}

