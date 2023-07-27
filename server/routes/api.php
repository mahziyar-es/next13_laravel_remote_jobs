<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Exceptions\NotFoundException;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\ResumeController;
use App\Http\Controllers\Api\SkillController;
use App\Models\Job;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

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




Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);

    Route::get('job/{job}/applications', [JobController::class, 'applications']);
    Route::post('job', [JobController::class, 'store']);
    Route::put('job/{job}', [JobController::class, 'update']);
    Route::delete('job/{job}', [JobController::class, 'destroy']);

    Route::post('resume', [ResumeController::class, 'store']);
    Route::delete('resume/{resume}', [ResumeController::class, 'destroy']);

    Route::post('apply', [JobController::class, 'apply']);

    Route::patch('application/{application}/reviewed', [ApplicationController::class, 'reviewed']);

    Route::get('user', [AuthController::class, 'user']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::get('/oauth/link', [AuthController::class, 'oauthLink']);
Route::get('/oauth/callback', [AuthController::class, 'oauthCallback']);

Route::get('country', [CountryController::class, 'search']);

Route::get('skill', [SkillController::class, 'search']);

Route::get('job', [JobController::class, 'list']);
Route::get('job/{job}', [JobController::class, 'show']);

Route::get('rrr', function(){
    $job = Job::find(41);

    $job -> applications() -> delete();

    $users = User::inRandomOrder()->take(10)->get();

    $app = [];

    foreach($users as $user){
        $app[] = [
            'user_id' => $user['id'],
            'resume_id' => 1,
        ];
    }

    $job -> applications() -> createMany($app);

});
















// Route::post('/login1', function(){
//     $user = User::first();
//     Auth::login($user);

//     return response(['message'=>'logedin']);

// });

// Route::post('/check1', function(Request $request){
//     $user = Auth::guard('web')->user();

//     return response([
//         'a'=>'a',
//         'user'=> $user,
//     ]);
// })->middleware('auth:sanctum');

// Route::post('/logout1', function(Request $request){
//     Auth::guard('web')->logout();

//     return response([
//         'message'=>'loggedOut',
//     ]);
// })->middleware('auth:sanctum');



Route::fallback(function (){
    return response(['message'=>'URL not found'],404);
});
