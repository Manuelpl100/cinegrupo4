<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/alberto', function () {
    return view('cine');
});

Route::get('/diego', function () {
    return view('cine2');
});