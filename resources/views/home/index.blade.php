<!DOCTYPE html>
<html class="no-js" lang="en">
    <head>
        @include('layouts.header')
        @extends('layouts.headermeta')
        @section('title')
            {{ $page['page_title'] }}
        @endsection
    </head>
    <body>
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
