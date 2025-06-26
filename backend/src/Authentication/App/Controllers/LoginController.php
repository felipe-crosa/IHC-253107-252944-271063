<?php

declare(strict_types=1);

namespace IHC\Authentication\App\Controllers;

use Illuminate\Http\JsonResponse;
use IHC\Authentication\App\Requests\LoginRequest;
use IHC\Authentication\Domain\Actions\LoginAction;

class LoginController
{
    public function __invoke(LoginRequest $request, LoginAction $loginAction): JsonResponse
    {
        $credentials = $request->only([$request::EMAIL, $request::PASSWORD]);

        $loginDto = $loginAction->execute($credentials);

        return response()->json([
            'data' => [
                'access_token' => $loginDto->accessToken,
                'token_type' => $loginDto->tokenType,
                'expires_in' => $loginDto->expiresIn,
            ],
        ]);
    }
}
