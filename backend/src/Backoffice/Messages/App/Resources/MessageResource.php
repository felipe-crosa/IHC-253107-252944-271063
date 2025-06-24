<?php

declare(strict_types=1);

namespace IHC\Backoffice\Messages\App\Resources;

use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Messages\Domain\Models\Message;
use IHC\Backoffice\Users\App\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Message
 */
class MessageResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'sender' => $this->whenLoaded('sender', fn () => new UserResource($this->sender)),
            'content' => $this->content,
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
