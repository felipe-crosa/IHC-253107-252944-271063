<?php

declare(strict_types=1);

namespace IHC\Backoffice\Polls\Domain\Models;

use IHC\Backoffice\Events\Domain\Models\Event;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * 
 *
 * @property int $id
 * @property string $question
 * @property string $options
 * @property int $event_id
 * @property int $user_id
 * @property int $hours_to_vote
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @property-read Event $event
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Poll newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Poll newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Poll query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Poll whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Poll whereEventId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Poll whereHoursToVote($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Poll whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Poll whereOptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Poll whereQuestion($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Poll whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Poll whereUserId($value)
 * @property bool $multiple_answers
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Poll whereMultipleAnswers($value)
 * @property-read int|null $options_count
 * @mixin \Eloquent
 */
class Poll extends Model
{
    protected $guarded = [];
    
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function isExpired(): bool
    {
        return $this->created_at->addHours($this->hours_to_vote) < now();
    }

    public function options(): HasMany
    {
        return $this->hasMany(Option::class);
    }
}
