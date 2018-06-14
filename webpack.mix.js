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
    'node_modules/magnific-popup/dist/magnific-popup.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'node_modules/vegas/dist/vegas.css',
    'resources/assets/css/fonts.css',
    'resources/assets/css/main.css'
], 'public/css/app.css')
    .js([
    'resources/assets/js/app.js',
    'resources/assets/js/contact_me.js',
    'resources/assets/js/main.js',
    'resources/assets/js/jquery.nav.js',
    'resources/assets/js/jqBootstrapValidation.js',
    'resources/assets/js/waypoints.js',
    'resources/assets/js/jquery.sticky.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/vegas/dist/vegas.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
    'node_modules/isotope-layout/dist/isotope.pkgd.js',
    'node_modules/jquery.scrollto/jquery.scrollTo.js'
], 'public/js/app.js')
   .extract([
    'jquery',
    'vue'
]);
