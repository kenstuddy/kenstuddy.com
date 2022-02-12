<?php

namespace Database\Seeders;

use App\Models\Experience;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExperiencesTableSeeder extends Seeder
{
    public function run()
    {
        $this->faker = Faker::create();
        $experienceYear = $this->faker->numberBetween(2015, 2017);
        $experiences = $this->faker->numberBetween(1, 3);
        for ($experiencesCounter = 0; $experiencesCounter < $experiences; $experiencesCounter++) {
            $experience = new Experience();
            $experience->position = $this->faker->jobTitle();
            $experience->company = $this->faker->company();
            $experience->location = $this->faker->city().', '.$this->faker->country();
            $experience->start_year = $experienceYear - (2 * $experiencesCounter);
            $experience->end_year = $experienceYear - (1 * $experiencesCounter);
            $experience->description = $this->faker->paragraph();
            $experience->active = 1;
            $experience->save();
        }
    }
}
