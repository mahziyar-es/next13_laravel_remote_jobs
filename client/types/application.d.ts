type Application = {
    id: number,
    job_id: number,
    user_id: number,
    cover_letter?: string,
    reviewed?: boolean,

    questions: Question[],
    user: User,
    resume: Resume,
}

