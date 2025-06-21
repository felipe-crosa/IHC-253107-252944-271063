<?php

declare(strict_types=1);

namespace IHC\Backoffice\Polls\App\Controllers;

use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Polls\App\Requests\CreatePollRequest;
use IHC\Backoffice\Polls\App\Resources\PollResource;
use IHC\Backoffice\Polls\Domain\Actions\CreatePollAction;
use IHC\Backoffice\Polls\Domain\DataTransferObjects\CreatePollDto;
use Illuminate\Http\JsonResponse;

class CreatePollController
{
    public function __invoke(CreatePollRequest $request, Event $event, CreatePollAction $action): JsonResponse
    {
        $poll = $action->execute(
            $request->user(),
            $event,
            $request->dto()
        );

        return PollResource::make($poll)
            ->response()
            ->setStatusCode(JsonResponse::HTTP_CREATED);
    }
}