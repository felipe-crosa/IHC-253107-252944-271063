<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\App\Resources;

use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Images\App\Resources\ImageResource;
use IHC\Backoffice\Messages\App\Resources\MessageResource;
use IHC\Backoffice\Users\App\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Event
 */
class EventResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'start_at' => $this->start_at,
            'location' => $this->location,
            'category' => $this->whenLoaded('category', $this->category),
            'group_id' => $this->group_id,
            'confirmed_attendees' =>  $this->whenLoaded('confirmedAttendees', fn () => UserResource::collection($this->confirmedAttendees)),
            'pending_attendees' => $this->whenLoaded('pendingAttendees', fn () => UserResource::collection($this->pendingAttendees)),
            'cancelled_attendees' => $this->whenLoaded('cancelledAttendees', fn () => UserResource::collection($this->cancelledAttendees)),
            'messages' => $this->whenLoaded('messages', fn () => MessageResource::collection($this->messages)),
            'images' => $this->whenLoaded('images', fn () => ImageResource::collection($this->images))
        ];
    }
}
