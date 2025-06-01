<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\Domain\Actions;

use IHC\Backoffice\Events\Domain\DomainTransferObjects\UpdateEventDto;
use IHC\Backoffice\Events\Domain\Enums\ParticipationStatus;
use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Events\Domain\Models\Participant;
use IHC\Backoffice\Users\Domain\Models\User;

class DecideEventParticipationAction
{
    public function execute(User $user, Event $event, bool $decision): void
    {
        Participant::query()
            ->where('user_id', $user->id)
            ->where('event_id', $event->id)
            ->update(['status' => $decision ? ParticipationStatus::ACCEPTED : ParticipationStatus::REJECTED]);
    }
}
