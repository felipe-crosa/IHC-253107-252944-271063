<?php

declare(strict_types=1);

namespace IHC\Backoffice\Images\App\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;

class CreateImageRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'file' => 'required|file',
        ];
    }

    public function uploadedFile(): UploadedFile
    {
        return $this->file('file');
    }
}
