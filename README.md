# kenstuddy.com
My personal website. Created in 2018. Uses PHP with Laravel, MySQL, JavaScript with Vue (converted from jQuery), HTML5, and CSS3. Visit https://kenstuddy.com to see a live demo of this project. 

# Requirements
* PHP >= 8.1.0
* Node >= 12.14.0
* MySQL >= 5.7.0
* Composer

# How to Install
Note: It is recommended that you install LAMP and Laravel with my LAMP and Laravel install scripts to ensure that you have all of the requirements.

My LAMP install script is located at

https://github.com/kenstuddy/Deploy-LAMP

My Laravel install script is located at

https://github.com/kenstuddy/Deploy-Laravel

Clone the repository

```
git clone https://github.com/kenstuddy/kenstuddy.com
```

Change to the repository directory

```
cd kenstuddy.com
```

Run composer to install any PHP dependencies

```
composer install
```

Run npm to install any JavaScript dependencies

```
npm install
```

Build the CSS and JS assets with npm

```
npm run dev
```

After that, you need to create your .env file and enter your database credentials and destination email address for the contact form

```
mv .env.example .env
```

Run the database migrations to create the database schema 

```
php artisan migrate
```

Generate the application key

```
php artisan key:generate
```

Optionally, if you would like to see some testing data, you can run the seeder

```
php artisan db:seed
```

If you have correctly set up your .env file, you should now be able to start the Laravel development server

```
php artisan serve
```

Visit the IP address (usually 127.0.0.1) http://127.0.0.1:8000 in your web browser.
