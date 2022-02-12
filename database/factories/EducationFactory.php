<?php

namespace Database\Factories;

use App\Models\Education;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class EducationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'organization' => $this->faker->name(),
            'credential' => $this->faker->name(),
            'string_year' => Carbon::now()->subYear()->year,
            'description' => $this->faker->paragraph(),
            'active' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
