<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Http\Request;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Contact as ContactModel;

class Contact extends Mailable
{
    use Queueable, SerializesModels;

    private $contact;

    /**
     * Create a new message instance.
     */
    public function __construct(Request $request)
    {
        $this->contact = $request;
    }

    /**
     * Build the Mail message and display the response message.
     */
    public function build(): static
    {
        $view = $this->view('emails.contact')->subject('Contact form submitted by: '.$this->contact->name)->to(config('app.destination_email'))->replyTo($this->contact->email)->from($this->contact->email)->with('contact', $this->contact);
        $contact = ContactModel::first();
        $response['message'] = $contact->contact_response ?? 'Thank you for your message. I will get back to you as soon as possible.';
        echo json_encode($response);
        return $view;
    }
}
