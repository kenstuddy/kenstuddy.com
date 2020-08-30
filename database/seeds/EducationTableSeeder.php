<?php

use App\Models\Education;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EducationTableSeeder extends Seeder
{
    public function run()
    {
        $this->faker = Faker::create();
        $graduationYear = $this->faker->numberBetween(2009, 2013);
        $educations = $this->faker->numberBetween(1, 2);
        $organizations = [
            'Durham College',
            'Humber College',
            'Algonquin College',
            'Seneca College',
            'Centennial College',
            'Ontario Tech University',
            'University of Toronto',
            'University of Ottawa',
            'University of Waterloo',
        ];
        $credentials = [
            'Computer Programmer Analyst',
            'Computer Systems Technology',
            'Computer Science',
            'Computer Engineering',
        ];
        for ($educationsCounter = 0; $educationsCounter < $educations; $educationsCounter++) {
            $education = new Education();
            $education->organization = Arr::random($organizations);
            $education->credential = Arr::random($credentials);
            $education->string_year = ' - Graduated: '.($graduationYear - ($educationsCounter * 2));
            $education->description = $this->faker->paragraph;
            $education->save();
        }
    }
}
