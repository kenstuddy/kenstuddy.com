<?php

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

use App\Http\Controllers\ArticleController;

Route::get('/', 'HomeController@index');
Route::get('/home', 'HomeController@index');

Route::get('/articles', function() {
    $app = app();
    $articleController = $app->make(ArticleController::class);
    return (config("app.articles_enabled")) ? $articleController->callAction('index', []) : redirect('/',302);
});

Route::get('/article/{slug}', function($slug) {
    $app = app();
    $articleController = $app->make(ArticleController::class);
    return (config("app.articles_enabled")) ? $articleController->callAction('show', compact('slug')) : redirect('/',302);
});