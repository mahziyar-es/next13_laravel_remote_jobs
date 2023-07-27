<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            \C::COL_USER_TYPE => \C::ENUM_USER_TYPE_USER,
            \C::COL_USER_EMAIL => fake()->email(),
            \C::COL_USER_PASSWORD => Hash::make('123456'),
            \C::COL_USER_NAME => fake()->name(),
            \C::COL_USER_IMAGE => null,
        ];
    }








}
