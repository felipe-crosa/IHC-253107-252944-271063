<?php

declare(strict_types=1);

namespace IHC\Backoffice\Invites\App\Controllers;

use IHC\Backoffice\Invites\Domain\Actions\ListInvitesAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ListInvitesController
{
    public function __invoke(Request $request, ListInvitesAction $listInvitesAction): JsonResponse
    {
        $invites = $listInvitesAction->execute($request->user());

        return response()->json([
            'invites' => $invites,
        ], 200);
    }
}
