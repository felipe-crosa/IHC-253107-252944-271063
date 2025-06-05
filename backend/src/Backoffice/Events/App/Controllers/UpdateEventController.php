<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\App\Controllers;


use IHC\Backoffice\Events\App\Requests\UpdateEventRequest;
use IHC\Backoffice\Events\App\Resources\EventResource;
use IHC\Backoffice\Events\Domain\Actions\UpdateEventAction;
use IHC\Backoffice\Events\Domain\Models\Event;
use Illuminate\Http\JsonResponse;

class UpdateEventController {
    public function __invoke(Event $event, UpdateEventRequest $request, UpdateEventAction $action)
    {
        $event = $action->execute($event, $request->toDto());

        return EventResource::make($event)
            ->response()
            ->setStatusCode(JsonResponse::HTTP_OK);
    }
}
