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
    'resources/css/fonts.css',
    'resources/css/main.css'
], 'public/css/app.css')
   .scripts('node_modules/darkreader/darkreader.js','public/js/dark-mode.js')
   .scripts('resources/js/darktoggle.js','public/js/dark-toggle.js')
   .js([
    'resources/js/main.js',
    'resources/js/app.js'
], 'public/js/app.js').extract(['vue']);