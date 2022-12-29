<!DOCTYPE html>
<html class="no-js" lang="en">
    <head>
        @include('layouts.header')
        @extends('layouts.headermeta')
        @section('title', $page['page_title'] . " - " . $article->title)
    </head>
    <body class="{{ theme("bg-darker", "bg-white") }}">
        @include('layouts.nav')
        <div id="app">
            @include('layouts.article')
        </div>
        @include('layouts.footer')
    </body>
</html>
