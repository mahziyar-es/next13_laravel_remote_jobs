<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Utils\CustomValidator;
use Illuminate\Http\Request;
use C;

class SkillController extends Controller
{
    // =====================================================================================================================
    public function index(Request $request){
        $count = $request->input('count');

        $items = Skill::lazyloading($count)->get();

        return response([
            'items'=> $items,
        ], 200);
    }


    // =====================================================================================================================
    public function store(Request $request){

        CustomValidator::validate($request, [
            'name' => 'required|string',
        ]);

        $item = new Skill();
        $item[C::COL_SKILL_NAME] = $request->input('name');
        $item -> save();

        return response([
            'item'=> $item,
        ], 200);
    }


    // =====================================================================================================================
    public function destroy(Skill $skill){
        $skill -> delete();

        return response([
            'message'=> 'Deleted',
        ], 200);
    }
}
