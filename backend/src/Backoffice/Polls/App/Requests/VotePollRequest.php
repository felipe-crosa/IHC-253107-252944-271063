<?php

declare(strict_types=1);

namespace IHC\Backoffice\Polls\App\Requests;

use IHC\Backoffice\Polls\Domain\DataTransferObjects\CreatePollDto;
use IHC\Backoffice\Polls\Domain\Models\Poll;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VotePollRequest extends FormRequest
{
    public function rules(): array
    {
        /** @var Poll $poll */
        $poll = $this->route('poll');
        return [
            'option_id' => ['required',Rule::exists('options', 'id')->where('poll_id', $poll->id)],
        ];
    }
}
