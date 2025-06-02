<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\App\Controllers;

use IHC\Backoffice\Groups\App\Requests\InviteUserRequest;
use IHC\Backoffice\Groups\Domain\Actions\InviteUserAction;
use IHC\Backoffice\Groups\Domain\Models\Group;
use Illuminate\Http\JsonResponse;

class InviteUserController
{
    public function __invoke(Group $group, InviteUserRequest $request, InviteUserAction $inviteUserAction): JsonResponse
    {
        $invite = $inviteUserAction->execute($group, (string) $request->string(InviteUserRequest::EMAIL));

        return response()->json([
            'data' => $invite,
        ]);
    }
}
