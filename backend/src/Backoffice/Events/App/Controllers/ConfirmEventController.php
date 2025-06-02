<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\App\Controllers;

use IHC\Backoffice\Events\Domain\Actions\DecideEventParticipationAction;
use IHC\Backoffice\Events\Domain\Actions\DeleteEventAction;
use IHC\Backoffice\Events\Domain\Models\Event;
use Request;

class ConfirmEventController {
    public function __invoke(Request $request, Event $event, DecideEventParticipationAction $action)
    {
        $action->execute($request->user(), $event, true);

        return response()->json([
            'message' => 'Event confirmed successfully'
        ], 200);
    }
}
