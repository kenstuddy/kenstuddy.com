<section id="page-profile" class="page-profile">
    <div class="container">
        <header class="section-header">
            <div class="spacer"></div>
            @isset($subtitles['article_subtitle'])
                <p class="section-subtitle">{{ $subtitles['article_subtitle'] }}</p>
            @endisset
        </header>
        <div class="row">
            <div class="col-lg-12">
                <article class="article center-block text-center">
                    <header>
                        <aside class="text-center article-profile">
                            <div>
                                <a href="/"><img class="rounded-circle article-profile-image" src="/img/{{ $article->image }}" title="{{ $article->author_name }}" alt="{{ $article->author_name }}"></a>
                            </div>
                            <div class="text-left author-info">
                                <h5>
                                    {{ $article->author_name }}
                                </h5>
                                <div>
                                    <p>
                                      {{ $article->byline }}
                                    </p>
                                    <p>
                                      @if(!empty($articlesText['article_posted_text'])){{ $articlesText['article_posted_text'] }}@endif {{ $article->created_at->diffForHumans() }} - {{ $article->created_at->toDayDateTimeString() }}
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </header>
                </article>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12" style="margin-bottom: -50px">
                <article class="article center-block text-center">
                    <header>
                        <h1>{{ $article->title }}</h1>
                        <p>{!! html_entity_decode($article->description) !!}</p>
                    </header>
                </article>
            </div>
        </div>
    </div>
</section>
<section id="page-article" class="page-article">
    <div class="container article center-block text-center">
        <div class="row">
             <div class="col-lg-12">
                 <header class="section-header">
                    <div class="spacer"></div>
                    @isset($subtitles['article_alternate_subtitle'])
                        <p class="section-subtitle">{{ $subtitles['article_alternate_subtitle'] }}</p>
                    @endisset
                </header>
                <div class="row">
                    <div class="col-lg-12">
                        <article class="article text-left markdown-body">
                            <p>{!! GitDown::parseAndCache($article->content) !!}</p>
                        </article>
                    </div>
                </div>
             </div>
        </div>
        @if(!empty($articlesText['articles_link_text']))
            <p><a href="/articles">{{ $articlesText['articles_link_text'] }}</a></p>
        @endif
    </div>
</section>
@if(config("app.contact_form_on_article") === true)
    @include('layouts.contact')
@endif