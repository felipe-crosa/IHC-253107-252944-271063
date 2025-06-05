<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\App\Controllers;

use IHC\Backoffice\Groups\Domain\Models\Group;
use IHC\Backoffice\Users\App\Resources\UserResource;

class ListGroupUsersController
{
    public function __invoke(Group $group)
    {
        return UserResource::collection($group->users)
            ->response()
            ->setStatusCode(200);
    }
}
