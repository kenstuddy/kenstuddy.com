<html>
<head></head>
<body>
<p>Name: {{ $contact->name }}
<p>Email: {{ $contact->email }}</p>
<p style="white-space: pre-wrap;">Message: {!! nl2br($contact->message) !!}</p>
</body>
</html>