<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['external_id', 'visit_count', 'trees_planted', 'last_connected_at'])]
class Customer extends Model
{
    public $timestamps = false;

    /**
     * @return HasMany<Visit, $this>
     */
    public function visits(): HasMany
    {
        return $this->hasMany(Visit::class);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'last_connected_at' => 'datetime',
            'visit_count' => 'integer',
            'trees_planted' => 'integer',
        ];
    }
}
