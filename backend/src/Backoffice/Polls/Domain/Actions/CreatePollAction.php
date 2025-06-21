<?php

declare(strict_types=1);

namespace IHC\Backoffice\Polls\Domain\Actions;

use Event;
use IHC\Backoffice\Events\Domain\Models\Event as ModelsEvent;
use IHC\Backoffice\Polls\Domain\DataTransferObjects\CreatePollDto;
use IHC\Backoffice\Polls\Domain\Models\Poll;
use IHC\Backoffice\Users\Domain\Models\User;

class CreatePollAction
{
    public function execute(
        User $user,
        ModelsEvent $event,
        CreatePollDto $createPollDto
    ): Poll {
        $poll = Poll::create([
            'question' => $createPollDto->question,
            'hours_to_vote' => $createPollDto->duration,
            'event_id' => $event->id,
            'user_id' => $user->id,
            'multiple_answers' => $createPollDto->isMultipleChoice,
        ]);

        $poll->options()->createMany(
            array_map(
                fn($option) => ['name' => $option],
                $createPollDto->options
            )
        );

        $poll->load('options');
        return $poll;
    }
}