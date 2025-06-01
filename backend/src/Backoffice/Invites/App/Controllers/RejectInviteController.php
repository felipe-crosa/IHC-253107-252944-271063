<?php

declare(strict_types=1);

namespace IHC\Backoffice\Invites\App\Controllers;

use IHC\Backoffice\Invites\Domain\Actions\AcceptInviteAction;
use IHC\Backoffice\Invites\Domain\Actions\RejectInviteAction;
use IHC\Backoffice\Invites\Domain\Enums\InviteStatus;
use IHC\Backoffice\Invites\Domain\Models\Invite;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\JsonResponse;

class RejectInviteController
{
    public function __invoke(Invite $invite, RejectInviteAction $rejectInviteAction): JsonResponse
    {
        $rejectInviteAction->execute($invite);
        return response()->json([
            'message' => 'Invite rejected successfully.',
        ], 200);
    }
}
