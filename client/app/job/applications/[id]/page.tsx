'use client'

import customFetch from "@/utils/customFetch"
import { useEffect, useState } from "react"
import Application from "./components/Application"
import { Loading } from "gamon-react"

export default function JobApplications({params}) {

    const [loading, setLoading] = useState(true)
    const [applications, setApplications] = useState<Application[]>([])
    const [job, setJob] = useState<Job>()

    useEffect(()=>{
        if(params.id) fetchApplications()
    },[])

    const fetchApplications = async ()=>{
        const [res, data] = await customFetch(`job/${params.id}/applications`)
        setLoading(false)
        if(!res.ok) return 
        setApplications(data.applications)
        setJob(data.job)
    }

    return (
        <div className="h-full w-full overflow-hidden flex flex-col">
            <div className="w-full flex items-center mt-6">
                <div className="m-auto text-2xl"> Applications </div>
            </div>
            <div className="w-full md:w-3/4 lg:w-2/4 flex-1 flex flex-col m-auto overflow-auto p-2">
                {   
                    loading ?
                        <Loading className="m-auto" />
                    :
                    applications.length > 0 ?
                        applications.map(application=> <Application application={application} key={application.id} />)
                        :
                        <div className="flex items-center justify-center text-lg m-auto">No records found !</div>
                }
            </div>
        </div>
    )
}
