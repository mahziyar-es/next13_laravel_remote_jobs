'use client'
import Link from "next/link";
import { Button, InputBasic } from 'gamon-react'
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";


export default function Job(
    {job, selected, onClick}
    :{job: Job, selected: boolean, onClick:()=>void}
) { 

    const {user} = useContext(UserContext);

    const [displayedTitle, setDisplayedTitle] = useState(job.title);

    useEffect(()=>{
        if(job.title.length > 30) setDisplayedTitle(job.title.slice(0, 30)+'...')
    },[])


    return (
        <div onClick={onClick} className={
            ["rounded-md p-2 mb-4 border border-gray-300 cursor-pointer hover:shadow-md transition duration-200 relative", selected && 'shadow shadow-theme-2 border-e border-theme-2' ].join(" ")
        }>
            <p className="text-xl text-theme-4 font-bold"> { displayedTitle } </p>
            <p className="text-gray-400"> 
                <span>{job.created_at} </span>
                { user && user.id == job.user_id && 
                    <span className="text-gray-400 text-sm"> / {job?.approved ? <span className="text-green-500">Approved</span> : <span className="text-gray-400">Waiting for approval</span> } </span>
                }
                
            </p>
            <p className="text-gray-600"> {job.seniority_text} </p>
            <div className="flex flex-wrap items-center justify-between text-gray-600">
                <p> {job.country?.name} </p>
                <p className="p-1 text-theme-2 rounded-full"> {job.type_text} </p>
            </div>
            {job.user_sent_application && <span className="bg-theme-4 text-sm rounded-md p-1">Application Sent</span>}
           
        </div>
    )
}
