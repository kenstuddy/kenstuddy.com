<?php

use Carbon\Carbon;
use Faker\Generator as Faker;
use App\Portfolio;

$factory->define(Portfolio::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ];
});
