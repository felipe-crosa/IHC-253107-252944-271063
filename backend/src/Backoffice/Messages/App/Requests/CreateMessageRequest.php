<?php

declare(strict_types=1);

namespace IHC\Backoffice\Messages\App\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateMessageRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'content' => 'required|string|max:500',
        ];
    }

    public function content(): string
    {
        return (string) $this->string('content');
    }
}
