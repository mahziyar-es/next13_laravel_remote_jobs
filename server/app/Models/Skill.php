<?php

namespace App\Models;

use App\Traits\EnhancedModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory, EnhancedModel;
    public $timestamps = false;
}
