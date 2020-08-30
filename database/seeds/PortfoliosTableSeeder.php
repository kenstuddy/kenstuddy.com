<?php

use App\Models\Portfolio;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PortfoliosTableSeeder extends Seeder
{
    public function run()
    {
        $this->faker = Faker::create();
        $portfolios = $this->faker->numberBetween(2, 4);
        for ($portfoliosCounter = 0; $portfoliosCounter < $portfolios; $portfoliosCounter++) {
            $name = $this->faker->word;
            $portfolio = new Portfolio();
            $portfolio->name = $portfoliosCounter + 1;
            $portfolio->alt_text = $name;
            $portfolio->title = $name;
            $portfolio->save();
        }
    }
}
