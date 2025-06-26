<?php

declare(strict_types=1);

namespace IHC\Backoffice\Invites\Domain\Actions;

use IHC\Backoffice\Invites\Domain\Enums\InviteStatus;
use IHC\Backoffice\Invites\Domain\Models\Invite;
use Illuminate\Support\Facades\Log;

class RejectInviteAction
{
    public function execute(Invite $invite): void
    {
        if ($invite->status !== InviteStatus::PENDING) {
            throw new \Exception('Invite is not pending.');
        }

        $invite->delete();
    }
}
