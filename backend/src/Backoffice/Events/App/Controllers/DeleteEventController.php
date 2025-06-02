<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\App\Controllers;

use IHC\Backoffice\Events\Domain\Actions\DeleteEventAction;
use IHC\Backoffice\Events\Domain\Models\Event;

class DeleteEventController {
    public function __invoke(Event $event, DeleteEventAction $action)
    {
        $action->execute($event);

        return response()->json([
            'message' => 'Event deleted successfully'
        ], 200);
    }
}
