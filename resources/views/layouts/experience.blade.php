<section id="page-experience" class="page-experience">
    <div class="container">
        <header class="section-header">
             <h2 class="section-title"><span>Experience</span></h2>
            <div class="spacer"></div>
                <p class="section-subtitle">@isset($subtitles['experience_subtitle']) {{ $subtitles['experience_subtitle'] }} @endisset</p>

        </header>
        <div class="row">
            @foreach ($experiences as $experience)
                <div class="col-lg-{{ 12 / count($experiences)  }}">
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