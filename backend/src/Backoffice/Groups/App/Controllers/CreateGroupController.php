<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\App\Controllers;

use IHC\Backoffice\Groups\App\Requests\UpsertGroupRequest;
use IHC\Backoffice\Groups\App\Resources\GroupResource;
use IHC\Backoffice\Groups\Domain\Actions\CreateGroupAction;

class CreateGroupController
{
    public function __invoke(UpsertGroupRequest $request, CreateGroupAction $createGroupAction)
    {
        $group = $createGroupAction->execute($request->user(), $request->toDto());

        return GroupResource::make($group)
            ->response()
            ->setStatusCode(201);
    }
}
