<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\App\Controllers;

use IHC\Backoffice\Groups\Domain\Actions\ListGroupsAction;
use IHC\Backoffice\Groups\Domain\Models\Group;
use Illuminate\Http\Request;

class ListGroupEventsController
{
    public function __invoke(Group $group)
    {
        return response()->json($group->events);
    }
}
