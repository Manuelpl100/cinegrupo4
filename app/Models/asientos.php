<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class asientos extends Model
{
    use HasFactory;
    protected $table = "table_asientos";

    protected $primary = "id";

    protected $fillable =[
        'fila',
        'columna',
        'disponibilidad'
    ];

}
