<?php

declare(strict_types=1);

use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Support\Facades\Route;
use Lightit\Backoffice\Users\App\Controllers\{
use IHC\Authentication\App\Controllers\GoogleLoginController;
use IHC\Authentication\App\Controllers\LoginController;
use IHC\Authentication\App\Controllers\LogoutController;
use IHC\Authentication\App\Controllers\RefreshController;
use IHC\Backoffice\Events\App\Controllers\ConfirmEventController;
use IHC\Backoffice\Events\App\Controllers\CreateEventController;
use IHC\Backoffice\Events\App\Controllers\DeleteEventController;
use IHC\Backoffice\Events\App\Controllers\GetEventController;
use IHC\Backoffice\Events\App\Controllers\ListEventsController;
use IHC\Backoffice\Events\App\Controllers\ListPendingEventsController;
use IHC\Backoffice\Events\App\Controllers\RejectEventController;
use IHC\Backoffice\Events\App\Controllers\UpdateEventController;
use IHC\Backoffice\Groups\App\Controllers\CreateGroupController;
use IHC\Backoffice\Groups\App\Controllers\DeleteGroupController;
use IHC\Backoffice\Groups\App\Controllers\GetGroupController;
use IHC\Backoffice\Groups\App\Controllers\InviteUserController;
use IHC\Backoffice\Groups\App\Controllers\LeaveGroupController;
use IHC\Backoffice\Groups\App\Controllers\ListGroupEventsController;
use IHC\Backoffice\Groups\App\Controllers\ListGroupInvitesController;
use IHC\Backoffice\Groups\App\Controllers\ListGroupsController;
use IHC\Backoffice\Groups\App\Controllers\ListGroupUsersController;
use IHC\Backoffice\Groups\App\Controllers\UpdateGroupController;
use IHC\Backoffice\Invites\App\Controllers\AcceptInviteController;
use IHC\Backoffice\Invites\App\Controllers\ListInvitesController;
use IHC\Backoffice\Invites\App\Controllers\RejectInviteController;
use IHC\Backoffice\Users\App\Controllers\{
    DeleteUserController,
    GetUserController,
    ListUserController,
    StoreUserController,
    UpdateUserController
};
use Illuminate\Console\View\Components\Confirm;

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
        Route::get('/', ListGroupsController::class);
        Route::get('/{group}', GetGroupController::class);
        Route::put('/{group}', UpdateGroupController::class);
        Route::delete('/{group}', DeleteGroupController::class);
        Route::get('/{group}/users', ListGroupUsersController::class);
        Route::post('/{group}/leave', LeaveGroupController::class);
        Route::get('/{group}/invites', ListGroupInvitesController::class);
        Route::post('/{group}/invites', InviteUserController::class);
        Route::get('/{group}/events', ListGroupEventsController::class);
    });

    Route::prefix('invites')->group(static function (): void {
        Route::post('/{invitation}/accept', AcceptInviteController::class);
        Route::delete('/{invitation}/reject', RejectInviteController::class);
        Route::get('/', ListInvitesController::class);
    });

    Route::prefix('events')->group(static function (): void {
        Route::get('/', ListEventsController::class);
        Route::get('/pending', ListPendingEventsController::class);
        Route::post('/', CreateEventController::class);
        Route::get('/{event}', GetEventController::class);
        Route::put('/{event}', UpdateEventController::class);
        Route::delete('/{event}', DeleteEventController::class);
        Route::post('/{event}/accept', ConfirmEventController::class);
        Route::post('/{event}/reject', RejectEventController::class);
    });

});
