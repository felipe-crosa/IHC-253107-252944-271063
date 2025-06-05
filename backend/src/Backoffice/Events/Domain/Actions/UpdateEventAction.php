<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\Domain\Actions;

use IHC\Backoffice\Events\Domain\DomainTransferObjects\UpdateEventDto;
use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Users\Domain\Models\User;

class UpdateEventAction
{
    public function execute(Event $event, UpdateEventDto $eventDto): Event
    {
        $event->title = $eventDto->title;
        $event->description = $eventDto->description;
        $event->location = $eventDto->location;
        $event->start_at = $eventDto->startAt;
        $event->category_id = $eventDto->categoryId;

        $event->save();

        $event->load([
            'cancelledAttendees',
            'pendingAttendees',
            'confirmedAttendees',
            'category',
            'messages.sender',
            'images.user',
        ]);

        return $event;
    }
}
