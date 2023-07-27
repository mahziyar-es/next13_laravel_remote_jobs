<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\ErrorMessageException;
use App\Http\Controllers\Controller;
use App\Models\Resume;
use App\Utils\CustomValidator;
use App\Utils\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use C;


class ResumeController extends Controller
{

    public function store(Request $request){
        CustomValidator::validate($request,[
            'file'=> 'file|mimes:pdf,docx',
        ]);

        $user = Auth::user();

        $reumesCount = $user -> resumes() -> count();
        if($reumesCount > 3) throw new ErrorMessageException('You can not have more than 3 resumes');

        $filname = Utils::uploadFile($request->file('file'), 'resumes');

        $resume = new Resume();
        $resume[C::COL_RESUME_USER_ID] = $user[C::COL_USER_ID];
        $resume[C::COL_RESUME_FILE] = $filname;
        $resume -> save();

        $user -> updateResumesCache();

        return response()->json([
            'message'=> 'Uploaded',
            'resume'=> $resume,
        ]);
    }


    public function destroy(Resume $resume){
        $user = Auth::user();

        if($resume[C::COL_RESUME_USER_ID] != $user[C::COL_USER_ID]) throw new ErrorMessageException('Not allowed');

        Utils::deleteFile($resume[C::COL_RESUME_FILE], 'resumes');

        $resume -> delete();

        $user -> updateResumesCache();

        return response()->json([
            'message'=> 'Delete',
        ]);
    }

}
