<section id="page-portfolio" class="page-portfolio">
    <div class="container">
        <div>
            <header class="section-header">
                    <h2 class="section-title">
                        <span>Portfolio</span>
                    </h2>
                    <div class="spacer"></div>
                    <p class="section-subtitle">@isset($subtitles['portfolio_subtitle']) {{ $subtitles['portfolio_subtitle'] }} @endisset</p>
                </header>
            <div id="grid" class="row grid-wrapper">
                @foreach ($portfolios as $portfolio)
                    <div class="mix col-xs-12 col-sm-12 col-md-{{ 12 / count($portfolios) }} col-lg-{{ 12 / count($portfolios) }} col-lg-{{ 12 / count($portfolios) }} text-center">
                        <div class="overlay">
                            <img loading="lazy" v-img:group="{src: './img/portfolio/large/{{ $portfolio->name }}.jpg'}" src="./img/portfolio/small/{{ $portfolio->name }}.jpg" class="mobile-img img-fluid center-block mx-auto overlayblue" alt="{{ $portfolio->alt_text }}" title="{{ $portfolio->title }}">
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</section>