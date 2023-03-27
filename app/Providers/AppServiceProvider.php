<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //Set default string length to 191 to allow MySQL versions older than 5.7.7 on Windows to create indexes for migrations.
        Schema::defaultStringLength(191);
        //Register the ReCaptcha Validator if ReCaptcha is enabled.
        if (config('services.recaptcha.enabled')) {
            Validator::extend('recaptcha', 'App\\Validators\\ReCaptcha@validate');
        }
    }

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }
}
