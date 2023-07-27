'use client'
import { Button, InputBasic, InputCheckbox, InputSelect, InputTextarea, Sheet } from 'gamon-react'
import customFetch from "@/utils/customFetch";
import { FormEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { jobType, jobSeniority } from '@/utils/Enums';
import JobCreateCountrySelector from './components/JobCreateCountrySelector';
import JobCreateSkillSelector from './components/JobCreateSkillSelector';
import JobCreateQuestions from './components/JobCreateQuestions';


export default function JobCreate({searchParams}) {

    const [id, setId] = useState();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [salary, setSalary] = useState();
    const [country, setCountry] = useState<Country>();
    const [type, setType] = useState('');
    const [seniority, setSeniority] = useState('');
    const [skills, setSkills] = useState<Skill[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [fromAnywhere, setFromAnywhere] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(searchParams.id) fetchJob()
        else clearFields()
    },[])

    const fetchJob = async ()=>{
        const [res, data] = await customFetch(`job/${searchParams.id}?with_questions=1`)
        if(!res.ok) return 
        setId(data.job.id)
        setTitle(data.job.title)
        setDesc(data.job.desc)
        setSalary(data.job.salary)
        setCountry(data.job.country)
        setType(data.job.type)
        setSeniority(data.job.seniority)
        setSkills(data.job.skills)
        setQuestions(data.job.questions)
        setFromAnywhere(data.job.from_anywhere)
    }

    const submit = async ()=>{
        setLoading(true)
        const skillIds = skills.map(skill => skill.id)

        const [res, data] = await customFetch('job',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                title: title,
                desc: desc,
                salary: salary,
                country_id: country?.id,
                type: type,
                seniority: seniority,
                fromAnywhere: fromAnywhere,
                skills: skillIds.join(','),
                questions: JSON.stringify(questions),
            })
        })
        setLoading(false)
        if(!res.ok) return
        clearFields()
    }

    const update = async ()=>{
        setLoading(true)
        const skillIds = skills.map(skill => skill.id)

        const [res, data] = await customFetch(`job/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                title: title,
                desc: desc,
                salary: salary,
                country_id: country?.id,
                type: type,
                seniority: seniority,
                fromAnywhere: fromAnywhere,
                skills: skillIds.join(','),
                questions: JSON.stringify(questions),
            })
        })
        setLoading(false)
        if(!res.ok) return
    }

    const clearFields = ()=>{
        setTitle('')
        setDesc('')
        setSalary(undefined)
        setCountry(undefined)
        setType('')
        setSeniority('')
        setSkills([])
        setFromAnywhere(false)
    }

    const countrySelectionHandler = (country: Country)=>{
        setCountry(country)
    }

    const addSkillHandler = (skill: Skill)=>{
        setSkills(s=>[...s, skill])
    }

    const removeSkillHandler = (skill: Skill)=>{
        setSkills(skills=>skills.filter(s=> s.id != skill.id))
    }

    const addQuestionHandler = (text: string)=>{
        setQuestions(questions=>[...questions, {text: text}])
    }

    const removeQuestionHandler = (index: number)=>{
        const currentQuestions = [...questions]
        currentQuestions.map((q,i)=> i == index && currentQuestions.splice(i, 1) )
        setQuestions(currentQuestions)
    }

    return (
        <div className="h-full w-full flex overflow-auto p-4">
            
            <div className='m-auto w-full md:w-3/4 lg:w-1/3'>
                <p className='font-bold text-3xl text-center'> Post a job </p>
                <div className='mt-4'>
                    <InputBasic model={[title, setTitle]} title="Title of your job" />
                </div>
                <div>
                    <InputBasic model={[salary, setSalary]} title="Salary (USD/Year)" type="number" />
                </div>
                <div>
                    <InputSelect model={[type, setType]} title="Job type" options={jobType} displayType="sheet-center" />
                </div>
                <div>
                    <InputSelect model={[seniority, setSeniority]} title="Seniority" options={jobSeniority} displayType="sheet-center" />
                </div>
                <div>
                    <InputCheckbox title="Accept application from anywhere in the world" model={[fromAnywhere, setFromAnywhere]} binary />
                </div>
                <div className='flex flex-wrap items-center justify-between w-100 mt-4'>
                    <JobCreateCountrySelector country={country} countrySelectionHandler={countrySelectionHandler} />
                    <JobCreateSkillSelector skills={skills} addSkillHandler={addSkillHandler} removeSkillHandler={removeSkillHandler} />
                    <JobCreateQuestions questions={questions} addQuestionHandler={addQuestionHandler} removeQuestionsHandler={removeQuestionHandler} />
                </div>
                <div className='mt-2'>
                    <InputTextarea model={[desc, setDesc]} title="Description" />
                </div>
                <div className='text-center mt-4'>
                    {id ?  
                        <Button text="Update" className='bg-theme-2' onClick={update} loading={loading} />
                        :
                        <Button text="Submit" className='bg-theme-2' onClick={submit} loading={loading} />
                    }
                </div>
            </div>

        </div>
    )
}
