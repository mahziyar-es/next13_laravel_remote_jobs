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
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->bigInteger(C::COL_APPLICATION_USER_ID);
            $table->bigInteger(C::COL_APPLICATION_JOB_ID);
            $table->bigInteger(C::COL_APPLICATION_USER_RESUME_ID);
            $table->text(C::COL_APPLICATION_COVER_LETTER)->nullable();
            $table->boolean(C::COL_APPLICATION_REVIEWED)->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
