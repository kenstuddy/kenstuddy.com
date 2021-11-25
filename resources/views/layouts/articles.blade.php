<section id="page-articles" class="page-articles {{ theme("bg-darker", "bg-white") }}">
    <div class="container container-custom">
        <header class="section-header">
            <div class="spacer"></div>
            @isset($subtitles['articles_subtitle'])
                <p class="section-subtitle {{ theme("text-gray-light", "text-gray") }}">{{ $subtitles['articles_subtitle'] }}</p>
            @endisset
        </header>
        <div class="row">
            @foreach ($articles as $article)
                <div class="col-lg-12">
                    <article class="article center-block text-center">
                        <header>
                            <h3 class="articles-top"><a class="article-title {{ theme("text-gray-light", "text-gray") }}" href="/article/{{$article->slug}}">{{ $article->title }}</a></h3>
                            <div class="col-lg-12">
                                <p class="{{ theme("text-gray-light", "text-gray") }}">{{ $article->subtitle }}</p>
                            </div>
                            <p class="{{ theme("text-gray-light", "text-gray") }}">@if(!empty($articlesText['articles_posted_text'])){{ $articlesText['articles_posted_text'] }}@endif {{ $article->created_at->diffForHumans() }} - {{ $article->created_at->toDayDateTimeString() }}
                            </p>
                            <p class="{{ theme("text-gray-light", "text-gray") }}"><a href="/article/{{$article->slug}}">@if(!empty($articlesText['article_link_text'])){{ $articlesText['article_link_text'] }}@endif</a></p>
                        </header>
                    </article>
                </div>
            @endforeach
        </div>
        <div class="col-lg-12">{{$articles->links("pagination.pages")}}</div>
    </div>
</section>
@if(config("app.contact_form_on_articles") === true)
    @include('layouts.contact')
@endif