<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\App\Controllers;

use IHC\Backoffice\Events\App\Resources\EventResource;
use IHC\Backoffice\Events\Domain\Models\Event;
use Illuminate\Http\JsonResponse;

class GetEventController {
    public function __invoke(Event $event)
    {
        $event->load([
            'cancelledAttendees',
            'pendingAttendees',
            'confirmedAttendees',
            'category',
            'messages.sender',
            'images.user',
        ]);
        return EventResource::make($event)
            ->response()
            ->setStatusCode(JsonResponse::HTTP_OK);
    }
}
