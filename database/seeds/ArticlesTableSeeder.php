<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

use App\Article;
class ArticlesTableSeeder extends Seeder
{
    public function run()
    {
        $this->faker = Faker::create();
        $name = $this->faker->name;
        $byline = $this->faker->jobTitle;
        $image = "default.jpg";
        $articles = $this->faker->numberBetween(1, 50);
        for ($articlesCounter = 0; $articlesCounter < $articles; $articlesCounter++) {
            $title = $this->faker->sentence;
            $article = new Article();
            $article->author_name = $name;
            $article->byline = $byline;
            $article->image = $image;
            $article->title = $title;
            $article->slug = substr(str_replace(" ", "-", $title), 0 , -1);
            $article->subtitle = $this->faker->sentence;
            $article->description = $this->faker->sentence;
            $article->content = $this->faker->paragraphs($this->faker->numberBetween(1, 10), true);
            $article->published = $this->faker->numberBetween(0, 1);
            $article->save();
        }
    }
}