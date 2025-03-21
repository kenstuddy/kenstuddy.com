<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // We should only run the seeders if this is a non-production environment.
        if (App::environment(['local', 'staging'])) {
            $this->call(SlidersTableSeeder::class);
            $this->call(EducationTableSeeder::class);
            $this->call(ExperiencesTableSeeder::class);
            $this->call(PortfoliosTableSeeder::class);
            $this->call(ContactsTableSeeder::class);
            $this->call(ArticlesTextTableSeeder::class);
            $this->call(ArticlesTableSeeder::class);
            $this->call(PagesTableSeeder::class);
            $this->call(SubtitlesTableSeeder::class);
        }
    }
}
