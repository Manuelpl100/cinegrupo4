<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AsientoController;

Route::prefix('api/salas')->group(function () {
    Route::get('/{id_sala}/asientos', [AsientoController::class, 'index']);
    Route::post('/{id_sala}/asientos/reservar', [AsientoController::class, 'reservar']);
    Route::get('/{id_sala}/asientos/aleatorio', [AsientoController::class, 'buscarAsientoDisponibleAleatorio']);
    Route::get('/{id_sala}/asientos/ocupados', [AsientoController::class, 'contarAsientosOcupados']);
});
