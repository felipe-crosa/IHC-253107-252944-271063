<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\Domain\Actions;

use IHC\Backoffice\Users\Domain\Models\User;
use Illuminate\Database\Eloquent\Collection;

class ListGroupsAction
{
    /**
     * @return Collection<Group>
     */
    public function execute(User $user): Collection
    {
        return $user->groups;
    }
}