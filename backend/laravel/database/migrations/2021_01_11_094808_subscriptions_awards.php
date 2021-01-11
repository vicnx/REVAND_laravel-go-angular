<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SubscriptionsAwards extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('subscriptions_awards')){
            Schema::create('subscriptions_awards', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('subscription_id')->unsigned();
                $table->integer('award_id')->unsigned();
    
                /* user id foreign key constraint declaration */
                $table->foreign('subscription_id')->references('id')->on('subscriptions')
                    ->onDelete('cascade')->onUpdate('cascade');
    
                /* subscription id foreign key constraint declaration */
                $table->foreign('award_id')->references('id')->on('awards')
                    ->onDelete('cascade')->onUpdate('cascade');
            });
        } 
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subscriptions_awards');
    }
}
