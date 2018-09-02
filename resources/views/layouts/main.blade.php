<section id="page-welcome" class="page-welcome">
    <div>
        <ul class="slider-controls">
            <li>
                <a id="vegas-next" class="next" href="javascript:void(0)"></a>
            </li>
            <li>
                <a id="vegas-prev" class="prev" href="javascript:void(0)"></a>
            </li>
        </ul>
    </div>
    <div class="container">
        <div class="centered">
            <header class="centered">
                 <h1 class="my-name">Ken Studdy</h1>
                <p class="my-title">Full Stack Web Developer</p>
            </header>
            <div class="socia-icons"> <a href="https://www.linkedin.com/in/kenstuddy" target="_blank" class="btn btn-round btn-clear btn-lin"><i class="fa my-fa-linkedin-square"></i></a>
                <a
                href="https://github.com/kenstuddy" target="_blank" class="btn btn-round btn-clear btn-github"><i class="fa my-fa-github-square"></i>
                    </a>
            </div> <a href="#page-contact" class="btn btn-secondary contact-me">Contact Me</a>
        </div>
    </div>
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
        <div class="row">@foreach ($educations as $education)
            <div class="col-lg-6">
                <article class="education">
                    <header>
                         <h3>{{ $education->organization }}</h3>
                        <p>{{ $education->credential }} - <strong>Graduated: </strong>{{ $education->year
                            }}</p>
                    </header>
                    <p>{{ $education->description }}</p>
                </article>
            </div>@endforeach</div>
    </div>
</section>
<section id="page-experience" class="page-experience">
    <div class="container">
        <header class="section-header">
             <h2 class="section-title"><span>Experience</span></h2>
            <div class="spacer"></div>
            <p class="section-subtitle"></p>
        </header>
        <div class="row">@foreach ($experiences as $experience)
            <div class="col-lg-4">
                <article class="experience">
                    <header>
                         <h3>{{ $experience->position }}</h3>
                        @if (is_null($experience->string_year)) @if (is_null($experience->company))
                        <p>{{ $experience->location }} / {{ $experience->start_year }} - {{
                            $experience->end_year }}</p>@else
                        <p>{{ $experience->company}} / {{ $experience->location }} / {{ $experience->start_year
                            }} - {{ $experience->end_year }}</p>@endif @elseif (is_null($experience->company))
                        <p>{{ $experience->location }} / {{ $experience->string_year }}</p>@else
                        <p>{{ $experience->company }} / {{ $experience->location }} / {{ $experience->string_year
                            }}</p>@endif</header>
                    <p>{{ $experience->description }}</p>
                </article>
            </div>@endforeach</div>
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
            <div id="grid" class="grid-wrapper">
                @foreach ($portfolios as $portfolio)
                    <div class="mix col-sm-12 col-md-12 col-lg-3 col-lg-3">
                        <a class="" href="img/portfolio/large/{{ $portfolio->name }}.jpg">
                            <div class="overlay text-center">
                                <img src="./img/portfolio/small/{{ $portfolio->name }}.jpg" class="mobile-img img-fluid center-block mx-auto overlayblue" alt="My image">
                            </div>
                        </a>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</section>