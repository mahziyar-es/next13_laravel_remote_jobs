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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->enum(C::COL_USER_TYPE, [C::ENUM_USER_TYPE_USER, C::ENUM_USER_TYPE_ADMIN]);
            $table->string(C::COL_USER_EMAIL);
            $table->text(C::COL_USER_PASSWORD)->nullable();
            $table->string(C::COL_USER_NAME)->nullable();
            $table->string(C::COL_USER_IMAGE)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }




    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
