<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\App\Controllers;

use IHC\Backoffice\Groups\Domain\Models\Group;

class ListGroupUsersController
{
    public function __invoke(Group $group)
    {
        return response()->json($group->users);
    }
}