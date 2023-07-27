'use client'
import Link from "next/link";
import {useEffect, useState} from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'
import { Button, InputBasic, Sheet, InputSelect, InputCheckbox, InputRadio, GrabScroll } from 'gamon-react'
import Job from './Job'
import JobDetail from "./JobDetail";
import customFetch from "@/utils/customFetch";


export default function JobsListFilters(
    { seniority, senioritySelection, jobType, jobTypeSelection, selectedCountries, countrySelection, timespan, timespanSelection}:
    { 
        seniority:string[], senioritySelection:(value:string)=>void, 
        jobType: string[], jobTypeSelection: (value:string)=>void,
        selectedCountries: Country[], countrySelection: (clickedCountry:Country)=>void,
        timespan: number, timespanSelection: (value:number)=>void,
    }
) {

    const [fromAnywhere, setFromAnywhere] = useState(0);
    const [countrySearchQuery, setCountrySearchQuery] = useState('');
    const [countrySearchResult, setCountrySearchResult] = useState<Country[]>([]);

    useEffect(()=>{
        setCountrySearchResult([])
        if(countrySearchQuery.length == 0) return 
        searchCountry()
    },[countrySearchQuery.length])

  
    const searchCountry = async ()=>{
        const [res, data] = await customFetch('country?query='+countrySearchQuery)
        setCountrySearchResult(data.countries)
    }
    

    return (
        <>
              
            <GrabScroll>
                <div className="w-full flex gap-5 mt-2 pb-1">
                    <div className="flex items-center justify-center rounded-md border text-center p-2 cursor-pointer  min-w-[100px] w-fit" gamon-sheet-toggle="timeModal">
                        <div className="min-w-fit">Time</div>
                    </div>
                    <div className="flex items-center justify-center rounded-md border text-center p-2 cursor-pointer  min-w-[100px] w-fit" gamon-sheet-toggle="seniorityModal">
                        <div className="min-w-fit">Seniority</div>
                        {seniority.length > 0 && (<div className="p-2 text-sm flex items-center justify-center w-[10px] h-[10px] rounded-full bg-theme-3 ms-2">{seniority.length}</div>) }
                    </div>
                    <div className="flex items-center justify-center rounded-md border text-center p-2 cursor-pointer min-w-[100px] w-fit" gamon-sheet-toggle="jobTypeModal">
                        <div className="min-w-fit">Job type</div>
                        {jobType.length > 0 && (<div className="p-2 text-sm flex items-center justify-center w-[10px] h-[10px] rounded-full bg-theme-3 ms-2">{jobType.length}</div>) }
                    </div>
                    <div className="flex items-center justify-center rounded-md border text-center p-2 cursor-pointer min-w-[100px] w-fit" gamon-sheet-toggle="locationModal">
                        <div className="min-w-fit">Location</div>
                        {selectedCountries.length > 0 && (<div className="p-2 text-sm flex items-center justify-center w-[10px] h-[10px] rounded-full bg-theme-3 ms-2">{selectedCountries.length}</div>) }
                    </div>
                </div>
            </GrabScroll>


            <Sheet id="timeModal" title="Time span">
                <div className={["p-2 rounded border mb-2 cursor-pointer font-bold", timespan == 0 && 'text-theme-3 border-theme-3' ].join(" ")} onClick={()=>timespanSelection(0)}>All</div>
                <div className={["p-2 rounded border mb-2 cursor-pointer font-bold", timespan == 1 && 'text-theme-3 border-theme-3' ].join(" ")} onClick={()=>timespanSelection(1)}>Last 24 hours</div>
                <div className={["p-2 rounded border mb-2 cursor-pointer font-bold", timespan == 7 && 'text-theme-3 border-theme-3' ].join(" ")} onClick={()=>timespanSelection(7)}>Last 7 days</div>
                <div className={["p-2 rounded border mb-2 cursor-pointer font-bold", timespan == 30 && 'text-theme-3 border-theme-3' ].join(" ")} onClick={()=>timespanSelection(30)}>Last 30 days</div>
            </Sheet>

            <Sheet id="seniorityModal" title="Seniority">
                <div className={["p-2 rounded border mb-2 cursor-pointer font-bold", seniority.indexOf('senior') != -1 && 'text-theme-3 border-theme-3' ].join(" ")} onClick={()=>senioritySelection('senior')}>Senior</div>
                <div className={["p-2 rounded border mb-2 cursor-pointer font-bold", seniority.indexOf('junior') != -1 && 'text-theme-3 border-theme-3' ].join(" ")} onClick={()=>senioritySelection('junior')}>Junior</div>
                <div className={["p-2 rounded border mb-2 cursor-pointer font-bold", seniority.indexOf('intermediate') != -1 && 'text-theme-3 border-theme-3' ].join(" ")} onClick={()=>senioritySelection('intermediate')}>Intermediate</div>
            </Sheet>

            <Sheet id="jobTypeModal" title="Job type">
                <div className={["p-2 rounded border mb-2 cursor-pointer font-bold", jobType.indexOf('part_time') != -1 && 'text-theme-3 border-theme-3' ].join(" ")} onClick={()=>jobTypeSelection('part_time')}>Part time</div>
                <div className={["p-2 rounded border mb-2 cursor-pointer font-bold", jobType.indexOf('full_time') != -1 && 'text-theme-3 border-theme-3' ].join(" ")} onClick={()=>jobTypeSelection('full_time')}>Full time</div>
                <div className={["p-2 rounded border mb-2 cursor-pointer font-bold", jobType.indexOf('contract') != -1 && 'text-theme-3 border-theme-3' ].join(" ")} onClick={()=>jobTypeSelection('contract')}>Contract</div>
            </Sheet>

          
            <Sheet id="locationModal" title="Location">
                <InputCheckbox title="Jobs that accept applications from anywhere in the world" model={[fromAnywhere, setFromAnywhere]} binary />
                <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                        { selectedCountries.map(country=>( <div className="p-2 rounded-md bg-theme-3 cursor-pointer" onClick={()=>countrySelection(country)} >{country.name}</div>))}
                    </div>
                    <InputBasic placeholder="Search a country" model={[countrySearchQuery, setCountrySearchQuery]} className="mt-4" />
                    <div className="mt-2">
                        {countrySearchResult.length > 0 &&
                            countrySearchResult.map((country, index)=>(
                                <div className="p-2 rounded-md border-b mb-2 cursor-pointer" onClick={()=>countrySelection(country)} key={country.id}>{country.name}</div>
                            ))
                        }
                    </div>
                </div>
            </Sheet>


        </>
    )
}
