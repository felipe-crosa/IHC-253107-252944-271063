<?php

declare(strict_types=1);

namespace IHC\Backoffice\Messages\Domain\Actions;

use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Messages\Domain\Models\Message;
use IHC\Backoffice\Users\Domain\Models\User;

class CreateMessageAction
{
    public function execute(User $user, Event $event, string $content): Message
    {
        return Message::create([
            'sender_id' => $user->id,
            'event_id' => $event->id,
            'content' => $content,
        ]);
    }
}
