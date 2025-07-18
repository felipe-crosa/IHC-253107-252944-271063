<?php

declare(strict_types=1);

namespace IHC\Backoffice\Users\Domain\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use IHC\Backoffice\Events\Domain\Enums\ParticipationStatus;
use IHC\Backoffice\Events\Domain\Models\Event;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use IHC\Backoffice\Groups\Domain\Models\Group;
use IHC\Backoffice\Invites\Domain\Enums\InviteStatus;
use IHC\Backoffice\Invites\Domain\Models\Invite;
use IHC\Notifications\Domain\Models\Notification;
use Illuminate\Database\Eloquent\Relations\HasMany;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

/**
 * Domain\Users\Models\User
 *
 * @property int                             $id
 * @property string                          $name
 * @property string                          $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string                          $password
 * @property string|null                     $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Group> $groups
 * @property-read int|null $groups_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Group> $invites
 * @property-read int|null $invites_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Event> $acceptedEvents
 * @property-read int|null $accepted_events_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Event> $events
 * @property-read int|null $events_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Event> $pendingEvents
 * @property-read int|null $pending_events_count
 * @mixin \Eloquent
 */
class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens;
    use Notifiable;

    protected $guarded = [];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * @return Attribute<string, string>
     */
    public function email(): Attribute
    {
        return Attribute::make(
            get: static function (mixed $value) {
                /** @var string $value */
                return strtolower($value);
            },
            set: static function (mixed $value) {
                /** @var string $value */
                return strtolower($value);
            },
        );
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     */
    public function getJWTIdentifier(): mixed
    {
        return $this->getKey();
    }

    /**
     * Return a key-value array containing any custom claims to be added to the JWT.
     */
    public function getJWTCustomClaims(): array
    {
        return [];
    }

    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class, 'invites')->wherePivot('status', InviteStatus::ACCEPTED);
    }

    public function invites(): HasMany
    {
        return $this->hasMany(Invite::class)->where('status', InviteStatus::PENDING)->with('group');
    }

    public function events(): BelongsToMany
    {
        return $this->belongsToMany(Event::class, 'participants');
    }

    public function acceptedEvents(): BelongsToMany
    {
        return $this->belongsToMany(Event::class, 'participants')
            ->wherePivot('status', ParticipationStatus::ACCEPTED);
    }

    public function pendingEvents(): BelongsToMany
    {
        return $this->belongsToMany(Event::class, 'participants')
            ->wherePivot('status', ParticipationStatus::PENDING);
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }
}
