<section id="page-contact" class="page-contact {{ theme("bg-contact-dark", "bg-contact-light") }}">

    <contact contact_input_class="{{ theme("text-contact-input-light", "text-contact-input-dark") }}" contact_btn_border_class="{{ theme("border-btn-dark", "border-btn-light")  }}" contact_error_class="{{ theme("text-error-dark", "text-error-light") }}" contact_form_background_class="{{ theme("bg-darker", "bg-white") }}" contact_border_class="{{ theme("border-dark", "border-light") }}" contact_btn_class="{{ theme("btn-dark", "btn-light") }}" contact_text_class="{{ theme("text-contact-dark", "text-contact-light") }}" use_recaptcha="{{ $useReCaptcha }}" @if($useReCaptcha) datasite_key="{{$reCaptchaKey}}"
             @endif contact_subtitle="@isset($contact['contact_subtitle']) {{ $contact['contact_subtitle'] }} @endisset"
             contact_email="@isset($contact['contact_email']) {{ $contact['contact_email'] }} @endisset"
             contact_phone="@isset($contact['contact_phone']) {{ $contact['contact_phone'] }} @endisset"
             contact_sentence="@isset($contact['contact_sentence']) {{ $contact['contact_sentence'] }} @endisset">
    </contact>

</section>