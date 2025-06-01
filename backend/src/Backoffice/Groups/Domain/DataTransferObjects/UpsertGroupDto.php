<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Groups\Domain\DataTransferObjects;

class UpsertGroupDto
{
    public function __construct(
        public string $name,
        public string $description,
    ) {
    }
}