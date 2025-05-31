<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Groups\Domain\Actions;

use Lightit\Backoffice\Groups\Domain\DataTransferObjects\UpsertGroupDto;
use Lightit\Backoffice\Groups\Domain\Models\Group;
use Lightit\Backoffice\Users\Domain\Models\User;

class DeleteGroupAction
{
    public function execute(Group $group): void
    {
        $group->delete();
    }
}