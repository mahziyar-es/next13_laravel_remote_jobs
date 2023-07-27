<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use C;

class Application extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [C::COL_APPLICATION_JOB_ID, C::COL_APPLICATION_USER_RESUME_ID, C::COL_APPLICATION_COVER_LETTER, C::COL_APPLICATION_USER_ID];

    // ==============================================================================================
    public function questions(): BelongsToMany
    {
        return $this-> belongsToMany(JobQuestion::class)->withPivot([C::COL_APPLICATION_QUESTION_ANSWER]);
    }

    public function resume(): BelongsTo
    {
        return $this-> belongsTo(Resume::class);
    }

    public function user(): BelongsTo
    {
        return $this-> belongsTo(User::class);
    }



}
