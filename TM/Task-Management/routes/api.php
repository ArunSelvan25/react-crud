<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\Auth\{RegistrationController, LoginController};
use App\Http\Controllers\Api\V1\{DashboardController,
                                TeamManagementController,
                                ProjectManagementController,
                                SourceControlManagementController};
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;

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

Route::post('/register',[RegistrationController::class,'postRegister'])->name('post.register');
Route::post('/login',[LoginController::class,'postLogin'])->name('post.login');

Route::prefix('/source-control')->name('source-control.')->group(function () {
    Route::post('/store',[SourceControlManagementController::class,'createSourceControl'])->name('create');
    Route::post('/update',[SourceControlManagementController::class,'updateSourceControl'])->name('update');
    Route::get('/delete/{id}',[SourceControlManagementController::class,'deleteSourceControl'])->name('delete');
    Route::get('/list',[SourceControlManagementController::class,'listSourceControl'])->name('list');
    Route::get('/list/{id}',[SourceControlManagementController::class,'getSourceControlById'])->name('get-by-id');
});





Route::middleware(['auth:api', 'user-token-authorize'])->group(function () {
    Route::get('/dashboard',[DashboardController::class,'dashboard'])->name('dashboard');
    Route::get('/logout',[LoginController::class,'logout'])->name('logout');

    Route::prefix('/team')->name('team.')->group(function () {
        Route::post('/store',[TeamManagementController::class,'createTeam'])->name('create');
        Route::post('/update',[TeamManagementController::class,'updateTeam'])->name('update');
        Route::get('/delete/{id}',[TeamManagementController::class,'deleteTeam'])->name('delete');
        Route::get('/list',[TeamManagementController::class,'listTeam'])->name('list');
    });

    Route::prefix('/project')->name('project.')->group(function () {
        Route::post('/store',[ProjectManagementController::class,'createProject'])->name('create')->middleware([HandlePrecognitiveRequests::class]);
        Route::post('/update',[ProjectManagementController::class,'updateProject'])->name('update');
        Route::get('/delete/{id}',[ProjectManagementController::class,'deleteProject'])->name('delete');
        Route::get('/list',[ProjectManagementController::class,'listProject'])->name('list');
    });
});