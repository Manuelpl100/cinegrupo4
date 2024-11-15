<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/sala1', function () {
    return view('cine');
});
Route::get('/sala2', function () {
    return view('cine2');
});
Route::get('/cartelera', function () {
    return view('cartelera');
});