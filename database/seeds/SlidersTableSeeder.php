<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

use App\Slider;
class SlidersTableSeeder extends Seeder
{
    public function run()
    {
        $this->faker = Faker::create();
        $slider = new Slider();
        $slider->name = "home";
        $slider->my_name = $this->faker->name;
        $slider->my_title = $this->faker->jobTitle;
        $slider->button_text = "Contact Me";
        $slider->primary_url = "https://linkedin.com";
        $slider->secondary_url = "https://github.com";
        $slider->save();
    }
}