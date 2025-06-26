<?php

declare(strict_types=1);

namespace IHC\Backoffice\Invites\App\Controllers;

use IHC\Backoffice\Invites\Domain\Actions\AcceptInviteAction;
use IHC\Backoffice\Invites\Domain\Enums\InviteStatus;
use IHC\Backoffice\Invites\Domain\Models\Invite;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\JsonResponse;

class AcceptInviteController
{
    public function __invoke(Invite $invite, AcceptInviteAction $acceptInviteAction): JsonResponse
    {
        $acceptInviteAction->execute($invite);
        return response()->json([
            'message' => 'Invite accepted successfully.',
        ], 200);
    }
}
