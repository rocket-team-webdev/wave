<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playback extends Model
{
    use HasFactory;

    protected $fillable = [
        "ip",
        "latitude",
        "longitude",
        "agent",
        "trackId",
        "userId"
    ];
}
