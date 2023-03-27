<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SendContactApiRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $useReCaptcha = config('services.recaptcha.enabled');
        $reCaptcha = $useReCaptcha ? 'required|recaptcha' : '';
        return [
            'name' => [
                'required',
            ],
            'email' => [
                'required',
                'email',
            ],
            'message' => [
                'required',
            ],
            'g-recaptcha-response' => $reCaptcha,
        ];
    }
}
