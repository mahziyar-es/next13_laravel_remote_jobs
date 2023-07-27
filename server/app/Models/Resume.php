<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Resume extends Model
{
    use HasFactory, SoftDeletes;
    public $timestamps=false;


    // =========================================================================================================
    protected function file(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value == null ? null : config('app.url')."/resumes/".$value,
        );
    }

}
