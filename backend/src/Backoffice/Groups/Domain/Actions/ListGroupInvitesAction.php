<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\Domain\Actions;

use IHC\Backoffice\Groups\Domain\Models\Group;
use IHC\Backoffice\Invites\Domain\Models\Invite;
use IHC\Backoffice\Users\Domain\Models\User;
use Illuminate\Database\Eloquent\Collection;

class ListGroupInvitesAction
{
    /**
     * @return Collection<Invite>
     */
    public function execute(Group $group): Collection
    {
        return $group->invites()
            ->get();
    }
}
