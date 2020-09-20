<?php
namespace App\Validators;
use GuzzleHttp\Client;
class ReCaptcha
{
    public function validate($attribute, $value, $parameters, $validator)
    {
        $response = (new Client())->post(
            'https://www.google.com/recaptcha/api/siteverify',
            [
                'form_params' =>
                    [
                        'secret' => config('services.recaptcha.secret'),
                        'response' => $value
                    ]
            ]
        );
        return json_decode((string)$response->getBody())->success;
    }
}