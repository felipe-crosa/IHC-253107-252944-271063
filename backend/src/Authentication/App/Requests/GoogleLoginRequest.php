<?php

declare(strict_types=1);

namespace Lightit\Authentication\App\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GoogleLoginRequest extends FormRequest
{
    public const TOKEN = 'token';

    public function rules(): array
    {
        return [
            self::TOKEN => ['required'],
        ];
    }

    public function getToken(): string
    {
        return $this->string(self::TOKEN)->toString();
    }
}
