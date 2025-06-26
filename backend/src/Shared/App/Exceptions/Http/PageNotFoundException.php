<?php

declare(strict_types=1);

namespace IHC\Shared\App\Exceptions\Http;

/**
 * An exception thrown whan a page is not found.
 */
class PageNotFoundException extends HttpException
{
    protected int $status = 404;

    protected string|null $errorCode = 'page_not_found';
}
