<?php

namespace Database\Seeders;

use App\Models\ArticlesText;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class ArticlesTextTableSeeder extends Seeder
{
    public function run(): void
    {
        $this->faker = Faker::create();
        $articlesText = new ArticlesText;
        $articlesText->name = 'articles';
        $articlesText->articles_link_text = 'Click here for more articles';
        $articlesText->article_link_text = 'Click here to read this article';
        $articlesText->articles_posted_text = 'Published';
        $articlesText->article_posted_text = '';
        $articlesText->save();
    }
}
