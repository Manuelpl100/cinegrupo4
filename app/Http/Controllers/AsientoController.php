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

    public function reservar($id_asiento)
    {
        $asiento = asientos::find($id_asiento);

        if (!$asiento) {
            return response()->json(['error' => 'Asiento no encontrado',
        'error_message' => 'melarepanflinfla'], 200);
        }

        $asiento->disponibilidad = false;
        $asiento->save();

        return response()->json(['mensaje' => 'Asiento reservado con exito']);
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


    public function mostrarAsientos($id_sala)
    {
        $asientos = asientos::where('id_sala', $id_sala)->get();

        if ($asientos->count() == 0) {
            return response()->json(['error' => 'No existen asientos para esa sala'], 404);
        }

        $asientirijillo = $asientos->map(function ($asiento) {
            return [
                'id' => $asiento->id,
                'imagen' => $asiento->disponibilidad ? 'asientodisponible.png' : 'asientoocupado.png',
            ];
        });

        if ($id_sala == 1) {
            return view('cine', ['asientirijillo' => $asientirijillo]);
        } elseif ($id_sala == 2) {
            return view('cine2', ['asientirijillo' => $asientirijillo]);
        } else {
            return redirect()->route('cartelera.index');
        }
    }


}
