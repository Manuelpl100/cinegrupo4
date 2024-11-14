<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sala extends Model
{
    use HasFactory;

    protected $table = 'sala';

    protected $primaryKey = 'id';

    protected $fillable = [
        'nombre',
    ];
}
