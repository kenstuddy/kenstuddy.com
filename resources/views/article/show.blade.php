<!DOCTYPE html>
<html class="no-js" lang="en">
    <head>
        @include('layouts.header', ['title' => $page['page_title'] . " - " . $article->title])
        @extends('layouts.headermeta')
    </head>
    <body class="{{ theme("bg-darker", "bg-white") }}">
        @include('layouts.darkmode')
        @include('layouts.nav')
        <div id="app">
            @include('layouts.article')
        </div>
        @include('layouts.footer')
    </body>
</html>
