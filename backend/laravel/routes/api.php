<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['namespace' => 'Api'], function () {

    Route::resource('/subscription','SubscriptionController');
    Route::post('users/login', 'AuthController@login');
    Route::post('users', 'AuthController@register');
    Route::get('user', 'UserController@index');
    Route::post('admin-login', 'AuthController@login_from_redis');
});