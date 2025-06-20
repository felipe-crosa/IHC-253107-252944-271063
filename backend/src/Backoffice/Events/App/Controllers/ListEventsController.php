<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\App\Controllers;

use IHC\Backoffice\Events\App\Resources\EventResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ListEventsController {
    public function __invoke(Request $request)
    {
        $user = $request->user();

        $events = $user->acceptedEvents()->with([
            'cancelledAttendees',
            'pendingAttendees',
            'confirmedAttendees',
            'category',
            'messages.sender',
            'images.user',
        ])->get();

        return EventResource::collection($events)
            ->response()
            ->setStatusCode(JsonResponse::HTTP_OK);
    }
}
