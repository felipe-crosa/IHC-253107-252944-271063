<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\App\Controllers;

use IHC\Backoffice\Groups\Domain\Actions\DeleteGroupAction;
use IHC\Backoffice\Groups\Domain\Models\Group;

class DeleteGroupController
{
    public function __invoke(Group $group, DeleteGroupAction $deleteGroupAction)
    {
        $deleteGroupAction->execute($group);

        return response()->json([
            'message' => 'Group deleted successfully'
        ], 200);
    }
}
