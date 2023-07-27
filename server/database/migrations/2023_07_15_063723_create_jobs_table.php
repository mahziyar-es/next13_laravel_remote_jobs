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
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->bigInteger(C::COL_JOB_USER_ID);
            $table->string(C::COL_JOB_TITLE);
            $table->text(C::COL_JOB_DESC);
            $table->string(C::COL_JOB_SALARY);
            $table->integer(C::COL_JOB_COUNTRY_ID);
            $table->boolean(C::COL_JOB_FROM_ANYWHERE)->default(false);
            $table->enum(C::COL_JOB_SENIORITY, [C::ENUM_JOB_SENIORITY_JUNIOR, C::ENUM_JOB_SENIORITY_INTERMEDIATE, C::ENUM_JOB_SENIORITY_SENIOR]);
            $table->enum(C::COL_JOB_TYPE, [C::ENUM_JOB_TYPE_FULL_TIME, C::ENUM_JOB_TYPE_PART_TIME, C::ENUM_JOB_TYPE_CONTRACT]);
            $table->boolean(C::COL_JOB_APPROVED)->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
