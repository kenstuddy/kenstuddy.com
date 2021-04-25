<section id="page-profile" class="page-profile {{ theme("bg-gray-dark", "bg-gray") }}">
    <div class="container">
        <header class="section-header">
            <h2 class="section-title {{ theme("text-dark-title-light","text-dark-title") }}">{{ $page['title'] }}</h2>
            <div class="spacer"></div>
            <p class="section-subtitle {{ theme("text-gray-light", "text-gray") }}">@isset($page['subtitle']) {{ $page['subtitle'] }} @endisset</p>
        </header>
        <div class="row">
            <div class="col-lg-0"></div>
            <div class="col-lg-12 {{ theme("text-gray-light", "text-gray") }}">{!! html_entity_decode(data_get($page, 'intro_paragraph', ''))
                !!}</div>
        </div>
    </div>
</section>