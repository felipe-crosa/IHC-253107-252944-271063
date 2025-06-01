<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\Domain\Actions;

use IHC\Backoffice\Events\Domain\DomainTransferObjects\CreateEventDto;
use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Users\Domain\Models\User;

class CreateEventAction
{
    public function execute(User $user, CreateEventDto $eventDto): Event
    {
        if(!$user->groups()->where('groups.id', $eventDto->groupId)->count()) {
            throw new \Exception("The user does not belong in the group");
        }

        $event = new Event();
        $event->title = $eventDto->title;
        $event->description = $eventDto->description;
        $event->created_by = $user->id;
        $event->location = $eventDto->location;
        $event->start_at = $eventDto->startAt;
        $event->category_id = $eventDto->categoryId;
        $event->group_id = $eventDto->groupId;

        $event->save();

        return $event;
    }
}
