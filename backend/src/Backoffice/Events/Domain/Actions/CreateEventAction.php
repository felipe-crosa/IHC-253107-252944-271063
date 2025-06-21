<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\Domain\Actions;

use IHC\Backoffice\Events\Domain\DomainTransferObjects\CreateEventDto;
use IHC\Backoffice\Events\Domain\Enums\ParticipationStatus;
use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Events\Domain\Models\Participant;
use IHC\Backoffice\Groups\Domain\Models\Group;
use IHC\Backoffice\Users\Domain\Models\User;
use IHC\Notifications\Domain\Models\Notification;

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

        $groupMembers = Group::find($eventDto->groupId)->users;

        $event->pendingAttendees()->attach(
            $groupMembers->pluck('id'),
            ['status' => ParticipationStatus::PENDING]
        );

        Participant::where('event_id', $event->id)
            ->whereIn('user_id', $groupMembers->pluck('id'))
            ->update(['status' => ParticipationStatus::ACCEPTED]);

        $event->load([
            'cancelledAttendees',
            'pendingAttendees',
            'confirmedAttendees',
            'category',
            'messages.sender',
            'images.user',
            'polls.options'
        ]);

        $groupMembers->each(function (User $attendee) use ($event) {
            if ($attendee->id === $event->created_by) return;
            Notification::create([
                'user_id' => $attendee->id,
                'type' =>  'event_created',
                'title' => 'New Event Created',
                'description' => "A new event has been created: {$event->title}.",
            ]);
        });

        return $event;
    }
}
