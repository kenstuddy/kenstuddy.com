<?php

namespace App\Http\Controllers;

use App\Http\Requests\SendContactApiRequest;
use App\Mail\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactApiController extends Controller
{
    public function send(SendContactApiRequest $request)
    {
        // This creates a new instance of the Contact class which sends the Mail message to an email using the data we received from the HTTP POST API request sent by Vue.
        Mail::send(new Contact($request));
    }
}
