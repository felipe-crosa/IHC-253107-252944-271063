<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\Domain\Models;

use IHC\Backoffice\Users\Domain\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * 
 *
 * @property-read \IHC\Backoffice\Events\Domain\Models\Event|null $event
 * @property-read User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Participant newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Participant newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Participant query()
 * @property int $id
 * @property int $event_id
 * @property int $user_id
 * @property string $status
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Participant whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Participant whereEventId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Participant whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Participant whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Participant whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Participant whereUserId($value)
 * @mixin \Eloquent
 */
class Participant extends Pivot
{
    use HasFactory;

    protected $table = 'participants';

    protected $fillable = [
        'event_id',
        'user_id',
        'status',
    ];

    /**
     * Get the event that owns the participant.
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Get the user that owns the participant.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
