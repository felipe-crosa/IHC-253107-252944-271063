<?php

declare(strict_types=1);

namespace IHC\Backoffice\Users\App\Controllers;

use Illuminate\Http\JsonResponse;
use IHC\Backoffice\Users\App\Resources\UserResource;
use IHC\Backoffice\Users\Domain\Actions\ListUserAction;

final readonly class ListUserController
{
    public function __invoke(
        ListUserAction $action,
    ): JsonResponse {
        $users = $action->execute();

        return UserResource::collection($users)
            ->response();
    }
}
