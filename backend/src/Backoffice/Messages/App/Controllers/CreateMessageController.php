<?php

declare(strict_types=1);

namespace IHC\Backoffice\Messages\App\Controllers;

use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Messages\App\Requests\CreateMessageRequest;
use IHC\Backoffice\Messages\Domain\Actions\CreateMessageAction;

class CreateMessageController
{
    public function __invoke(
        CreateMessageRequest $request,
        Event $event,
        CreateMessageAction $createMessageAction
    ) {
        $message = $createMessageAction->execute(
            $request->user(),
            $event,
            $request->content()
        );

        return response()->json($message, 201);
    }
}
