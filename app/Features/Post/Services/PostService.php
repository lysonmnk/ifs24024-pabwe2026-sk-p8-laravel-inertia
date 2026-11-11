<?php

namespace App\Features\Post\Services;

use App\Features\Post\Contracts\PostRepositoryInterface;
use App\Features\Post\Models\Post;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostService
{
    public function __construct(
        protected PostRepositoryInterface $postRepository
    ) {}

    /**
     * @param  array{title: string, category: string, excerpt?: ?string, content: string, is_published?: bool}  $data
     */
    public function createPost(User $user, array $data): Post
    {
        $slug = $this->generateUniqueSlug($data['title']);
        $isPublished = (bool) ($data['is_published'] ?? false);

        return $this->postRepository->create([
            'user_id' => $user->id,
            'title' => $data['title'],
            'slug' => $slug,
            'category' => $data['category'],
            'excerpt' => $data['excerpt'] ?? null,
            'content' => $data['content'],
            'cover_image_path' => null,
            'is_published' => $isPublished,
            'published_at' => $isPublished ? now() : null,
        ]);
    }

    /**
     * @param  array{title?: string, category?: string, excerpt?: ?string, content?: string, is_published?: bool}  $data
     */
    public function updatePost(Post $post, array $data): bool
    {
        $updateData = [];

        if (isset($data['title']) && $data['title'] !== $post->title) {
            $updateData['title'] = $data['title'];
            $updateData['slug'] = $this->generateUniqueSlug($data['title'], $post->id);
        }

        if (isset($data['category'])) {
            $updateData['category'] = $data['category'];
        }

        if (array_key_exists('excerpt', $data)) {
            $updateData['excerpt'] = $data['excerpt'];
        }

        if (isset($data['content'])) {
            $updateData['content'] = $data['content'];
        }

        if (isset($data['is_published'])) {
            $isPublished = (bool) $data['is_published'];
            $updateData['is_published'] = $isPublished;

            if ($isPublished && ! $post->published_at) {
                $updateData['published_at'] = now();
            }
        }

        return $this->postRepository->update($post, $updateData);
    }

    public function togglePublish(Post $post): bool
    {
        $newStatus = ! $post->is_published;
        $data = [
            'is_published' => $newStatus,
        ];

        if ($newStatus && ! $post->published_at) {
            $data['published_at'] = now();
        }

        return $this->postRepository->update($post, $data);
    }

    public function uploadCover(Post $post, UploadedFile $file): string
    {
        // Remove existing cover if exists
        if ($post->cover_image_path) {
            Storage::disk('public')->delete($post->cover_image_path);
        }

        $path = $file->store('covers', 'public');
        $this->postRepository->update($post, ['cover_image_path' => $path]);

        return $path;
    }

    public function deleteCover(Post $post): bool
    {
        if ($post->cover_image_path) {
            Storage::disk('public')->delete($post->cover_image_path);

            return $this->postRepository->update($post, ['cover_image_path' => null]);
        }

        return true;
    }

    public function deletePost(Post $post): bool
    {
        $this->deleteCover($post);

        return $this->postRepository->delete($post);
    }

    public function generateUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $counter = 1;

        while (Post::where('slug', $slug)
            ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}
