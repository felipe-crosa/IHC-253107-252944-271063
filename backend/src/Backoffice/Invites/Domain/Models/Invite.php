<?php

declare(strict_types=1);

namespace IHC\Backoffice\Invites\Domain\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;
use IHC\Backoffice\Groups\Domain\Models\Group;
use IHC\Backoffice\Invites\Domain\Enums\InviteStatus;
use IHC\Backoffice\Users\Domain\Models\User;

class Invite extends Pivot
{
    protected $table = 'invites';

    protected $fillable = [
        'user_id',
        'group_id',
        'status',
    ];

    protected $casts = [
        'status' => InviteStatus::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}
