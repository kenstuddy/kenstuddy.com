<?php

use Carbon\Carbon;
use App\Experience;
use Faker\Generator as Faker;

$factory->define(Experience::class, function (Faker $faker) {
    $seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
    return [
        'position' => $faker->jobTitle,
        'company' => $faker->company,
        'location' => $faker->city,
        'start_year' => (string) Carbon::now()->subYear()->year,
        'end_year' => (string) Carbon::now()->year,
        'string_year' => $seasons[mt_rand(0, 3)] . Carbon::now()->subYear()->year,
        'description' => $faker->paragraph(),
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ];
});
