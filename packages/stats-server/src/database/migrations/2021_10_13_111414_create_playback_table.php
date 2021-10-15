<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlaybackTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('playbacks', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("ip", 50);
            $table->double("latitude")->nullable();
            $table->double("longitude")->nullable();
            $table->enum("agent", ["mobile", "web", "other"]);
            $table->string("trackId");
            $table->string("userId");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('playback');
    }
}
