<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(SlidersTableSeeder::class);
        $this->call(EducationTableSeeder::class);
        $this->call(ExperiencesTableSeeder::class);
    }
}
