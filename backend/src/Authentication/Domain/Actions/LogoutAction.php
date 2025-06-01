<?php

declare(strict_types=1);

namespace IHC\Authentication\Domain\Actions;

use Illuminate\Contracts\Auth\Factory as AuthFactory;
use PHPOpenSourceSaver\JWTAuth\JWTGuard;

class LogoutAction
{
    public function __construct(
        private readonly AuthFactory $factory,
    ) {
    }

    public function execute(): void
    {
        /** @var JWTGuard $guard */
        $guard = $this->factory->guard();
        $guard->logout();
    }
}
