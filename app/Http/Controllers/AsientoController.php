<?php

namespace App\Http\Controllers;

use App\Models\asientos;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class AsientoController extends Controller
{
        public function index()
    {
        return asientos::all();
    }

    public function reservar(Request $request){
        $id_asiento = $request->id;
        $asiento = asientos::find($id_asiento);

        if ($asiento == null){
            $respuesta = array();
            $respuesta['error']='No se encontro asiento';
            return $respuesta;
        }

        if ($asiento -> disponibilidad == false){
            $respuesta = array();
            $respuesta['error']='El asiento ya esta ocupado';
            return $respuesta;
        }

        $asiento->disponibilidad=false;
        $asiento->save();
        $respuesta=array();
        $respuesta['mensaje']='Asiento reservado con éxito';
        return $respuesta;
    }

    public function buscarAsientoDisponibleAleatorio(){
        $asientosDispo = asientos::all();
        $asientosLib= array();

        foreach ($asientosDispo as $asiento){
            if ($asiento -> disponibilidad == true){
                array_push($asientosLib, $asiento);
            }
        }

        if (count($asientosLib)==0){
            $respuesta = array();
            $respuesta['error'] = 'No hay asientos disponibles';
            return $respuesta;
        }
        $Aleatorio=rand(0, count($asientosLib) - 1);
        $asientaco=$asientosLib[$Aleatorio];
        return $asientaco;




    }
    public function contarAsientosOcupados(){
        $todos=asientos::all();
        $ocupados=0;

        foreach($todos as $asiento){
            if($asiento -> disponibilidad == false){
                $ocupados=$ocupados+1;
            }
        }
        $respuesta= array();
        $respuesta['ocupados']=$ocupados;
        return $respuesta;
    }


}
