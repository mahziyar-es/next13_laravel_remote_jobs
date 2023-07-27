<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use C;

class SkillController extends Controller
{

    public function search(Request $request){
        $query = $request->input('query');

        if(!$query) return;

        $skills = Skill::where(C::COL_SKILL_NAME, 'LIKE', "%$query%")->limit(10)->get();

        return response([
            'skills'=> $skills,
        ],200);
    }

}
