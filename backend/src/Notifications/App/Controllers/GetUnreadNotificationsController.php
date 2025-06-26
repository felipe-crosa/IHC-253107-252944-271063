<?php

declare(strict_types=1);

namespace IHC\Notifications\App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetUnreadNotificationsController
{
    public function __invoke(Request $request): JsonResponse {
        $notifications = $request->user()->notifications()->whereNull('read_at')->count();

        return response()->json([
            'data' => [
                'unread_notifications' => $notifications,
            ],
        ], 200);
    }
}
