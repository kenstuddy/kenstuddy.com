<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticlesText;
use App\Models\Contact;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Home;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\Slider;
use App\Models\Subtitle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::orderBy('published_at', 'DESC')->where('published', 1)->simplePaginate(5) ?? new Article();
        $page = Page::where('name', 'articles')->first() ?? new Page();
        $contact = Contact::where('name', 'articles')->first() ?? new Contact();
        $subtitles = Subtitle::where('name', 'articles')->first() ?? new Subtitle();
        $articlesText = ArticlesText::where('name', 'articles')->first() ?? new ArticlesText();
        $useReCaptcha = config('services.recaptcha.enabled');
        $reCaptchaKey = config('services.recaptcha.key');

        return view('article.index', compact('articles', 'page', 'contact', 'subtitles', 'articlesText', 'useReCaptcha', 'reCaptchaKey'));
    }

    public function show($slug)
    {
        $article = Article::where('published', 1)->where('slug', $slug)->firstOrFail();
        $page = Page::where('name', 'article')->first();
        $contact = Contact::where('name', 'article')->first();
        $subtitles = Subtitle::where('name', 'articles')->first();
        $articlesText = ArticlesText::where('name', 'articles')->first();
        $article->increment('views');
        $article->save();
        $useReCaptcha = config('services.recaptcha.enabled');
        $reCaptchaKey = config('services.recaptcha.key');

        return view('article.show', compact('article', 'page', 'contact', 'subtitles', 'articlesText', 'useReCaptcha', 'reCaptchaKey'));
    }
}
