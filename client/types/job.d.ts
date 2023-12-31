type Job = {
    id: number,
    user_id: number,
    title: string,
    desc: string,
    type: string,
    type_text: string,
    salary: number,
    seniority: string,
    seniority_text: string,
    country_id: number,
    from_anywhere: boolean,
    approved: boolean,
    created_at: string,
    user_sent_application?: boolean,

    skills?: Skill[],
    country?: Country,
    questions?: Question[],
}