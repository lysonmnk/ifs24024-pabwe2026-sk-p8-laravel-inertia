<?php

namespace App\Features\Profile\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ProfileService
{
    /**
     * @param  array{name: string, email: string}  $data
     */
    public function updateProfile(User $user, array $data): bool
    {
        return $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
        ]);
    }

    /**
     * @param  array{current_password: string, password: string}  $data
     *
     * @throws ValidationException
     */
    public function updatePassword(User $user, array $data): bool
    {
        if (! Hash::check($data['current_password'], $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => 'Kata sandi saat ini tidak sesuai.',
            ]);
        }

        return $user->update([
            'password' => Hash::make($data['password']),
        ]);
    }
}

