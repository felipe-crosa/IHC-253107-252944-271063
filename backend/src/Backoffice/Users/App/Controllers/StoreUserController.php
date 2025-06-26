<?php

declare(strict_types=1);

namespace IHC\Backoffice\Users\App\Controllers;

use Illuminate\Http\JsonResponse;
use IHC\Backoffice\Users\App\Requests\UpsertUserRequest;
use IHC\Backoffice\Users\App\Resources\UserResource;
use IHC\Backoffice\Users\Domain\Actions\StoreUserAction;

final readonly class StoreUserController
{
    public function __invoke(UpsertUserRequest $request, StoreUserAction $storeUserAction): JsonResponse
    {
        $user = $storeUserAction->execute($request->toDto());

        return UserResource::make($user)
            ->response()
            ->setStatusCode(JsonResponse::HTTP_CREATED);
    }
}
