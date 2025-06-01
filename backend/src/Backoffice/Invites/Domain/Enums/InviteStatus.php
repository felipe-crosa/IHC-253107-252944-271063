<?php

declare(strict_types=1);

namespace IHC\Backoffice\Invites\Domain\Enums;

enum InviteStatus: string
{
    case PENDING = 'pending';
    case ACCEPTED = 'accepted';
}
