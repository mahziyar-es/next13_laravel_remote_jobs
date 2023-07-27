'use client'
import { InputBasic, Sheet } from 'gamon-react'
import customFetch from "@/utils/customFetch";
import { FormEvent, useContext, useEffect, useState } from "react";
import { createPortal } from 'react-dom';


export default function JobCreateCountrySelector(
    {country, countrySelectionHandler}: {country?:Country, countrySelectionHandler:(country:Country)=>void}
) {

    

    const [countrySheetDisplay, setCountrySheetDisplay] = useState(false);
    const [countrySearchQuery, setCountrySearchQuery] = useState('');
    const [countries, setCountries] = useState<Country[]>([]);
    const [mounted, setMounted] = useState(false);


    useEffect(()=>{
        setMounted(true)
    },[])

    const countrySearch = async (e: FormEvent)=>{
        e.preventDefault();
        const [res, data] = await customFetch(`country?query=${countrySearchQuery}`)
        if(!res.ok) return 
        setCountries(data.countries)
    }

    const countrySelection = (country: Country)=>{
        setCountrySheetDisplay(false)
        countrySelectionHandler(country)
    }


    return (
        <>
            <button className='w-full md:w-2/5 bg-theme-4 p-2 rounded-md text-sm md:text-md h-[45px]' onClick={()=>setCountrySheetDisplay(true)}>
                {country ? country.name : <span>Select your country</span> }
            </button>
            {mounted && createPortal(
                <Sheet displayModel={[countrySheetDisplay, setCountrySheetDisplay]} title="Select your country">
                    <form onSubmit={countrySearch} className='flex gap-2'>
                        <InputBasic placeholder='Country name' model={[countrySearchQuery, setCountrySearchQuery]} />
                        <button className='p-2 rounded bg-theme-4 text-sm'>Search</button>
                    </form>
                    <div className='mt-4'>
                        {countries.map(country=> (<div key={country.id} className='border-b p-2 cursor-pointer' onClick={()=>countrySelection(country)}>{country.name}</div>) )}
                    </div>
                </Sheet>
            , document.body)}
        </>
    )
}
