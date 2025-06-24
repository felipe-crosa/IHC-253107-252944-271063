<?php

declare(strict_types=1);

namespace IHC\Backoffice\Images\App\Controllers;

use IHC\Backoffice\Images\App\Resources\ImageResource;
use IHC\Backoffice\Images\Domain\Actions\ListImagesAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ListImagesController
{
    public function __invoke(Request $request, ListImagesAction $action): JsonResponse
    {
        $images = $action->execute($request->user());

        return ImageResource::collection($images)
            ->response()
            ->setStatusCode(JsonResponse::HTTP_OK);
    }
}
