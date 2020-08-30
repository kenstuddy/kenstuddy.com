<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\Slider;
use App\Models\Subtitle;
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
