'use client'

import customFetch from "@/utils/customFetch"
import { Button, InputCheckbox, Sheet } from "gamon-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Application({application}:{application:Application}) {

    const [reviewed, setReviewed] = useState(application.reviewed);
    const [qSheet, setQSheet] = useState(false);

    useEffect(()=>{
    },[])

    const changeReviewed = async ()=>{
        const [res, data] = await customFetch(`application/${application.id}/reviewed`,{
            method:'PATCH',
        })
        if(!res.ok) return
        setReviewed(data.reviewed)
    }

    return (
        <>
            <div className={["w-full border-b p-4 mt-4  transition  hover:border-theme-2", reviewed && "opacity-50"].join(" ")}>
                <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center">
                        <span>User: {application?.user?.email} </span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 md:mt-0">
                        <Link href={application?.resume?.file} target="_blank" className="p-2 bg-theme-2 rounded-md text-sm h-[30px] flex justify-center items-center">Resume</Link>
                        <Button text="Questions" className="bg-theme-3 h-[30px]" onClick={()=>setQSheet(true)} />
                    </div>
                </div>
                <div className="mt-2" >
                    <div className={["flex items-center cursor-pointer" ].join(" ")} onClick={changeReviewed}>
                        <span className={["w-[20px] h-[20px] rounded-full border", reviewed && "bg-theme-4"].join(" ")}></span>
                        <span className="ms-1">reviewed</span>
                    </div>
                </div>
            </div>
            <Sheet displayModel={[qSheet, setQSheet]} title="Questions">
                { application.questions.map(q=> <div className="border-b p-2 mt-2" key={q.id}>
                    <p className="text-gray-500">{q.text}</p>
                    <p> - {q.pivot?.answer}</p>
                </div> )}
            </Sheet>
        </>
    )
}
