<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Groups\Domain\Actions;

use Lightit\Backoffice\Groups\Domain\DataTransferObjects\UpsertGroupDto;
use Lightit\Backoffice\Groups\Domain\Models\Group;
use Lightit\Backoffice\Users\Domain\Models\User;

class CreateGroupAction
{
    public function execute(User $user, UpsertGroupDto $data): Group
    {
        $group = new Group();
        $group->name = $data->name;
        $group->description = $data->description;
        $group->owner_id = $user->id;

        $group->save();

        return $group;
    }
}