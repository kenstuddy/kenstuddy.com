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
        //We should only run the seeders if this is a non-production environment.
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
