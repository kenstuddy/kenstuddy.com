<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

use App\ArticlesText;
class ArticlesTextTableSeeder extends Seeder
{
    public function run()
    {
        $this->faker = Faker::create();
        $articlesText = new ArticlesText();
        $articlesText->name = "articles";
        $articlesText->articles_link_text = "Click here for more articles";
        $articlesText->article_link_text = "Click here to read this article";
        $articlesText->articles_posted_text = "Published";
        $articlesText->article_posted_text = "";
        $articlesText->save();
    }
}