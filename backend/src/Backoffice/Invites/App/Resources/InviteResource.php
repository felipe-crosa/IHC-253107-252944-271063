<?php

declare(strict_types=1);

namespace IHC\Backoffice\Invites\App\Resources;

use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Groups\App\Resources\GroupResource;
use IHC\Backoffice\Groups\Domain\Models\Group;
use IHC\Backoffice\Images\Domain\Models\Image;
use IHC\Backoffice\Messages\Domain\Models\Message;
use IHC\Backoffice\Users\App\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InviteResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => $this->whenLoaded('user', fn () => new UserResource($this->user)),
            'group' => $this->whenLoaded('group', fn () => new GroupResource($this->group)),
        ];
    }
}
