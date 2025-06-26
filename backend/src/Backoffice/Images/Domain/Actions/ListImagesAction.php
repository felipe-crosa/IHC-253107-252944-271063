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

class ListImagesAction
{
    public function execute(User $user): \Illuminate\Database\Eloquent\Collection
    {
        return Image::where('user_id', $user->id)->get();
    }
}
