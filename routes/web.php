<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [MainController::class, 'home']);
Route::get('/about', [MainController::class, 'about']);

Route::get('/rewiew', [MainController::class, 'rewiew']);

Route::post('/dictionary/add', [MainController::class, 'addDictionary']);
Route::post('/dictionary/load', [MainController::class, 'loadDictionaries']);
Route::post('/dictionary/loadDictionaryWords', [MainController::class, 'loadDictionaryWords']);


// Route::get('/test/{id}/{name}', function ($id, $name) {
//     return "$id + $name";
// });
