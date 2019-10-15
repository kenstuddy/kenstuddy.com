<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubtitlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subtitles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('education_subtitle')->nullable();
            $table->string('experience_subtitle')->nullable();
            $table->string('portfolios_subtitle')->nullable();
            $table->string('article_subtitle')->nullable();
            $table->string('article_alternate_subtitle')->nullable();
            $table->string('articles_subtitle')->nullable();
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
        Schema::dropIfExists('subtitles');
    }
}
