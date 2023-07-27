'use client'
import Link from "next/link";
import { Button, Gamon, InputBasic, InputFile, Loading, Sheet } from 'gamon-react'
import { FaMapPin, FaDollarSign, FaIdBadge, FaClock, FaCheckCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import customFetch from "@/utils/customFetch";
import ApplyResumeSelection from "./ApplyResumeSelection";
import { UserContext } from "@/context/UserContext";


export default function JobDetail(
    {jobId, onDelete, onApplyHandler}:{jobId:number, onDelete: (id:number)=>void, onApplyHandler:(id:number)=>void}
) {

    const {user} = useContext(UserContext);
    const [job, setJob] = useState<Job>()
    const [fetchingJobDetails, setFetchingJobDetails] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const [userResumes, setUserResumes] = useState([]);
    const [applySheetDisplay, setApplySheetDisplay] = useState(false)
    const [selectedResumeId, setSelectedResumeId] = useState()
    const [questionAnswers, setQuestionAnswers] = useState({})
    const [userSentApplication, setUserSentApplication] = useState(false)
    const [applying, setApplying] = useState(false)


    useEffect(()=>{
        fetchJob()
    },[jobId])


    const fetchJob = async ()=>{
        setFetchingJobDetails(true)
        const [res,data] = await customFetch(`job/${jobId}`)
        setFetchingJobDetails(false)
        if(!res.ok) return 
        setJob(data.job)
        setIsOwner(data.is_job_owner == 1 ? true : false)
        setUserResumes(data.user_resumes)
        setUserSentApplication(data.user_sent_application ? true : false)
    }


    const resumeSelection = (resume:any)=>{
        setSelectedResumeId(id => id == resume.id ? undefined : resume.id)
    }


    const questionAnswerChangeHandler = (questionId: number, value: string)=>{
        const currentAnswers = {...questionAnswers}
        currentAnswers[questionId] = value
        setQuestionAnswers(currentAnswers)
    }

    const apply = async ()=>{
        setApplying(true)
        const [res, data] = await customFetch('apply',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                job_id: job!.id,
                resume_id: selectedResumeId,
                answers: JSON.stringify(questionAnswers),
            })
        })
        setApplying(false)
        if(!res.ok) return
        setApplySheetDisplay(false)
        setUserSentApplication(true)
        onApplyHandler(job!.id)
    }

    const destroy = async ()=>{
        Gamon.confirm('Delete', 'Are you sure?', async ()=>{
            const [res, data] = await customFetch(`job/${job?.id}`,{
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                },
            })
            if(!res.ok) return
            onDelete(job!.id)
        })
    }



    return (
        <div className="h-full w-full flex flex-col items-center rounded md:shadow md:shadow-gray-500 md:m-4 md:p-4">
            {fetchingJobDetails ? <Loading className="m-auto" /> : 
                <>
                    <div className="flex-1 w-full">
                        <p className="text-2xl text-theme-2 font-black"> { job?.title } </p>
                        <p className="text-gray-400"> 
                            <span> { job?.created_at }  </span>
                            { user && user.id == job?.user_id && 
                                <span className="ms-2"> / {job?.approved ? <span className="text-green-500">Approved</span> : <span className="text-gray-400">Waiting for approval</span> } </span>
                            }
                            </p>

                        {job?.from_anywhere ?  <div className="p-1 bg-theme-3 rounded-full text-sm flex w-fit mt-2">Accepting application from anywhere</div> : '' }

                        <div className="flex items-center mt-2">
                            <FaMapPin className="text-theme-3" />
                            <span className="ms-2">{ job?.country?.name } (Remote)</span>
                        </div>

                        <div className="flex items-center">
                            <FaDollarSign className="text-theme-3" />
                            <span className="ms-2">{ job?.salary } (USD/Year)</span>
                        </div>
                        
                        <div className="flex items-center">
                            <FaIdBadge className="text-theme-3" />
                            <span className="ms-2">{ job?.seniority_text }</span>
                        </div>
                        <div className="flex items-center">
                            <FaClock className="text-theme-3" />
                            <span className="ms-2">{ job?.type_text }</span>
                        </div>

                        

                        <div className="mt-4"> { job?.desc } </div>

                        <div className="mt-4">
                            <p className="text-theme-2 font-bold">Required Skills : </p>
                            {job?.skills?.map(skill=> (<p key={skill.id}>- {skill.name}</p>) )}
                        </div>

                    </div>

                    { isOwner ?
                        <div className="w-full flex items-center justify-center">
                            <Link href={`/job/applications/${job?.id}`} className="p-2 bg-theme-4 rounded-md w-[150px] flex justify-center items-center m-1">Applications</Link>
                            <Link href={`/job/create?id=${job?.id}`} className="p-2 bg-theme-2 rounded-md w-[150px] flex justify-center items-center m-1">Edit</Link>
                            <button className="bg-red-500 text-white p-2 rounded-md w-[150px] m-1" onClick={destroy}>Delete</button>
                        </div>
                        :
                        <div>
                            
                            {   
                                user ?
                                (
                                    userSentApplication ?
                                    <p className="p-2 rounded-md bg-theme-4 text-center flex items-center">
                                        Application Sent
                                        <FaCheckCircle className="ms-2" />
                                    </p>
                                    :
                                    <button className="bg-theme-1 p-2 rounded-md w-[150px]" onClick={()=>setApplySheetDisplay(true)}>Apply</button>
                                )
                                :
                                <Link href="/register" className="bg-theme-1 p-2 rounded-md w-[150px]">Sign In to apply</Link>   
                            }
                           
                        </div>
                    }
                    


                    <Sheet displayModel={[applySheetDisplay, setApplySheetDisplay]} title="Apply">
                        <ApplyResumeSelection
                            userResumes={userResumes}
                            selectedResumeId={selectedResumeId}
                            resumeSelectionHandler={resumeSelection}
                        />
                        {job?.questions && job.questions.length > 0 &&
                            <div className="mt-4 pt-4 border-t">
                                <p className="font-bold text-theme-1">Please answer the questions</p>
                                <div className="flex flex-col">
                                    {job?.questions?.map((question, index)=> 
                                    <div className="mt-4" key={question.id}>
                                        <p>{++index}- {question.text}</p>
                                        <InputBasic value={questionAnswers[question.id!]} onChange={(value:string)=>questionAnswerChangeHandler(question.id!, value)} placeholder="Your answer..." />
                                    </div> 
                                )}
                                </div>
                            </div>
                        }
                        <div className="mt-4 flex justify-center">
                            <Button text="Send application" className="bg-theme-2" onClick={apply} loading={applying} />
                        </div>
                    </Sheet>
                </> 
            }

        </div>
    )
}
