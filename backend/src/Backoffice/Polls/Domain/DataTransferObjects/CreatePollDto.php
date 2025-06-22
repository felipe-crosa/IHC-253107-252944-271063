<?php

declare(strict_types=1);

namespace IHC\Backoffice\Polls\Domain\DataTransferObjects;

class CreatePollDto
{
    public function __construct(
        public readonly string $question,
        public readonly array $options,
        public readonly int $duration,
        public readonly bool $isMultipleChoice,
    ) {
    }
}