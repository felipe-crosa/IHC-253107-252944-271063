<?php

declare(strict_types=1);

namespace IHC\Notifications\App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetNotificationsController
{
    public function __invoke(Request $request): JsonResponse {
        $notifications = $request->user()->notifications;

        return response()->json([
            'data' => $notifications,
        ], 200);
    }
}
