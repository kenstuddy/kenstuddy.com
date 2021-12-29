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
        //Here we could use the DB query builder as it provides slightly better performance, but Eloquent provides extra functionality.
        $educations = Education::where('active', 1)->get();
        $experiences = Experience::where('active', 1)->get();
        $portfolios = Portfolio::where('active', 1)->get();
        $page = Page::where('name', 'home')->first() ?? new Page();
        $slider = Slider::where('name', 'home')->first() ?? new Slider();
        $contact = Contact::where('name', 'home')->first() ?? new Contact();
        $subtitles = Subtitle::where('name', 'home')->first() ?? new Subtitle();
        $useReCaptcha = config('services.recaptcha.enabled');
        $reCaptchaKey = config('services.recaptcha.key');

        return view('home.index', compact('educations', 'experiences', 'portfolios', 'page', 'slider', 'contact', 'subtitles', 'useReCaptcha', 'reCaptchaKey'));
    }
}
