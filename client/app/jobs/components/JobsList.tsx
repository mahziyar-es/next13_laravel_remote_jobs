'use client'
import Link from "next/link";
import {FormEvent, UIEvent, useEffect, useState} from 'react'
import { Button, InputBasic, Sheet, InputSelect, InputCheckbox, Loading } from 'gamon-react'
import Job from './Job'
import JobDetail from "./JobDetail";
import JobsListFilters from "./JobsListFilters";
import customFetch from "@/utils/customFetch";
import { getTailwindcssBreakPoint } from "@/utils/helpers";


export default function JobsList(
    {listType}:{listType: "posted"|"application"}
) {

    const [componentLoaded, setComponentLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [seniority, setSeniority] = useState<string[]>([]);
    const [jobType, setJobType] = useState<string[]>([]);
    const [timespan, setTimespan] = useState<number>(0);
    const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJobId, setSelectedJobId] = useState<number>();
    const [jobSheetDisplay, setJobSheetDisplay] = useState(false);
    const [fetchingJobs, setFetchingJobs] = useState(false);
    const [reachedEndOfList, setReachedEndOfList] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);




    useEffect(()=>{
        setComponentLoaded(true)
        checkSmallScreen()
    },[])

    useEffect(()=>{
        setSelectedJobId(undefined)
        setReachedEndOfList(false)
    },[listType])


    useEffect(()=>{
        fetchJobs()
    },[seniority.length, jobType.length, selectedCountries.length, timespan, listType])


    const checkSmallScreen = ()=>{
        const screenWidth = window.screen.width
        const breakPoint = getTailwindcssBreakPoint('md')
        if(breakPoint && screenWidth <= breakPoint) setSmallScreen(true)
        else setSmallScreen(false)
    }

    const searchSubmit = (e: FormEvent)=>{
        e.preventDefault()
        fetchJobs()
    }

    const fetchJobs = async (lazyloading=false)=>{
        if(fetchingJobs || (reachedEndOfList && lazyloading)) return 
        setFetchingJobs(true)
        let count = 0
        if(lazyloading){
            count = jobs.length
        }else {
            setJobs([])
        }

        let countryIds :number[] = []
        selectedCountries.map(country=> countryIds.push(country.id))

        const [res,data] = await customFetch(`job?count=${count}&search_query=${searchQuery}&seniority=${(seniority).join(',')}&timespan=${timespan}&country=${countryIds.join(',')}&list_type=${listType || 'all'}`)
        setFetchingJobs(false)
        if(res.ok && data?.jobs){
            if(lazyloading) {
                if(data.jobs.length == 0) setReachedEndOfList(true)
                setJobs(s=> [...s, ...data.jobs])
            }
            else setJobs(data.jobs)
        }
    }

    const openJobDetail = async (job: Job, index: number)=>{
        setSelectedJobId(job.id)
        if(smallScreen) setJobSheetDisplay(true)
    }

    // this function is for updating the list job with newly fetched data
    const updateSelectedJobListItem = (fetchedJob: Job, jobListIndex: number)=>{
        jobs[jobListIndex] = fetchedJob!
    }


    const senioritySelection = (value: string)=>{
        if(seniority.indexOf(value) == -1) setSeniority(s=>[...s, value])
        else{
            setSeniority(state=> state.filter(v=> v!=value))
        }
    }

    
    const jobTypeSelection = (value: string)=>{
        if(jobType.indexOf(value) == -1) setJobType(s=>[...s, value])
        else{
            setJobType(state=> state.filter(v=> v!=value))
        }
    }

    const countrySelection = async (clickedCountry: Country)=>{
        const currentSelectedCountries = [...selectedCountries]

        let exists = false

        currentSelectedCountries.map((country, index)=>{
            if(country.id == clickedCountry.id){
                exists = true
                currentSelectedCountries.splice(index, 1)
            }
        })

        if(!exists) currentSelectedCountries.push(clickedCountry)

        setSelectedCountries(currentSelectedCountries)
    }

    const removeJobFromList = (id: number)=>{
        setJobs(jobs=> jobs.filter(job=> job.id != id))
    }

    const onApplyHandler = (id:number)=>{
        setJobs(jobs => {
            let editedJobs = jobs.map(job=> {
                if(job.id == id) job.user_sent_application = true
                return job
            })
            return editedJobs
        })
    }

    const lazyloadingHandler = (e: UIEvent<HTMLElement>)=>{
        e.preventDefault()
        const el = e.target as HTMLElement
        if (el && ((el.offsetHeight + el.scrollTop + 10) >= el.scrollHeight)) fetchJobs(true)
    }


    return (
        <div className="h-full overflow-hidden flex items-center justify-between p-4">
            {componentLoaded && 
                <>
                    <div className="w-full md:w-2/5 lg:w-1/4 h-full flex flex-col ">
                        <div className="flex items-center flex-col">
                            <div className="w-full mb-2">
                                <p className="text-lg md:text-3xl text-start font-bold flex justify-center"> 
                                { listType ? (listType == 'posted' ? 'Jobs you posted' : 'Your applications') : 'Jobs list' } 
                            </p>
                            </div>
                            <form onSubmit={searchSubmit} className="flex items-center w-full">
                                <InputBasic model={[searchQuery, setSearchQuery]} placeholder="Enter a query" className="rounded-lg h-[40px] rounded-e-none" />
                                <button className="bg-theme-3 text-sm p-2 rounded-e-md h-[40px]" type="submit">Search</button>
                            </form>
                            <JobsListFilters
                                seniority={seniority}
                                senioritySelection={senioritySelection}
                                jobType={jobType}
                                jobTypeSelection={jobTypeSelection}
                                selectedCountries={selectedCountries}
                                countrySelection={countrySelection}
                                timespan={timespan}
                                timespanSelection={setTimespan}
                            />
                        </div>
                        <div className="mt-4 pt-4 flex-1 overflow-auto flex flex-col md:pe-2 relative" onScroll={lazyloadingHandler}>
                            { jobs.length == 0 &&  <div className="w-full h-full text-theme-3 flex items-center justify-center">No records found !</div> }
                            {jobs.map((job, index)=> <Job job={job} onClick={()=>openJobDetail(job, index)} selected={job.id == selectedJobId } key={job.id} /> )}
                            {fetchingJobs && <Loading className="m-auto sticky m-auto bottom-5" />}
                        </div>
                    </div>

                    { smallScreen ?
                        <Sheet displayModel={[jobSheetDisplay, setJobSheetDisplay]} bodyClass="w-full h-full " type="bottom" animation="slide-up">
                            { selectedJobId && <JobDetail jobId={selectedJobId} onDelete={removeJobFromList} onApplyHandler={onApplyHandler} />}
                        </Sheet>
                        :
                        <div className="hidden md:flex md:w-3/5 lg:w-3/4 h-full ps-6 flex items-center">
                            { selectedJobId ?
                                <JobDetail jobId={selectedJobId} onDelete={removeJobFromList} onApplyHandler={onApplyHandler} />
                                :
                                <p className="text-2xl font-bold m-auto">Select a job to see the details </p>
                            }
                        </div>
                    }
                    
                </>
            }
        </div>
    )
}
