<?php

namespace App\Http\Controllers;

use App\Article;
use App\ArticlesText;
use App\Contact;
use App\Subtitle;
use App\Home;
use App\Page;
use App\Education;
use App\Portfolio;
use App\Experience;
use App\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArticleController extends Controller
{
    public function index()
    {

        $articles = Article::orderBy('published_at', 'DESC')->where('published', 1)->simplePaginate(5);
        $page = Page::where('name', 'articles')->first();
        $contact = Contact::where('name', 'articles')->first();
        $subtitles = Subtitle::where('name', 'articles')->first();
        $articlesText = ArticlesText::where('name','articles')->first();

        return view('article.index', compact('articles', 'page', 'contact', 'subtitles','articlesText'));
    }

    public function show($slug)
    {
        $article = Article::where('published', 1)->where('slug', $slug)->firstOrFail();
        $page = Page::where('name', 'article')->first();
        $contact = Contact::where('name', 'article')->first();
        $subtitles = Subtitle::where('name', 'articles')->first();
        $articlesText = ArticlesText::where('name','articles')->first();

        return view('article.show', compact('article', 'page', 'contact', 'subtitles','articlesText'));
    }
}
