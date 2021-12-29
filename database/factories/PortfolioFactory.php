<?php

use App\Models\Portfolio;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Portfolio::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'active' => 1,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ];
});
