<section id="page-portfolio" class="page-portfolio {{ theme("bg-darker", "bg-white") }}">
    <div class="container container-custom">
        <div>
            <header class="section-header">
                    <h2 class="section-title {{ theme("text-dark-title-light","text-dark-title") }}">
                        <span>Portfolio</span>
                    </h2>
                    <div class="spacer"></div>
                    <p class="section-subtitle {{ theme("text-gray-light", "text-gray") }}">@isset($subtitles['portfolio_subtitle']) {!! html_entity_decode($subtitles['portfolio_subtitle']) !!} @endisset</p>
                </header>
            <lightbox container-id="page-portfolio" :portfolios="[
            @foreach ($portfolios as $portfolio)
                {large: './img/portfolio/large/{{ $portfolio->name }}.jpg', small: './img/portfolio/small/{{ $portfolio->name }}.jpg', alt_text: '{{ $portfolio->alt_text }}', title: '{{ $portfolio->title }}'},
            @endforeach
            ]"></lightbox>
        </div>
    </div>
</section>