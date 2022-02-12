<?php

namespace Database\Seeders;

use App\Models\Page;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PagesTableSeeder extends Seeder
{
    public function run()
    {
        $this->faker = Faker::create();
        $name = $this->faker->name();
        $homePage = new Page();
        $homePage->name = 'home';
        $homePage->title = $this->faker->words(2, true);
        $homePage->subtitle = $this->faker->sentence();
        $homePage->intro_paragraph = $this->faker->paragraphs($this->faker->numberBetween(3, 6), true);
        $homePage->page_title = $name.' - Home';
        $homePage->save();

        $articlesPage = new Page();
        $articlesPage->name = 'articles';
        $articlesPage->page_title = $name.' - Articles';
        $articlesPage->title = 'Articles';
        $articlesPage->subtitle = $this->faker->sentence();
        $articlesPage->save();

        $articlePage = new Page();
        $articlePage->name = 'article';
        $articlePage->page_title = $name;
        $articlePage->save();
    }
}
