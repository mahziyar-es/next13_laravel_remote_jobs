<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use C;

class UserController extends Controller
{
    // =====================================================================================================================
    public function index(Request $request){
        $email = $request->input('email');
        $type = $request->input('type');
        $count = $request->input('count');

        $items = User::email($email)->type($type)->lazyloading($count)->get([C::COL_USER_ID, C::COL_USER_EMAIL, C::COL_USER_NAME, C::COL_USER_TYPE]);

        return response([
            'items'=> $items,
        ], 200);
    }


    // =====================================================================================================================
    public function show(User $user){
        $user -> resumes;
        $user -> skills;

        return response([
            'item'=> $user,
        ], 200);
    }


    // =====================================================================================================================
    public function destroy(User $user){
        $user -> delete();

        return response([
            'message'=> 'Deleted',
        ], 200);
    }


}
