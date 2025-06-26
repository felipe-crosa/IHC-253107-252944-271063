<?php

declare(strict_types=1);

namespace IHC\Backoffice\Images\App\Resources;

use IHC\Backoffice\Events\Domain\Models\Event;
use IHC\Backoffice\Images\Domain\Models\Image;
use IHC\Backoffice\Messages\Domain\Models\Message;
use IHC\Backoffice\Users\App\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Image
 */
class ImageResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'sender' => $this->whenLoaded('user', fn () => new UserResource($this->user)),
            'url' => $this->url,
        ];
    }
}
