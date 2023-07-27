<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Job;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Cache::flush();

        \App\Models\Skill::truncate();
        \App\Models\User::truncate();
        \App\Models\Job::truncate();
        \App\Models\Country::truncate();
        \App\Models\JobQuestion::truncate();
        \App\Models\Application::truncate();
        DB::table('user_skill')->truncate();
        DB::table('job_skill')->truncate();



        $this->call([
            SkillSeeder::class,
            CountrySeeder::class,
        ]);


        // \App\Models\User::factory(1)->create([
        //     \C::COL_USER_EMAIL => '',
        //     \C::COL_USER_TYPE => \C::ENUM_USER_TYPE_ADMIN,
        //     \C::COL_USER_NAME => 'admin',
        // ]);
        \App\Models\User::factory(30)->create();
        \App\Models\Job::factory(100)->hasQuestions(2)->create();

        foreach(User::all() as $user){
            $skills = Skill::inRandomOrder()->take(5)->pluck(\C::COL_SKILL_ID);
            $user -> skills()->sync($skills);
        }

        foreach(Job::all() as $job){
            $skills = Skill::inRandomOrder()->take(5)->pluck(\C::COL_SKILL_ID);
            $job -> skills()->sync($skills);
        }


    }
}
