<?php

declare(strict_types=1);

use Illuminate\Http\Request;

class ListImageController
{
    public function __invoke(Request $request)
    {
        $images = $action->execute();

        return response()->json([
            'data' => $images,
        ]);
    }
}
