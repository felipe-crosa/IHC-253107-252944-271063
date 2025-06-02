<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\Domain\Enums;

enum ParticipationStatus: string
{
    case PENDING = 'pending';
    case ACCEPTED = 'accepted';
    case REJECTED = 'rejected';
}
