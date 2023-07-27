'use client'
import { InputBasic, Sheet } from 'gamon-react'
import customFetch from "@/utils/customFetch";
import { FormEvent, useEffect, useState } from "react";
import { createPortal } from 'react-dom';


export default function JobCreateSkillSelector(
    {skills, addSkillHandler, removeSkillHandler}: {skills?:Skill[], addSkillHandler:(skills:Skill)=>void, removeSkillHandler:(skills:Skill)=>void}
) {

    
    const [sheetDisplay, setSheetDisplay] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [foundSkills, setFoundSkills] = useState<Skill[]>([]);

    const [mounted, setMounted] = useState(false);
    useEffect(()=>{
        setMounted(true)
    },[])

    const skillSearch = async (e: FormEvent)=>{
        e.preventDefault();
        const [res, data] = await customFetch(`skill?query=${searchQuery}`)
        if(!res.ok) return 
        setFoundSkills(data.skills)
    }

   
    return (
        <>
            <button className='w-full mt-4 md:mt-0 md:w-2/5 bg-theme-4 p-2 rounded-md text-sm md:text-md flex items-center gap-1 text-center justify-center h-[45px]' onClick={()=>setSheetDisplay(true)}>
                <span>Select required skills</span>
                <span className='p-1 text-theme-2'>{skills?.length}</span>
            </button>
            {mounted && createPortal(
                <Sheet displayModel={[sheetDisplay, setSheetDisplay]} title="Select skills">
                    <div className='mb-4 flex flex-wrap'>
                        {skills?.map(skill=> (<div key={skill.id} className='bg-theme-3 p-1 rounded cursor-pointer m-1' onClick={()=>removeSkillHandler(skill)}>{skill.name}</div>) )}
                    </div>
                    <form onSubmit={skillSearch} className='flex gap-2'>
                        <InputBasic placeholder='Skill name' model={[searchQuery, setSearchQuery]} />
                        <button className='p-2 rounded bg-theme-4 text-sm'>Search</button>
                    </form>
                    <div className='mt-4'>
                        {foundSkills?.map(skill=> (<div key={skill.id} className='border-b p-2 cursor-pointer' onClick={()=>addSkillHandler(skill)}>{skill.name}</div>) )}
                    </div>
                </Sheet>    
            , document.body)}
            
        </>
    )
}
