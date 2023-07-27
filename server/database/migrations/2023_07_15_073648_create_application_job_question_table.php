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
        Schema::create('application_job_question', function (Blueprint $table) {
            $table->bigInteger(C::COL_APPLICATION_QUESTION_QUESTION_ID);
            $table->bigInteger(C::COL_APPLICATION_QUESTION_APPLICATION_ID);
            $table->string(C::COL_APPLICATION_QUESTION_ANSWER);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_job_question');
    }
};
