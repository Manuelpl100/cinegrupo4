<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AsientoController;



// Cartelera
Route::get('/cartelera', function () {
    return view('cartelera');
})->name('cartelera.index');

// Salas de cine
Route::get('/sala/{id}', function ($id) {
    if ($id == 1) {
        return view('cine');
    } elseif ($id == 2) {
        return view('cine2');
    } else {
        return redirect('/cartelera');
    }
})->name('sala.show');

//visualizaciones de los metodos de los controler de Diego
Route::get('/sala/{id}/asientos', [AsientoController::class, 'index'])->name('asientos.index');
Route::get('/asientos/reservar/{asiento}', [AsientoController::class, 'reservar']);
Route::get('/sala/{id}/asientos/aleatorio', [AsientoController::class, 'buscarAsientoDisponibleAleatorio'])->name('asientos.aleatorio');
Route::get('/sala/{id}/asientos/ocupados', [AsientoController::class, 'contarAsientosOcupados'])->name('asientos.ocupados');
Route::get('/sala/{id_sala}/asientos/mostrar', [AsientoController::class, 'mostrarAsientos'])->name('asientos.mostrar');



