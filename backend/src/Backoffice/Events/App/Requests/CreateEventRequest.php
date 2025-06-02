<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\App\Requests;

use DateTimeImmutable;
use IHC\Backoffice\Events\Domain\DomainTransferObjects\CreateEventDto;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use IHC\Backoffice\Users\Domain\DataTransferObjects\UserDto;
use IHC\Backoffice\Users\Domain\Models\User;

class CreateEventRequest extends FormRequest
{
    public const TITLE = 'title';

    public const DESCRIPTION = 'description';

    public const LOCATION = 'location';

    public const START_AT = 'start_at';

    public const CATEGORY_ID = 'category_id';

    public const GROUP_ID = 'group_id';

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            self::TITLE => ['required','string'],
            self::DESCRIPTION => ['required','string'],
            self::LOCATION => ['required','string'],
            self::START_AT => ['required', 'date'],
            self::CATEGORY_ID => ['required', Rule::exists('categories','id')],
            self::GROUP_ID => ['required', Rule::exists('groups','id')],
        ];
    }

    public function toDto(): CreateEventDto
    {
        return new CreateEventDto(
            title: (string) $this->string(self::TITLE),
            description: (string) $this->string(self::DESCRIPTION),
            location: (string) $this->string(self::LOCATION),
            startAt: new \DateTimeImmutable($this->input(self::START_AT)),
            groupId: (int) $this->integer(self::GROUP_ID),
            categoryId: (int) $this->integer(self::CATEGORY_ID),
        );
    }
}
