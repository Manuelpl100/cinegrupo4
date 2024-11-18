<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AsientoController;

Route::prefix('/api/v1')->group(function () {
    Route::get('/salas', [AsientoController::class, 'index']);
    Route::post('/salas/{id}/reservar/{id_asiento?}', [AsientoController::class, 'reservar'])->where('id_asiento', '\d+');
    Route::get('/salas/{id}/aleatorio', [AsientoController::class, 'buscarAsientoDisponibleAleatorio']);
    Route::get('/salas/{id}/ocupados', [AsientoController::class, 'contarAsientosOcupados']);
});

