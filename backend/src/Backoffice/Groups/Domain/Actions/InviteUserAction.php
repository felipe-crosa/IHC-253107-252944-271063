<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\Domain\Actions;

use IHC\Backoffice\Groups\Domain\Models\Group;
use IHC\Backoffice\Invites\Domain\Enums\InviteStatus;
use IHC\Backoffice\Invites\Domain\Models\Invite;
use IHC\Backoffice\Users\Domain\Models\User;

class InviteUserAction
{
    public function execute(Group $group, string $email): void
    {
        $user = User::whereEmail($email)->firstOrFail();

        $invite = Invite::where('user_id', $user->id)
            ->where('group_id', $group->id)
            ->first();

        if ($invite){
            throw new \Exception('User is already invited to this group.');
        }

        Invite::create([
            'group_id' => $group->id,
            'user_id' => $user->id,
            'status' => InviteStatus::PENDING,

        ]);
    }
}
