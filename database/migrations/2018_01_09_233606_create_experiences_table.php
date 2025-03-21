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
        Schema::create('experiences', function (Blueprint $table) {
            $table->increments('id');
            $table->string('position');
            $table->string('company')->nullable();
            $table->string('location')->nullable();
            // It may seem like we should store start_year and end_year as integers, but string is better since we will not be doing math with them, and string can handle unexpected edge-cases.
            $table->string('start_year')->nullable();
            $table->string('end_year')->nullable();
            $table->string('string_year')->nullable();
            $table->text('description');
            $table->boolean('active')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
