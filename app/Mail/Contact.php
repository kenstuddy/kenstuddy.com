<?php

namespace App\Mail;

use Illuminate\Http\Request;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class Contact extends Mailable
{
    use Queueable, SerializesModels;

    private $contact;

    /**
     * Create a new message instance.
     *
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->contact = $request;
    }

    /**
     * Build the Mail message and display the response message.
     *
     * @return $this
     */
    public function build()
    {
        $this->view('emails.contact')->subject('Contact form submitted by: '.$this->contact->name)->replyTo($this->contact->email)->from($this->contact->email)->with('contact', $this->contact);
        $response['message'] = 'Thank you for your message. I will get back to you as soon as possible.';
        echo json_encode($response);
    }
}
