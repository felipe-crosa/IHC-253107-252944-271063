<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\App\Controllers;

use IHC\Backoffice\Groups\Domain\Actions\ListGroupInvitesAction;
use IHC\Backoffice\Groups\Domain\Models\Group;
use IHC\Backoffice\Users\App\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListGroupInvitesController
{
    public function __invoke(Group $group, ListGroupInvitesAction $listGroupInvitesAction): JsonResource
    {
        return UserResource::collection($listGroupInvitesAction->execute($group));
    }
}
