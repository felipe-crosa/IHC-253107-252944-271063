<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\App\Controllers;

use IHC\Backoffice\Groups\App\Resources\GroupResource;
use IHC\Backoffice\Groups\Domain\Models\Group;

class GetGroupController
{
    public function __invoke(Group $group)
    {
        $group->loadCount('users');
        return GroupResource::make($group)
            ->response()
            ->setStatusCode(200);
    }
}
