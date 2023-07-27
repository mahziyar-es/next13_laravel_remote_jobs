import customFetch from "@/utils/customFetch";
import { Gamon, InputFile, Loading } from "gamon-react";
import { useEffect, useState } from "react"
import { FaCheckCircle, FaTrash } from "react-icons/fa";


export default function ApplyResumeSelection(
    {userResumes, selectedResumeId, resumeSelectionHandler}
) {

    const [newResume, setNewResume] = useState()
    const [uploadingResume, setUploadingResume] = useState(false)
    const [resumes, setResumes] = useState(userResumes || []);


    const getResumeName = (url:string)=>{
        return url.split('/').reverse()[0]
    }

    useEffect(()=>{
        uploadResume()
    },[newResume])


    const uploadResume = async ()=>{
        if(!newResume) return
        setUploadingResume(true)

        var formData = new FormData()
        formData.append('file', newResume)

        const [res, data] = await customFetch('resume',{
            method: 'POST',
            headers:{},
            body:formData
        }) 
        setUploadingResume(false)
        setNewResume(undefined)
        if(!res.ok) return
        setResumes(resumes=> [...resumes, data.resume]) 
    }

    const destory = (id: number)=>{
        Gamon.confirm('Delete', 'Are you sure?',async ()=>{
            const [res, data] = await customFetch(`resume/${id}`,{
                method: 'DELETE',
            }) 
            if(!res.ok) return 
            setResumes(resumes=> resumes.filter(resume => resume.id != id)) 
        })
    }


    return (
        <>
            <p className="font-bold text-theme-1">Select a resume</p>
            <div className="flex flex-col mt-2">
                {resumes.map(resume=>  
                    <div 
                        key={resume.id}
                        className={["flex items-center mb-2 justify-between rounded border border-gray-300 p-2 cursor-pointer", selectedResumeId == resume.id && 'border border-theme-3 text-theme-3 font-bold' ].join(" ")}> 
                        <div className="flex-1" onClick={()=>resumeSelectionHandler(resume)}> {getResumeName(resume.file)}  </div>
                        {selectedResumeId == resume.id ? 
                            <FaCheckCircle />
                            :
                            <FaTrash className="cursor-pointer z-100" onClick={()=>destory(resume.id)} />
                        }
                    </div> 
                )}
            </div>
            {uploadingResume && <div className="flex items-center gap-2"> <span>Uploading...</span> <Loading /> </div> }
            <p>Or upload a new one</p>
            <InputFile model={[newResume, setNewResume]}  placeholder="Select file" accept="application/pdf" />
        </>
    )
}
