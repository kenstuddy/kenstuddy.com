<!-- Author: Ken Studdy -->
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<meta name="description" content="{{ !empty($article) ? $page['page_title'] . " - " . $article->title : $page['page_title'] }}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="csrf-token" content="{{ csrf_token() }}">
<link rel="stylesheet" href="{{ mix('css/app.css') }}">
<link rel="shortcut icon" href="{{ asset('img/favicon.ico') }}">
<script id="darkmode" src="{{ mix('js/dark-mode.js') }}"></script>
<script src="{{ mix('js/dark-toggle.js') }}"></script>
<script>loadDarkMode();</script>