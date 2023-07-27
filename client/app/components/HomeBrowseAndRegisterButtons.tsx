'use client'

import { UserContext } from "@/context/UserContext"
import Link from "next/link"
import { useContext } from "react"

export default function HomeBrowseAndRegisterButtons({
}: {
}) {

    const {user} = useContext(UserContext)


    return (
        <div className='flex items-center justify-center mt-10 m-auto w-full lg:w-1/2 animate-fadeInScale'>
            <Link href="/jobs" className='rounded-md w-40 m-1 text-center bg-theme-3 text-md p-2 '> Browse Jobs </Link>

            { user ? 
                <Link href="/job/create" className='rounded-md w-40 m-1 text-center bg-theme-2 text-md p-2 '> Post a job </Link>
                :
                <Link href="/register" className='rounded-md w-40 m-1 text-center bg-theme-2 text-md p-2 '> Sign In </Link>
            }
            
        </div>
    )
}
