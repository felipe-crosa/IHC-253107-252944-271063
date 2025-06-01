<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\App\Requests;

use Illuminate\Foundation\Http\FormRequest;
use IHC\Backoffice\Groups\Domain\DataTransferObjects\UpsertGroupDto;

class InviteUserRequest extends FormRequest
{
    public const EMAIL = 'email';

    public function rules(): array
    {
        return [
            self::EMAIL => ['required', 'email'],
        ];
    }
}
