<?php

declare(strict_types=1);

namespace IHC\Backoffice\Images\Domain\Actions;

use File;
use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Images\Domain\Models\Image;
use IHC\Backoffice\Messages\Domain\Models\Message;
use IHC\Backoffice\Users\Domain\Models\User;
use IHC\Notifications\Domain\Models\Notification;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class CreateImageAction
{
    public function execute(User $user, Event $event, UploadedFile $file): Image
    {
        $uuid = \Illuminate\Support\Str::uuid()->toString();
        $path = Storage::put($uuid, $file);
        $url = Storage::url($path);

        $image = Image::create([
            'user_id' => $user->id,
            'event_id' => $event->id,
            'url' => $url,
        ]);

        $event->confirmedAttendees->each(function (User $attendee) use ($image, $event) {
            if ($attendee->id === $image->user_id) return;
            Notification::create([
                'user_id' => $attendee->id,
                'type' => 'image_uploaded',
                'title' => 'New Image Uploaded',
                'description' => "A new image has been uploaded for the event: {$event->title}.",
            ]);
        });

        return $image;
    }
}
