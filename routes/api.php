<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AsientoController;

Route::prefix('api')->group(function () {
    Route::get('/asientos', [AsientoController::class, 'index']);
    Route::post('/asientos/reservar', [AsientoController::class, 'reservar']);
    Route::get('/asientos/aleatorio', [AsientoController::class, 'buscarAsientoDisponibleAleatorio']);
    Route::get('/asientos/ocupados', [AsientoController::class, 'contarAsientosOcupados']);
});