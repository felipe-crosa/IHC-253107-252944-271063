<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\Domain\DomainTransferObjects;

class CreateEventDto
{
    public function __construct(
        public readonly string $title,
        public readonly string $description,
        public readonly string $location,
        public readonly \DateTimeImmutable $startAt,
        public readonly int $groupId,
        public readonly int $categoryId
    ) {
    }
}

