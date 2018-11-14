<div id="app">    
    <section id="page-welcome" class="page-welcome">
        <slider></slider>
    </section>
    <section id="page-profile" class="page-profile">
        <div class="container">
            <header class="section-header">
                <h2 class="section-title">Hello there</h2>
                <div class="spacer"></div>
                <p class="section-subtitle">Welcome to my website.</p>
            </header>
            <div class="row">
                <div class="col-lg-0"></div>
                <div class="col-lg-12">{!! html_entity_decode(data_get($page, 'intro_paragraph', ''))
                    !!}</div>
            </div>
        </div>
    </section>
    <section id="page-education" class="page-education">
        <div class="container">
            <header class="section-header">
                 <h2 class="section-title"><span>Education</span></h2>
                <div class="spacer"></div>
                <p class="section-subtitle"></p>
            </header>
            <div class="row">
                @foreach ($educations as $education)
                    <div class="col-lg-6">
                        <article class="education">
                            <header>
                                <h3>{{ $education->organization }}</h3>
                                <p>{{ $education->credential }}
                                    @if (is_null($education->string_year))
                                        @if (is_null($education->start_year))
                                            / {{ $education->end_year }}
                                        @else
                                            / {{ $education->start_year }} - {{ $education->end_year }}
                                        @endif
                                    @else
                                       {!! html_entity_decode($education->string_year) !!}
                                    @endif
                                </p>
                            </header>
                            <p>{{ $education->description }}</p>
                        </article>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
    <section id="page-experience" class="page-experience">
        <div class="container">
            <header class="section-header">
                 <h2 class="section-title"><span>Experience</span></h2>
                <div class="spacer"></div>
                <p class="section-subtitle"></p>
            </header>
            <div class="row">
                @foreach ($experiences as $experience)
                    <div class="col-lg-4">
                        <article class="experience">
                            <header>
                                <h3>{{ $experience->position }}</h3>
                                @if (is_null($experience->string_year))
                                    @if (is_null($experience->company))
                                        <p>{{ $experience->location }} / {{ $experience->start_year }} - {{
                                            $experience->end_year }}</p>
                                    @else
                                        <p>{{ $experience->company }} / {{ $experience->location }} / {{ $experience->start_year }} - {{ $experience->end_year }}</p>
                                    @endif
                                @elseif (is_null($experience->company))
                                    <p>{{ $experience->location }} / {!! html_entity_decode($experience->string_year) !!}</p>
                                @else
                                    <p>{{ $experience->company }} / {{ $experience->location }} / {!! html_entity_decode($experience->string_year) !!}</p>
                                @endif
                            </header>
                            <p>{{ $experience->description }}</p>
                        </article>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
    <section id="page-portfolio" class="page-portfolio">
        <div class="container">
            <div>
                <header class="section-header">
                        <h2 class="section-title">
                            <span>Portfolio</span>
                        </h2>
                        <div class="spacer"></div>
                        <p class="section-subtitle"></p>
                    </header>
                <div id="grid" class="row grid-wrapper">
                    @foreach ($portfolios as $portfolio)
                        <div class="mix col-xs-12 col-sm-12 col-md-3 col-lg-3 col-lg-3">
                            <div class="overlay text-center">
                                <img v-img:group src="./img/portfolio/large/{{ $portfolio->name }}.jpg" class="mobile-img img-fluid center-block mx-auto overlayblue" alt="My image">
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </section>
    <img id="hidden" style="display:none" />