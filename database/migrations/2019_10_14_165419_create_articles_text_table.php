<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles_text', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('articles_link_text');
            $table->string('article_link_text');
            $table->string('articles_posted_text');
            $table->string('article_posted_text');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles_text');
    }
};
