<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AsientoController;

// Cartelera
Route::get('/cartelera', function () {
    return view('cartelera');
})->name('cartelera.index');

// Salas de cine - Lógica para mostrar asientos según la sala
Route::get('/sala/{id_sala}', [AsientoController::class, 'mostrarAsientos'])->name('asientos.mostrar');

// Visualizaciones de los métodos de los controladores
Route::get('/sala/{id}/asientos', [AsientoController::class, 'index'])->name('asientos.index');
Route::get('/asientos/reservar/{asiento}', [AsientoController::class, 'reservar'])->name('asientos.reservar');
Route::get('/sala/{id}/asientos/aleatorio', [AsientoController::class, 'buscarAsientoDisponibleAleatorio'])->name('asientos.aleatorio');
Route::get('/sala/{id}/asientos/ocupados', [AsientoController::class, 'contarAsientosOcupados'])->name('asientos.ocupados');
