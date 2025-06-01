<?php

declare(strict_types=1);

namespace IHC\Shared\App\Exceptions\Http;

class UnauthenticatedException extends HttpException
{
    /**
     * An HTTP status code.
     */
    protected int $status = 401;

    /**
     * The error code.
     */
    protected string|null $errorCode = 'unauthenticated';
}
