<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\Domain\Actions;

use IHC\Backoffice\Groups\Domain\DataTransferObjects\UpsertGroupDto;
use IHC\Backoffice\Groups\Domain\Models\Group;
use IHC\Backoffice\Invites\Domain\Enums\InviteStatus;
use IHC\Backoffice\Users\Domain\Models\User;

class CreateGroupAction
{
    public function execute(User $user, UpsertGroupDto $data): Group
    {
        $group = new Group();
        $group->name = $data->name;
        $group->description = $data->description;
        $group->owner_id = $user->id;

        $group->save();

        $group->users()->attach($user, ['status' => InviteStatus::ACCEPTED]);

        return $group;
    }
}
