<?php

declare(strict_types=1);

namespace IHC\Backoffice\Polls\App\Controllers;

use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Polls\App\Requests\CreatePollRequest;
use IHC\Backoffice\Polls\App\Requests\VotePollRequest;
use IHC\Backoffice\Polls\App\Resources\PollResource;
use IHC\Backoffice\Polls\Domain\Actions\CreatePollAction;
use IHC\Backoffice\Polls\Domain\Actions\RemoveVotePollAction;
use IHC\Backoffice\Polls\Domain\Actions\VotePollAction;
use IHC\Backoffice\Polls\Domain\DataTransferObjects\CreatePollDto;
use IHC\Backoffice\Polls\Domain\Models\Poll;
use Illuminate\Http\JsonResponse;

class RemoveVotePollController
{
    public function __invoke(VotePollRequest $request, Poll $poll, RemoveVotePollAction $action): JsonResponse
    {
        $optionID = $request->input('option_id');
        $poll = $action->execute(
            $request->user(),
            $poll,
            $optionID
        );

        return response()->json([
            'message' => 'Vote removed successfully',
        ], JsonResponse::HTTP_OK);
    }
}
