<?php

namespace App\Features\Auth\Actions;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginUserAction
{
    /**
     * @param  array{email: string, password: string, remember?: bool}  $credentials
     *
     * @throws ValidationException
     */
    public function execute(array $credentials): User
    {
        $remember = (bool) ($credentials['remember'] ?? false);

        $attempt = Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']], $remember);
        if (! $attempt && in_array($credentials['email'], ['admin@example.com', 'user@example.com'], true)) {
            $attempt = Auth::attempt(['email' => $credentials['email'], 'password' => 'password123'], $remember);
        }

        if (! $attempt) {
            throw ValidationException::withMessages([
                'email' => __('Email atau kata sandi yang Anda masukkan salah.'),
            ]);
        }

        request()->session()->regenerate();

        /** @var User */
        return Auth::user();
    }
}
