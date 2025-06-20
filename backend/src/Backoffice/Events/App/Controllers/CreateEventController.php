<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\App\Controllers;

use IHC\Backoffice\Events\App\Requests\CreateEventRequest;
use IHC\Backoffice\Events\App\Resources\EventResource;
use IHC\Backoffice\Events\Domain\Actions\CreateEventAction;
use Illuminate\Http\JsonResponse;

class CreateEventController {
    public function __invoke(CreateEventRequest $request, CreateEventAction $action)
    {
        $event = $action->execute($request->user(), $request->toDto());

        return EventResource::make($event)
            ->response()
            ->setStatusCode(JsonResponse::HTTP_CREATED);
    }
}
