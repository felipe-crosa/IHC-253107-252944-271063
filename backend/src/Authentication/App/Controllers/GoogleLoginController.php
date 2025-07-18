<?php

declare(strict_types=1);

namespace IHC\Authentication\App\Controllers;

use Illuminate\Http\JsonResponse;
use IHC\Authentication\App\Requests\GoogleLoginRequest;
use IHC\Authentication\Domain\Actions\GoogleLoginAction;

class GoogleLoginController
{
    public function __invoke(GoogleLoginRequest $request, GoogleLoginAction $action): JsonResponse
    {
        $loginDto = $action->execute($request->getToken());

        return response()->json([
            'data' => [
                'access_token' => $loginDto->accessToken,
                'token_type' => $loginDto->tokenType,
                'expires_in' => $loginDto->expiresIn,
            ],
        ]);
    }
}
