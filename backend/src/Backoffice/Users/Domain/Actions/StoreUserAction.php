<?php

declare(strict_types=1);

namespace IHC\Backoffice\Users\Domain\Actions;

use IHC\Backoffice\Users\App\Notifications\UserRegisteredNotification;
use IHC\Backoffice\Users\Domain\DataTransferObjects\UserDto;
use IHC\Backoffice\Users\Domain\Models\User;

class StoreUserAction
{
    public function execute(UserDto $userDto): User
    {
        $user = new User();

        $user->name = $userDto->name;
        $user->email = $userDto->emailAddress;
        $user->password = $userDto->password;

        $user->save();

        $user->notify(new UserRegisteredNotification());

        return $user;
    }
}
