<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExperienceFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $seasons = ['Winter', 'Spring', 'Summer', 'Fall'];

        return [
            'position' => $this->faker->jobTitle(),
            'company' => $this->faker->company(),
            'location' => $this->faker->city(),
            'start_year' => (string) Carbon::now()->subYear()->year,
            'end_year' => (string) Carbon::now()->year,
            'string_year' => $seasons[mt_rand(0, 3)].Carbon::now()->subYear()->year,
            'description' => $this->faker->paragraph(),
            'active' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
