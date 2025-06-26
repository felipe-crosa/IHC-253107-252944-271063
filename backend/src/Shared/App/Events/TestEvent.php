<?php

declare(strict_types=1);

namespace IHC\Shared\App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TestEvent
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;
}
