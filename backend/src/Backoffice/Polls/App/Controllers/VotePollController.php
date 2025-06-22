<?php

declare(strict_types=1);

namespace IHC\Backoffice\Polls\App\Controllers;

use IHC\Backoffice\Polls\App\Requests\VotePollRequest;
use IHC\Backoffice\Polls\Domain\Actions\VotePollAction;
use IHC\Backoffice\Polls\Domain\Models\Poll;
use Illuminate\Http\JsonResponse;

class VotePollController
{
    public function __invoke(VotePollRequest $request, Poll $poll, VotePollAction $action): JsonResponse
    {
        $optionID = $request->input('option_id');
        $poll = $action->execute(
            $request->user(),
            $poll,
            $optionID
        );

        return response()->json([
            'message' => 'Vote registered successfully',
        ], JsonResponse::HTTP_OK);
    }
}
