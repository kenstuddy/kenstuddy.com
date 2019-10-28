<!DOCTYPE html>
<html class="no-js" lang="en">
    @extends('layouts.header')
    @section('title', $page['page_title'])
    @section('css')
        @gitdown
    @endsection
    <body>
        @include('layouts.nav')
        <div id="app">
            @include('layouts.profile')
            @include('layouts.articles')
        </div>
        @include('layouts.footer')
    </body>
</html>
