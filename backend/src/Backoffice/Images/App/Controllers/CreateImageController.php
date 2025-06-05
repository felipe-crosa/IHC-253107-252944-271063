<?php

declare(strict_types=1);

namespace IHC\Backoffice\Images\App\Controllers;

use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Images\Domain\Actions\CreateImageAction;
use IHC\Backoffice\Images\App\Requests\CreateImageRequest;
use IHC\Backoffice\Messages\App\Requests\CreateMessageRequest;
use IHC\Backoffice\Messages\Domain\Actions\CreateMessageAction;

class CreateImageController
{
    public function __invoke(
        CreateImageRequest $request,
        Event $event,
        CreateImageAction $createImageAction
    ) {
        $image = $createImageAction->execute(
            $request->user(),
            $event,
            $request->uploadedFile()
        );

        return response()->json($image, 201);
    }
}
