<!DOCTYPE html>
<html class="no-js" lang="en">
    @extends('layouts.header')
    @section('title', $page['page_title'])
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
