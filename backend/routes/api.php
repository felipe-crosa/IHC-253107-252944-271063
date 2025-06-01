<?php

declare(strict_types=1);

use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Support\Facades\Route;
use Lightit\Authentication\App\Controllers\GoogleLoginController;
use Lightit\Authentication\App\Controllers\LoginController;
use Lightit\Authentication\App\Controllers\LogoutController;
use Lightit\Authentication\App\Controllers\RefreshController;
use Lightit\Backoffice\Groups\App\Controllers\CreateGroupController;
use Lightit\Backoffice\Groups\App\Controllers\DeleteGroupController;
use Lightit\Backoffice\Groups\App\Controllers\GetGroupController;
use Lightit\Backoffice\Groups\App\Controllers\UpdateGroupController;

use Lightit\Backoffice\Users\App\Controllers\{
    DeleteUserController,
    GetUserController,
    ListUserController,
    StoreUserController,
    UpdateUserController
};


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->group(static function (): void {
    Route::post('login', LoginController::class);
    Route::post('google', GoogleLoginController::class);
    Route::post('register', StoreUserController::class);
    Route::post('refresh', RefreshController::class)->middleware('auth');
    Route::get('me', function (#[CurrentUser] $user) {
        return response()->json([
            'data' => $user,
        ]);
    })->middleware('auth');
});

Route::middleware('auth')->group(function () {
    Route::prefix('groups')->group(static function (): void {
        Route::post('/', CreateGroupController::class);
        Route::get('/{group}', GetGroupController::class);
        Route::put('/{group}', UpdateGroupController::class);
        Route::delete('/{group}', DeleteGroupController::class);
    });
});
