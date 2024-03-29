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
            @include('layouts.welcome')
            @include('layouts.profile')
            @include('layouts.education')
            @include('layouts.experience')
            @include('layouts.portfolio')
            @include('layouts.contact')
        </div>
        @include('layouts.footer')
    </body>
</html>
