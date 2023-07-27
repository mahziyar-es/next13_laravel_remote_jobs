<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Job;
use App\Models\Skill;
use App\Models\User;
use Tests\TestCase;
use C;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ExampleTest extends TestCase
{

    use RefreshDatabase;


    public function test_admin_user_list(): void
    {
        $response = $this->get('/admin/user');

        $response->assertStatus(200);
    }

    public function test_admin_user_show(): void
    {
        $user = User::factory()->create();
        $userId = $user[C::COL_USER_ID];

        $response = $this->get("/admin/user/$userId");

        $response->assertStatus(200);
    }


    public function test_admin_user_delete(): void
    {
        $user = User::factory()->create();
        $userId = $user[C::COL_USER_ID];

        $response = $this->delete("/admin/user/$userId");

        $response->assertStatus(200);
    }




    public function test_admin_skill_list(): void
    {
        $response = $this->get("/admin/skill");

        $response->assertStatus(200);
    }

    public function test_admin_skill_store(): void
    {
        $response = $this->post("/admin/skill",[
            'name'=> 'test skill'
        ]);

        $response->assertStatus(200);
    }

    public function test_admin_skill_delete(): void
    {
        $skill = Skill::factory()->create();
        $skillId = $skill[C::COL_SKILL_ID];

        $response = $this->delete("/admin/skill/$skillId");

        $response->assertStatus(200);
    }




    public function test_admin_job_list(): void
    {
        $response = $this->get("/admin/job");

        $response->assertStatus(200);
    }

    public function test_admin_job_show(): void
    {
        $user = User::factory()->create([
            C::COL_USER_TYPE => C::ENUM_USER_TYPE_USER,
        ]);

        $job = Job::factory()->create([
            C::COL_JOB_USER_ID => $user[C::COL_USER_ID]
        ]);
        $id = $job[C::COL_JOB_ID];
        $response = $this->get("/admin/job/$id");

        $response->assertStatus(200);
    }

    public function test_admin_job_delete(): void
    {
        $user = User::factory(1)->create([
            C::COL_USER_TYPE => C::ENUM_USER_TYPE_USER,
        ]);

        $job = Job::factory()->create();
        $id = $job[C::COL_JOB_ID];
        $response = $this->delete("/admin/job/$id");

        $response->assertStatus(200);
    }

    public function test_admin_job_update(): void
    {
        User::factory(1)->create([
            C::COL_USER_TYPE => C::ENUM_USER_TYPE_USER,
        ]);

        $job = Job::factory()->create([
            C::COL_JOB_APPROVED => false,
        ]);
        $id = $job[C::COL_JOB_ID];

        $response = $this->put("/admin/job/$id",[
            'approved' => true,
        ]);

        $response->assertJsonFragment([C::COL_JOB_APPROVED => true]);

        $response->assertStatus(200);
    }


}
