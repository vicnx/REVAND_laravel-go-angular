<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAwardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('awards')){
            error_log("AWARDS NO EXISTE");
            Schema::create('awards', function (Blueprint $table) {
                $table->increments('id');

                $table->string('name');

                $table->string('description');
                $table->string('image');
                
                $table->timestamps();
            });
        }else{
            error_log("Awards EXISTE");
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('awards');
    }
}
