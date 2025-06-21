<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\App\Controllers;

use IHC\Backoffice\Events\App\Resources\EventResource;
use IHC\Backoffice\Groups\Domain\Actions\ListGroupsAction;
use IHC\Backoffice\Groups\Domain\Models\Group;
use Illuminate\Http\Request;

class ListGroupEventsController
{
    public function __invoke(Group $group)
    {
        $events = $group->events()->with([
            'cancelledAttendees',
            'pendingAttendees',
            'confirmedAttendees',
            'category',
            'messages.sender',
            'images.user',
            'polls.options'
        ])->get();

        EventResource::collection($events)
            ->response()
            ->setStatusCode(200);
    }
}
