<!DOCTYPE html>
<html class="no-js" lang="en">
    <head>
        @include('layouts.header', ['title' => $page['page_title']])
        @extends('layouts.headermeta')
    </head>
    <body class="{{ theme("bg-darker", "bg-white") }}">
        @include('layouts.darkmode')
        @include('layouts.nav')
        <div id="app">
            @include('layouts.profile')
            @include('layouts.articles')
        </div>
        @include('layouts.footer')
    </body>
</html>
