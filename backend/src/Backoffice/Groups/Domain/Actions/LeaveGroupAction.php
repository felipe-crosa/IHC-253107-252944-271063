<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\Domain\Actions;

use IHC\Backoffice\Groups\Domain\Models\Group;
use IHC\Backoffice\Users\Domain\Models\User;

class LeaveGroupAction
{
    public function execute(User $user, Group $group)
    {
        $group->users()->detach($user);
    }
}