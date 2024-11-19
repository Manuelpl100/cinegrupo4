<?php

namespace App\Http\Controllers;

use App\Models\asientos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AsientoController extends Controller
{
    public function index(Request $request)
    {
        $id_sala = $request->route('id');
        $asientos = asientos::where('id_sala', $id_sala)->get();

        return response()->json(['asientos' => $asientos]);
    }

    public function reservar(Request $request)
    {
        $id_sala = $request->route('id');
        $id_asientos = $request->input('id_asiento');

        $asientos = asientos::select('id', 'disponibilidad')
            ->whereIn('id', $id_asientos)
            ->where('id_sala', $id_sala)
            ->where('disponibilidad', true)
            ->get();

        if ($asientos->count() !== count($id_asientos)) {
            return response()->json(['error' => 'Uno o más asientos no están disponibles o exceden el límite permitido'], 422);
        }

        $asientos->each(function ($asiento) {
            $asiento->disponibilidad = false;
            $asiento->save();
        });

        return response()->json(['mensaje' => 'Asiento(s) reservado(s) con éxito']);
    }

    public function buscarAsientoDisponibleAleatorio(Request $request)
    {
        $id_sala = $request->route('id');
        $asiento = asientos::where('id_sala', $id_sala)
            ->where('disponibilidad', true)
            ->inRandomOrder()
            ->first();

        if (!$asiento) {
            return response()->json(['error' => 'No hay asientos disponibles'], 404);
        }

        return response()->json(['asiento' => $asiento]);
    }

    public function contarAsientosOcupados(Request $request)
    {
        $id_sala = $request->route('id');
        $ocupados = asientos::where('id_sala', $id_sala)->where('disponibilidad', false)->count();

        return response()->json(['ocupados' => $ocupados]);
    }
}


