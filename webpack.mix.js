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
    'resources/assets/css/other.css',
    'resources/assets/css/main.css'
], 'public/css/app.css')
   .js([
    'resources/assets/js/app.js',
    'resources/assets/js/jquery.scrollTo.js',
    'resources/assets/js/jquery.nav.js',
    'resources/assets/js/jquery.sticky.js',
    'resources/assets/js/vegas.js',
    'resources/assets/js/jquery.isotope.js',
    'resources/assets/js/jquery.magnific-popup.js',
    'resources/assets/js/waypoints.js',
    'resources/assets/js/jqBootstrapValidation.js',
    'resources/assets/js/contact_me.js',
    'resources/assets/js/main.js'
], 'public/js/app.js').extract(['jquery','vue']);
