<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AsientoController;



// Cartelera
Route::get('/cartelera', function () {
    return view('cartelera');
});

// Salas de cine
Route::get('/sala/{id}', function ($id) {
    if ($id == 1) {
        return view('cine');
    } elseif ($id == 2) {
        return view('cine2');
    } else {
        return redirect('/cartelera');
    }
});

//visualizaciones de los metodos de los controler de Diego
Route::get('/asientos', [AsientoController::class, 'index']);
Route::post('/asientos/reservar', [AsientoController::class, 'reservar']);
Route::get('/asientos/aleatorio', [AsientoController::class, 'buscarAsientoDisponibleAleatorio']);
Route::get('/asientos/ocupados', [AsientoController::class, 'contarAsientosOcupados']);
