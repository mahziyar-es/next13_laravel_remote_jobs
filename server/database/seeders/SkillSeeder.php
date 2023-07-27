<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skills = json_decode(file_get_contents(resource_path('data/skills.json')),true);

        $data = [];
        foreach($skills as $skill){
            $data[] = [\C::COL_SKILL_NAME => $skill['keyskill']];
        }

        Skill::insert($data);
    }
}
