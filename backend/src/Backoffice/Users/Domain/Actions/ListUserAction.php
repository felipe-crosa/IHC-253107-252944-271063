<?php

declare(strict_types=1);

namespace IHC\Backoffice\Users\Domain\Actions;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use IHC\Backoffice\Users\Domain\Models\User;
use Spatie\QueryBuilder\QueryBuilder;

class ListUserAction
{
    /**
     * @return LengthAwarePaginator<int, Model>
     */
    public function execute(): LengthAwarePaginator
    {
        return QueryBuilder::for(User::class)
            ->allowedFilters(['email'])
            ->allowedSorts('email')
            ->orderBy('id', 'desc')
            ->paginate();
    }
}
