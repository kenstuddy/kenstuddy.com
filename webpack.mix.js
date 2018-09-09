let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.styles([
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/normalize.css/normalize.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'resources/assets/css/fonts.css',
    'resources/assets/css/main.css'
], 'public/css/app.css')
   .js([
    'resources/assets/js/app.js'
], 'public/js/app.js').extract(['vue']);
