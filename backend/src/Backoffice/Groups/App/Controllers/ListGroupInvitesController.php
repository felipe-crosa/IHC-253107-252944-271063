<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\App\Controllers;

use IHC\Backoffice\Groups\Domain\Actions\ListGroupInvitesAction;
use IHC\Backoffice\Groups\Domain\Models\Group;
use Illuminate\Http\Request;

class ListGroupInvitesController
{
    public function __invoke(Group $group, ListGroupInvitesAction $listGroupInvitesAction): array
    {
        return [
            'data' => $listGroupInvitesAction->execute($group),
        ];
    }
}
