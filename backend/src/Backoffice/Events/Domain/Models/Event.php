<?php

declare(strict_types=1);

namespace IHC\Backoffice\Events\Domain\Models;

use IHC\Backoffice\Events\Domain\Enums\ParticipationStatus;
use IHC\Backoffice\Users\Domain\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 *
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property string $start_at
 * @property string $location
 * @property int $group_id
 * @property int $created_by
 * @property int $category_id
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereStartAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereUpdatedAt($value)
 * @property-read \Illuminate\Database\Eloquent\Collection<int, User> $cancelledAttendees
 * @property-read int|null $cancelled_attendees_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, User> $confirmedAttendees
 * @property-read int|null $confirmed_attendees_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, User> $pendingAttendees
 * @property-read int|null $pending_attendees_count
 * @mixin \Eloquent
 */
class Event extends Model
{
    public function category(): BelongsTo
    {
        return $this->belongsTo('categories');
    }

    public function confirmedAttendees(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'participants'
        )->wherePivot('status', ParticipationStatus::ACCEPTED);
    }

    public function cancelledAttendees(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'participants'
        )->wherePivot('status', ParticipationStatus::REJECTED);
    }

    public function pendingAttendees(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'participants'
        )->wherePivot('status', ParticipationStatus::PENDING);
    }
}
