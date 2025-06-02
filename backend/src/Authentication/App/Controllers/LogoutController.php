<?php

declare(strict_types=1);

namespace IHC\Authentication\App\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use IHC\Authentication\Domain\Actions\LogoutAction;
use IHC\Models\JWTAuthenticatable;
use IHC\Shared\App\Exceptions\Http\UnauthorizedException;

class LogoutController
{
    public function __invoke(Request $request, LogoutAction $logoutAction): Response
    {
        /** @var JWTAuthenticatable|null $user */
        $user = $request->user();

        if (! $user) {
            throw new UnauthorizedException();
        }

        $logoutAction->execute();

        return response()->noContent();
    }
}
