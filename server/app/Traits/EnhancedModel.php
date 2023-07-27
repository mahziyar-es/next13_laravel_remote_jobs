<?php
namespace App\Traits;

use Illuminate\Contracts\Database\Eloquent\Builder;

trait EnhancedModel {

    public function scopeLazyloading(Builder $query, $loadedCount = 0, $limit = 10) : void
    {
        $query -> skip($loadedCount) -> limit($limit);
    } 


}