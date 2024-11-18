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
        $validator = Validator::make($request->all(), [
            'id_asiento' => 'required|integer|exists:asientos,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 422);
        }

        $id_sala = $request->route('id');
        $id_asiento = $request->input('id_asiento');
        $asiento = asientos::where('id', $id_asiento)->where('id_sala', $id_sala)->first();

        if (!$asiento || !$asiento->disponibilidad) {
            return response()->json(['error' => 'El asiento no está disponible'], 422);
        }

        $asiento->disponibilidad = false;
        $asiento->save();

        return response()->json(['mensaje' => 'Asiento reservado con éxito']);
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

