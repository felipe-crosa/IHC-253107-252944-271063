<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Groups\App\Controllers;

use Lightit\Backoffice\Groups\App\Requests\UpsertGroupRequest;
use Lightit\Backoffice\Groups\Domain\Actions\CreateGroupAction;
use Lightit\Backoffice\Groups\Domain\Actions\UpdateGroupAction;
use Lightit\Backoffice\Groups\Domain\Models\Group;

class UpdateGroupController
{
    public function __invoke(Group $group, UpsertGroupRequest $request, UpdateGroupAction $updateGroupAction)
    {
        $group = $updateGroupAction->execute($group, $request->toDto());

        return response()->json($group);
    }
}