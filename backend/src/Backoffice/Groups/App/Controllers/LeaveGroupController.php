<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\App\Controllers;

use IHC\Backoffice\Groups\Domain\Actions\LeaveGroupAction;
use IHC\Backoffice\Groups\Domain\Models\Group;
use Illuminate\Http\Request;

class LeaveGroupController
{
    public function __invoke(Request $request, Group $group, LeaveGroupAction $leaveGroupAction)
    {
        $leaveGroupAction->execute($request->user(), $group);
        return response()->json([
            'message' => 'You have left the group',
        ], 204);
    }
}