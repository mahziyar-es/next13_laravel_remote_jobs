<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Utils\CustomValidator;
use Illuminate\Http\Request;
use C;

class JobController extends Controller
{


   
    // =====================================================================================================================
    public function index(Request $request){
        $count = $request->input('count');
        $userId = $request->input('user_id');
        $title = $request->input('title');
        $type = $request->input('type');

        $items = Job::userId($userId)->title($title)->type($type)->lazyloading($count)->get([C::COL_JOB_ID, C::COL_JOB_TITLE, C::COL_JOB_USER_ID, C::COL_JOB_TYPE, C::COL_JOB_APPROVED]);

        return response([
            'items'=> $items,
        ], 200);
    }

    
    // =====================================================================================================================
    public function show(Job $job)
    {
        $job -> skills;
        $job -> country;
        $job -> questions;

        return response([
            'item'=> $job,
        ], 200);
    }


    // =====================================================================================================================
    public function destroy(Job $job)
    {
        $job -> delete();

        return response([
            'message'=> 'Deleted',
        ], 200);
    }


    // =====================================================================================================================
    public function update(Job $job, Request $request)
    {

        CustomValidator::validate($request, [
            'approved'=> 'boolean',
        ]);

        $approved = $request->input('approved');
        
        if(isset($approved)) $job[C::COL_JOB_APPROVED] = $approved == 1 ? true : false;

        $job -> save();

        return response([
            'message'=> 'Updated',
            'item'=> $job,
        ], 200);
    }
}
