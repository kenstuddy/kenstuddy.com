<section id="page-contact" class="page-contact">

    <contact use_recaptcha="{{ $useReCaptcha }}" @if($useReCaptcha) datasite_key="{{$reCaptchaKey}}"
             @endif contact_subtitle="@isset($contact['contact_subtitle']) {{ $contact['contact_subtitle'] }} @endisset"
             contact_email="@isset($contact['contact_email']) {{ $contact['contact_email'] }} @endisset"
             contact_phone="@isset($contact['contact_phone']) {{ $contact['contact_phone'] }} @endisset"
             contact_sentence="@isset($contact['contact_sentence']) {{ $contact['contact_sentence'] }} @endisset">
    </contact>

</section>