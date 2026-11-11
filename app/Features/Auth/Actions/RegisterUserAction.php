<?php

namespace App\Features\Auth\Actions;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class RegisterUserAction
{
    /**
     * @param  array{name: string, email: string, password: string}  $data
     *
     * @throws ValidationException
     */
    public function execute(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'Member',
        ]);
    }
}
