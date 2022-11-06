<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\AuthController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{id}', [BookController::class, 'show']);
Route::get('/getByRecommended', [BookController::class, 'getByRecommended']);
Route::get('/getByPopular', [BookController::class, 'getByPopular']);

Route::get('/sales', [BookController::class, 'sale']);
Route::get('/getByNew/{id}', [ReviewController::class, 'getReviewByNewsest']);
Route::get('/getByOld/{id}', [ReviewController::class, 'getReviewByOldset']);

Route::get('/sortLowToHigh', [BookController::class, 'sortLowToHigh']);
Route::get('/sortHighToLow', [BookController::class, 'sortHighToLow']);
Route::get('/sortPopular', [BookController::class, 'sortPopular']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

Route::get('/authors', [AuthorController::class, 'index']);
Route::get('/authors/{id}', [AuthorController::class, 'show']);