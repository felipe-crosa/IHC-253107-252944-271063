<?php

declare(strict_types=1);

namespace IHC\Backoffice\Polls\Domain\Models;

use IHC\Backoffice\Polls\Domain\Models\Poll;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * 
 *
 * @property-read Poll|null $poll
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Option newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Option newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Option query()
 * @property int $id
 * @property string $name
 * @property int $poll_id
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Option whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Option whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Option wherePollId($value)
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \IHC\Backoffice\Polls\Domain\Models\Vote> $votes
 * @property-read int|null $votes_count
 * @mixin \Eloquent
 */
class Option extends Model
{
    protected $guarded = ['id'];
    public $timestamps = false;
    
    public function poll(): BelongsTo
    {
        return $this->belongsTo(Poll::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }
}
