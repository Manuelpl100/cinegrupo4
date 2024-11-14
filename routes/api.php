<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Prueba
// Route::get("/guardar", action: [AsientosController::class, 'save']);


//Esto va en el controlador para las validaciones
    //POPAP FLASHES
    // toastr->error("Error en el nombre")
// return redirect(“/asiento”) -> withErrors();