<?php

declare(strict_types=1);

namespace IHC\Backoffice\Polls\Domain\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vote extends Model
{
    protected $guarded = ['id'];

    public function option(): BelongsTo
    {
        return $this->belongsTo(Option::class);
    }
}
