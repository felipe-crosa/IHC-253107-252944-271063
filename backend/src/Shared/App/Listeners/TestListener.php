<?php

declare(strict_types=1);

namespace IHC\Shared\App\Listeners;

use IHC\Shared\App\Events\TestEvent;

class TestListener
{
    /**
     * Handle the event.
     */
    public function handle(TestEvent $event): void
    {
    }
}
