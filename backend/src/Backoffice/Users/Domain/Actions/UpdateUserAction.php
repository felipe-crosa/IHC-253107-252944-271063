<?php

declare(strict_types=1);

namespace IHC\Backoffice\Users\Domain\Actions;

use IHC\Backoffice\Users\Domain\DataTransferObjects\UserDto;
use IHC\Backoffice\Users\Domain\Models\User;

class UpdateUserAction
{
    public function execute(User $user, UserDto $userDto): User
    {
        $user->name = $userDto->name;
        $user->email = $userDto->emailAddress;
        $user->password = $userDto->password;

        $user->save();

        return $user;
    }
}
