<?php

namespace App\Http\Controllers;

use App\Models\asientos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AsientoController extends Controller
{
    public function index(Request $request)
    {
        $id_sala = $request->id;

        $asientos = asientos::where('id_sala', $id_sala)->get();

        return response()->json([$id_sala => $asientos]);
    }

    public function reservar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|exists:asientos,id',
            'id_asiento' => 'required|integer|exists:asientos,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 422);
        }

        $id_sala = $request->route('id');
        $id_asiento = $request->route('id_asiento');
        $asiento = asientos::where('id', $id_asiento)->where('id_sala', $id_sala)->first();

        if (!$asiento) {
            return response()->json(['error' => 'No se encontró asiento en la sala especificada'], 404);
        }

        if (!$asiento->disponibilidad) {
            return response()->json(['error' => 'El asiento ya está ocupado'], 422);
        }

        $asiento->disponibilidad = false;
        $asiento->save();

        return response()->json(['mensaje' => 'Asiento reservado con éxito en la sala ' . $id_sala]);
    }

    public function buscarAsientoDisponibleAleatorio(Request $request)
    {
        $id_sala = $request->route('id');
        $asientos = asientos::where('id_sala', $id_sala)->where('disponibilidad', true)->get();

        if ($asientos->isEmpty()) {
            return response()->json(['error' => 'No hay asientos disponibles en la sala ' . $id_sala], 404);
        }

        $asientoAleatorio = $asientos->random();
        $asientoAleatorio->id_sala = $id_sala;

        return response()->json($asientoAleatorio);
    }

    public function contarAsientosOcupados(Request $request)
    {
        $salas = asientos::select('id_sala')->distinct()->pluck('id_sala');
        $respuesta = [];

        foreach ($salas as $id_sala) {
            $ocupados = asientos::where('id_sala', $id_sala)->where('disponibilidad', false)->count();
            $respuesta[$id_sala] = $ocupados;
        }

        return response()->json($respuesta);
    }
}

