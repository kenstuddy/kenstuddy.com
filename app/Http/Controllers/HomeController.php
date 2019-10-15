<?php

namespace App\Http\Controllers;

use App\Contact;
use App\Subtitle;
use App\Page;
use App\Education;
use App\Portfolio;
use App\Experience;
use App\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index()
    {
        $educations = Education::all();
        $experiences = Experience::all();
        $portfolios = Portfolio::all();
        //Here we could use the DB query builder as it provides slightly better performance, but Eloquent provides extra functionality.
        $page = Page::where('name', 'home')->first();
        $slider = Slider::where('name', 'home')->first();
        $contact = Contact::where('name', 'home')->first();
        $subtitles = Subtitle::where('name', 'home')->first();

        return view('home.index', compact('educations', 'experiences', 'portfolios', 'page', 'slider', 'contact', 'subtitles'));
    }
}
