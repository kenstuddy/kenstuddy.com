<section id="page-profile" class="page-profile">
    <div class="container">
        <header class="section-header">
            <h2 class="section-title">{{ $page['title'] }}</h2>
            <div class="spacer"></div>
            <p class="section-subtitle">{{ $page['subtitle'] }}</p>
        </header>
        <div class="row">
            <div class="col-lg-0"></div>
            <div class="col-lg-12">{!! html_entity_decode(data_get($page, 'intro_paragraph', ''))
                !!}</div>
        </div>
    </div>
</section>