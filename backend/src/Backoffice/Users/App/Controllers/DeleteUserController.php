<?php

declare(strict_types=1);

namespace IHC\Backoffice\Users\App\Controllers;

use Illuminate\Http\JsonResponse;
use IHC\Backoffice\Users\Domain\Models\User;

final readonly class DeleteUserController
{
    public function __invoke(User $user): JsonResponse
    {
        $user->delete();

        return response()->json();
    }
}
