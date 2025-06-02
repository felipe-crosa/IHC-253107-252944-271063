<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\App\Controllers;

use IHC\Backoffice\Events\Domain\Models\Event;

class GetEventController {
    public function __invoke(Event $event)
    {
        return response()->json($event, 200);
    }
}
