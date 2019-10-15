<section id="page-articles" class="page-articles">
    <div class="container">
        <header class="section-header">
            <div class="spacer"></div>
            <p class="section-subtitle">{{ $subtitles['articles_subtitle'] }}</p>
        </header>
        <div class="row">
            @foreach ($articles as $article)
                <div class="col-lg-12">
                    <article class="article center-block text-center">
                        <header>
                            <h3 class="articles-top"><a class="article-title" href="/article/{{$article->slug}}">{{ $article->title }}</a></h3>
                            <div class="col-lg-12">
                                <p>{{ $article->subtitle }}</p>
                            </div>
                            <p>{{ $articlesText['articles_posted_text'] }} {{ $article->created_at->diffForHumans() }} - {{ $article->created_at->toDayDateTimeString() }}
                            </p>
                            <p><a href="/article/{{$article->slug}}">{{ $articlesText['article_link_text'] }}</a></p>
                        </header>
                    </article>
                </div>
            @endforeach
        </div>
        <div class="col-lg-12">{{$articles->links()}}</div>
    </div>
</section>
@if(config("app.contact_form_on_articles") === true)
    @include('layouts.contact')
@endif