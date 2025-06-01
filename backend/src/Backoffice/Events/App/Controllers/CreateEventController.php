<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\App\Controllers;

use IHC\Backoffice\Events\App\Requests\CreateEventRequest;
use IHC\Backoffice\Events\Domain\Actions\CreateEventAction;

class CreateEventController {
    public function __invoke(CreateEventRequest $request, CreateEventAction $action)
    {
        $event = $action->execute($request->user(), $request->toDto());

        return response()->json($event, 200);
    }
}
