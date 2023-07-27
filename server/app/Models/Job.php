<?php

namespace App\Models;

use App\Traits\EnhancedModel;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use C;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Job extends Model
{
    use HasFactory, SoftDeletes, EnhancedModel;

    protected $appends = ['type_text', 'seniority_text'];


    private $enumToText = [
        C::ENUM_JOB_TYPE_FULL_TIME => 'Full time',
        C::ENUM_JOB_TYPE_PART_TIME => 'Part time',
        C::ENUM_JOB_TYPE_CONTRACT => 'Contract',

        C::ENUM_JOB_SENIORITY_JUNIOR => 'Junior',
        C::ENUM_JOB_SENIORITY_INTERMEDIATE => 'Intermediate',
        C::ENUM_JOB_SENIORITY_SENIOR => 'Senior',
    ];

    // ==============================================================================================
    public function skills(): BelongsToMany
    {
        return $this-> belongsToMany(Skill::class);
    }

    public function applications(): HasMany
    {
        return $this-> hasMany(Application::class);
    }

    public function country(): BelongsTo
    {
        return $this-> belongsTo(Country::class);
    }

    public function questions(): HasMany
    {
        return $this-> hasMany(JobQuestion::class);
    }


    // ==============================================================================================
    public function scopeType(Builder $query, $value):void
    {
        if($value) $query -> where(C::COL_JOB_TYPE, $value);
    }

    public function scopeUserId(Builder $query, $value):void
    {
        if($value) $query -> where(C::COL_JOB_USER_ID, $value);
    }

    public function scopeTitle(Builder $query, $value):void
    {
        if($value) $query -> where(C::COL_JOB_TITLE, 'LIKE', "%$value%");
    }


    // ==============================================================================================
    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::parse($value)->diffForHumans(),
        );
    }


    protected function typeText(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value, array $attributes) => $this->enumToText[$attributes[C::COL_JOB_TYPE]],
        );
    }

    protected function seniorityText(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value, array $attributes) => $this->enumToText[$attributes[C::COL_JOB_SENIORITY]],
        );
    }




}
