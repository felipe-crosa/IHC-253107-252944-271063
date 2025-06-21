<?php

declare(strict_types=1);

namespace IHC\Backoffice\Messages\Domain\Actions;

use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Messages\Domain\Models\Message;
use IHC\Backoffice\Users\Domain\Models\User;
use IHC\Notifications\Domain\Models\Notification;

class CreateMessageAction
{
    public function execute(User $user, Event $event, string $content): Message
    {
        $message = Message::create([
            'sender_id' => $user->id,
            'event_id' => $event->id,
            'content' => $content,
        ]);

        $event->confirmedAttendees->each(function (User $attendee) use ($message, $event) {
            if ($attendee->id === $message->sender_id) return;
            Notification::create([
                'user_id' => $attendee->id,
                'type' => 'message_uploaded',
                'title' => 'New Message Uploaded',
                'description' => "A new message has been uploaded for the event: {$event->title}.",
            ]);
        });


        return $message;
    }
}
