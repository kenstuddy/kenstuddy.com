<!DOCTYPE html>
<html class="no-js" lang="en">
    @extends('layouts.header')
    @section('title', $page['page_title'] . " - " . $article->title)
    <body>
        @include('layouts.nav')
        <div id="app">
            @include('layouts.article')
        </div>
        @include('layouts.footer')
    </body>
</html>
