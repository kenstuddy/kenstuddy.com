<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

use App\Contact;
class ContactsTableSeeder extends Seeder
{
    public function run()
    {
        $this->faker = Faker::create();
        $email = $this->faker->email;
        $contactNames = [
            "home",
            "article",
            "articles"
        ];
        $contacts = 3;
        for ($contactsCounter = 0; $contactsCounter < $contacts; $contactsCounter++) {
            $contact = new Contact();
            $contact->name = $contactNames[$contactsCounter];
            $contact->contact_email = $email;
            $contact->contact_sentence = $this->faker->sentence;
            $contact->save();
        }
    }
}