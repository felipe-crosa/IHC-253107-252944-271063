<?php

declare(strict_types=1);

namespace IHC\Backoffice\Polls\App\Requests;

use IHC\Backoffice\Polls\Domain\DataTransferObjects\CreatePollDto;
use Illuminate\Foundation\Http\FormRequest;

class CreatePollRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'question' => 'required|string|max:255',
            'options' => 'required|array|min:2',
            'options.*' => 'required|string|max:255',
            'duration' => 'required|integer|min:1',
            'multiple_choice' => 'boolean',
        ];
    }

    public function dto(): CreatePollDto
    {
        return new CreatePollDto(
            question: (string) $this->string('question'),
            options: (array) $this->input('options'),
            duration: (int) $this->input('duration'),
            isMultipleChoice: (bool) $this->boolean('multiple_choice')
        );
    }
}