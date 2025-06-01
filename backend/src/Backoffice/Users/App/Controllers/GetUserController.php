<?php

declare(strict_types=1);

namespace IHC\Backoffice\Users\App\Controllers;

use Illuminate\Http\JsonResponse;
use IHC\Backoffice\Users\App\Resources\UserResource;
use IHC\Backoffice\Users\Domain\Models\User;

final readonly class GetUserController
{
    public function __invoke(User $user): JsonResponse
    {
        return UserResource::make($user)
            ->response();
    }
}
