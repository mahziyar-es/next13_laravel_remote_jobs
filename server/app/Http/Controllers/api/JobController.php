<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\ErrorMessageException;
use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Job;
use App\Models\JobQuestion;
use App\Models\Resume;
use App\Models\Skill;
use App\Utils\CustomValidator;
use Illuminate\Http\Request;
use C;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class JobController extends Controller
{


    public function list(Request $request){
        $count = $request->input('count', 0);
        $searchQuery = $request->input('search_query');
        $type = $request->input('type');
        $seniority = $request->input('seniority');
        $timespan = $request->input('timespan', 0);
        $country = $request->input('country');
        $listType = $request->input('list_type', 'all');
        $user = Auth::user();

        CustomValidator::validate($request, [
            'list_type'=> 'in:all,posted,application',
            'timespan'=> 'numeric|integer|min:0',
        ]);


        $jobs = Job::with('country');

        if($listType == 'posted') {
            if(!$user) throw new ErrorMessageException('You are not logged in');
            $jobs->where(C::COL_JOB_USER_ID, $user[C::COL_USER_ID]);
        }
        else{
            $jobs->where(C::COL_JOB_APPROVED, true);
            if($listType == 'application') {
                if(!$user) throw new ErrorMessageException('You are not logged in');
                $jobIds = $user->applications->pluck([C::COL_JOB_ID]);
                $jobs->whereIn(C::COL_JOB_ID, $jobIds);
            }
        }

        if($searchQuery) $jobs->where(C::COL_JOB_TITLE, 'LIKE', "%$searchQuery%");
        if($type) $jobs->whereIn(C::COL_JOB_TYPE, $type);
        if($seniority) $jobs->whereIn(C::COL_JOB_SENIORITY, explode(",",$seniority));
        if($timespan > 0) {
            $current = Carbon::now();
            $requestedTimespan = $current->subDays($timespan);
            $jobs->where(C::COL_JOB_CREATED_AT, '>=', $requestedTimespan);
        }
        if($country) $jobs->whereIn(C::COL_JOB_COUNTRY_ID, explode(",",$country));
        // if($user) {
        //     $jobs->with(['applications' => function (Builder $query) use($user) {
        //         $query->where(C::COL_APPLICATION_USER_ID, $user[C::COL_USER_ID]);
        //     }]);
        // }

        $jobs = $jobs->lazyloading($count)->get([C::COL_JOB_ID, C::COL_JOB_USER_ID, C::COL_JOB_TITLE, C::COL_JOB_CREATED_AT, C::COL_JOB_SENIORITY, C::COL_JOB_TYPE, C::COL_JOB_COUNTRY_ID, C::COL_JOB_APPROVED]);

        $jobs = $this->checkIfUserSentApplicationForJobsList($user, $jobs);

        return response([
            'jobs'=> $jobs,
        ],200);
    }


    private function checkIfUserSentApplicationForJobsList($user, $jobs){
        if($user){
            $jobIds = $jobs -> pluck([C::COL_JOB_ID])->toArray();
            $userJobApplicationIds = Application::where(C::COL_APPLICATION_USER_ID, $user[C::COL_USER_ID])->whereIn(C::COL_APPLICATION_JOB_ID, $jobIds)
                ->get([C::COL_APPLICATION_JOB_ID])->pluck([C::COL_APPLICATION_JOB_ID])->toArray();
            foreach($jobs as &$job){
                if(in_array($job[C::COL_JOB_ID], $userJobApplicationIds)) $job['user_sent_application'] = 1;
            }
        }
        return $jobs;
    }


    public function show(Job $job, Request $request){
        $job->skills;
        $job->country;
        $job->questions;

        $user = Auth::user();

        $isJobOwner = 0;
        $userResumes = null;
        $userSentApplication = 0;

        if($user && $user[C::COL_USER_ID] == $job[C::COL_JOB_USER_ID]){
            $isJobOwner = 1;
            $job->applications;
        }
        if($user && $user[C::COL_USER_ID] != $job[C::COL_JOB_USER_ID] ){
            $userResumes = $user -> getCachedResumes();
            if($user -> applications()->where(C::COL_APPLICATION_JOB_ID, $job[C::COL_JOB_ID])->exists()) $userSentApplication = 1;
        }

        return response([
            'job'=> $job,
            'user_resumes'=> $userResumes,
            'is_job_owner'=> $isJobOwner,
            'user_sent_application'=> $userSentApplication,
        ],200);
    }


    public function store(Request $request){

        CustomValidator::validate($request, [
            'title'=>  'required',
            'desc'=>  'required',
            'salary'=>  'required|integer',
            'country_id'=>  'required|integer|exists:countries,id',
            'type'=>  ['required',  Rule::in([C::ENUM_JOB_TYPE_FULL_TIME, C::ENUM_JOB_TYPE_PART_TIME, C::ENUM_JOB_TYPE_CONTRACT])],
            'seniority'=>  ['required',  Rule::in([C::ENUM_JOB_SENIORITY_JUNIOR, C::ENUM_JOB_SENIORITY_INTERMEDIATE, C::ENUM_JOB_SENIORITY_SENIOR])],
            'from_anywhere'=>  'boolean',
            'skills'=>  'required',
            'questions'=>  'json',
        ]);


        $skillIds = explode(",", $request->input('skills'));
        $skillIds = Skill::whereIn(C::COL_SKILL_ID, $skillIds)->get([C::COL_SKILL_ID])->pluck([C::COL_SKILL_ID]);
        if(count($skillIds) == 0) throw new ErrorMessageException('Select skills from the skill list');

        list($newQuestions, $existingQuestionIds) = $this->prepareQuestionsArray($request->input('questions'));
        if(count($existingQuestionIds) > 0) throw new ErrorMessageException('Incorrect data provided');

        $user = Auth::user();

        $job = new Job();
        $job[C::COL_JOB_USER_ID] = $user[C::COL_USER_ID];
        $job[C::COL_JOB_TITLE] = $request->input('title');
        $job[C::COL_JOB_DESC] = $request->input('desc');
        $job[C::COL_JOB_TYPE] = $request->input('type');
        $job[C::COL_JOB_SALARY] = $request->input('salary');
        $job[C::COL_JOB_SENIORITY] = $request->input('seniority');
        $job[C::COL_JOB_COUNTRY_ID] = $request->input('country_id');
        $job[C::COL_JOB_FROM_ANYWHERE] = $request->input('from_anywhere') ? 1 : 0;
        $job[C::COL_JOB_APPROVED] = false;
        $job -> save();

        $job -> skills() -> sync($skillIds);

        if(count($newQuestions) > 0) $job -> questions() -> createMany($newQuestions);

        return response()->json([
            'message'=> 'Sent for approval'
        ]);
    }


    private function prepareQuestionsArray($questions){
        $questions = json_decode($questions, true);
        if(count($questions) == 0) return [[], []];

        $newQuestions = [];
        $existingQuestionIds = [];
        foreach($questions as $question){
            if(!isset($question['text'])) return;

            if(isset($question['id'])) $existingQuestionIds[] = $question['id'];
            else $newQuestions[] = $question;
        }

        return [$newQuestions, $existingQuestionIds];
    }


    public function update(Job $job, Request $request){

        CustomValidator::validate($request, [
            'title'=>  'required',
            'desc'=>  'required',
            'salary'=>  'required|integer',
            'country_id'=>  'required|integer|exists:countries,id',
            'type'=>  ['required',  Rule::in([C::ENUM_JOB_TYPE_FULL_TIME, C::ENUM_JOB_TYPE_PART_TIME, C::ENUM_JOB_TYPE_CONTRACT])],
            'seniority'=>  ['required',  Rule::in([C::ENUM_JOB_SENIORITY_JUNIOR, C::ENUM_JOB_SENIORITY_INTERMEDIATE, C::ENUM_JOB_SENIORITY_SENIOR])],
            'from_anywhere'=>  'boolean',
            'skills'=>  'required',
            'questions'=>  'json',
        ]);

        $user = Auth::user();
        if($job[C::COL_JOB_USER_ID] != $user[C::COL_USER_ID]) throw new ErrorMessageException('Not allowed');


        $skillIds = explode(",", $request->input('skills'));
        $skillIds = Skill::whereIn(C::COL_SKILL_ID, $skillIds)->get([C::COL_SKILL_ID])->pluck([C::COL_SKILL_ID]);
        if(count($skillIds) == 0) throw new ErrorMessageException('Select skills from the skill list');

        list($newQuestions, $existingQuestionIds) = $this->prepareQuestionsArray($request->input('questions'));

        $jobCurrentQuestionIds = $job -> questions->pluck([C::COL_JOB_QUESTION_ID])->toArray();
        $deletedQuestionIds = array_diff($jobCurrentQuestionIds, $existingQuestionIds);

        $job[C::COL_JOB_TITLE] = $request->input('title');
        $job[C::COL_JOB_DESC] = $request->input('desc');
        $job[C::COL_JOB_TYPE] = $request->input('type');
        $job[C::COL_JOB_SALARY] = $request->input('salary');
        $job[C::COL_JOB_SENIORITY] = $request->input('seniority');
        $job[C::COL_JOB_COUNTRY_ID] = $request->input('country_id');
        $job[C::COL_JOB_FROM_ANYWHERE] = $request->input('from_anywhere') ? 1 : 0;
        $job[C::COL_JOB_APPROVED] = false;
        $job -> save();

        $job -> skills() -> sync($skillIds);

        if(count($newQuestions) > 0) $job -> questions() -> createMany($newQuestions);
        if(count($deletedQuestionIds) > 0) JobQuestion::destroy($deletedQuestionIds);

        return response()->json([
            'message'=> 'Updated and sent for approval'
        ]);
    }


    public function destroy(Job $job, Request $request){

        $user = Auth::user();
        if($job[C::COL_JOB_USER_ID] != $user[C::COL_USER_ID]) throw new ErrorMessageException('Not allowed');

        $job -> delete();

        return response()->json([
            'message'=> 'Deleted'
        ]);
    }


    public function apply(Request $request){

        CustomValidator::validate($request, [
            'job_id'=> 'required|integer',
            'resume_id'=> 'required|integer',
            'answers'=> 'json',
        ], [
            'resume_id'=> 'Please select a resume'
        ]);

        $job = Job::findOrFail($request->input('job_id'));

        $user = Auth::user();

        if($user[C::COL_USER_ID] == $job[C::COL_JOB_USER_ID]) throw new ErrorMessageException("You can't apply to your own job");

        if($job[C::COL_JOB_APPROVED] != 1) throw new ErrorMessageException("You can't apply for this job");

        $userJobApplication = $user->applications()->where(C::COL_APPLICATION_JOB_ID, $job[C::COL_JOB_ID])->first([C::COL_APPLICATION_ID]);
        if($userJobApplication) throw new ErrorMessageException('You sent an application for this job before');

        $resume = $user -> resumes() -> where(C::COL_RESUME_ID, $request->input('resume_id'))->first();
        if(!$resume) throw new ErrorMessageException('Select a resume');

        $questionIds = $job -> questions()->get([C::COL_JOB_ID])->pluck(C::COL_JOB_ID)->toArray();
        $questionAnswersArray = [];
        if(count($questionIds) > 0) {
            $answers = json_decode($request->input('answers'),true);
            Log::info($answers);
            if(count($answers) != count($questionIds)) throw new ErrorMessageException('Please answer all the questions');
            foreach($questionIds as $questionId){
                try{
                    $answer = trim($answers[$questionId]);
                    if(!$answer) throw new ErrorMessageException('Incorrect answers provided for questions');
                    $questionAnswersArray[$questionId] = [C::COL_APPLICATION_QUESTION_ANSWER => $answer];
                }
                catch(Exception $e){
                    throw new ErrorMessageException('Incorrect answers provided for questions');
                }
            }
        }


        $application = $user -> applications() -> create([
            C::COL_APPLICATION_JOB_ID => $job[C::COL_JOB_ID],
            C::COL_APPLICATION_USER_RESUME_ID => $resume[C::COL_RESUME_ID],
            C::COL_APPLICATION_COVER_LETTER => '',
        ]);

        if(count($questionAnswersArray) > 0) $application->questions()->attach($questionAnswersArray);

        return response()->json([
            'message'=> 'Application sent'
        ]);
    }


    public function applications(Job $job, Request $request){
        $user = Auth::user();

        if($user[C::COL_USER_ID] != $job[C::COL_JOB_USER_ID]) throw new ErrorMessageException('Not allowed');

        $applications = $job ->applications()
            ->with("resume:".C::COL_RESUME_ID.",".C::COL_RESUME_FILE)
            ->with("user:".C::COL_USER_ID.",".C::COL_USER_IMAGE.",".C::COL_USER_EMAIL)
            ->with("questions")
            ->get();

        $job = $job -> toArray();
        unset($job[C::COL_JOB_DESC]);

        return response()->json([
            'applications'=> $applications,
            'job'=> $job,
        ]);
    }
}
