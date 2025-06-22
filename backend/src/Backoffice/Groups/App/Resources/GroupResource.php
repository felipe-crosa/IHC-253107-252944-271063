<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\App\Resources;

use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Groups\Domain\Models\Group;
use IHC\Backoffice\Images\Domain\Models\Image;
use IHC\Backoffice\Messages\Domain\Models\Message;
use IHC\Backoffice\Users\App\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Group
 */
class GroupResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'owner_id' => $this->owner_id,
            'users_count' => $this->users_count,
        ];
    }
}
