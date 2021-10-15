<?php

use App\Http\Controllers\PlaybackController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::middleware('api_token')->group(function () {
//     Route::apiResource('playbacks', PlaybackController::class);
// });

Route::middleware('api_token_post')->group(function () {
    Route::post('playbacks', [PlaybackController::class, 'store']);
});

Route::middleware('api_token_node')->group(function () {
    Route::get('playbacks', [PlaybackController::class, 'index']);
});
