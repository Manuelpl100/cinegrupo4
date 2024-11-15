<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/manuel', function () {
    return view('cine');
});
Route::get('/alejandro', function () {
    return view('cine2');
});
