<?php

namespace Database\Factories;

use App\Models\Job;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobQuestion>
 */
class JobQuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            \C::COL_JOB_QUESTION_JOB_ID => Job::inRandomOrder()->first()[\C::COL_JOB_ID],
            \C::COL_JOB_QUESTION_TEXT => fake()->text(100),
        ];
    }
}


