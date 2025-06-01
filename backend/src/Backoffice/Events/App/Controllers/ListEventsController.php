<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\App\Controllers;

use Illuminate\Http\Request;

class ListEventsController {
    public function __invoke(Request $request)
    {
        $user = $request->user();

        return response()->json($user->acceptedEvents, 200);
    }
}
