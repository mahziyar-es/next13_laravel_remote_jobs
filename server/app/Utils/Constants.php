<?php
namespace App\Utils;

class Constants {

    // skill
    const COL_SKILL_ID = 'id';
    const COL_SKILL_NAME = 'name';

    // country
    const COL_COUNTRY_ID = 'id';
    const COL_COUNTRY_NAME = 'name';


    // job
    const COL_JOB_ID = 'id';
    const COL_JOB_USER_ID = 'user_id';
    const COL_JOB_TITLE = 'title';
    const COL_JOB_DESC = 'desc';
    const COL_JOB_TYPE = 'type';
    const COL_JOB_SALARY = 'salary';
    const COL_JOB_SENIORITY = 'seniority';
    const COL_JOB_COUNTRY_ID = 'country_id';
    const COL_JOB_FROM_ANYWHERE = 'from_anywhere';
    const COL_JOB_APPROVED = 'approved';
    const COL_JOB_CREATED_AT = 'created_at';
    const COL_JOB_UPDATED_AT = 'updated_at';

    const ENUM_JOB_SENIORITY_JUNIOR = 'junior';
    const ENUM_JOB_SENIORITY_INTERMEDIATE = 'intermediate';
    const ENUM_JOB_SENIORITY_SENIOR = 'senior';

    const ENUM_JOB_TYPE_FULL_TIME = 'full_time';
    const ENUM_JOB_TYPE_PART_TIME = 'part_time';
    const ENUM_JOB_TYPE_CONTRACT = 'contract';


    // job skill
    const COL_JOB_SKILL_JOB_ID = 'job_id';
    const COL_JOB_SKILL_SKILL_ID = 'skill_id';


    // job questions
    const COL_JOB_QUESTION_ID = 'id';
    const COL_JOB_QUESTION_JOB_ID = 'job_id';
    const COL_JOB_QUESTION_TEXT = 'text';


    // user
    const COL_USER_ID = 'id';
    const COL_USER_TYPE = 'type';
    const COL_USER_EMAIL = 'email';
    const COL_USER_PASSWORD = 'password';
    const COL_USER_NAME = 'name';
    const COL_USER_IMAGE = 'image';

    const ENUM_USER_TYPE_USER = 'user';
    const ENUM_USER_TYPE_ADMIN = 'admin';

    // resume
    const COL_RESUME_ID = 'id';
    const COL_RESUME_USER_ID = 'user_id';
    const COL_RESUME_FILE = 'file';

    // user skill
    const COL_SKILL_USER_USER_ID = 'user_id';
    const COL_SKILL_USER_SKILL_ID = 'skill_id';



    // job application
    const COL_APPLICATION_ID = 'id';
    const COL_APPLICATION_USER_ID = 'user_id';
    const COL_APPLICATION_JOB_ID = 'job_id';
    const COL_APPLICATION_USER_RESUME_ID = 'resume_id';
    const COL_APPLICATION_COVER_LETTER = 'cover_letter';
    const COL_APPLICATION_REVIEWED = 'reviewed';

    // job application question answers
    const COL_APPLICATION_QUESTION_QUESTION_ID = 'job_question_id';
    const COL_APPLICATION_QUESTION_APPLICATION_ID = 'application_id';
    const COL_APPLICATION_QUESTION_ANSWER = 'answer';


}
