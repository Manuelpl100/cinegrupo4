<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AsientoController;

Route::prefix('/sala/{id}')->group(function () {
    Route::get('/asientos', [AsientoController::class, 'index']);
    Route::post('/asientos/reservar/{id_asiento?}', [AsientoController::class, 'reservar'])->where('id_asiento', '\d+');
    Route::get('/asientos/aleatorio', [AsientoController::class, 'buscarAsientoDisponibleAleatorio']);
    Route::get('/asientos/ocupados', [AsientoController::class, 'contarAsientosOcupados']);
});

