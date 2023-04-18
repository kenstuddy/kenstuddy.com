<!-- Author: Ken Studdy -->
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>{{ $title ?? "" }}</title>
<meta name="description" content="{{ !empty($article) ? $page['page_title'] . " - " . $article->title : $page['page_title'] }}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="csrf-token" content="{{ csrf_token() }}">
<link rel="stylesheet" href="{{ mix('css/app.css') }}">
<link rel="shortcut icon" href="{{ asset('img/favicon.ico') }}">
@if (isset($_COOKIE['darkmode']) && $_COOKIE['darkmode'] === "true") @php $_SESSION['darkmode'] = true @endphp @else @php $_SESSION['darkmode'] = false @endphp @endif
<script src="{{ mix('js/dark-toggle.js') }}"></script>
@if (!isset($_COOKIE['darkmode'])) <script>loadDarkMode();</script> @endif