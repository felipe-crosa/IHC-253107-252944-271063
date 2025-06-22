<?php

declare(strict_types=1);

namespace IHC\Backoffice\Polls\App\Resources;

use IHC\Backoffice\Polls\Domain\Models\Poll;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use IHC\Backoffice\Users\Domain\Models\User;

/**
 * @mixin Poll
 */
class PollResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'question' => $this->question,
            'options' =>  OptionResource::collection($this->whenLoaded('options')),
            'duration' => $this->hours_to_vote,
            'multiple_choice' => $this->multiple_answers,
            'is_active' => !$this->isExpired(),
        ];
    }
}
