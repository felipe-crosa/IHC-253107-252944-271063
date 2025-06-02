<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\Domain\Actions;

use IHC\Backoffice\Events\Domain\DomainTransferObjects\UpdateEventDto;
use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Users\Domain\Models\User;

class DeleteEventAction
{
    public function execute(Event $event): void
    {
        $event->delete();
    }
}
