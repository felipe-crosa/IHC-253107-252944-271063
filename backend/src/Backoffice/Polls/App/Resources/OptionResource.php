<?php

declare(strict_types=1);

namespace IHC\Backoffice\Polls\App\Resources;

use IHC\Backoffice\Polls\Domain\Models\Option;
use IHC\Backoffice\Polls\Domain\Models\Poll;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use IHC\Backoffice\Users\Domain\Models\User;

/**
 * @mixin Option
 */
class OptionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $this->loadCount('votes');
        return [
            'id' => $this->id,
            'name' => $this->name,
            'poll_id' => $this->poll_id,
            'votes_count' => $this->votes_count,
            'voted' => $this->when(
                $request->user() instanceof User,
                $this->votes()->where('user_id', $request->user()->id)->exists()
            ),
        ];
    }
}
