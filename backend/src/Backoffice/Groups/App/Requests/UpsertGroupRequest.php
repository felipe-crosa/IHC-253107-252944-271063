<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\App\Requests;

use Illuminate\Foundation\Http\FormRequest;
use IHC\Backoffice\Groups\Domain\DataTransferObjects\UpsertGroupDto;

class UpsertGroupRequest extends FormRequest
{
    public const NAME = 'name';

    public const DESCRIPTION = 'description';

    public function rules(): array
    {
        return [
            self::NAME => ['required'],
            self::DESCRIPTION => ['required'],
        ];
    }

    public function toDto(): UpsertGroupDto
    {
        return new UpsertGroupDto(
            name: (string) $this->string(self::NAME),
            description: (string) $this->string(self::DESCRIPTION),
        );
    }
}
