<?php

namespace App\Http\Controllers;

use App\Models\asientos;
use Illuminate\Http\Request;

class AsientoController extends Controller
{
        public function index()
    {
        return asientos::all();
    }

    public function reservar(Request $request)
    {
    $request->validate([
        'id' => 'required|exists:table_asientos,id',
    ]);
    $asiento = asientos::find($request->id);
    }


}
