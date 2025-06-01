<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\App\Controllers;

use IHC\Backoffice\Groups\App\Requests\UpsertGroupRequest;
use IHC\Backoffice\Groups\Domain\Actions\CreateGroupAction;
use IHC\Backoffice\Groups\Domain\Actions\UpdateGroupAction;
use IHC\Backoffice\Groups\Domain\Models\Group;

class UpdateGroupController
{
    public function __invoke(Group $group, UpsertGroupRequest $request, UpdateGroupAction $updateGroupAction)
    {
        $group = $updateGroupAction->execute($group, $request->toDto());

        return response()->json($group);
    }
}
