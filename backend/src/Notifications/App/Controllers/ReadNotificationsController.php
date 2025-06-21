<?php

declare(strict_types=1);

namespace IHC\Notifications\App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReadNotificationsController
{
    public function __invoke(Request $request): JsonResponse {
        $request->user()->notifications()->update([
            'read_at' => now(),
        ]);

        return response()->json([
            'message' => 'Notifications marked as read successfully',
        ], 200);
    }
}
