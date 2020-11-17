<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    /**
     * Set the auto timestamps to false, since we are using our own timestamp here.
     *
     * @var bool $timestamps
     */
    public $timestamps = false;

    /**
     * The fillable fields.
     *
     * @var array $fillable
     */
    protected $fillable = [
        'name', 'price'
    ];

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    public static function boot()
    {
        /* call parent boot method */
        parent::boot();

        /* set created at to now */
        static::creating(function ($post) {
            $post->created_at = $post->freshTimestamp();
        });
    }
}
