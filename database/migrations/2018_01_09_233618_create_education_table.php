<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEducationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('education', function (Blueprint $table) {
            $table->increments('id');
            $table->string('organization');
            $table->string('credential');
            //It may seem like we should store start_year and end_year as integers, but string is better since we will not be doing math with them, and string can handle unexpected edge-cases.
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
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('education');
    }
}
