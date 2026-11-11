<?php

namespace App\Features\Admin\Controllers;

use App\Features\Admin\Services\AdminUserService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function __construct(
        protected AdminUserService $adminUserService
    ) {}

    public function index(Request $request): Response
    {
        $search = $request->query('q');
        $users = $this->adminUserService->getPaginatedUsers($search);

        return Inertia::render('Admin/UserList', [
            'users' => $users,
            'filters' => [
                'q' => $search ?? '',
            ],
        ]);
    }
}
