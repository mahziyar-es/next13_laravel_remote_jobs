<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            \C::COL_JOB_USER_ID => User::where(\C::COL_USER_TYPE, \C::ENUM_USER_TYPE_USER)->inRandomOrder()->first()[\C::COL_USER_ID],
            \C::COL_JOB_TITLE => fake()->text(50),
            \C::COL_JOB_DESC => fake()->text(),
            \C::COL_JOB_TYPE => fake()->randomElement([\C::ENUM_JOB_TYPE_FULL_TIME, \C::ENUM_JOB_TYPE_PART_TIME, \C::ENUM_JOB_TYPE_CONTRACT]),
            \C::COL_JOB_SENIORITY => fake()->randomElement([\C::ENUM_JOB_SENIORITY_JUNIOR, \C::ENUM_JOB_SENIORITY_INTERMEDIATE, \C::ENUM_JOB_SENIORITY_SENIOR]),
            \C::COL_JOB_SALARY => fake()->numberBetween(500, 5000),
            \C::COL_JOB_FROM_ANYWHERE => fake()->randomElement([false, true]),
            \C::COL_JOB_COUNTRY_ID => Country::inRandomOrder()->first()[\C::COL_COUNTRY_ID],
            \C::COL_JOB_APPROVED => true,
            \C::COL_JOB_CREATED_AT => Carbon::today()->subDays(rand(0, 80)),
        ];
    }
}












