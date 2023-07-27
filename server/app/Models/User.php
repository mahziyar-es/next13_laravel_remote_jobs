<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Traits\EnhancedModel;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use C;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, EnhancedModel;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    // =========================================================================================================
    public function skills() : BelongsToMany
    {
        return $this-> belongsToMany(Skill::class, 'user_skill');
    }

    public function applications() : HasMany
    {
        return $this-> hasMany(Application::class);
    }

    public function jobs() : HasMany
    {
        return $this-> hasMany(Job::class);
    }

    public function resumes() : HasMany
    {
        return $this-> hasMany(Resume::class);
    }


    // =========================================================================================================
    public function scopeEmail(Builder $query, ?string $value): void
    {
        if($value) $query->where(C::COL_USER_EMAIL, 'LIKE', "%$value%");
    }

    public function scopeType(Builder $query, ?string $value): void
    {
        if($value) $query->where(C::COL_USER_TYPE, $value);
    }



    // =========================================================================================================
    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => config('app.url')."/images/".($value == null ?  "user-image-placeholder.png" : $value),
        );
    }

    // =========================================================================================================
    public function getCachedResumes(){
        $cache = Cache::get('user_resumes');
        if($cache) return $cache;
        else{
            $resumes = $this->resumes;
            Cache::put('user_resumes', $resumes, 30*60);
            return $resumes;
        }
    }

    public function updateResumesCache(){
        $resumes = $this->resumes;
        Cache::put('user_resumes', $resumes, 30*60);
    }


}
