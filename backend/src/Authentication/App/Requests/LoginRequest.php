<?php

declare(strict_types=1);

namespace IHC\Authentication\App\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public const EMAIL = 'email';

    public const PASSWORD = 'password';

    public function rules(): array
    {
        return [
            self::EMAIL => ['required', 'email:strict'],
            self::PASSWORD => ['required'],
        ];
    }
}
