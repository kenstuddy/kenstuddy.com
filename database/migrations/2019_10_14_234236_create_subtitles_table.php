<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subtitles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('education_subtitle')->nullable();
            $table->string('experience_subtitle')->nullable();
            $table->string('portfolio_subtitle')->nullable();
            $table->string('article_subtitle')->nullable();
            $table->string('article_alternate_subtitle')->nullable();
            $table->string('articles_subtitle')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subtitles');
    }
};
