<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use C;

class JobQuestion extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [C::COL_JOB_QUESTION_TEXT];
}
