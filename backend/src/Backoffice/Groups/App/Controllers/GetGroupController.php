<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Groups\App\Controllers;

use Lightit\Backoffice\Groups\Domain\Models\Group;

class GetGroupController
{
    public function __invoke(Group $group)
    {
        return response()->json($group);
    }
}