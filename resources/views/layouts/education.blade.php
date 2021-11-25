<section id="page-education" class="page-education {{ theme("bg-darker", "bg-white") }}">
    <div class="container container-custom">
        <header class="section-header">
             <h2 class="section-title {{ theme("text-dark-title-light","text-dark-title") }}"><span>Education</span></h2>
            <div class="spacer"></div>
            <p class="section-subtitle {{ theme("text-gray-light", "text-gray") }}">@isset($subtitles['education_subtitle']) {{ $subtitles['education_subtitle'] }} @endisset</p>
        </header>
        <div class="row">
            @foreach ($educations as $education)
                <div class="col-lg-{{ 12 / count($educations)  }}">
                    <article class="education">
                        <header>
                            <h3 class="{{ theme("text-gray-light", "text-gray") }}">{{ $education->organization }}</h3>
                            <p class="{{ theme("text-gray-light", "text-gray") }}">{{ $education->credential }}
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
                        <p class="{{ theme("text-gray-light", "text-gray") }}">{{ $education->description }}</p>
                    </article>
                </div>
            @endforeach
        </div>
    </div>
</section>