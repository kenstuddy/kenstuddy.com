<?php

use App\Education;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Education::class, function (Faker $faker) {
    return [
        'organization' => $faker->name,
        'credential' => $faker->name,
        'year' => Carbon::now()->subYear()->year,
        'description' => $faker->paragraph(),
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ];
});
