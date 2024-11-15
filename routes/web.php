<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
<<<<<<< HEAD

=======
>>>>>>> d816380ad6f1ef7839b97ff5d9442ce9de96d6ca

Route::get('/sala1', function () {
    return view('cine');
});
<<<<<<< HEAD
=======
Route::get('/sala2', function () {
    return view('cine2');
});
Route::get('/cartelera', function () {
    return view('cartelera');
});
Route::get('/alberto', function () {
    return view('cine');
});

Route::get('/diego', function () {
    return view('cine2');
});
>>>>>>> d816380ad6f1ef7839b97ff5d9442ce9de96d6ca

