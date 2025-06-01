<?php

declare(strict_types=1);

namespace IHC\Backoffice\Groups\App\Controllers;

use IHC\Backoffice\Groups\Domain\Actions\ListGroupsAction;
use Illuminate\Http\Request;

class ListGroupsController
{
    public function __invoke(Request $request, ListGroupsAction $listGroupsAction)
    {
        $groups = $listGroupsAction->execute($request->user());

        return response()->json($groups);
    }
}