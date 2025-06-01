<?php

declare(strict_types=1);

namespace IHC\Backoffice\Invites\Domain\Actions;

use IHC\Backoffice\Invites\Domain\Enums\InviteStatus;
use IHC\Backoffice\Invites\Domain\Models\Invite;
use IHC\Backoffice\Users\Domain\Models\User;
use Illuminate\Database\Eloquent\Collection;

class ListInvitesAction
{
    /**
     * @return Collection<Group>
     */
    public function execute(User $user): Collection
    {
        return $user->invites;
    }
}
