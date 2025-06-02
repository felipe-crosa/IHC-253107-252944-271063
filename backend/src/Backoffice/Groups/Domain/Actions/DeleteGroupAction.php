<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\Domain\Actions;

use IHC\Backoffice\Groups\Domain\DataTransferObjects\UpsertGroupDto;
use IHC\Backoffice\Groups\Domain\Models\Group;
use IHC\Backoffice\Users\Domain\Models\User;

class DeleteGroupAction
{
    public function execute(Group $group): void
    {
        $group->delete();
    }
}
