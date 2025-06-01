<?php

declare(strict_types=1);

namespace IHC\Authentication\Domain\DataTransferObjects;

readonly class LoginDto
{
    public function __construct(
        public string $accessToken,
        public string $tokenType,
        public int $expiresIn,
    ) {
    }
}
