<?php

use App\Features\Admin\Controllers\AdminUserController;
use App\Features\Auth\Controllers\AuthController;
use App\Features\Post\Controllers\AdminPostController;
use App\Features\Post\Controllers\PostController;
use App\Features\Post\Controllers\PublicPostController;
use App\Features\Profile\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public Routes (Guest & Reader)
Route::get('/', [PublicPostController::class, 'index'])->name('home');
Route::get('/articles', [PublicPostController::class, 'index'])->name('articles.index');
Route::get('/articles/{slug}', [PublicPostController::class, 'show'])->name('articles.show');

// Authentication Routes (Guest only)
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'createLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'createRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

// Authenticated Routes
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password');

    // Member Dashboard Routes
    Route::middleware('role:Member')->prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
        Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
        Route::get('/posts/export', [PostController::class, 'export'])->name('posts.export');
        Route::post('/posts/import', [PostController::class, 'import'])->name('posts.import');
        Route::post('/posts/ai-generate', [PostController::class, 'generateAi'])->name('posts.ai.generate');
        Route::post('/posts/ai-save', [PostController::class, 'saveAi'])->name('posts.ai.save');

        Route::middleware('post.owner')->group(function () {
            Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');
            Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
            Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
            Route::patch('/posts/{post}/publish', [PostController::class, 'togglePublish'])->name('posts.publish');
            Route::post('/posts/{post}/cover', [PostController::class, 'uploadCover'])->name('posts.cover.upload');
            Route::delete('/posts/{post}/cover', [PostController::class, 'deleteCover'])->name('posts.cover.delete');
        });
    });

    // Admin Monitoring Routes
    Route::middleware('role:Admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
        Route::get('/posts', [AdminPostController::class, 'index'])->name('posts.index');
        Route::get('/posts/export', [AdminPostController::class, 'export'])->name('posts.export');
        Route::get('/users/{user}/posts', [AdminPostController::class, 'userPosts'])->name('users.posts');
        Route::get('/users/{user}/posts/export', [AdminPostController::class, 'exportUserPosts'])->name('users.posts.export');
    });
});
