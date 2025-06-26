<?php

declare(strict_types=1);

namespace IHC\Shared\App\Exceptions\Http;

class ModelNotFoundHttpException extends HttpException
{
    /**
     * An HTTP status code.
     */
    protected int $status = 404;

    /**
     * An error code.
     */
    protected string|null $errorCode = 'entity_not_found';
}
