<!DOCTYPE html>
<html class="no-js" lang="en">
    <head>
        @include('layouts.header')
        @extends('layouts.headermeta')
        @section('title', $page['page_title'])
    </head>
    <body class="{{ theme("bg-darker", "bg-white") }}">
        @include('layouts.nav')
        <div id="app">
            @include('layouts.profile')
            @include('layouts.articles')
        </div>
        @include('layouts.footer')
    </body>
</html>
