<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Groups\App\Controllers;

use Lightit\Backoffice\Groups\App\Requests\UpsertGroupRequest;
use Lightit\Backoffice\Groups\Domain\Actions\CreateGroupAction;

class CreateGroupController
{
    public function __invoke(UpsertGroupRequest $request, CreateGroupAction $createGroupAction)
    {
        $group = $createGroupAction->execute($request->user(), $request->toDto());

        return response()->json($group, 201);
    }
}