<?php

declare(strict_types=1);

namespace IHC\Backoffice\Images\Domain\Actions;

use File;
use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Images\Domain\Models\Image;
use IHC\Backoffice\Messages\Domain\Models\Message;
use IHC\Backoffice\Users\Domain\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class CreateImageAction
{
    public function execute(User $user, Event $event, UploadedFile $file): Image
    {
        $uuid = \Illuminate\Support\Str::uuid()->toString();
        $path = Storage::put($uuid, $file);
        $url = Storage::url($path);

        return Image::create([
            'user_id' => $user->id,
            'event_id' => $event->id,
            'url' => $url,
        ]);
    }
}
