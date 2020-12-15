<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::create('subscriptions', function (Blueprint $table) {
        //     $table->increments('id');

        //     $table->string('name');

        //     $table->string('price');
        //     $table->string('admin_id');
            
        //     $table->timestamps();
        // });
        if(!Schema::hasTable('subscriptions')){
            error_log("SUBSCRIPTION NO EXISTE");
            Schema::create('subscriptions', function (Blueprint $table) {
                $table->increments('id');

                $table->string('name');

                $table->string('price');
                $table->string('admin_id');
                
                $table->timestamps();
            });
        }else{
            error_log("SUBSCRIPTION EXISTE");
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subscriptions');
    }
}
