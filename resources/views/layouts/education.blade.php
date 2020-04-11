<section id="page-education" class="page-education">
    <div class="container">
        <header class="section-header">
             <h2 class="section-title"><span>Education</span></h2>
            <div class="spacer"></div>
            <p class="section-subtitle">@isset($subtitles['education_subtitle']) {{ $subtitles['education_subtitle'] }} @endisset</p>
        </header>
        <div class="row">
            @foreach ($educations as $education)
                <div class="col-lg-{{ 12 / count($educations)  }}">
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