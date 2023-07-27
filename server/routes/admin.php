<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Exceptions\NotFoundException;
use App\Http\Controllers\Admin\JobController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('/user', [UserController::class, 'index']);
Route::get('/user/{user}', [UserController::class, 'show']);
Route::delete('/user/{user}', [UserController::class, 'destroy']);


Route::get('/skill', [SkillController::class, 'index']);
Route::post('/skill', [SkillController::class, 'store']);
Route::delete('/skill/{skill}', [SkillController::class, 'destroy']);


Route::get('/job', [JobController::class, 'index']);
Route::get('/job/{job}', [JobController::class, 'show']);
Route::delete('/job/{job}', [JobController::class, 'destroy']);
Route::put('/job/{job}', [JobController::class, 'update']);



Route::fallback(function (){
    return response(['message'=>'URL not found'],404);
});
