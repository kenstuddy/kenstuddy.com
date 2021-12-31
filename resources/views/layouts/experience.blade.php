<section id="page-experience" class="page-experience {{ theme("bg-gray-dark", "bg-gray") }}">
    <div class="container container-custom">
        <header class="section-header">
             <h2 class="section-title {{ theme("text-dark-title-light","text-dark-title") }}"><span>Experience</span></h2>
            <div class="spacer"></div>
                <p class="section-subtitle {{ theme("text-gray-light", "text-gray") }}">@isset($subtitles['experience_subtitle']) {{ $subtitles['experience_subtitle'] }} @endisset</p>

        </header>
        <div class="row">
            @foreach ($experiences as $experience)
                <div class="col-lg-{{ 12 / min(3, count($experiences)) }}">
                    <article class="experience">
                        <header>
                            <h3 class="{{ theme("text-gray-light", "text-gray") }}">{{ $experience->position }}</h3>
                            @if (is_null($experience->string_year))
                                @if (is_null($experience->company))
                                    <p class="{{ theme("text-gray-light", "text-gray") }}">{{ $experience->location }} / {{ $experience->start_year }} - {{
                                        $experience->end_year }}</p>
                                @else
                                    <p class="{{ theme("text-gray-light", "text-gray") }}">{{ $experience->company }} / {{ $experience->location }} / {{ $experience->start_year }} - {{ $experience->end_year }}</p>
                                @endif
                            @elseif (is_null($experience->company))
                                <p class="{{ theme("text-gray-light", "text-gray") }}">{{ $experience->location }} / {!! html_entity_decode($experience->string_year) !!}</p>
                            @else
                                <p class="{{ theme("text-gray-light", "text-gray") }}">{{ $experience->company }} / {{ $experience->location }} / {!! html_entity_decode($experience->string_year) !!}</p>
                            @endif
                        </header>
                        <p class="{{ theme("text-gray-light", "text-gray") }}">{{ $experience->description }}</p>
                    </article>
                </div>
            @endforeach
        </div>
    </div>
</section>