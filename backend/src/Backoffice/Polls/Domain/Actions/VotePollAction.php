<?php

declare(strict_types=1);

namespace IHC\Backoffice\Polls\Domain\Actions;

use Event;
use IHC\Backoffice\Events\Domain\Models\Event as ModelsEvent;
use IHC\Backoffice\Polls\Domain\DataTransferObjects\CreatePollDto;
use IHC\Backoffice\Polls\Domain\Models\Poll;
use IHC\Backoffice\Polls\Domain\Models\Vote;
use IHC\Backoffice\Users\Domain\Models\User;

class VotePollAction
{
    public function execute(
        User $user,
        Poll $poll,
        int $optionID
    ) {
        $allowsMultipleVotes = $poll->multiple_answers;

        if (!$allowsMultipleVotes) {
            Vote::where('user_id', $user->id)
                ->whereHas('option', fn ($query)  =>$query->where('poll_id', $poll->id))
                ->delete();
        }
        Vote::create([
            'user_id' => $user->id,
            'option_id' => $optionID,
        ]);
    }
}
