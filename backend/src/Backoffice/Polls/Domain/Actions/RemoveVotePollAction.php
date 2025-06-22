<?php

declare(strict_types=1);

namespace IHC\Backoffice\Polls\Domain\Actions;

use Event;
use IHC\Backoffice\Events\Domain\Models\Event as ModelsEvent;
use IHC\Backoffice\Polls\Domain\DataTransferObjects\CreatePollDto;
use IHC\Backoffice\Polls\Domain\Models\Poll;
use IHC\Backoffice\Polls\Domain\Models\Vote;
use IHC\Backoffice\Users\Domain\Models\User;

class RemoveVotePollAction
{
    public function execute(
        User $user,
        Poll $poll,
        int $optionID
    ) {
        Vote::where('user_id', $user->id)
            ->where('option_id', $optionID)
            ->delete();
    }
}
