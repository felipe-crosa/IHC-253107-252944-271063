<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Groups\Domain\Actions;

use Lightit\Backoffice\Groups\Domain\DataTransferObjects\UpsertGroupDto;
use Lightit\Backoffice\Groups\Domain\Models\Group;
use Lightit\Backoffice\Users\Domain\Models\User;

class UpdateGroupAction
{
    public function execute(Group $group, UpsertGroupDto $data): Group
    {
        $group->name = $data->name;
        $group->description = $data->description;

        $group->save();

        return $group;
    }
}