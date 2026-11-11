<?php

namespace App\Http\Middleware;

use App\Features\Post\Models\Post;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsurePostOwnership
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $post = $request->route('post');

        if (is_numeric($post) || is_string($post)) {
            $post = Post::find($post);
        }

        if ($post instanceof Post) {
            if (! $request->user() || $post->user_id !== $request->user()->id) {
                abort(403, 'Anda tidak memiliki hak akses atas artikel ini.');
            }
        }

        return $next($request);
    }
}
