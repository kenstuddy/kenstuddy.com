<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Set default string length to 191 to allow MySQL versions older than 5.7.7 on Windows to create indexes for migrations.
        Schema::defaultStringLength(191);
        // Register the ReCaptcha Validator if ReCaptcha is enabled.
        if (config('services.recaptcha.enabled')) {
            Validator::extend('recaptcha', 'App\\Validators\\ReCaptcha@validate');
        }

        $this->bootRoute();
    }

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    public function bootRoute(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}
