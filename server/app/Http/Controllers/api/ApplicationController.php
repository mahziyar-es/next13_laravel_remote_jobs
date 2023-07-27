<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\ErrorMessageException;
use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use C;


class ApplicationController extends Controller
{

    public function reviewed(Application $application, Request $request){
        $user = Auth::user();

        $job = Job::where(C::COL_JOB_ID, $application[C::COL_APPLICATION_JOB_ID])
            ->where(C::COL_JOB_USER_ID, $user[C::COL_USER_ID])
            ->first([C::COL_JOB_ID]);

        if(!$job) throw new ErrorMessageException('Not allowed');

        if($application[C::COL_APPLICATION_REVIEWED] == 1) $application[C::COL_APPLICATION_REVIEWED] = 0;
        else $application[C::COL_APPLICATION_REVIEWED] = 1;

        $application -> save();

        return response()->json([
            'reviewed'=> $application[C::COL_APPLICATION_REVIEWED]
        ]);
    }

}
